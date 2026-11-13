import AnimatedLines from '../components/AnimatedLines'
import CTAButton from '../components/CTAButton'
import { projects, type Project } from '../data/content'

const STATUS: Record<Project['status'], { label: string; cls: string }> = {
  live: { label: 'Live', cls: 'text-ice' },
  'in-progress': { label: 'In progress', cls: 'text-amber' },
  complete: { label: 'Complete', cls: 'text-text-muted' },
}

export default function Work() {
  const featured = projects.find((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <section id="work" className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-36">
        <p data-reveal="fade" className="eyebrow">
          02 — Selected work
        </p>
        <AnimatedLines
          lines={['Builds and', 'integrations.']}
          className="mt-5 font-display text-display font-semibold text-text"
        />

        {featured && (
          <article className="mt-16 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-16">
            {/* Clip-path reveal + image drifting inside its frame */}
            <div data-reveal="clip" className="relative overflow-hidden border border-border">
              <img
                data-img-parallax
                src={featured.image}
                alt={`${featured.name} live site screenshot`}
                width={1280}
                height={800}
                loading="lazy"
                decoding="async"
                className="h-auto w-full will-change-transform"
              />
            </div>

            <div data-reveal="stagger">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ice">Featured · Live</p>
              <h3 className="mt-4 font-display text-3xl font-semibold text-text md:text-5xl">{featured.name}</h3>
              <p className="mt-5 max-w-md leading-relaxed text-text-muted">{featured.description}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {featured.stack.map((s) => (
                  <li key={s} className="border border-border px-2.5 py-1 font-mono text-[11px] text-text-muted">
                    {s}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-4">
                {featured.liveUrl && (
                  <CTAButton href={featured.liveUrl} external>
                    Visit site
                  </CTAButton>
                )}
                {featured.url && (
                  <CTAButton href={featured.url} variant="secondary" external>
                    Repository
                  </CTAButton>
                )}
              </div>
            </div>
          </article>
        )}

        {/* The rest: an index list, deliberately not the same layout as the featured case. */}
        <ol className="mt-24 md:mt-32">
          {rest.map((p, i) => {
            const s = STATUS[p.status]
            return (
              <li key={p.id}>
                <div data-reveal="rule" className="h-px w-full bg-border" />
                <article
                  data-reveal="up"
                  className="group grid gap-4 py-8 transition-colors duration-300 md:grid-cols-[4rem_1.1fr_1fr_8rem] md:items-baseline md:gap-8 md:py-10"
                >
                  <span className="font-mono text-xs text-text-faint">0{i + 2}</span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-text transition-transform duration-500 group-hover:translate-x-2 md:text-3xl">
                      {p.name}
                    </h3>
                    {p.context && <p className="mt-2 font-mono text-xs text-text-faint">{p.context}</p>}
                  </div>
                  <div>
                    <p className="max-w-md text-sm leading-relaxed text-text-muted">{p.description}</p>
                    <p className="mt-3 font-mono text-[11px] text-text-faint">{p.stack.join(' · ')}</p>
                    {p.url && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-block font-mono text-xs text-ice underline-offset-4 hover:underline"
                      >
                        View repository →
                      </a>
                    )}
                  </div>
                  <span className={`font-mono text-xs uppercase tracking-[0.18em] md:text-right ${s.cls}`}>
                    {s.label}
                  </span>
                </article>
              </li>
            )
          })}
          <li>
            <div data-reveal="rule" className="h-px w-full bg-border" />
          </li>
        </ol>
      </div>
    </section>
  )
}


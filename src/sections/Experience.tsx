import AnimatedLines from '../components/AnimatedLines'
import { experience } from '../data/content'

export default function Experience() {
  return (
    <section id="experience" className="border-b border-border">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-24 md:px-10 md:py-36 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p data-reveal="fade" className="eyebrow">
            04 — Experience
          </p>
          <AnimatedLines
            lines={['Where the', 'work has been.']}
            className="mt-5 font-display text-display font-semibold text-text"
          />
        </div>

        <ol>
          {experience.map((e) => (
            <li key={e.id}>
              <div data-reveal="rule" className="h-px w-full bg-border" />
              <article data-reveal="up" className="py-10 md:py-14">
                <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-text-muted">
                  {e.current && (
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ice" />
                  )}
                  {e.period}
                </p>
                <h3 className="mt-4 font-display text-2xl font-semibold text-text md:text-4xl">{e.role}</h3>
                <p className="mt-2 font-mono text-sm text-ice">{e.company}</p>
                <ul className="mt-6 max-w-xl space-y-3">
                  {e.highlights.map((h) => (
                    <li key={h} className="flex gap-4 leading-relaxed text-text-muted">
                      <span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-text-faint" />
                      {h}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
          <li>
            <div data-reveal="rule" className="h-px w-full bg-border" />
          </li>
        </ol>
      </div>
    </section>
  )
}

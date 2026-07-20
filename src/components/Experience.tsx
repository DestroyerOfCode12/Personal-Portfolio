import Reveal from './Reveal'
import { experience } from '../data/content'

export default function Experience() {
  return (
    <section id="experience" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-ice">
            02 — Experience
          </p>
          <h2 className="mb-10 font-display text-2xl font-semibold text-text md:text-3xl">
            Where the work has been.
          </h2>
        </Reveal>

        <div className="flex flex-col gap-6">
          {experience.map((entry, i) => (
            <Reveal key={entry.id} delayMs={i * 80}>
              <article className="border border-border bg-surface p-6 transition-colors hover:border-border-hover md:p-8">
                <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-text">
                      {entry.role}
                    </h3>
                    <p className="font-mono text-sm text-ice">{entry.company}</p>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
                    {entry.current && (
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-pulse-slow rounded-full bg-ice opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ice" />
                      </span>
                    )}
                    <span>{entry.period}</span>
                  </div>
                </div>

                <ul className="flex flex-col gap-2">
                  {entry.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 text-sm leading-relaxed text-text-muted"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-text-faint" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

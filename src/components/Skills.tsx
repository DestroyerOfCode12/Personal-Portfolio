import Reveal from './Reveal'
import { skills } from '../data/content'

export default function Skills() {
  return (
    <section id="skills" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-ice">
            04 — Skills
          </p>
          <h2 className="mb-10 font-display text-2xl font-semibold text-text md:text-3xl">
            Toolset and practices.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {skills.map((group, i) => (
            <Reveal key={group.id} delayMs={i * 80}>
              <div className="h-full border border-border bg-surface p-6">
                <h3 className="mb-4 font-mono text-xs uppercase tracking-wider text-text-muted">
                  {group.label}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="border border-border px-3 py-1.5 text-sm text-text transition-colors hover:border-ice/40 hover:text-ice"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

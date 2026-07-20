import { useState } from 'react'
import Reveal from './Reveal'
import { skills } from '../data/content'

export default function Skills() {
  const [hoveredGroupId, setHoveredGroupId] = useState<string | null>(null)

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

        <div
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
          onMouseLeave={() => setHoveredGroupId(null)}
        >
          {skills.map((group, i) => {
            const isHoveredGroup = hoveredGroupId === group.id
            const isDimmed = hoveredGroupId !== null && !isHoveredGroup

            return (
              <Reveal key={group.id} delayMs={i * 80}>
                <div
                  className={`h-full border border-border bg-surface p-6 transition-opacity duration-300 ${
                    isDimmed ? 'opacity-50' : 'opacity-100'
                  }`}
                >
                  <h3 className="mb-4 font-mono text-xs uppercase tracking-wider text-text-muted">
                    {group.label}
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <li
                        key={skill}
                        onMouseEnter={() => setHoveredGroupId(group.id)}
                        className={`border px-3 py-1.5 text-sm text-text transition-all duration-300 ${
                          isHoveredGroup
                            ? 'border-ice/40 text-ice shadow-glow'
                            : 'border-border hover:border-ice/40 hover:text-ice'
                        }`}
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

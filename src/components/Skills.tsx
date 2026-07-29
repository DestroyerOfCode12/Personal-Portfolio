import { useState } from 'react'
import type { IconType } from 'react-icons'
import {
  SiReact,
  SiVite,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiPrisma,
  SiPostgresql,
} from 'react-icons/si'
import Reveal from './Reveal'
import { skills } from '../data/content'

// Recognizable brand icons only exist for the Engineering Stack group.
// ITSM/LMS platforms (ServiceNow, HaloITSM, Cherwell, Litmos) and Core Practices
// are left text-only rather than using placeholder or unrelated icons.
const SKILL_ICONS: Record<string, IconType> = {
  React: SiReact,
  Vite: SiVite,
  TypeScript: SiTypescript,
  Tailwind: SiTailwindcss,
  'Node.js': SiNodedotjs,
  Express: SiExpress,
  Prisma: SiPrisma,
  PostgreSQL: SiPostgresql,
}

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
                    {group.skills.map((skill) => {
                      const Icon = SKILL_ICONS[skill]
                      return (
                        <li
                          key={skill}
                          onMouseEnter={() => setHoveredGroupId(group.id)}
                          className={`flex items-center gap-1.5 border px-3 py-1.5 text-sm text-text transition-all duration-300 ${
                            isHoveredGroup
                              ? 'border-ice/40 text-ice shadow-glow'
                              : 'border-border hover:border-ice/40 hover:text-ice'
                          }`}
                        >
                          {Icon && <Icon size={14} aria-hidden="true" />}
                          {skill}
                        </li>
                      )
                    })}
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

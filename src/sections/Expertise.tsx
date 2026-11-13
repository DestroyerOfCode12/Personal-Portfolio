import AnimatedLines from '../components/AnimatedLines'
import { skills } from '../data/content'

// Typographic rows instead of three identical boxes.
export default function Expertise() {
  return (
    <section id="expertise" className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-36">
        <p data-reveal="fade" className="eyebrow">
          01 — Expertise
        </p>
        <AnimatedLines
          lines={['Platforms I configure.', 'Software I build.']}
          className="mt-5 max-w-4xl font-display text-display font-semibold text-text"
        />

        <div className="mt-16 md:mt-24">
          {skills.map((group, i) => (
            <div key={group.id}>
              <div data-reveal="rule" className="h-px w-full bg-border" />
              <div className="grid gap-6 py-10 md:grid-cols-[0.45fr_1fr] md:gap-12 md:py-14">
                <div data-reveal="up" className="flex items-baseline gap-5">
                  <span className="font-mono text-xs text-text-faint">0{i + 1}</span>
                  <h3 className="font-display text-2xl font-semibold text-text md:text-3xl">{group.label}</h3>
                </div>
                <ul data-reveal="stagger" className="flex flex-wrap gap-x-8 gap-y-3">
                  {group.skills.map((s) => (
                    <li
                      key={s}
                      className="group relative cursor-default font-display text-xl text-text-muted transition-colors duration-300 hover:text-text md:text-3xl"
                    >
                      {s}
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-ice transition-transform duration-500 group-hover:scale-x-100"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          <div data-reveal="rule" className="h-px w-full bg-border" />
        </div>
      </div>
    </section>
  )
}


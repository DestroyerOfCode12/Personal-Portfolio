import { useEffect, useState, type MouseEvent } from 'react'
import { profile } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useScrambleText } from '../hooks/useScrambleText'

const MAX_PARALLAX_PX = 8

function stageClass(mounted: boolean): string {
  return `transition-all duration-700 ease-out ${
    mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
  }`
}

export default function Hero() {
  const reducedMotion = useReducedMotion()
  const scrambledName = useScrambleText(profile.name)
  const [mounted, setMounted] = useState(reducedMotion)

  useEffect(() => {
    if (reducedMotion) return
    const raf = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(raf)
  }, [reducedMotion])

  function handleParallaxMove(e: MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2 * MAX_PARALLAX_PX
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2 * MAX_PARALLAX_PX
    e.currentTarget.style.setProperty('--hero-mx', `${x}px`)
    e.currentTarget.style.setProperty('--hero-my', `${y}px`)
  }

  function handleParallaxLeave(e: MouseEvent<HTMLElement>) {
    e.currentTarget.style.setProperty('--hero-mx', '0px')
    e.currentTarget.style.setProperty('--hero-my', '0px')
  }

  return (
    <section
      id="top"
      onMouseMove={reducedMotion ? undefined : handleParallaxMove}
      onMouseLeave={reducedMotion ? undefined : handleParallaxLeave}
      className="relative overflow-hidden border-b border-border"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-4 bg-grid-texture bg-grid transition-transform duration-200 ease-out"
        style={{ transform: 'translate(var(--hero-mx, 0px), var(--hero-my, 0px))' }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ice/[0.06] via-transparent to-bg" />

      {!reducedMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-32 animate-scan bg-gradient-to-b from-ice/10 to-transparent"
        />
      )}

      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <p
          className={`mb-4 font-mono text-xs uppercase tracking-[0.2em] text-ice ${stageClass(mounted)}`}
        >
          STATUS://LIVE — this page runs its own telemetry, see the bar above
        </p>

        <h1
          aria-label={profile.name}
          style={{ transitionDelay: mounted ? '100ms' : '0ms' }}
          className={`max-w-3xl font-display text-4xl font-semibold leading-tight text-text md:text-6xl ${stageClass(mounted)}`}
        >
          <span aria-hidden="true">{scrambledName}</span>
        </h1>

        <p
          style={{ transitionDelay: mounted ? '750ms' : '0ms' }}
          className={`mt-4 max-w-2xl font-display text-lg text-text-muted md:text-xl ${stageClass(mounted)}`}
        >
          {profile.role} — {profile.location}
        </p>

        <p
          style={{ transitionDelay: mounted ? '900ms' : '0ms' }}
          className={`mt-6 max-w-2xl text-base leading-relaxed text-text-muted ${stageClass(mounted)}`}
        >
          {profile.summary}
        </p>

        <div
          style={{ transitionDelay: mounted ? '1050ms' : '0ms' }}
          className={`mt-10 flex flex-wrap gap-4 ${stageClass(mounted)}`}
        >
          <a
            href="#projects"
            className="border border-ice/40 bg-ice/10 px-5 py-3 font-mono text-xs uppercase tracking-wider text-ice shadow-glow transition-colors hover:bg-ice/20 focus-visible:bg-ice/20"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="border border-border px-5 py-3 font-mono text-xs uppercase tracking-wider text-text-muted transition-colors hover:border-border-hover hover:text-text focus-visible:border-border-hover focus-visible:text-text"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  )
}

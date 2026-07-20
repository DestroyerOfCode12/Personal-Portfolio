import { profile } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function Hero() {
  const reducedMotion = useReducedMotion()

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border bg-grid-texture bg-grid"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ice/[0.06] via-transparent to-bg" />

      {!reducedMotion && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-32 animate-scan bg-gradient-to-b from-ice/10 to-transparent"
        />
      )}

      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-ice">
          STATUS://LIVE — this page runs its own telemetry, see the bar above
        </p>

        <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight text-text md:text-6xl">
          {profile.name}
        </h1>

        <p className="mt-4 max-w-2xl font-display text-lg text-text-muted md:text-xl">
          {profile.role} — {profile.location}
        </p>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-muted">
          {profile.summary}
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
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

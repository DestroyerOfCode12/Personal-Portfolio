import AnimatedLines from '../components/AnimatedLines'
import { principles } from '../data/content'

export default function Principles() {
  return (
    <section aria-labelledby="principles-heading" className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-36">
        <p data-reveal="fade" className="eyebrow">
          05 — Principles
        </p>
        <div id="principles-heading">
          <AnimatedLines
            lines={['Four rules', 'I work by.']}
            className="mt-5 font-display text-display font-semibold text-text"
          />
        </div>

        <ol data-reveal="stagger" className="mt-16 grid gap-x-16 gap-y-0 md:grid-cols-2">
          {principles.map((p, i) => (
            <li key={p.title} className="border-t border-border py-10">
              <span className="font-display text-6xl font-semibold leading-none text-ice/80 md:text-7xl">
                {i + 1}
              </span>
              <h3 className="mt-6 font-display text-2xl font-semibold text-text">{p.title}</h3>
              <p className="mt-3 max-w-sm leading-relaxed text-text-muted">{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

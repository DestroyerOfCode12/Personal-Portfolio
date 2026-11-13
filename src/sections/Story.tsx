import { getYearsOfExperience, story } from '../data/content'

// The rhythm-breaker: inverted colour field, words that light up as you scroll.
export default function Story() {
  const words = story.text.split(' ')
  const years = getYearsOfExperience()

  return (
    <section aria-labelledby="story-heading" className="border-b border-border bg-ink text-ink-text">
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-44">
        <p data-reveal="fade" className="font-mono text-xs uppercase tracking-[0.2em] opacity-70">
          {story.eyebrow}
        </p>
        <h2 id="story-heading" className="sr-only">
          How I work
        </h2>

        <p
          data-words
          aria-label={story.text}
          className="mt-8 max-w-6xl font-display text-[clamp(1.75rem,4.4vw,4rem)] font-medium leading-[1.12] tracking-[-0.02em]"
        >
          {words.map((w, i) => (
            <span key={i} data-word aria-hidden="true" className="inline-block">
              {w}&nbsp;
            </span>
          ))}
        </p>

        <div className="mt-16 flex flex-col gap-8 border-t border-current/20 pt-8 md:flex-row md:items-end md:justify-between">
          <p data-reveal="up" className="max-w-md text-sm leading-relaxed opacity-80">
            {story.note}
          </p>
          <p data-reveal="up" className="font-display">
            <span className="text-7xl font-semibold leading-none md:text-9xl">
              <span data-count={years}>{years}</span>+
            </span>
            <span className="mt-2 block font-mono text-xs uppercase tracking-[0.2em] opacity-70">
              Years in ITSM/LMS integration
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}

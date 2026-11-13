import AnimatedLines from '../components/AnimatedLines'
import CTAButton from '../components/CTAButton'
import HeroLayer from '../components/HeroLayer'
import { profile } from '../data/content'
import { heroLayers } from '../data/layers'

export default function Hero() {
  return (
    <section
      id="top"
      data-hero
      className="grid-texture relative overflow-hidden border-b border-border"
    >
      {/* Flex column below lg so the visual can jump ahead of the copy on phones/tablets
          (headline -> visual -> copy -> CTA). From lg up it is the normal desktop flow. */}
      <div className="mx-auto flex max-w-[1400px] flex-col px-6 pb-12 pt-12 md:px-10 md:pt-20 lg:block">
        <p data-hero-fade className="eyebrow order-1">
          {profile.role} · {profile.location}
        </p>

        {/* Text sits above every art layer so the headline can never be covered. */}
        <AnimatedLines
          as="h1"
          lines={profile.headline}
          className="relative z-[60] order-2 mt-6 max-w-5xl font-display text-hero font-semibold text-text"
        />

        <div className="relative z-[60] order-4 mt-8 max-w-lg">
          <p data-hero-fade className="text-base leading-relaxed text-text-muted md:text-lg">
            {profile.summary}
          </p>
          <div data-hero-fade className="mt-8 flex flex-wrap gap-4">
            <CTAButton href="#work">View work</CTAButton>
            <CTAButton href="#contact" variant="secondary">
              Get in touch
            </CTAButton>
          </div>
        </div>

        {/* Stage: aspect ratio steps per breakpoint so the composition is re-directed, not shrunk.
            On desktop it is pulled up so the right-hand layers sit beside the copy;
            the anchor itself starts below the text so no copy is ever covered. */}
        <div className="relative order-3 mt-8 aspect-[5/6] sm:aspect-[16/11] lg:-mt-40 lg:aspect-[16/11] xl:-mt-56">
          {heroLayers.map((layer) => (
            <HeroLayer key={layer.id} layer={layer} />
          ))}
        </div>
      </div>
    </section>
  )
}

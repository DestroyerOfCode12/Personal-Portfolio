import type { CSSProperties } from 'react'
import type { Breakpoint, Layer, LayerPlacement } from '../data/layers'

const PREFIX: Record<Breakpoint, string> = { desktop: 'd', tablet: 't', mobile: 'm' }

function vars(bp: Breakpoint, p: LayerPlacement): Record<string, string> {
  const k = PREFIX[bp]
  return {
    [`--${k}-x`]: `${p.x}%`,
    [`--${k}-y`]: `${p.y}%`,
    [`--${k}-w`]: `${p.w}%`,
    [`--${k}-r`]: `${p.rotate ?? 0}deg`,
    [`--${k}-v`]: p.hidden ? 'none' : 'block',
  }
}

/**
 * One independently art-directed asset.
 * Three nested elements, each owned by one system so transforms never collide:
 *   .layer            CSS only: breakpoint position + rotation (from src/data/layers.ts)
 *   [data-parallax]   GSAP scrub: scroll parallax
 *   [data-layer]      GSAP timeline: entrance + optional idle loop
 */
export default function HeroLayer({ layer, eager = false }: { layer: Layer; eager?: boolean }) {
  const style = {
    zIndex: layer.z,
    ...vars('desktop', layer.place.desktop),
    ...vars('tablet', layer.place.tablet),
    ...vars('mobile', layer.place.mobile),
  } as CSSProperties

  const decorative = layer.alt === ''

  return (
    <div className="layer" style={style}>
      <div data-parallax={layer.parallax}>
        <div
          data-layer
          data-delay={layer.delay}
          data-idle={layer.idle ? '' : undefined}
          className="will-change-transform"
        >
          <img
            src={layer.src}
            alt={layer.alt}
            aria-hidden={decorative || undefined}
            width={layer.size[0]}
            height={layer.size[1]}
            loading={eager || layer.role === 'anchor' ? 'eager' : 'lazy'}
            decoding="async"
            draggable={false}
            className={`h-auto w-full select-none ${layer.role === 'anchor' ? 'border border-border' : ''}`}
          />
        </div>
      </div>
    </div>
  )
}

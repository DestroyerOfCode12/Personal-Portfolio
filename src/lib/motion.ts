import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

// Plugins are registered exactly once, at module load.
gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis | null = null
let tick: ((time: number) => void) | null = null

/** Starts the single Lenis instance and slaves it to GSAP's ticker. Idempotent. */
export function startLenis(): Lenis {
  if (lenis) return lenis
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  tick = (time) => lenis?.raf(time * 1000) // gsap time is seconds, Lenis wants ms
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  return lenis
}

/** Fully tears Lenis down: ticker callback, listeners and instance. Safe to call twice. */
export function stopLenis() {
  if (tick) gsap.ticker.remove(tick)
  lenis?.destroy()
  lenis = null
  tick = null
}

/** Smooth anchor scroll through Lenis when active, native otherwise. */
export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: -72, duration: 1.4 })
  else el.scrollIntoView({ behavior: 'auto', block: 'start' })
  history.replaceState(null, '', `#${id}`)
}

export { gsap, ScrollTrigger }

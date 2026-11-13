import { gsap, ScrollTrigger, startLenis, stopLenis } from './motion'

/**
 * One place for every GSAP timeline and ScrollTrigger on the page.
 * Components only expose data attributes; this file animates them.
 *
 *   [data-split] > [data-line]   masked line reveal
 *   [data-reveal="up|clip|stagger|rule|fade"]   section reveal vocabulary
 *   [data-words] > [data-word]   scrubbed word-by-word read
 *   [data-parallax="<px>"]       scroll parallax (travel in px)
 *   [data-img-parallax]          image drifts inside its clipped frame
 *   [data-count="<n>"]           count-up
 *   [data-progress]              page progress bar
 *
 * Everything runs inside gsap.matchMedia, so with prefers-reduced-motion
 * nothing here executes: no Lenis, no parallax, no reveals, all content visible.
 */
export function initAnimations(root: HTMLElement): gsap.MatchMedia {
  const mm = gsap.matchMedia(root)

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    startLenis()

    heroIntro(root)
    scrollProgress(root)
    lineReveals(root)
    sectionReveals(root)
    wordScrub(root)
    parallax(root)
    counters(root)

    // Images/fonts change layout height; refresh once they settle.
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    document.fonts?.ready.then(refresh)

    return () => {
      window.removeEventListener('load', refresh)
      stopLenis()
    }
  })

  return mm
}

function heroIntro(root: HTMLElement) {
  const hero = root.querySelector('[data-hero]')
  if (!hero) return

  const lines = hero.querySelectorAll('[data-line]')
  const fades = hero.querySelectorAll('[data-hero-fade]')
  const layers = gsap.utils.toArray<HTMLElement>(hero.querySelectorAll('[data-layer]'))

  gsap.set(lines, { yPercent: 115 })
  gsap.set(fades, { autoAlpha: 0, y: 18 })
  gsap.set(layers, { autoAlpha: 0, y: 70, scale: 0.94 })

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  tl.to(fades[0], { autoAlpha: 1, y: 0, duration: 0.6 }, 0)
    .to(lines, { yPercent: 0, duration: 1.05, stagger: 0.11 }, 0.1)
    .to(layers[0], { autoAlpha: 1, y: 0, scale: 1, duration: 1.2 }, 0.3) // anchor first
  layers.slice(1).forEach((layer) => {
    const delay = Number(layer.dataset.delay ?? 0.5)
    tl.to(layer, { autoAlpha: 1, y: 0, scale: 1, duration: 0.95 }, 0.4 + delay)
  })
  tl.to(fades.length > 1 ? Array.from(fades).slice(1) : [], { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.12 }, 0.75)

  // One extremely subtle idle loop, on the single layer flagged `idle`.
  const idle = hero.querySelector<HTMLElement>('[data-idle]')
  if (idle) {
    tl.add(() => {
      gsap.to(idle, { y: -7, rotation: 2, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
    }, '>')
  }
}

function scrollProgress(root: HTMLElement) {
  const bar = root.querySelector('[data-progress]')
  if (!bar) return
  gsap.fromTo(
    bar,
    { scaleX: 0 },
    { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.2 } },
  )
}

function lineReveals(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    if (el.closest('[data-hero]')) return // hero has its own timeline
    const lines = el.querySelectorAll('[data-line]')
    gsap.fromTo(
      lines,
      { yPercent: 115 },
      {
        yPercent: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      },
    )
  })
}

function sectionReveals(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    const kind = el.dataset.reveal
    const scrollTrigger = { trigger: el, start: 'top 86%', once: true }

    switch (kind) {
      case 'clip':
        gsap.fromTo(
          el,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'power4.out', scrollTrigger },
        )
        break
      case 'stagger':
        gsap.from(el.children, {
          autoAlpha: 0,
          y: 34,
          duration: 0.85,
          stagger: 0.09,
          ease: 'power3.out',
          scrollTrigger,
        })
        break
      case 'rule':
        gsap.fromTo(
          el,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 1.1, ease: 'power3.inOut', scrollTrigger },
        )
        break
      case 'fade':
        gsap.from(el, { autoAlpha: 0, duration: 1, ease: 'power2.out', scrollTrigger })
        break
      default:
        gsap.from(el, { autoAlpha: 0, y: 28, duration: 0.9, ease: 'power3.out', scrollTrigger })
    }
  })
}

function wordScrub(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>('[data-words]').forEach((el) => {
    gsap.fromTo(
      el.querySelectorAll('[data-word]'),
      { opacity: 0.16 },
      {
        opacity: 1,
        ease: 'none',
        stagger: 0.12,
        scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 48%', scrub: 0.4 },
      },
    )
  })
}

function parallax(root: HTMLElement) {
  // Hero depth layers: foreground mild, midground moderate, accent independent.
  root.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const travel = Number(el.dataset.parallax)
    if (!travel) return
    const hero = el.closest('[data-hero]')
    gsap.to(el, {
      y: travel,
      ease: 'none',
      scrollTrigger: {
        trigger: hero ?? el,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
      },
    })
  })

  // Images drift inside a clipped frame.
  root.querySelectorAll<HTMLElement>('[data-img-parallax]').forEach((img) => {
    gsap.fromTo(
      img,
      { yPercent: -7, scale: 1.12 },
      {
        yPercent: 7,
        ease: 'none',
        scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    )
  })
}

function counters(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count)
    const state = { v: 0 }
    gsap.to(state, {
      v: target,
      duration: 1.4,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = String(Math.round(state.v))
      },
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    })
  })
}

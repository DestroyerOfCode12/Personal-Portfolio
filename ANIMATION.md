# Animation architecture

Stack: React + Vite + TypeScript + Tailwind, **GSAP + ScrollTrigger** for all motion, **Lenis** for smooth scrolling.
No other animation library.

## Why the hero is separate layers, not one image
The hero is a composition of independent assets (`src/data/layers.ts`). Each layer can be moved,
scaled, rotated, re-timed, parallaxed or hidden per breakpoint without touching the others.
A flattened hero image could only be scaled down on mobile; layers let mobile drop the terminal,
shrink the workflow card and move the node.

## Layer configuration (`src/data/layers.ts`)
Each `Layer` declares: `src`, `alt` (empty = decorative), `size` (intrinsic px, prevents layout shift),
`role`, `z`, `parallax` (px of travel), `delay` (entrance offset), `idle`, and a `place` object with
`desktop` / `tablet` / `mobile` placements (`x`, `y`, `w` as % of the stage, `rotate`, `hidden`).
`HeroLayer.tsx` turns those into CSS custom properties; `.layer` in `index.css` selects them per
breakpoint (desktop >=1024, tablet 640-1023, mobile <640). **No coordinates live in JSX.**
`closingLayers` re-uses the same assets with a different art direction for the contact section.

Each layer is three nested elements so transforms never collide:
`.layer` (CSS: position + rotation) > `[data-parallax]` (GSAP scrub) > `[data-layer]` (GSAP entrance/idle).

## GSAP structure (`src/lib/animations.ts`)
Components only expose data attributes; one module animates them:

| Attribute | Behaviour |
| --- | --- |
| `[data-split] > [data-line]` | masked line reveal (`AnimatedLines`; accessible name stays the full sentence) |
| `[data-reveal="up/clip/stagger/rule/fade"]` | the small section-reveal vocabulary |
| `[data-words] > [data-word]` | scrubbed word-by-word read (Story section) |
| `[data-parallax="<px>"]` | scroll parallax (hero layers) |
| `[data-img-parallax]` | image drifts inside a clipped frame (featured work) |
| `[data-count]` | count-up |
| `[data-progress]` | page progress bar |

Hero intro is one timeline: eyebrow > headline lines > anchor > secondary layers (staggered by each
layer's `delay`) > copy/CTA. The only continuous motion is one very subtle idle loop on the node layer.
Everything animates `transform`/`opacity` (plus `clip-path` for the featured image reveal).

## ScrollTrigger
All scroll-linked motion is ScrollTrigger: reveals (`once: true`), scrubbed words, parallax, the progress
bar, and the nav's active-section tracking (`Nav.tsx`, inside its own `gsap.context`). There are no
scroll/`requestAnimationFrame` listeners of our own. `ScrollTrigger.refresh()` runs on window load and
when fonts are ready.

## Lenis (`src/lib/motion.ts`)
One instance. `startLenis()` is idempotent; it feeds `lenis.raf` from `gsap.ticker` (seconds -> ms),
calls `ScrollTrigger.update` on Lenis scroll events and disables `lagSmoothing`, so there is exactly one
rAF loop. `stopLenis()` removes the ticker callback and destroys the instance. It is started and stopped
inside `gsap.matchMedia`, and `App.tsx` reverts that matchMedia on unmount, so React StrictMode's
double-mount and Vite HMR cannot create duplicates. Anchor links use `scrollToId()` (Lenis when active,
native otherwise).

## Reduced motion
`initAnimations` runs everything inside `gsap.matchMedia('(prefers-reduced-motion: no-preference)')`.
With `reduce`: no Lenis, no hidden start states, no reveals, no parallax, no idle loop - all content is
visible and static. CSS also zeroes transition/animation durations, and the status-bar ping has
`motion-reduce:animate-none`.

## Replacing the placeholder visuals later
Replace the file at the layer's `src` (keep the filename, or update `src`/`size` in `layers.ts`).
To add a portrait: drop `public/portrait/jacob-cutout.png`, add a layer entry (role `anchor`) with its
own `place` per breakpoint. See `ASSET_REQUIREMENTS.md`.

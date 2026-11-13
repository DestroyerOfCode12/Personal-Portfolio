// Art direction lives here, not in JSX. Each layer is an independent asset that can be
// repositioned per breakpoint, re-timed, parallaxed or hidden. Positions are percentages
// of the stage; `w` is a percentage of stage width. Swap an asset by replacing the file at `src`.

export type Breakpoint = 'desktop' | 'tablet' | 'mobile'

export interface LayerPlacement {
  x: number // left, % of stage
  y: number // top, % of stage
  w: number // width, % of stage
  rotate?: number
  hidden?: boolean
}

export interface Layer {
  id: string
  src: string
  alt: string // empty string = decorative
  size: [number, number] // intrinsic width/height, prevents layout shift
  role: 'anchor' | 'support' | 'depth' | 'accent'
  z: number
  parallax: number // px travelled over the hero scroll; 0 = static
  delay: number // entrance offset in seconds on the hero timeline
  idle?: boolean // one very subtle idle loop
  place: Record<Breakpoint, LayerPlacement>
}

export const heroLayers: Layer[] = [
  {
    id: 'malika',
    src: '/projects/malika-cakes.png',
    size: [1280, 800],
    alt: "Screenshot of Malika's Cake Boutique, a live e-commerce site built by Jacob",
    role: 'anchor',
    z: 20,
    parallax: -40,
    delay: 0.15,
    place: {
      desktop: { x: 8, y: 34, w: 66, rotate: -2 },
      tablet: { x: 4, y: 12, w: 78, rotate: -1.5 },
      mobile: { x: 0, y: 8, w: 100, rotate: 0 },
    },
  },
  {
    id: 'workflow',
    src: '/objects/workflow-card.svg',
    size: [480, 300],
    alt: '',
    role: 'support',
    z: 30,
    parallax: -90,
    delay: 0.35,
    place: {
      desktop: { x: 58, y: 8, w: 38, rotate: 2.5 },
      tablet: { x: 56, y: 46, w: 42, rotate: 2 },
      mobile: { x: 46, y: 56, w: 54, rotate: 2 },
    },
  },
  {
    id: 'terminal',
    src: '/objects/terminal.svg',
    size: [420, 240],
    alt: '',
    role: 'depth',
    z: 25,
    parallax: -20,
    delay: 0.5,
    place: {
      desktop: { x: 2, y: 66, w: 30, rotate: -3 },
      tablet: { x: 0, y: 64, w: 40, rotate: -2 },
      mobile: { x: 0, y: 0, w: 0, hidden: true },
    },
  },
  {
    id: 'node',
    src: '/objects/integration-node.svg',
    size: [120, 120],
    alt: '',
    role: 'accent',
    z: 40,
    parallax: -130,
    delay: 0.65,
    idle: true,
    place: {
      desktop: { x: 72, y: 36, w: 11 },
      tablet: { x: 78, y: 2, w: 16 },
      mobile: { x: 76, y: 0, w: 20 },
    },
  },
]

// Closing composition: same assets, re-art-directed (smaller, no anchor screenshot).
export const closingLayers: Layer[] = [
  { ...heroLayers[2], id: 'c-terminal', delay: 0, parallax: 0, z: 10, place: {
      desktop: { x: 0, y: 10, w: 66, rotate: -2 }, tablet: { x: 0, y: 10, w: 66, rotate: -2 }, mobile: { x: 0, y: 6, w: 70, rotate: -2 } } },
  { ...heroLayers[1], id: 'c-workflow', delay: 0.15, parallax: 0, z: 20, place: {
      desktop: { x: 34, y: 38, w: 64, rotate: 2 }, tablet: { x: 34, y: 38, w: 64, rotate: 2 }, mobile: { x: 30, y: 40, w: 70, rotate: 2 } } },
  { ...heroLayers[3], id: 'c-node', delay: 0.3, parallax: 0, idle: false, z: 30, place: {
      desktop: { x: 78, y: 0, w: 16 }, tablet: { x: 78, y: 0, w: 16 }, mobile: { x: 78, y: 0, w: 18 } } },
]


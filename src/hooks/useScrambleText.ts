import { useEffect, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const DURATION_MS = 700
const FRAME_MS = 40

function randomGlyph(): string {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
}

/** Reveals `text` left-to-right once on mount, cycling unrevealed characters through
 * random glyphs. Returns the final text immediately if reduced motion is preferred. */
export function useScrambleText(text: string): string {
  const reducedMotion = useReducedMotion()
  const [display, setDisplay] = useState(reducedMotion ? text : '')

  useEffect(() => {
    if (reducedMotion) {
      setDisplay(text)
      return
    }

    let frame = 0
    const totalFrames = Math.ceil(DURATION_MS / FRAME_MS)

    const interval = window.setInterval(() => {
      frame += 1
      const revealCount = Math.floor((frame / totalFrames) * text.length)
      const next = text
        .split('')
        .map((char, i) => (char === ' ' || i < revealCount ? char : randomGlyph()))
        .join('')
      setDisplay(next)

      if (frame >= totalFrames) {
        setDisplay(text)
        window.clearInterval(interval)
      }
    }, FRAME_MS)

    return () => window.clearInterval(interval)
  }, [text, reducedMotion])

  return display
}

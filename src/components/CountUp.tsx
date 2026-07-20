import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface CountUpProps {
  to: number
  suffix?: string
  durationMs?: number
}

export default function CountUp({ to, suffix = '', durationMs = 900 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) {
      setValue(to)
      return
    }

    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        const start = performance.now()
        const step = (now: number) => {
          const progress = Math.min((now - start) / durationMs, 1)
          setValue(Math.round(progress * to))
          if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      },
      { threshold: 0.5 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [to, durationMs, reducedMotion])

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  )
}

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface RevealProps {
  children: ReactNode
  className?: string
  delayMs?: number
  /** Adds animated corner brackets that "lock on" once revealed. */
  frame?: boolean
}

const CORNER_BASE =
  'pointer-events-none absolute h-3 w-3 border-ice transition-all duration-500 ease-out'

export default function Reveal({ children, className = '', delayMs = 0, frame = false }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) {
      setVisible(true)
      return
    }

    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [reducedMotion])

  const cornerState = visible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
  const cornerDelay = { transitionDelay: visible ? `${delayMs + 250}ms` : '0ms' }

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${frame ? 'relative' : ''} ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
      style={{ transitionDelay: visible ? `${delayMs}ms` : '0ms' }}
    >
      {children}

      {frame && (
        <>
          <span
            aria-hidden="true"
            className={`${CORNER_BASE} -left-1 -top-1 border-l border-t ${cornerState}`}
            style={cornerDelay}
          />
          <span
            aria-hidden="true"
            className={`${CORNER_BASE} -right-1 -top-1 border-r border-t ${cornerState}`}
            style={cornerDelay}
          />
          <span
            aria-hidden="true"
            className={`${CORNER_BASE} -bottom-1 -left-1 border-b border-l ${cornerState}`}
            style={cornerDelay}
          />
          <span
            aria-hidden="true"
            className={`${CORNER_BASE} -bottom-1 -right-1 border-b border-r ${cornerState}`}
            style={cornerDelay}
          />
        </>
      )}
    </div>
  )
}

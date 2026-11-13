import type { ReactNode } from 'react'
import { scrollToId } from '../lib/motion'

interface Props {
  href: string
  children: ReactNode
  variant?: 'primary' | 'secondary'
  external?: boolean
}

export default function CTAButton({ href, children, variant = 'primary', external = false }: Props) {
  const isAnchor = href.startsWith('#')
  const base =
    'group inline-flex items-center gap-3 border px-6 py-3.5 font-mono text-xs uppercase tracking-[0.18em] transition-colors duration-300'
  const look =
    variant === 'primary'
      ? 'border-ice bg-ice text-bg hover:bg-transparent hover:text-ice'
      : 'border-border text-text hover:border-text'

  return (
    <a
      href={href}
      className={`${base} ${look}`}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      onClick={
        isAnchor
          ? (e) => {
              e.preventDefault()
              scrollToId(href.slice(1))
            }
          : undefined
      }
    >
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1.5">
        →
      </span>
    </a>
  )
}

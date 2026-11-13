interface Props {
  lines: string[]
  as?: 'h1' | 'h2' | 'h3'
  className?: string
}

/**
 * Masked line reveal. Each line is its own overflow-hidden mask; GSAP slides the inner
 * span up (see animations.ts). The accessible name is the full sentence, the visual
 * lines are aria-hidden, so screen readers never hear fragments.
 */
export default function AnimatedLines({ lines, as: Tag = 'h2', className = '' }: Props) {
  return (
    <Tag data-split aria-label={lines.join(' ')} className={className}>
      {lines.map((line) => (
        <span key={line} className="line-mask" aria-hidden="true">
          <span data-line className="block will-change-transform">
            {line}
          </span>
        </span>
      ))}
    </Tag>
  )
}

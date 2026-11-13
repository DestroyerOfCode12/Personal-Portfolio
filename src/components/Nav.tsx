import { useLayoutEffect, useState } from 'react'
import { gsap, ScrollTrigger, scrollToId } from '../lib/motion'
import { useTheme } from '../hooks/useTheme'

const LINKS = [
  { id: 'expertise', label: 'Expertise' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

function ThemeToggle() {
  const [theme, toggle] = useTheme()
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      className="flex h-8 w-8 items-center justify-center border border-border text-text-muted transition-colors hover:border-text hover:text-text"
    >
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        {theme === 'dark' ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        ) : (
          <path d="M20.4 15.4A9 9 0 018.6 3.6a9 9 0 1011.8 11.8z" fill="currentColor" />
        )}
      </svg>
    </button>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)

  // Active section is driven by ScrollTrigger, not by an extra scroll listener.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      LINKS.forEach(({ id }) => {
        ScrollTrigger.create({
          trigger: `#${id}`,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => self.isActive && setActive(id),
        })
      })
    })
    return () => ctx.revert()
  }, [])

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    scrollToId(id)
  }

  return (
    <nav
      aria-label="Primary"
      className="sticky top-0 z-[100] border-b border-border bg-bg/85 backdrop-blur-sm"
    >
      <div className="relative mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
        <a
          href="#top"
          onClick={go('top')}
          className="font-display text-sm font-semibold tracking-wide text-text"
        >
          JACOB<span className="text-ice">.</span>MKHWANAZI
        </a>

        <div className="hidden items-center gap-10 md:flex">
          <ul className="flex items-center gap-10 font-mono text-xs uppercase tracking-[0.18em]">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={go(l.id)}
                  aria-current={active === l.id ? 'true' : undefined}
                  className={`relative pb-1 transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-ice after:transition-transform after:duration-300 hover:text-text hover:after:scale-x-100 ${
                    active === l.id ? 'text-text after:scale-x-100' : 'text-text-muted'
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted hover:text-text"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {open && (
        <ul
          id="mobile-nav"
          className="flex flex-col gap-5 border-t border-border bg-bg px-6 py-6 font-mono text-xs uppercase tracking-[0.18em] text-text-muted md:hidden"
        >
          {LINKS.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} onClick={go(l.id)} className={active === l.id ? 'text-ice' : ''}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}

      <div
        data-progress
        aria-hidden="true"
        className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left scale-x-0 bg-ice"
      />
    </nav>
  )
}

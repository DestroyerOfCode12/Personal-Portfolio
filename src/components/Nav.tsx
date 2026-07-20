import { useState } from 'react'
import { useTheme } from '../hooks/useTheme'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

function ThemeToggle() {
  const [theme, toggleTheme] = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      className="flex h-7 w-7 items-center justify-center border border-border text-text-muted transition-colors hover:border-border-hover hover:text-ice"
    >
      {theme === 'dark' ? (
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
          <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 1020.354 15.354z" />
        </svg>
      )}
    </button>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-sm font-semibold tracking-wide text-text">
          JACOB<span className="text-ice">.</span>MKHWANAZI
        </a>

        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="font-mono text-xs text-text-muted hover:text-ice"
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? 'CLOSE' : 'MENU'}
          </button>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8 font-mono text-xs uppercase tracking-wider text-text-muted">
            {LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="transition-colors hover:text-ice focus-visible:text-ice"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </div>

      {open && (
        <ul
          id="mobile-nav"
          className="flex flex-col gap-4 border-t border-border bg-bg px-6 py-4 font-mono text-xs uppercase tracking-wider text-text-muted md:hidden"
        >
          {LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                className="block transition-colors hover:text-ice focus-visible:text-ice"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}

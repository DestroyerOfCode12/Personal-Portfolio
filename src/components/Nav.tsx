import { useState } from 'react'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-sm font-semibold tracking-wide text-text">
          JACOB<span className="text-ice">.</span>MKHWANAZI
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="font-mono text-xs text-text-muted hover:text-ice md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? 'CLOSE' : 'MENU'}
        </button>

        <ul className="hidden items-center gap-8 font-mono text-xs uppercase tracking-wider text-text-muted md:flex">
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

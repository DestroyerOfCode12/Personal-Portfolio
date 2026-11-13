import { profile } from '../data/content'

const links = [
  { label: 'Email', href: `mailto:${profile.email}` },
  { label: 'LinkedIn', href: profile.linkedin },
  { label: 'GitHub', href: profile.github },
]

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-6 py-10 font-mono text-xs uppercase tracking-[0.18em] text-text-muted md:flex-row md:items-center md:justify-between md:px-10">
        <p>
          © {new Date().getFullYear()} {profile.name} — {profile.location}
        </p>
        <ul className="flex gap-8">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="transition-colors hover:text-ice"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}

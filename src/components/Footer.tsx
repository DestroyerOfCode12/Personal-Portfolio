import { profile } from '../data/content'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 font-mono text-xs text-text-muted md:flex-row md:items-center md:justify-between">
        <p>
          © {year} {profile.name} — {profile.location}
        </p>

        <div className="flex items-center gap-6">
          <a
            href={`mailto:${profile.email}`}
            className="transition-colors hover:text-ice focus-visible:text-ice"
          >
            EMAIL
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-ice focus-visible:text-ice"
          >
            LINKEDIN
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-ice focus-visible:text-ice"
          >
            GITHUB
          </a>
        </div>
      </div>
    </footer>
  )
}

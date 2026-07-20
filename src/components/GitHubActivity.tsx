import { useEffect, useState } from 'react'
import { profile } from '../data/content'

interface RepoEntry {
  name: string
  html_url: string
  updated_at: string
  description: string | null
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-ZA', { day: '2-digit', month: 'short', year: 'numeric' }).format(
    new Date(iso),
  )
}

function githubUsernameFromUrl(url: string): string | null {
  const match = url.match(/github\.com\/([^/]+)/)
  return match ? match[1] : null
}

export default function GitHubActivity() {
  const [repos, setRepos] = useState<RepoEntry[] | null>(null)

  useEffect(() => {
    const username = githubUsernameFromUrl(profile.github)
    if (!username) return

    const controller = new AbortController()

    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`, {
      signal: controller.signal,
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('GitHub API error'))))
      .then((data: RepoEntry[]) => setRepos(data))
      .catch(() => setRepos(null))

    return () => controller.abort()
  }, [])

  if (!repos || repos.length === 0) return null

  return (
    <div className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-6">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-text-faint">
          GITHUB://RECENT ACTIVITY
        </p>
        <ul className="flex flex-col gap-1.5 font-mono text-xs">
          {repos.map((repo) => (
            <li key={repo.name} className="flex items-baseline justify-between gap-4">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="truncate text-text-muted transition-colors hover:text-ice focus-visible:text-ice"
              >
                {repo.name}
              </a>
              <span className="shrink-0 text-text-faint">{formatDate(repo.updated_at)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'

const fmt = new Intl.DateTimeFormat('en-ZA', {
  timeZone: 'Africa/Johannesburg',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
})

export default function StatusBar() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="border-b border-border bg-bg font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-2 md:px-10">
        <span className="flex items-center gap-2 text-ice">
          <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ice opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ice" />
          </span>
          Available for work
        </span>
        <span>
          JHB <span className="text-text">{fmt.format(now)}</span>
        </span>
      </div>
    </div>
  )
}

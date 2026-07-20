import { useEffect, useState } from 'react'
import { useDeviceClass } from '../hooks/useDeviceClass'

function formatJohannesburgTime(date: Date): string {
  return new Intl.DateTimeFormat('en-ZA', {
    timeZone: 'Africa/Johannesburg',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date)
}

function formatUptime(seconds: number): string {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0')
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0')
  return `${m}:${s}`
}

export default function StatusBar({ compact = false }: { compact?: boolean }) {
  const [now, setNow] = useState(() => new Date())
  const [sessionStart] = useState(() => Date.now())
  const [uptimeSeconds, setUptimeSeconds] = useState(0)
  const deviceClass = useDeviceClass()

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(new Date())
      setUptimeSeconds((Date.now() - sessionStart) / 1000)
    }, 1000)
    return () => window.clearInterval(interval)
  }, [sessionStart])

  return (
    <div
      className={`w-full border-b border-border bg-surface/80 backdrop-blur font-mono text-text-muted ${
        compact ? 'text-[11px]' : 'text-xs'
      }`}
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-6 py-2">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-pulse-slow rounded-full bg-ice opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ice" />
          </span>
          <span className="text-ice">AVAILABLE FOR WORK</span>
        </div>

        <div className="flex items-center gap-6">
          <span>
            DEVICE <span className="text-text">{deviceClass.toUpperCase()}</span>
          </span>
          <span>
            JHB{' '}
            <span key={formatJohannesburgTime(now)} className="inline-block text-text animate-digit-in">
              {formatJohannesburgTime(now)}
            </span>
          </span>
          <span className="hidden sm:inline">
            SESSION{' '}
            <span key={formatUptime(uptimeSeconds)} className="inline-block text-text animate-digit-in">
              {formatUptime(uptimeSeconds)}
            </span>
          </span>
          <span className="hidden lg:inline">
            BUILD <span className="text-text">{__COMMIT_SHA__}</span>
            {__BUILD_CONTEXT__ !== 'production' && (
              <span className="text-amber"> ({__BUILD_CONTEXT__})</span>
            )}
          </span>
        </div>
      </div>
    </div>
  )
}

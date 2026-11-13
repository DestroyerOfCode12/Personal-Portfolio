import { useState, type FormEvent } from 'react'
import AnimatedLines from '../components/AnimatedLines'
import HeroLayer from '../components/HeroLayer'
import { profile } from '../data/content'
import { closingLayers } from '../data/layers'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const field =
  'w-full border-b border-border bg-transparent px-0 py-3 text-text outline-none transition-colors placeholder:text-text-faint focus:border-ice'

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>
    setStatus('sending')
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json().catch(() => null)
      if (!res.ok) throw new Error(json?.error ?? 'Something went wrong. Please try again.')
      setStatus('sent')
      form.reset()
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Could not reach the server.')
    }
  }

  return (
    <section id="contact" className="grid-texture relative overflow-hidden">
      <div className="mx-auto grid max-w-[1400px] gap-16 px-6 py-24 md:px-10 md:py-36 lg:grid-cols-2 lg:gap-24">
        <div>
          <p data-reveal="fade" className="eyebrow">
            06 — Contact
          </p>
          <AnimatedLines
            lines={['Have a system', 'that needs to talk?']}
            className="mt-5 font-display text-display font-semibold text-text"
          />
          <p data-reveal="up" className="mt-8 max-w-md leading-relaxed text-text-muted">
            For roles, contract work, or integration projects — send a message and expect a reply within one
            business day.
          </p>
          <p data-reveal="up" className="mt-4 font-mono text-sm">
            <a href={`mailto:${profile.email}`} className="text-ice underline-offset-4 hover:underline">
              {profile.email}
            </a>
          </p>

          {/* Closing composition: the hero's layers again, re-directed smaller. */}
          <div data-reveal="stagger" className="relative mt-14 hidden aspect-[16/9] sm:block">
            {closingLayers.map((l) => (
              <HeroLayer key={l.id} layer={l} />
            ))}
          </div>
        </div>

        <form data-reveal="up" onSubmit={onSubmit} noValidate={false} className="self-start" aria-describedby="form-status">
          <label className="block">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted">Name</span>
            <input name="name" required maxLength={100} autoComplete="name" className={field} />
          </label>
          <label className="mt-8 block">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted">Email</span>
            <input name="email" type="email" required maxLength={254} autoComplete="email" className={field} />
          </label>
          <label className="mt-8 block">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted">Message</span>
            <textarea name="message" required minLength={10} maxLength={5000} rows={5} className={`${field} resize-none`} />
          </label>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="group mt-10 inline-flex items-center gap-3 border border-ice bg-ice px-8 py-4 font-mono text-xs uppercase tracking-[0.18em] text-bg transition-colors hover:bg-transparent hover:text-ice disabled:opacity-50"
          >
            {status === 'sending' ? 'Sending…' : 'Send message'}
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </button>

          <p id="form-status" role="status" aria-live="polite" className="mt-5 min-h-6 font-mono text-xs">
            {status === 'sent' && <span className="text-ice">Message sent. Thanks, I will reply soon.</span>}
            {status === 'error' && <span className="text-amber">{error}</span>}
          </p>
        </form>
      </div>
    </section>
  )
}

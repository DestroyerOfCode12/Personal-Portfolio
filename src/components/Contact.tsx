import { useState, type FormEvent } from 'react'
import Reveal from './Reveal'
import { profile } from '../data/content'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })

      const data = await res.json().catch(() => null)

      if (!res.ok) {
        setStatus('error')
        setErrorMessage(data?.error ?? 'Something went wrong. Please try again.')
        return
      }

      setStatus('success')
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      setStatus('error')
      setErrorMessage('Could not reach the server. Please try again later.')
    }
  }

  return (
    <section id="contact" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-ice">
            05 — Contact
          </p>
          <h2 className="mb-4 font-display text-2xl font-semibold text-text md:text-3xl">
            Open a channel.
          </h2>
          <p className="mb-10 max-w-xl text-sm leading-relaxed text-text-muted">
            For roles, contract work, or integration projects — send a message and expect a
            reply within one business day. Direct: {profile.email}
          </p>
        </Reveal>

        <Reveal>
          <form onSubmit={handleSubmit} className="max-w-xl border border-border bg-surface p-6 md:p-8">
            <div className="mb-5">
              <label htmlFor="name" className="mb-2 block font-mono text-xs uppercase tracking-wider text-text-muted">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-border bg-bg px-4 py-3 text-sm text-text outline-none transition-colors focus:border-ice"
                disabled={status === 'submitting'}
              />
            </div>

            <div className="mb-5">
              <label htmlFor="email" className="mb-2 block font-mono text-xs uppercase tracking-wider text-text-muted">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-border bg-bg px-4 py-3 text-sm text-text outline-none transition-colors focus:border-ice"
                disabled={status === 'submitting'}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="mb-2 block font-mono text-xs uppercase tracking-wider text-text-muted">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full resize-none border border-border bg-bg px-4 py-3 text-sm text-text outline-none transition-colors focus:border-ice"
                disabled={status === 'submitting'}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="border border-ice/40 bg-ice/10 px-5 py-3 font-mono text-xs uppercase tracking-wider text-ice transition-colors hover:bg-ice/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === 'submitting' ? 'Sending…' : 'Send Message'}
            </button>

            <div role="status" aria-live="polite" className="mt-4 font-mono text-xs">
              {status === 'success' && (
                <p className="text-ice">Message sent — thanks, I&apos;ll reply soon.</p>
              )}
              {status === 'error' && errorMessage && (
                <p className="text-amber">{errorMessage}</p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

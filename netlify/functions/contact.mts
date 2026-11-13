import type { Context, Config } from '@netlify/functions'
import { getStore } from '@netlify/blobs'
import nodemailer from 'nodemailer'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const NAME_MAX = 100
const EMAIL_MAX = 254
const MESSAGE_MIN = 10
const MESSAGE_MAX = 5000
const WINDOW_MS = 15 * 60 * 1000
const MAX_REQUESTS = 5

interface Bucket {
  count: number
  resetAt: number
}

const json = (data: unknown, status: number) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } })

async function isRateLimited(ip: string): Promise<boolean> {
  try {
    const store = getStore('contact-rate-limits')
    const now = Date.now()
    const bucket = (await store.get(ip, { type: 'json' })) as Bucket | null
    if (!bucket || now > bucket.resetAt) {
      await store.setJSON(ip, { count: 1, resetAt: now + WINDOW_MS })
      return false
    }
    const count = bucket.count + 1
    await store.setJSON(ip, { count, resetAt: bucket.resetAt })
    return count > MAX_REQUESTS
  } catch (err) {
    // Fail open: a Blobs outage must not take the contact form down.
    console.error('Rate limit check failed, allowing request:', err)
    return false
  }
}

export default async (req: Request, context: Context) => {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)
  if (await isRateLimited(context.ip ?? 'unknown')) {
    return json({ error: 'Too many messages sent. Please try again later.' }, 429)
  }

  let body: { name?: unknown; email?: unknown; message?: unknown }
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Invalid request body.' }, 400)
  }
  const { name, email, message } = body

  if (typeof name !== 'string' || !name.trim() || name.trim().length > NAME_MAX)
    return json({ error: 'Please provide a valid name.' }, 400)
  if (typeof email !== 'string' || email.trim().length > EMAIL_MAX || !EMAIL_PATTERN.test(email.trim()))
    return json({ error: 'Please provide a valid email address.' }, 400)
  if (typeof message !== 'string' || message.trim().length < MESSAGE_MIN || message.trim().length > MESSAGE_MAX)
    return json({ error: `Message must be between ${MESSAGE_MIN} and ${MESSAGE_MAX} characters.` }, 400)

  const env = (k: string) => Netlify.env.get(k)
  const to = env('CONTACT_TO_EMAIL')
  const from = env('CONTACT_FROM_EMAIL')
  if (!to || !from || !env('SMTP_HOST') || !env('SMTP_PORT') || !env('SMTP_USER') || !env('SMTP_PASS')) {
    console.error('SMTP / CONTACT_* environment variables are not configured.')
    return json({ error: 'Failed to send message. Please try again later.' }, 502)
  }

  try {
    const transporter = nodemailer.createTransport({
      host: env('SMTP_HOST'),
      port: Number(env('SMTP_PORT')),
      secure: env('SMTP_SECURE') === 'true',
      auth: { user: env('SMTP_USER'), pass: env('SMTP_PASS') },
    })
    await transporter.sendMail({
      from,
      to,
      replyTo: email.trim(),
      subject: `Portfolio contact form: ${name.trim()}`,
      text: `From: ${name.trim()} <${email.trim()}>\n\n${message.trim()}`,
    })
    return json({ ok: true }, 200)
  } catch (err) {
    console.error('Failed to send contact email:', err)
    return json({ error: 'Failed to send message. Please try again later.' }, 502)
  }
}

export const config: Config = { path: '/api/contact' }

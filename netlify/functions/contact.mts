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

interface RateLimitBucket {
  count: number
  resetAt: number
}

async function isRateLimited(ip: string): Promise<boolean> {
  const store = getStore('contact-rate-limits')
  const now = Date.now()
  const bucket = await store.get(ip, { type: 'json' })

  if (!bucket || now > (bucket as RateLimitBucket).resetAt) {
    await store.setJSON(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }

  const nextCount = (bucket as RateLimitBucket).count + 1
  await store.setJSON(ip, { count: nextCount, resetAt: (bucket as RateLimitBucket).resetAt })
  return nextCount > MAX_REQUESTS
}

let transporter: nodemailer.Transporter | null = null

function getTransporter(): nodemailer.Transporter {
  if (transporter) return transporter

  const SMTP_HOST = Netlify.env.get('SMTP_HOST')
  const SMTP_PORT = Netlify.env.get('SMTP_PORT')
  const SMTP_SECURE = Netlify.env.get('SMTP_SECURE')
  const SMTP_USER = Netlify.env.get('SMTP_USER')
  const SMTP_PASS = Netlify.env.get('SMTP_PASS')

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error('SMTP configuration is missing. Set it in Netlify site environment variables.')
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE === 'true',
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })

  return transporter
}

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export default async (req: Request, context: Context) => {
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405)
  }

  const ip = context.ip ?? 'unknown'

  if (await isRateLimited(ip)) {
    return json({ error: 'Too many messages sent. Please try again later.' }, 429)
  }

  let body: { name?: unknown; email?: unknown; message?: unknown }
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Invalid request body.' }, 400)
  }

  const { name, email, message } = body

  if (typeof name !== 'string' || name.trim().length === 0 || name.trim().length > NAME_MAX) {
    return json({ error: 'Please provide a valid name.' }, 400)
  }

  if (
    typeof email !== 'string' ||
    email.trim().length > EMAIL_MAX ||
    !EMAIL_PATTERN.test(email.trim())
  ) {
    return json({ error: 'Please provide a valid email address.' }, 400)
  }

  if (
    typeof message !== 'string' ||
    message.trim().length < MESSAGE_MIN ||
    message.trim().length > MESSAGE_MAX
  ) {
    return json(
      { error: `Message must be between ${MESSAGE_MIN} and ${MESSAGE_MAX} characters.` },
      400,
    )
  }

  const CONTACT_TO_EMAIL = Netlify.env.get('CONTACT_TO_EMAIL')
  const CONTACT_FROM_EMAIL = Netlify.env.get('CONTACT_FROM_EMAIL')

  if (!CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error('CONTACT_TO_EMAIL/CONTACT_FROM_EMAIL are not configured.')
    return json({ error: 'Failed to send message. Please try again later.' }, 502)
  }

  try {
    await getTransporter().sendMail({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
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

export const config: Config = {
  path: '/api/contact',
}

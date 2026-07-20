import { Router, type Request, type Response } from 'express'
import { isRateLimited } from '../lib/rateLimit.js'
import { sendContactEmail } from '../lib/mailer.js'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const NAME_MAX = 100
const EMAIL_MAX = 254
const MESSAGE_MIN = 10
const MESSAGE_MAX = 5000

const router = Router()

function clientIp(req: Request): string {
  return req.ip ?? req.socket.remoteAddress ?? 'unknown'
}

router.post('/contact', async (req: Request, res: Response) => {
  const ip = clientIp(req)

  if (isRateLimited(ip)) {
    res.status(429).json({ error: 'Too many messages sent. Please try again later.' })
    return
  }

  const { name, email, message } = req.body ?? {}

  if (typeof name !== 'string' || name.trim().length === 0 || name.trim().length > NAME_MAX) {
    res.status(400).json({ error: 'Please provide a valid name.' })
    return
  }

  if (
    typeof email !== 'string' ||
    email.trim().length > EMAIL_MAX ||
    !EMAIL_PATTERN.test(email.trim())
  ) {
    res.status(400).json({ error: 'Please provide a valid email address.' })
    return
  }

  if (
    typeof message !== 'string' ||
    message.trim().length < MESSAGE_MIN ||
    message.trim().length > MESSAGE_MAX
  ) {
    res.status(400).json({
      error: `Message must be between ${MESSAGE_MIN} and ${MESSAGE_MAX} characters.`,
    })
    return
  }

  try {
    await sendContactEmail({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    })
    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Failed to send contact email:', err)
    res.status(502).json({ error: 'Failed to send message. Please try again later.' })
  }
})

export default router

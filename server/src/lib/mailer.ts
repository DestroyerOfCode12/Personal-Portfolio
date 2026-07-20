import nodemailer from 'nodemailer'

let transporter: nodemailer.Transporter | null = null

function getTransporter(): nodemailer.Transporter {
  if (transporter) return transporter

  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error('SMTP configuration is missing. Check server/.env.')
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE === 'true',
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })

  return transporter
}

export interface ContactMessage {
  name: string
  email: string
  message: string
}

export async function sendContactEmail({ name, email, message }: ContactMessage): Promise<void> {
  const { CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env

  if (!CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    throw new Error('CONTACT_TO_EMAIL/CONTACT_FROM_EMAIL are not configured. Check server/.env.')
  }

  await getTransporter().sendMail({
    from: CONTACT_FROM_EMAIL,
    to: CONTACT_TO_EMAIL,
    replyTo: email,
    subject: `Portfolio contact form: ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  })
}

import nodemailer from 'nodemailer'
import type { Transporter } from 'nodemailer'
import type Mail from 'nodemailer/lib/mailer'

let _transporter: Transporter | null = null

function getTransporter(): Transporter {
  if (_transporter) return _transporter

  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT) || 465
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass) {
    const missing = [
      !host && 'SMTP_HOST',
      !user && 'SMTP_USER',
      !pass && 'SMTP_PASS',
    ].filter(Boolean).join(', ')
    throw new Error(`Variables SMTP no configuradas: ${missing}`)
  }

  console.log(`[Email] Configurando SMTP: ${host}:${port} con usuario ${user}`)

  _transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  })

  return _transporter
}

const FROM = process.env.SMTP_FROM || 'Tricholand <info@tricholand.com>'
const ADMIN_EMAIL = 'info@tricholand.com'

export interface EmailAttachment {
  filename: string
  content: Buffer
  contentType?: string
}

export async function sendMail(
  to: string,
  subject: string,
  html: string,
  attachments?: EmailAttachment[]
): Promise<void> {
  const transporter = getTransporter()
  console.log(`[Email] Enviando a ${to}: "${subject}"${attachments?.length ? ` (${attachments.length} adjuntos)` : ''}`)

  const mailOptions: Mail.Options = { from: FROM, to, subject, html }

  if (attachments && attachments.length > 0) {
    mailOptions.attachments = attachments.map((a) => ({
      filename: a.filename,
      content: a.content,
      contentType: a.contentType || 'application/pdf',
    }))
  }

  const info = await transporter.sendMail(mailOptions)
  console.log(`[Email] Enviado OK a ${to} - messageId: ${info.messageId}`)
}

/**
 * Envía email al admin y al cliente. Devuelve { admin: boolean, client: boolean }
 */
export async function sendMailPair(
  adminSubject: string,
  adminHtml: string,
  clientEmail: string,
  clientSubject: string,
  clientHtml: string
): Promise<{ admin: boolean; client: boolean }> {
  const result = { admin: false, client: false }

  try {
    await sendMail(ADMIN_EMAIL, adminSubject, adminHtml)
    result.admin = true
  } catch (err) {
    console.error('[Email] Error enviando al admin:', err instanceof Error ? err.message : err)
  }

  try {
    await sendMail(clientEmail, clientSubject, clientHtml)
    result.client = true
  } catch (err) {
    console.error('[Email] Error enviando al cliente:', err instanceof Error ? err.message : err)
  }

  return result
}

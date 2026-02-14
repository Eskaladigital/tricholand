import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true, // SSL
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

const FROM = process.env.SMTP_FROM || 'Tricholand <info@tricholand.com>'
const ADMIN_EMAIL = 'info@tricholand.com'

export interface SendMailOptions {
  to: string
  subject: string
  html: string
}

export async function sendMail({ to, subject, html }: SendMailOptions): Promise<void> {
  await transporter.sendMail({ from: FROM, to, subject, html })
}

export async function sendMailToAdmin(subject: string, html: string): Promise<void> {
  await sendMail({ to: ADMIN_EMAIL, subject, html })
}

export async function sendMailPair(
  adminSubject: string,
  adminHtml: string,
  clientEmail: string,
  clientSubject: string,
  clientHtml: string
): Promise<void> {
  // Enviar ambos en paralelo, no bloquear si uno falla
  const results = await Promise.allSettled([
    sendMailToAdmin(adminSubject, adminHtml),
    sendMail({ to: clientEmail, subject: clientSubject, html: clientHtml }),
  ])

  for (const r of results) {
    if (r.status === 'rejected') {
      console.error('Error enviando email:', r.reason)
    }
  }
}

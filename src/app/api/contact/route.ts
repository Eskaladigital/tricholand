import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { createServiceClient } from '@/lib/supabase/api'
import { sendMailPair } from '@/lib/email/transporter'
import { contactAdminEmail, contactClientEmail } from '@/lib/email/templates'
import { resolveLocale, t } from '@/lib/email/i18n'

interface ContactPayload {
  contact_type: string
  professional_subtype?: string
  inquiry_type: string
  name: string
  company?: string
  vat_number?: string
  email: string
  phone?: string
  country: string
  city?: string
  message: string
  referral_source?: string
  locale: string
  gdpr_consent: boolean
  website?: string
  form_started_at?: string | number
}

/** Token tipo bot: una sola palabra, mayúsculas en medio (iNgXrKYUMiecBwtr). */
function looksLikeRandomToken(value: string): boolean {
  const t = value.trim()
  if (t.length < 12 || /\s/.test(t) || !/^[A-Za-z0-9]+$/.test(t)) return false
  const innerCaps = t.slice(1).replace(/[^A-Z]/g, '').length
  const lowers = (t.match(/[a-z]/g) || []).length
  const uppers = (t.match(/[A-Z]/g) || []).length
  return innerCaps >= 3 && lowers >= 3 && uppers >= 3
}

function dottedGmailSpam(email: string): boolean {
  const [local, domain] = email.toLowerCase().split('@')
  if (!domain?.endsWith('gmail.com') || !local) return false
  return (local.match(/\./g) || []).length >= 4
}

function looksLikeSalesPitch(message: string): boolean {
  const m = message.toLowerCase()
  if (m.includes('calendly.com')) return true
  if (/freelance writer|writing projects|thought leadership|press releases/.test(m)) return true
  if (/guest posts?|link building|backlinks?|dofollow|sponsored post/.test(m)) return true
  if (/prueba gratuita|tarjeta bancaria|demo r[aá]pida|agend(ar|a) (una )?demo/.test(m)) return true
  if (/desde\s+\d+([.,]\d+)?\s*€\s*\/\s*(mes|factura|año|empleado|usuario)/.test(m)) return true
  const links = m.match(/https?:\/\/[^\s]+/g) || []
  if (links.length >= 2) return true
  if (links.some((l) => /pricing|demo|youtube\.com|youtu\.be|bit\.ly/.test(l))) return true
  return false
}

function looksLikeTokenWithoutVowels(text: string): boolean {
  const words = text.split(/\s+/).filter((w) => w.length >= 10)
  return words.some((w) => {
    const clean = w.replace(/[^a-zA-Z]/g, '')
    if (clean.length < 10) return false
    const vowels = (clean.match(/[aeiouAEIOU]/g) || []).length
    return vowels / clean.length < 0.2
  })
}

function isBotSubmission(input: {
  name: string
  email: string
  message: string
  website: string
  startedAt: string
}): boolean {
  if (input.website) return true
  const started = Number(input.startedAt)
  if (!Number.isFinite(started) || started <= 0) return true
  const elapsed = Date.now() - started
  if (elapsed < 2500 || elapsed > 24 * 60 * 60 * 1000) return true
  if (looksLikeRandomToken(input.name) || looksLikeRandomToken(input.message)) return true
  if (looksLikeTokenWithoutVowels(`${input.name} ${input.message}`)) return true
  if (dottedGmailSpam(input.email) && looksLikeRandomToken(input.name)) return true
  if (looksLikeSalesPitch(input.message)) return true
  return false
}

export async function POST(request: NextRequest) {
  const log: string[] = []
  const addLog = (msg: string) => { log.push(msg); console.log(`[Contact] ${msg}`) }
  const addError = (msg: string) => { log.push(`ERROR: ${msg}`); console.error(`[Contact] ${msg}`) }

  try {
    const body: ContactPayload = await request.json()

    // --- Validación ---
    if (!body.name || !body.email || !body.country || !body.message) {
      return NextResponse.json({ error: 'Faltan campos obligatorios: nombre, email, país y mensaje' }, { status: 400 })
    }
    if (!body.gdpr_consent) {
      return NextResponse.json({ error: 'Debes aceptar la política de privacidad' }, { status: 400 })
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: 'El formato del email no es válido' }, { status: 400 })
    }

    if (isBotSubmission({
      name: body.name,
      email: body.email,
      message: body.message,
      website: String(body.website || '').trim(),
      startedAt: String(body.form_started_at || ''),
    })) {
      return NextResponse.json({ success: true, email_admin: false, email_client: false })
    }

    addLog(`Nuevo contacto de ${body.name} (${body.email}) - ${body.contact_type}`)

    // --- 1. Guardar en Supabase ---
    const supabase = createServiceClient()
    const { error } = await supabase.from('contacts').insert({
      contact_type: body.contact_type || 'particular',
      professional_subtype: body.professional_subtype || null,
      inquiry_type: body.inquiry_type || null,
      name: body.name,
      company: body.company || null,
      vat_number: body.vat_number || null,
      email: body.email,
      phone: body.phone || null,
      country: body.country,
      city: body.city || null,
      message: body.message,
      referral_source: body.referral_source || null,
      locale: body.locale || 'es',
      status: 'new',
      priority: body.contact_type === 'professional' ? 'high' : 'normal',
      gdpr_consent: body.gdpr_consent,
      gdpr_consent_date: new Date().toISOString(),
    })

    if (error) {
      addError(`Fallo al insertar contacto: ${error.message} | code: ${error.code} | details: ${error.details}`)
      return NextResponse.json({ error: 'Error al guardar el contacto', log }, { status: 500 })
    }

    addLog('Contacto guardado en BD')

    revalidatePath('/administrator/contacts', 'layout')
    revalidatePath('/administrator/dashboard')

    // --- 2. Enviar emails ---
    let emailAdmin = false
    let emailClient = false

    try {
      const locale = resolveLocale(body.locale)
      const emailData = {
        name: body.name,
        company: body.company || null,
        vat_number: body.vat_number || null,
        email: body.email,
        phone: body.phone || null,
        country: body.country,
        city: body.city || null,
        contact_type: body.contact_type || 'particular',
        professional_subtype: body.professional_subtype || null,
        inquiry_type: body.inquiry_type || null,
        message: body.message,
        referral_source: body.referral_source || null,
        locale: body.locale || 'es',
      }

      const isPro = body.contact_type === 'professional'
      const tr = t(locale)
      const emailResult = await sendMailPair(
        `[Web] Nueva consulta de ${body.name}${isPro ? ' (Profesional)' : ''} — ${body.country}`,
        contactAdminEmail(emailData),
        body.email,
        tr.subjectContactReceived,
        contactClientEmail(emailData),
      )
      emailAdmin = emailResult.admin
      emailClient = emailResult.client
      addLog(`Emails: admin=${emailAdmin}, cliente=${emailClient}`)
    } catch (err) {
      addError(`Error general enviando emails: ${err instanceof Error ? err.message : err}`)
    }

    // --- Respuesta ---
    addLog(`Contacto completado. Email admin: ${emailAdmin}, Email cliente: ${emailClient}`)

    return NextResponse.json({
      success: true,
      email_admin: emailAdmin,
      email_client: emailClient,
      log,
    })
  } catch (err) {
    addError(`Error general: ${err instanceof Error ? err.message : err}`)
    return NextResponse.json({ error: 'Error interno del servidor', log }, { status: 500 })
  }
}

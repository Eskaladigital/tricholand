import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/api'
import { sendMailPair } from '@/lib/email/transporter'
import { contactAdminEmail, contactClientEmail } from '@/lib/email/templates'

interface ContactPayload {
  contact_type: string
  professional_subtype?: string
  inquiry_type: string
  name: string
  company?: string
  email: string
  phone?: string
  country: string
  city?: string
  message: string
  referral_source?: string
  locale: string
  gdpr_consent: boolean
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

    addLog(`Nuevo contacto de ${body.name} (${body.email}) - ${body.contact_type}`)

    // --- 1. Guardar en Supabase ---
    const supabase = createServiceClient()
    const { error } = await supabase.from('contacts').insert({
      contact_type: body.contact_type || 'particular',
      professional_subtype: body.professional_subtype || null,
      inquiry_type: body.inquiry_type || null,
      name: body.name,
      company: body.company || null,
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

    // --- 2. Enviar emails ---
    let emailAdmin = false
    let emailClient = false

    try {
      const emailData = {
        name: body.name,
        company: body.company || null,
        email: body.email,
        phone: body.phone || null,
        country: body.country,
        city: body.city || null,
        contact_type: body.contact_type || 'particular',
        professional_subtype: body.professional_subtype || null,
        inquiry_type: body.inquiry_type || null,
        message: body.message,
        referral_source: body.referral_source || null,
      }

      const isPro = body.contact_type === 'professional'
      const emailResult = await sendMailPair(
        `[Web] Nueva consulta de ${body.name}${isPro ? ' (Profesional)' : ''} — ${body.country}`,
        contactAdminEmail(emailData),
        body.email,
        `Hemos recibido tu consulta — Tricholand`,
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

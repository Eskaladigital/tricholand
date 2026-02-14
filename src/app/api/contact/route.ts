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
  try {
    const body: ContactPayload = await request.json()

    // Validación básica
    if (!body.name || !body.email || !body.country || !body.message) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios: nombre, email, país y mensaje' },
        { status: 400 }
      )
    }

    if (!body.gdpr_consent) {
      return NextResponse.json(
        { error: 'Debes aceptar la política de privacidad' },
        { status: 400 }
      )
    }

    // Validar email básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'El formato del email no es válido' },
        { status: 400 }
      )
    }

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
      console.error('Error guardando contacto:', error)
      return NextResponse.json({ error: 'Error al guardar el contacto' }, { status: 500 })
    }

    // Enviar emails (no bloquear la respuesta si falla)
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
    let emailsSent = false
    try {
      await sendMailPair(
        `[Web] Nueva consulta de ${body.name}${isPro ? ' (Profesional)' : ''} — ${body.country}`,
        contactAdminEmail(emailData),
        body.email,
        `Hemos recibido tu consulta — Tricholand`,
        contactClientEmail(emailData),
      )
      emailsSent = true
      console.log(`Emails enviados para contacto de ${body.name}`)
    } catch (err) {
      console.error('Error enviando emails de contacto:', err)
    }

    console.log('Nuevo contacto recibido:', {
      type: body.contact_type,
      name: body.name,
      email: body.email,
      country: body.country,
      inquiry: body.inquiry_type,
      emailsSent,
    })

    return NextResponse.json(
      { success: true, emails_sent: emailsSent, message: 'Contacto recibido correctamente' },
      { status: 200 }
    )
  } catch (err) {
    console.error('Error procesando contacto:', err)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

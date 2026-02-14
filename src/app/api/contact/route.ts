import { NextRequest, NextResponse } from 'next/server'

// TODO: En producción, conectar con Supabase y Resend
// Por ahora, valida y devuelve OK (para testear el formulario)

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

    // TODO: Guardar en Supabase
    // const { data, error } = await supabase
    //   .from('contacts')
    //   .insert({
    //     contact_type: body.contact_type,
    //     professional_subtype: body.professional_subtype || null,
    //     inquiry_type: body.inquiry_type,
    //     name: body.name,
    //     company: body.company || null,
    //     email: body.email,
    //     phone: body.phone || null,
    //     country: body.country,
    //     city: body.city || null,
    //     message: body.message,
    //     referral_source: body.referral_source || null,
    //     locale: body.locale,
    //     status: 'new',
    //     priority: body.contact_type === 'professional' ? 'high' : 'normal',
    //     gdpr_consent: body.gdpr_consent,
    //     gdpr_consent_date: new Date().toISOString(),
    //   })

    // TODO: Enviar email de notificación con Resend
    // await resend.emails.send({
    //   from: 'Tricholand Web <noreply@tricholand.com>',
    //   to: 'info@tricholand.com',
    //   subject: `[Web] Nueva consulta de ${body.name} (${body.contact_type})`,
    //   html: `...`,
    // })

    console.log('📨 Nuevo contacto recibido:', {
      type: body.contact_type,
      name: body.name,
      email: body.email,
      country: body.country,
      inquiry: body.inquiry_type,
    })

    return NextResponse.json(
      { success: true, message: 'Contacto recibido correctamente' },
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

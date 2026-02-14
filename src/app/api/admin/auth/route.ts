import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// TODO: En producción, usar Supabase Auth
// Por ahora, credenciales hardcodeadas para desarrollo
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@tricholand.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'tricholand2025'
const SESSION_TOKEN = 'tricholand_admin_session'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 })
    }

    // Generar token simple (en producción: JWT o Supabase session)
    const token = Buffer.from(`${email}:${Date.now()}`).toString('base64')

    const cookieStore = await cookies()
    cookieStore.set(SESSION_TOKEN, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 horas
      path: '/',
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Error de autenticación' }, { status: 500 })
  }
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_TOKEN)
  return NextResponse.json({ success: true })
}

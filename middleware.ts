import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SUPPORTED_LOCALES = ['es', 'en', 'fr', 'de', 'it', 'nl', 'pt']
const DEFAULT_LOCALE = 'es'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Solo actuar en la raíz
  if (pathname === '/') {
    // Intentar detectar idioma del navegador
    const acceptLanguage = request.headers.get('accept-language') || ''
    const browserLang = acceptLanguage.split(',')[0]?.split('-')[0]?.toLowerCase()

    const locale = SUPPORTED_LOCALES.includes(browserLang || '')
      ? browserLang
      : DEFAULT_LOCALE

    return NextResponse.redirect(new URL(`/${locale}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  // Solo aplicar en la raíz, no en archivos estáticos ni API
  matcher: ['/'],
}

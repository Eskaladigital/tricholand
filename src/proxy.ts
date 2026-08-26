import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

const SUPPORTED_LOCALES = ['es', 'en', 'fr', 'de', 'it', 'nl', 'pt']
const DEFAULT_LOCALE = 'es'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/') {
    const acceptLanguage = request.headers.get('accept-language') || ''
    const browserLang = acceptLanguage.split(',')[0]?.split('-')[0]?.toLowerCase()
    const locale = SUPPORTED_LOCALES.includes(browserLang || '')
      ? browserLang
      : DEFAULT_LOCALE
    return NextResponse.redirect(new URL(`/${locale}`, request.url))
  }

  if (pathname.startsWith('/administrator')) {
    return await updateSession(request)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/administrator/:path*'],
}

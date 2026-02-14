import { NextRequest, NextResponse } from 'next/server'

const SESSION_TOKEN = 'tricholand_admin_session'

// Rutas protegidas del admin (excepto login)
const PROTECTED_ADMIN_PATHS = [
  '/administrator/dashboard',
  '/administrator/products',
  '/administrator/orders',
  '/administrator/contacts',
  '/administrator/settings',
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Solo proteger rutas admin
  const isProtectedAdmin = PROTECTED_ADMIN_PATHS.some((path) => pathname.startsWith(path))

  if (isProtectedAdmin) {
    const session = request.cookies.get(SESSION_TOKEN)
    if (!session?.value) {
      return NextResponse.redirect(new URL('/administrator/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/administrator/:path*'],
}

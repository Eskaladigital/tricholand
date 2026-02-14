import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data } = await supabase.auth.getClaims()
  const user = data?.claims

  const pathname = request.nextUrl.pathname
  const isLoginPage = pathname === '/administrator/login'
  const isAdminRoot = pathname === '/administrator'
  const isProtectedAdmin = [
    '/administrator/dashboard',
    '/administrator/products',
    '/administrator/blog',
    '/administrator/media',
    '/administrator/orders',
    '/administrator/customers',
    '/administrator/contacts',
    '/administrator/settings',
  ].some((path) => pathname.startsWith(path))

  // Si está en login o /administrator y ya tiene sesión → dashboard
  if ((isLoginPage || isAdminRoot) && user) {
    return NextResponse.redirect(new URL('/administrator/dashboard', request.url))
  }

  // Si está en ruta protegida sin sesión → login
  if (isProtectedAdmin && !user) {
    return NextResponse.redirect(new URL('/administrator/login', request.url))
  }

  return supabaseResponse
}

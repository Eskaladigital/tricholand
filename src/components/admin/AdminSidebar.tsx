'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const navItems = [
  { label: 'Dashboard', href: '/administrator/dashboard', icon: '📊' },
  { label: 'Productos', href: '/administrator/products', icon: '🌵' },
  { label: 'Pedidos', href: '/administrator/orders', icon: '📦' },
  { label: 'Contactos', href: '/administrator/contacts', icon: '📨' },
  { label: 'Configuración', href: '/administrator/settings', icon: '⚙️' },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/administrator/login')
    router.refresh()
  }

  return (
    <aside className="w-64 bg-negro text-crudo min-h-screen flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10">
        <Link href="/administrator/dashboard" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-verde flex items-center justify-center font-black text-base text-crudo">
            T
          </div>
          <div>
            <span className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold tracking-wide uppercase block">
              Tricholand
            </span>
            <span className="font-[family-name:var(--font-archivo-narrow)] text-[0.6rem] uppercase opacity-50 tracking-wider">
              Admin Panel
            </span>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-5 py-3 font-[family-name:var(--font-archivo-narrow)] text-sm font-semibold uppercase tracking-wide transition-colors ${
                isActive
                  ? 'bg-white/10 text-naranja border-r-2 border-naranja'
                  : 'opacity-60 hover:opacity-100 hover:bg-white/5'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="px-5 py-4 border-t border-white/10">
        <Link
          href="/es"
          target="_blank"
          className="block text-xs opacity-40 hover:opacity-70 transition-opacity mb-3"
        >
          ↗ Ver sitio web
        </Link>
        <button
          onClick={handleLogout}
          className="w-full text-left font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide opacity-50 hover:opacity-100 hover:text-red-400 transition-all"
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}

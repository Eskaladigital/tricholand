'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const navItems = [
  { label: 'Dashboard', href: '/administrator/dashboard', icon: '📊' },
  { label: 'Productos', href: '/administrator/products', icon: '🌵' },
  { label: 'Pedidos', href: '/administrator/orders', icon: '📦' },
  { label: 'Clientes', href: '/administrator/customers', icon: '👥' },
  { label: 'Contactos', href: '/administrator/contacts', icon: '📨' },
  { label: 'Configuración', href: '/administrator/settings', icon: '⚙️' },
]

export function AdminLayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/administrator/login')
    router.refresh()
  }

  return (
    <div className="flex min-h-screen">
      {/* Hamburger - solo móvil */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-negro text-crudo flex items-center justify-center rounded-md shadow-lg"
        aria-label="Abrir menú"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      </button>

      {/* Backdrop - solo móvil cuando abierto */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar - retráctil en móvil, fijo en desktop */}
      <aside
        className={`
          w-64 bg-negro text-crudo min-h-screen flex flex-col shrink-0
          fixed lg:static inset-y-0 left-0 z-50
          transform transition-transform duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Botón cerrar - solo móvil */}
        <div className="lg:hidden flex justify-end p-4 border-b border-white/10">
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="w-10 h-10 flex items-center justify-center text-crudo hover:bg-white/10 rounded"
            aria-label="Cerrar menú"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/10">
          <Link
            href="/administrator/dashboard"
            className="flex items-center gap-3"
            onClick={() => setMobileOpen(false)}
          >
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
                onClick={() => setMobileOpen(false)}
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
            onClick={() => setMobileOpen(false)}
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

      {/* Main content - padding left en móvil para no tapar con hamburger */}
      <main className="flex-1 p-8 pt-16 lg:pt-8 min-w-0">
        {children}
      </main>
    </div>
  )
}

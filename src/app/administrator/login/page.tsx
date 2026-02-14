'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Credenciales incorrectas')
      }

      router.push('/administrator/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error de autenticación')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-negro text-crudo flex items-center justify-center font-black text-2xl mx-auto mb-3">
            T
          </div>
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-2xl font-bold uppercase">
            Tricholand Admin
          </h1>
          <p className="text-sm text-marron-claro mt-1">Panel de administración</p>
        </div>

        <form onSubmit={handleLogin} className="bg-blanco border border-linea p-6 space-y-4">
          <div>
            <label className="block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-linea text-sm focus:outline-none focus:border-naranja transition-colors"
              placeholder="admin@tricholand.com"
            />
          </div>

          <div>
            <label className="block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-linea text-sm focus:outline-none focus:border-naranja transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-negro text-crudo font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-marron transition-colors disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Acceder'}
          </button>
        </form>

        <p className="text-center text-xs text-marron-claro mt-4">
          Acceso restringido a personal autorizado
        </p>
      </div>
    </div>
  )
}

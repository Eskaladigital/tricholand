import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-crudo flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-archivo-narrow)] text-8xl font-bold text-naranja mb-4">
          404
        </h1>
        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl font-bold uppercase mb-4">
          Página no encontrada
        </h2>
        <p className="text-marron-claro mb-8 max-w-md mx-auto">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <Link
          href="/es"
          className="inline-flex bg-naranja text-blanco px-6 py-3 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-marron transition-colors"
        >
          Volver al inicio →
        </Link>
      </div>
    </div>
  )
}

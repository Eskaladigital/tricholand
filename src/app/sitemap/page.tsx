import type { Metadata } from 'next'
import Link from 'next/link'
import { getSitemapUrls } from '@/lib/sitemap-urls'

export const metadata: Metadata = {
  title: 'Mapa del sitio',
  description: 'Índice de todas las páginas de Tricholand',
  robots: 'index, follow',
}

export default function SitemapPage() {
  const urls = getSitemapUrls()

  return (
    <main className="min-h-screen bg-crudo px-5 lg:px-8 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase mb-2">
          Mapa del sitio
        </h1>
        <p className="text-marron-claro mb-8">
          Índice de todas las páginas de Tricholand. También disponible en{' '}
          <a
            href="/sitemap.xml"
            className="text-naranja hover:underline font-medium"
          >
            sitemap.xml
          </a>{' '}
          para buscadores.
        </p>

        <ul className="space-y-2">
          {urls.map(({ url, label }) => (
            <li key={url}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-negro hover:text-naranja hover:underline break-all text-sm"
              >
                {url}
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-12 text-sm text-marron-claro">
          <Link href="/es" className="text-naranja hover:underline">
            ← Volver al inicio
          </Link>
        </p>
      </div>
    </main>
  )
}

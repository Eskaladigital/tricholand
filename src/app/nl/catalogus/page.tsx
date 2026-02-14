import type { Metadata } from 'next'
import Link from 'next/link'
import { getFullPath, getAlternatesMetadata } from '@/lib/i18n/paths'
import { CatalogGrid } from '@/components/varieties/CatalogGrid'

export const metadata: Metadata = {
  title: 'Groothandel cactus catalogus',
  description: 'Volledige catalogus van Trichocereus en kolomvormige cactussen voor groothandel. Filter op variëteit, maat en beschikbaarheid.',
  alternates: getAlternatesMetadata('nl', 'catalog'),
}

export default function CatalogoPage() {
  return (
    <section className="px-5 lg:px-8 py-16">
      <div className="mb-8 pb-4 border-b-2 border-negro flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            Catalogus
          </h1>
          <p className="text-marron-claro mt-2">
            Productie beschikbaar voor groothandel · Minimale bestelling 100 stuks
          </p>
        </div>
        <Link
          href={getFullPath('nl', 'contact')}
          className="bg-naranja text-blanco px-5 py-2.5 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-marron transition-colors shrink-0"
        >
          Offerte aanvragen →
        </Link>
      </div>

      <CatalogGrid locale="nl" />
    </section>
  )
}

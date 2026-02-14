import type { Metadata } from 'next'
import Link from 'next/link'
import { getFullPath, getAlternatesMetadata } from '@/lib/i18n/paths'
import { CatalogGrid } from '@/components/varieties/CatalogGrid'

export const metadata: Metadata = {
  title: 'Catalogo cactus all\'ingrosso',
  description: 'Catalogo completo di Trichocereus e cactacee colonnari per vendita all\'ingrosso. Filtra per varietà, dimensione e disponibilità.',
  alternates: getAlternatesMetadata('it', 'catalog'),
}

export default function CatalogoPage() {
  return (
    <section className="px-5 lg:px-8 py-16">
      <div className="mb-8 pb-4 border-b-2 border-negro flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            Catalogo
          </h1>
          <p className="text-marron-claro mt-2">
            Produzione disponibile per vendita all&apos;ingrosso · Ordine minimo 100 pezzi
          </p>
        </div>
        <Link
          href={getFullPath('it', 'contact')}
          className="bg-naranja text-blanco px-5 py-2.5 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-marron transition-colors shrink-0"
        >
          Richiedi preventivo →
        </Link>
      </div>

      <CatalogGrid locale="it" />
    </section>
  )
}

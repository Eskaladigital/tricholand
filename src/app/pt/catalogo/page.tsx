import type { Metadata } from 'next'
import Link from 'next/link'
import { getFullPath, getAlternatesMetadata } from '@/lib/i18n/paths'
import { CatalogGrid } from '@/components/varieties/CatalogGrid'
import { getAllVarietiesForLocale } from '@/content/varieties/es/data'
import { getDictionary } from '@/lib/i18n'

const LOCALE = 'pt'

export const metadata: Metadata = {
  title: 'Catálogo de cactos por atacado',
  description: 'Catálogo completo de Trichocereus e cactáceas colunares para venda por atacado. Filtre por variedade, tamanho e disponibilidade.',
  alternates: getAlternatesMetadata(LOCALE, 'catalog'),
}

export default function CatalogoPage() {
  const varieties = getAllVarietiesForLocale(LOCALE)
  const t = getDictionary(LOCALE)

  return (
    <section className="px-5 lg:px-8 py-16">
      <div className="mb-8 pb-4 border-b-2 border-negro flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            Catálogo
          </h1>
          <p className="text-marron-claro mt-2">
            Produção disponível para venda por atacado · Pedido mínimo 100 unidades
          </p>
        </div>
        <Link
          href={getFullPath('pt', 'contact')}
          className="bg-naranja text-blanco px-5 py-2.5 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-marron transition-colors shrink-0"
        >
          Solicitar orçamento →
        </Link>
      </div>

      <CatalogGrid locale={LOCALE} varieties={varieties} t={t.catalog} />
    </section>
  )
}

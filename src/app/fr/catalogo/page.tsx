import type { Metadata } from 'next'
import Link from 'next/link'
import { CatalogGrid } from '@/components/varieties/CatalogGrid'

export const metadata: Metadata = {
  title: 'Catalogue cactus en gros',
  description: 'Catalogue complet de Trichocereus et cactacées colonnaires pour vente en gros. Filtrez par variété, taille et disponibilité.',
}

export default function CatalogoPage() {
  return (
    <section className="px-5 lg:px-8 py-16">
      <div className="mb-8 pb-4 border-b-2 border-negro flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            Catalogue
          </h1>
          <p className="text-marron-claro mt-2">
            Production disponible pour vente en gros · Commande minimum 100 unités
          </p>
        </div>
        <Link
          href="/fr/contacto"
          className="bg-naranja text-blanco px-5 py-2.5 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-marron transition-colors shrink-0"
        >
          Demander un devis →
        </Link>
      </div>

      <CatalogGrid />
    </section>
  )
}

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { varietiesES } from '@/content/varieties/es/data'
import { getFullPath, getAlternatesMetadata } from '@/lib/i18n/paths'

export const metadata: Metadata = {
  title: 'Trichocereus variëteiten',
  description: 'Ontdek alle Trichocereus-variëteiten die we kweken: Pachanoi, Peruvianus, Bridgesii, Terscheckii, Macrogonus, Spachianus en meer.',
  alternates: getAlternatesMetadata('nl', 'varieties'),
}

const stockLabels = {
  available: '● Beschikbaar',
  limited: '● Beperkt',
  out_of_stock: '● Uitverkocht',
}

const stockColors = {
  available: 'text-verde',
  limited: 'text-terracota',
  out_of_stock: 'text-red-600',
}

export default function VariedadesPage() {
  return (
    <section className="px-5 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-8 pb-4 border-b-2 border-negro">
        <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
          Variëteiten
        </h1>
        <p className="text-marron-claro mt-2">
          Alle Trichocereus- en cactusvariëteiten die we produceren in onze kwekerij in Murcia
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {varietiesES.map((v) => (
          <Link
            key={v.slug}
            href={getFullPath('nl', 'varieties', v.slug)}
            className="group bg-blanco border border-linea hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
          >
            {/* Image */}
            <div className="relative overflow-hidden">
              <Image
                src={v.image}
                alt={v.imageAlt}
                width={600}
                height={240}
                className="w-full h-[240px] object-cover group-hover:scale-[1.04] transition-transform duration-400"
              />
              <span className="absolute top-3 left-3 bg-negro text-blanco px-2.5 py-1 font-[family-name:var(--font-archivo-narrow)] text-[0.72rem] font-semibold tracking-wide">
                {v.code}
              </span>
            </div>

            {/* Body */}
            <div className="px-5 py-4">
              <h2 className="font-[family-name:var(--font-archivo-narrow)] text-xl font-bold group-hover:text-naranja transition-colors">
                {v.name}
              </h2>
              <p className="text-sm text-marron-claro mt-1">
                {v.commonName} · <em>{v.scientificName}</em>
              </p>
            </div>

            {/* Footer */}
            <div className="px-5 py-3 bg-crudo flex justify-between items-center text-sm border-t border-linea">
              <span className={`font-semibold ${stockColors[v.stock]}`}>
                {stockLabels[v.stock]}
              </span>
              <span className="text-marron-claro">{v.sizeRange}</span>
              <span className="font-[family-name:var(--font-archivo-narrow)] text-[0.72rem] text-marron font-bold uppercase tracking-wide group-hover:text-naranja transition-colors">
                Fiche →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

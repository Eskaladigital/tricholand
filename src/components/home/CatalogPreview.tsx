import Image from 'next/image'
import Link from 'next/link'
import type { Dictionary } from '@/lib/i18n/types'

interface CatalogPreviewProps {
  locale: string
  dict: Dictionary
}

const products = [
  {
    slug: 'trichocereus-pachanoi',
    code: 'TRI-PAC',
    name: 'T. Pachanoi',
    sub: 'San Pedro · Echinopsis pachanoi',
    image: 'https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=600&q=80',
    stock: 'available' as const,
    size: '10–50 cm',
  },
  {
    slug: 'trichocereus-peruvianus',
    code: 'TRI-PER',
    name: 'T. Peruvianus',
    sub: 'Antorcha Peruana',
    image: 'https://images.unsplash.com/photo-1446071103084-c257b5f70672?w=600&q=80',
    stock: 'available' as const,
    size: '10–40 cm',
  },
  {
    slug: 'trichocereus-bridgesii',
    code: 'TRI-BRI',
    name: 'T. Bridgesii',
    sub: 'Achuma · Wachuma',
    image: 'https://images.unsplash.com/photo-1485841890310-6a055c88698a?w=600&q=80',
    stock: 'limited' as const,
    size: '10–30 cm',
  },
  {
    slug: 'trichocereus-pasacana-terscheckii',
    code: 'TRI-TER',
    name: 'T. Terscheckii',
    sub: 'Cardón Grande',
    image: 'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=600&q=80',
    stock: 'available' as const,
    size: '20–100 cm',
  },
  {
    slug: 'trichocereus-macrogonus',
    code: 'TRI-MAC',
    name: 'T. Macrogonus',
    sub: 'San Pedro Azul',
    image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&q=80',
    stock: 'available' as const,
    size: '15–35 cm',
  },
  {
    slug: 'trichocereus-spachianus',
    code: 'TRI-SPA',
    name: 'T. Spachianus',
    sub: 'Antorcha Dorada',
    image: 'https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?w=600&q=80',
    stock: 'limited' as const,
    size: '10–30 cm',
  },
]

export function CatalogPreview({ locale, dict }: CatalogPreviewProps) {
  return (
    <section className="px-5 lg:px-8 py-16">
      {/* Section header */}
      <div className="flex justify-between items-center mb-8 pb-4 border-b-2 border-negro">
        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-[1.6rem] font-bold uppercase">
          {dict.catalog.title}
        </h2>
        <Link
          href={`/${locale}/variedades`}
          className="font-[family-name:var(--font-archivo-narrow)] text-sm text-naranja font-bold uppercase tracking-wide hover:underline"
        >
          {dict.catalog.viewAll}
        </Link>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.slug}
            href={`/${locale}/variedades/${product.slug}`}
            className="group bg-blanco border border-linea hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
          >
            {/* Image */}
            <div className="relative overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={210}
                className="w-full h-[210px] object-cover group-hover:scale-[1.04] transition-transform duration-400"
              />
              <span className="absolute top-3 left-3 bg-negro text-blanco px-2.5 py-1 font-[family-name:var(--font-archivo-narrow)] text-[0.72rem] font-semibold tracking-wide">
                {product.code}
              </span>
            </div>

            {/* Body */}
            <div className="px-5 py-4">
              <h3 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold">
                {product.name}
              </h3>
              <p className="text-sm text-marron-claro mt-0.5">{product.sub}</p>
            </div>

            {/* Footer */}
            <div className="px-5 py-3 bg-crudo flex justify-between items-center text-sm border-t border-linea">
              <span
                className={`font-semibold ${
                  product.stock === 'available' ? 'text-verde' : 'text-terracota'
                }`}
              >
                ●{' '}
                {product.stock === 'available'
                  ? dict.catalog.available
                  : dict.catalog.limited}
              </span>
              <span>{product.size}</span>
              <span className="font-[family-name:var(--font-archivo-narrow)] text-[0.72rem] text-marron font-bold uppercase tracking-wide group-hover:text-naranja transition-colors">
                {dict.catalog.viewSheet}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

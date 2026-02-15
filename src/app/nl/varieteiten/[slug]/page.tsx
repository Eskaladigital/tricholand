import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getVarietyForLocale, getAllVarietySlugs } from '@/content/varieties/es/data'
import { getFullPath, getAlternatesMetadata } from '@/lib/i18n/paths'
import { getDictionary } from '@/lib/i18n'

const LOCALE = 'nl'

export async function generateStaticParams() {
  return getAllVarietySlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const variety = getVarietyForLocale(slug, LOCALE)
  if (!variety) return { title: 'Variëteit niet gevonden' }

  return {
    title: `${variety.name} — ${variety.commonName}`,
    description: variety.description.slice(0, 160),
    alternates: getAlternatesMetadata(LOCALE, 'varieties', slug),
    openGraph: {
      title: `${variety.name} | Tricholand`,
      description: variety.description.slice(0, 160),
      images: [variety.image],
    },
  }
}

export default async function VarietyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const variety = getVarietyForLocale(slug, LOCALE)
  const t = getDictionary(LOCALE)

  if (!variety) notFound()

  const stockColors = {
    available: 'text-verde',
    limited: 'text-terracota',
    out_of_stock: 'text-red-600',
  }

  const stockLabels = {
    available: t.variety.stockAvailable,
    limited: t.variety.stockLimited,
    out_of_stock: t.variety.stockOutOfStock,
  }

  return (
    <article className="pb-16">
      {/* Hero */}
      <div className="relative h-[40vh] min-h-[300px] lg:h-[50vh]">
        <Image
          src={variety.image}
          alt={variety.imageAlt}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-negro/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-5 lg:px-8 pb-8">
          <span className="inline-block bg-negro text-blanco px-3 py-1.5 font-[family-name:var(--font-archivo-narrow)] text-xs font-semibold tracking-wide mb-3">
            {variety.code}
          </span>
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl lg:text-5xl font-bold text-blanco uppercase">
            {variety.name}
          </h1>
          <p className="font-[family-name:var(--font-archivo-narrow)] text-lg text-blanco/80 mt-1">
            {variety.commonName} · <em>{variety.scientificName}</em>
          </p>
        </div>
      </div>

      <div className="px-5 lg:px-8 max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="py-4 text-sm text-marron-claro">
          <Link href={`/${LOCALE}`} className="hover:text-naranja transition-colors">{t.variety.home}</Link>
          <span className="mx-2">›</span>
          <Link href={getFullPath(LOCALE, 'varieties')} className="hover:text-naranja transition-colors">{t.nav.varieties}</Link>
          <span className="mx-2">›</span>
          <span className="text-negro font-medium">{variety.name}</span>
        </nav>

        {/* Info bar */}
        <div className="flex flex-wrap gap-6 items-center py-4 mb-8 border-y border-linea">
          <span className={`font-semibold ${stockColors[variety.stock]}`}>
            {stockLabels[variety.stock]}
          </span>
          <span className="text-sm text-marron-claro">
            {t.variety.sizes}: <strong className="text-negro">{variety.sizeRange}</strong>
          </span>
          <Link
            href={getFullPath(LOCALE, 'contact')}
            className="ml-auto bg-naranja text-blanco px-5 py-2.5 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-marron transition-colors"
          >
            {t.variety.requestQuote}
          </Link>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
          {/* Description */}
          <div>
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-xl font-bold uppercase mb-4 pb-2 border-b-2 border-negro">
              {t.variety.description}
            </h2>
            <p className="text-base leading-relaxed text-marron-claro">
              {variety.description}
            </p>

            {/* Highlights */}
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-xl font-bold uppercase mt-10 mb-4 pb-2 border-b-2 border-negro">
              {t.variety.highlightedFeatures}
            </h2>
            <ul className="space-y-3">
              {variety.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-naranja font-bold mt-0.5">→</span>
                  <span className="text-marron-claro">{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar: Care guide */}
          <aside>
            <div className="bg-blanco border border-linea p-6 sticky top-8">
              <h3 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold uppercase mb-4 pb-2 border-b border-linea">
                {t.variety.careGuide}
              </h3>

              <div className="space-y-5">
                <div>
                  <h4 className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase text-naranja mb-1">
                    {t.variety.light}
                  </h4>
                  <p className="text-sm text-marron-claro leading-relaxed">{variety.care.light}</p>
                </div>
                <div>
                  <h4 className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase text-naranja mb-1">
                    {t.variety.water}
                  </h4>
                  <p className="text-sm text-marron-claro leading-relaxed">{variety.care.water}</p>
                </div>
                <div>
                  <h4 className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase text-naranja mb-1">
                    {t.variety.temperature}
                  </h4>
                  <p className="text-sm text-marron-claro leading-relaxed">{variety.care.temperature}</p>
                </div>
                <div>
                  <h4 className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase text-naranja mb-1">
                    {t.variety.soil}
                  </h4>
                  <p className="text-sm text-marron-claro leading-relaxed">{variety.care.soil}</p>
                </div>
              </div>

              <Link
                href={getFullPath(LOCALE, 'contact')}
                className="block mt-6 bg-negro text-crudo text-center py-3 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-marron transition-colors"
              >
                {t.variety.checkAvailability}
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </article>
  )
}

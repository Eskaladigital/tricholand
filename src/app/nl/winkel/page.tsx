import type { Metadata } from 'next'
import { getActiveProductsForLocale } from '@/lib/actions/products'
import { ShopGrid } from '@/components/shop/ShopGrid'
import { CartButton } from '@/components/shop/CartButton'
import { getAlternatesMetadata } from '@/lib/i18n/paths'
import { getDictionary } from '@/lib/i18n'

const LOCALE = 'nl'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'B2B Winkel — Groothandelslotes',
  description: 'Tricholand B2B online winkel. Koop Trichocereus-lotes in groothandel met zichtbare prijzen. Dien uw bestelling in en ontvang binnen 24u een offerte.',
  alternates: getAlternatesMetadata(LOCALE, 'shop'),
}

export default async function TiendaPage() {
  const products = await getActiveProductsForLocale(LOCALE)
  const t = getDictionary(LOCALE)

  return (
    <>
      <section className="px-5 lg:px-8 py-16">
        <div className="mb-8 pb-4 border-b-2 border-negro">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
                B2B Winkel
              </h1>
              <p className="text-marron-claro mt-2">
                Groothandelslotes · Prijzen excl. btw · Fytosanitair paspoort inbegrepen
              </p>
            </div>
            <div className="bg-verde-claro text-verde px-4 py-2 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide">
              Levering in heel EU + VK
            </div>
          </div>
        </div>

        {/* B2B exclusief bericht — goed zichtbaar */}
        <div className="mb-8 p-6 bg-amber-50 border-2 border-amber-400">
          <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold uppercase text-amber-900 mb-2">
            ⚠️ {t.shop.professionalOnlyTitle}
          </h2>
          <p className="text-sm text-amber-900/90 leading-relaxed">
            {t.shop.professionalOnlyNotice}
          </p>
        </div>

        {/* Info bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: '📦', text: 'Voeg lotes toe aan uw bestelling en stuur ons het verzoek' },
            { icon: '📋', text: 'Wij beoordelen uw bestelling en sturen u de definitieve offerte' },
            { icon: '💳', text: 'Wij sturen u een veilige betaallink (Stripe / Redsys)' },
            { icon: '⏱️', text: t.shop.preparationTime },
          ].map((step, i) => (
            <div key={i} className="bg-blanco border border-linea p-4 flex items-start gap-3">
              <span className="text-xl">{step.icon}</span>
              <span className="text-sm text-marron-claro">{step.text}</span>
            </div>
          ))}
        </div>

        <ShopGrid products={products} locale={LOCALE} t={t.shop} />
      </section>

      <CartButton locale="nl" />
    </>
  )
}

import type { Metadata } from 'next'
import { getActiveProductsForLocale } from '@/content/shop/products-demo'
import { ShopGrid } from '@/components/shop/ShopGrid'
import { CartButton } from '@/components/shop/CartButton'
import { getAlternatesMetadata } from '@/lib/i18n/paths'
import { getDictionary } from '@/lib/i18n'

const LOCALE = 'de'

export const metadata: Metadata = {
  title: 'B2B-Shop — Großhandelslose',
  description: 'Tricholand B2B-Online-Shop. Kaufen Sie Trichocereus-Lose im Großhandel mit sichtbaren Preisen. Senden Sie Ihre Bestellung und erhalten Sie innerhalb von 24h ein Angebot.',
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
                B2B-Shop
              </h1>
              <p className="text-marron-claro mt-2">
                Großhandelslose · Preise zzgl. MwSt. · Pflanzenpass inklusive
              </p>
            </div>
            <div className="bg-verde-claro text-verde px-4 py-2 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide">
              Versand in die gesamte EU + UK
            </div>
          </div>
        </div>

        {/* Info bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { icon: '📦', text: 'Fügen Sie Lose zu Ihrer Bestellung hinzu und senden Sie uns die Anfrage' },
            { icon: '📋', text: 'Wir prüfen Ihre Bestellung und senden Ihnen das endgültige Angebot' },
            { icon: '💳', text: 'Wir senden Ihnen einen sicheren Zahlungslink (Stripe / Redsys)' },
          ].map((step, i) => (
            <div key={i} className="bg-blanco border border-linea p-4 flex items-start gap-3">
              <span className="text-xl">{step.icon}</span>
              <span className="text-sm text-marron-claro">{step.text}</span>
            </div>
          ))}
        </div>

        <ShopGrid products={products} locale={LOCALE} t={t.shop} />
      </section>

      <CartButton locale="de" />
    </>
  )
}

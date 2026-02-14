import type { Metadata } from 'next'
import { getActiveProducts } from '@/content/shop/products-demo'
import { ShopGrid } from '@/components/shop/ShopGrid'
import { CartButton } from '@/components/shop/CartButton'

export const metadata: Metadata = {
  title: 'B2B Winkel — Groothandelslotes',
  description: 'Tricholand B2B online winkel. Koop Trichocereus-lotes in groothandel met zichtbare prijzen. Dien uw bestelling in en ontvang binnen 24u een offerte.',
}

export default function TiendaPage() {
  const products = getActiveProducts()

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

        {/* Info bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { icon: '📦', text: 'Voeg lotes toe aan uw bestelling en stuur ons het verzoek' },
            { icon: '📋', text: 'Wij beoordelen uw bestelling en sturen u de definitieve offerte' },
            { icon: '💳', text: 'Wij sturen u een veilige betaallink (Stripe / Redsys)' },
          ].map((step, i) => (
            <div key={i} className="bg-blanco border border-linea p-4 flex items-start gap-3">
              <span className="text-xl">{step.icon}</span>
              <span className="text-sm text-marron-claro">{step.text}</span>
            </div>
          ))}
        </div>

        <ShopGrid products={products} locale="nl" />
      </section>

      <CartButton locale="nl" />
    </>
  )
}

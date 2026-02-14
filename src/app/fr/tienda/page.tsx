import type { Metadata } from 'next'
import { getActiveProducts } from '@/content/shop/products-demo'
import { ShopGrid } from '@/components/shop/ShopGrid'
import { CartButton } from '@/components/shop/CartButton'

export const metadata: Metadata = {
  title: 'Boutique B2B — Lots en gros',
  description: 'Boutique en ligne B2B Tricholand. Achetez des lots de Trichocereus en gros avec prix visibles. Soumettez votre commande et recevez un devis sous 24h.',
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
                Boutique B2B
              </h1>
              <p className="text-marron-claro mt-2">
                Lots en gros · Prix HT · Passeport phyto inclus
              </p>
            </div>
            <div className="bg-verde-claro text-verde px-4 py-2 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide">
              Livraison dans toute l&apos;UE + UK
            </div>
          </div>
        </div>

        {/* Info bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { icon: '📦', text: 'Ajoutez des lots à votre commande et envoyez-nous la demande' },
            { icon: '📋', text: 'Nous examinons votre commande et vous envoyons le devis final' },
            { icon: '💳', text: 'Nous vous envoyons un lien de paiement sécurisé (Stripe / Redsys)' },
          ].map((step, i) => (
            <div key={i} className="bg-blanco border border-linea p-4 flex items-start gap-3">
              <span className="text-xl">{step.icon}</span>
              <span className="text-sm text-marron-claro">{step.text}</span>
            </div>
          ))}
        </div>

        <ShopGrid products={products} locale="fr" />
      </section>

      <CartButton locale="fr" />
    </>
  )
}

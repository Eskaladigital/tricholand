import type { Metadata } from 'next'
import { getActiveProducts } from '@/content/shop/products-demo'
import { ShopGrid } from '@/components/shop/ShopGrid'
import { CartButton } from '@/components/shop/CartButton'

export const metadata: Metadata = {
  title: 'Tienda B2B — Lotes al por mayor',
  description: 'Tienda online B2B de Tricholand. Compra lotes de Trichocereus al por mayor con precios visibles. Solicita tu pedido y recibe presupuesto en 24h.',
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
                Tienda B2B
              </h1>
              <p className="text-marron-claro mt-2">
                Lotes al por mayor · Precios sin IVA · Pasaporte fito incluido
              </p>
            </div>
            <div className="bg-verde-claro text-verde px-4 py-2 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide">
              Envío a toda la UE + UK
            </div>
          </div>
        </div>

        {/* Info bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { icon: '📦', text: 'Añade lotes a tu pedido y envíanos la solicitud' },
            { icon: '📋', text: 'Revisamos tu pedido y te enviamos presupuesto final' },
            { icon: '💳', text: 'Te enviamos link de pago seguro (Stripe / Redsys)' },
          ].map((step, i) => (
            <div key={i} className="bg-blanco border border-linea p-4 flex items-start gap-3">
              <span className="text-xl">{step.icon}</span>
              <span className="text-sm text-marron-claro">{step.text}</span>
            </div>
          ))}
        </div>

        <ShopGrid products={products} locale="en" />
      </section>

      <CartButton locale="en" />
    </>
  )
}

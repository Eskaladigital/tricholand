import type { Metadata } from 'next'
import { OrderForm } from '@/components/shop/OrderForm'
import { CartButton } from '@/components/shop/CartButton'
import { getAlternatesMetadata } from '@/lib/i18n/paths'

export const metadata: Metadata = {
  title: 'Bestelverzoek',
  description: 'Bekijk en dien uw B2B-bestelverzoek in. U ontvangt binnen 24u de definitieve offerte.',
  alternates: getAlternatesMetadata('nl', 'shopOrder'),
}

export default function PedidoPage() {
  return (
    <>
      <section className="px-5 lg:px-8 py-16 max-w-5xl mx-auto">
        <div className="mb-8 pb-4 border-b-2 border-negro">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            Bestelverzoek
          </h1>
          <p className="text-marron-claro mt-2">
            Bekijk uw bestelling, vul uw gegevens in en stuur ons het verzoek. Wij sturen u binnen 24u de definitieve offerte.
          </p>
        </div>

        <OrderForm locale="nl" />
      </section>

      <CartButton locale="nl" />
    </>
  )
}

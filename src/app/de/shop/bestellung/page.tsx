import type { Metadata } from 'next'
import { OrderForm } from '@/components/shop/OrderForm'
import { CartButton } from '@/components/shop/CartButton'
import { getAlternatesMetadata } from '@/lib/i18n/paths'

export const metadata: Metadata = {
  title: 'Bestellanfrage',
  description: 'Überprüfen und senden Sie Ihre B2B-Bestellanfrage. Sie erhalten innerhalb von 24h das endgültige Angebot.',
  alternates: getAlternatesMetadata('de', 'shopOrder'),
}

export default function PedidoPage() {
  return (
    <>
      <section className="px-5 lg:px-8 py-16 max-w-5xl mx-auto">
        <div className="mb-8 pb-4 border-b-2 border-negro">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            Bestellanfrage
          </h1>
          <p className="text-marron-claro mt-2">
            Überprüfen Sie Ihre Bestellung, ergänzen Sie Ihre Daten und senden Sie uns die Anfrage. Wir senden Ihnen innerhalb von 24h das endgültige Angebot.
          </p>
        </div>

        <OrderForm locale="de" />
      </section>

      <CartButton locale="de" />
    </>
  )
}

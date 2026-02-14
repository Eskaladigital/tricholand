import type { Metadata } from 'next'
import { OrderForm } from '@/components/shop/OrderForm'
import { CartButton } from '@/components/shop/CartButton'
import { getAlternatesMetadata } from '@/lib/i18n/paths'

export const metadata: Metadata = {
  title: 'Richiesta d\'ordine',
  description: 'Verifica e invia la tua richiesta d\'ordine B2B. Riceverai il preventivo finale entro 24 ore.',
  alternates: getAlternatesMetadata('it', 'shopOrder'),
}

export default function PedidoPage() {
  return (
    <>
      <section className="px-5 lg:px-8 py-16 max-w-5xl mx-auto">
        <div className="mb-8 pb-4 border-b-2 border-negro">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            Richiesta d&apos;ordine
          </h1>
          <p className="text-marron-claro mt-2">
            Verifica il tuo ordine, completa i tuoi dati e inviaci la richiesta. Ti invieremo il preventivo finale entro 24 ore.
          </p>
        </div>

        <OrderForm locale="it" />
      </section>

      <CartButton locale="it" />
    </>
  )
}

import type { Metadata } from 'next'
import { OrderForm } from '@/components/shop/OrderForm'
import { CartButton } from '@/components/shop/CartButton'

export const metadata: Metadata = {
  title: 'Solicitud de pedido',
  description: 'Revisa y envía tu solicitud de pedido B2B. Recibirás presupuesto final en menos de 24h.',
}

export default function PedidoPage() {
  return (
    <>
      <section className="px-5 lg:px-8 py-16 max-w-5xl mx-auto">
        <div className="mb-8 pb-4 border-b-2 border-negro">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            Solicitud de pedido
          </h1>
          <p className="text-marron-claro mt-2">
            Revisa tu pedido, completa tus datos y envíanos la solicitud. Te enviaremos presupuesto final en menos de 24h.
          </p>
        </div>

        <OrderForm locale="it" />
      </section>

      <CartButton locale="it" />
    </>
  )
}

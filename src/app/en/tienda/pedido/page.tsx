import type { Metadata } from 'next'
import { OrderForm } from '@/components/shop/OrderForm'
import { CartButton } from '@/components/shop/CartButton'

export const metadata: Metadata = {
  title: 'Order request',
  description: 'Review and submit your B2B order request. You will receive a final quote within 24h.',
}

export default function PedidoPage() {
  return (
    <>
      <section className="px-5 lg:px-8 py-16 max-w-5xl mx-auto">
        <div className="mb-8 pb-4 border-b-2 border-negro">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            Order request
          </h1>
          <p className="text-marron-claro mt-2">
            Review your order, complete your details and send us the request. We will send you the final quote within 24h.
          </p>
        </div>

        <OrderForm locale="en" />
      </section>

      <CartButton locale="en" />
    </>
  )
}

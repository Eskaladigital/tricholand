import type { Metadata } from 'next'
import { OrderForm } from '@/components/shop/OrderForm'
import { CartButton } from '@/components/shop/CartButton'
import { getAlternatesMetadata } from '@/lib/i18n/paths'

export const metadata: Metadata = {
  title: 'Pedido',
  description: 'Verifique e envie o seu pedido B2B. Receberá o orçamento final em menos de 24 horas.',
  alternates: getAlternatesMetadata('pt', 'shopOrder'),
}

export default function PedidoPage() {
  return (
    <>
      <section className="px-5 lg:px-8 py-16 max-w-5xl mx-auto">
        <div className="mb-8 pb-4 border-b-2 border-negro">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            Pedido
          </h1>
          <p className="text-marron-claro mt-2">
            Verifique o seu pedido, complete os seus dados e envie-nos o pedido. Enviaremos o orçamento final em menos de 24 horas.
          </p>
        </div>

        <OrderForm locale="pt" />
      </section>

      <CartButton locale="pt" />
    </>
  )
}

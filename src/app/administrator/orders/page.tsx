import { Suspense } from 'react'
import { getOrdersList } from '@/lib/actions/orders'
import { OrdersInbox } from '@/components/admin/OrdersInbox'

export default async function OrdersListPage() {
  const orders = await getOrdersList()

  return (
    <Suspense fallback={<p className="text-sm text-marron-claro">Cargando pedidos…</p>}>
      <OrdersInbox orders={orders} />
    </Suspense>
  )
}

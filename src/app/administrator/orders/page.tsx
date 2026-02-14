import Link from 'next/link'
import { getOrdersList } from '@/lib/actions/orders'
import { formatPrice } from '@/types/shop'

const statusConfig: Record<string, { label: string; bg: string; text: string }> = {
  pending: { label: 'Pendiente', bg: 'bg-yellow-100', text: 'text-yellow-700' },
  reviewing: { label: 'Revisando', bg: 'bg-orange-100', text: 'text-orange-700' },
  quoted: { label: 'Presupuestado', bg: 'bg-blue-100', text: 'text-blue-700' },
  payment_pending: { label: 'Esperando pago', bg: 'bg-purple-100', text: 'text-purple-700' },
  paid: { label: 'Pagado', bg: 'bg-green-100', text: 'text-green-700' },
  preparing: { label: 'Preparando', bg: 'bg-teal-100', text: 'text-teal-700' },
  shipped: { label: 'Enviado', bg: 'bg-cyan-100', text: 'text-cyan-700' },
  delivered: { label: 'Entregado', bg: 'bg-gray-100', text: 'text-gray-600' },
  cancelled: { label: 'Cancelado', bg: 'bg-red-100', text: 'text-red-600' },
  refunded: { label: 'Reembolsado', bg: 'bg-red-50', text: 'text-red-500' },
}

export default async function OrdersListPage() {
  const orders = await getOrdersList()
  const pendingCount = orders.filter((o) => o.status === 'pending').length

  return (
    <>
        <div className="mb-8">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            Pedidos
          </h1>
          <p className="text-sm text-marron-claro mt-1">
            {orders.length} pedidos · {pendingCount} pendientes de revisión
          </p>
        </div>

        <div className="bg-blanco border border-linea overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-crudo border-b border-linea">
                  <th className="text-left px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">Pedido</th>
                  <th className="text-left px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">Fecha</th>
                  <th className="text-left px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">Cliente</th>
                  <th className="text-left px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">País</th>
                  <th className="text-center px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">Items</th>
                  <th className="text-right px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">Subtotal</th>
                  <th className="text-center px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">Estado</th>
                  <th className="text-center px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">Acción</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-marron-claro">
                      No hay pedidos. Los pedidos aparecerán aquí cuando los clientes envíen solicitudes desde la tienda.
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => {
                    const sc = statusConfig[order.status] ?? { label: order.status, bg: 'bg-gray-100', text: 'text-gray-600' }
                    return (
                      <tr key={order.id} className="border-b border-linea/50 hover:bg-crudo/50 transition-colors">
                        <td className="px-4 py-3 font-bold font-mono text-xs">{order.order_number}</td>
                        <td className="px-4 py-3 text-marron-claro text-xs">
                          {new Date(order.created_at).toLocaleDateString('es-ES')}
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <span className="font-bold block">{order.customer_name}</span>
                            {order.customer_company && (
                              <span className="text-xs text-marron-claro">{order.customer_company}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">{order.customer_country}</td>
                        <td className="px-4 py-3 text-center">{order.items_count}</td>
                        <td className="px-4 py-3 text-right font-bold">{formatPrice(order.subtotal_cents)}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-2 py-0.5 text-xs font-bold uppercase ${sc.bg} ${sc.text}`}>
                            {sc.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <Link href={`/administrator/orders/${order.id}`} className="text-naranja font-semibold hover:underline text-xs">
                            Ver
                          </Link>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
    </>
  )
}

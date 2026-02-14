import Link from 'next/link'
import { AdminSidebar } from '@/components/admin/AdminSidebar'

// Demo orders (en producción: Supabase query)
const ordersDemo = [
  {
    id: 'ord_001',
    order_number: 'TRI-2025-0012',
    created_at: '2025-01-20T14:30:00Z',
    status: 'pending' as const,
    customer_name: 'Marco Visser',
    customer_company: 'Garden Center Holanda B.V.',
    customer_email: 'marco@gcholanda.nl',
    customer_country: 'Países Bajos',
    items_count: 3,
    subtotal: '1.450,00 €',
  },
  {
    id: 'ord_002',
    order_number: 'TRI-2025-0011',
    created_at: '2025-01-18T09:15:00Z',
    status: 'quoted' as const,
    customer_name: 'Antonio Fernández',
    customer_company: 'Viveros Mediterráneo S.L.',
    customer_email: 'antonio@vmediterraneo.es',
    customer_country: 'España',
    items_count: 5,
    subtotal: '2.100,00 €',
  },
  {
    id: 'ord_003',
    order_number: 'TRI-2025-0010',
    created_at: '2025-01-15T16:45:00Z',
    status: 'paid' as const,
    customer_name: 'James Williams',
    customer_company: 'Cactus World UK Ltd',
    customer_email: 'james@cactusworld.co.uk',
    customer_country: 'Reino Unido',
    items_count: 2,
    subtotal: '890,00 €',
  },
  {
    id: 'ord_004',
    order_number: 'TRI-2025-0009',
    created_at: '2025-01-12T11:00:00Z',
    status: 'shipped' as const,
    customer_name: 'Pierre Dupont',
    customer_company: 'Jardinerie du Sud',
    customer_email: 'pierre@jardinerie-sud.fr',
    customer_country: 'Francia',
    items_count: 4,
    subtotal: '1.780,00 €',
  },
  {
    id: 'ord_005',
    order_number: 'TRI-2025-0008',
    created_at: '2025-01-10T08:30:00Z',
    status: 'delivered' as const,
    customer_name: 'Hans Müller',
    customer_company: 'Kakteen Garten GmbH',
    customer_email: 'hans@kakteengarten.de',
    customer_country: 'Alemania',
    items_count: 3,
    subtotal: '1.125,00 €',
  },
]

const statusConfig = {
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

export default function OrdersListPage() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            Pedidos
          </h1>
          <p className="text-sm text-marron-claro mt-1">
            {ordersDemo.length} pedidos · {ordersDemo.filter((o) => o.status === 'pending').length} pendientes de revisión
          </p>
        </div>

        {/* Table */}
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
                {ordersDemo.map((order) => {
                  const sc = statusConfig[order.status]
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
                      <td className="px-4 py-3 text-right font-bold">{order.subtotal}</td>
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
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

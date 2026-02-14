import Link from 'next/link'
import { getDashboardStats } from '@/lib/actions/dashboard'
import { formatPrice } from '@/types/shop'

const statusLabels: Record<string, string> = {
  pending: 'Pendiente',
  paid: 'Pagado',
  shipped: 'Enviado',
  quoted: 'Presupuestado',
  delivered: 'Entregado',
}

export default async function DashboardPage() {
  const { stats, recentOrders, recentContacts } = await getDashboardStats()

  return (
    <>
        <div className="mb-8">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            Dashboard
          </h1>
          <p className="text-sm text-marron-claro mt-1">
            Resumen general de Tricholand
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Productos activos', value: stats.products_active, color: 'text-verde' },
            { label: 'Pedidos pendientes', value: stats.orders_pending, color: 'text-naranja' },
            { label: 'Pedidos este mes', value: stats.orders_this_month, color: 'text-negro' },
            { label: 'Contactos nuevos', value: stats.contacts_new, color: 'text-terracota' },
            { label: 'Ingresos este mes', value: formatPrice(stats.revenue_this_month_cents), color: 'text-verde' },
          ].map((stat, i) => (
            <div key={i} className="bg-blanco border border-linea p-5">
              <p className="font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1">
                {stat.label}
              </p>
              <p className={`font-[family-name:var(--font-archivo-narrow)] text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-blanco border border-linea p-6">
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase mb-4 pb-2 border-b border-linea">
              Últimos pedidos
            </h2>
            <div className="space-y-3">
              {recentOrders.length === 0 ? (
                <p className="text-sm text-marron-claro py-4">No hay pedidos recientes.</p>
              ) : (
                recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between py-2 border-b border-linea/50 text-sm">
                    <div>
                      <span className="font-bold">{order.order_number}</span>
                      <span className="text-marron-claro ml-2">
                        {order.customer_company || order.customer_name}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 text-xs font-bold uppercase ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        order.status === 'paid' ? 'bg-green-100 text-green-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {statusLabels[order.status] ?? order.status}
                      </span>
                      <span className="font-bold">{formatPrice(order.total_cents)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
            <Link href="/administrator/orders" className="block mt-4 text-sm text-naranja font-semibold hover:underline">
              Ver todos los pedidos →
            </Link>
          </div>

          <div className="bg-blanco border border-linea p-6">
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase mb-4 pb-2 border-b border-linea">
              Últimos contactos
            </h2>
            <div className="space-y-3">
              {recentContacts.length === 0 ? (
                <p className="text-sm text-marron-claro py-4">No hay contactos recientes.</p>
              ) : (
                recentContacts.map((contact) => (
                  <div key={contact.id} className="flex items-center justify-between py-2 border-b border-linea/50 text-sm">
                    <div>
                      <span className="font-bold">{contact.name}</span>
                      <span className="text-marron-claro ml-2">{contact.country}</span>
                    </div>
                    <span className={`px-2 py-0.5 text-xs font-bold uppercase ${
                      contact.contact_type === 'professional' ? 'bg-naranja/10 text-naranja' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {contact.contact_type === 'professional' ? 'PRO' : 'Particular'}
                    </span>
                  </div>
                ))
              )}
            </div>
            <Link href="/administrator/contacts" className="block mt-4 text-sm text-naranja font-semibold hover:underline">
              Ver todos los contactos →
            </Link>
          </div>
        </div>
    </>
  )
}

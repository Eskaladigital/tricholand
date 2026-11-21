import Link from 'next/link'
import { getDashboardStats } from '@/lib/actions/dashboard'
import { formatPrice, ORDER_STATUS_CLASS, ORDER_STATUS_LABELS, type OrderStatus } from '@/types/shop'
import { getCustomers } from '@/lib/actions/customers'
import { inquiryLabel } from '@/types/contact'

export default async function DashboardPage() {
  const [{ stats, recentOrders, recentContacts }, customers] = await Promise.all([
    getDashboardStats(),
    getCustomers(),
  ])

  const pendingLabel =
    stats.orders_pending === 0 && stats.contacts_new === 0
      ? 'Nada pendiente de revisar'
      : [
          stats.orders_pending > 0 ? `${stats.orders_pending} pedidos por revisar` : null,
          stats.contacts_new > 0 ? `${stats.contacts_new} contactos sin leer` : null,
        ]
          .filter(Boolean)
          .join(' · ')

  const cards = [
    { label: 'Productos activos', value: stats.products_active, color: 'text-verde', href: '/administrator/products' },
    {
      label: 'Pedidos por revisar',
      value: stats.orders_pending,
      color: 'text-naranja',
      href: stats.orders_pending > 0 ? '/administrator/orders?estado=revision' : '/administrator/orders',
    },
    { label: 'Pedidos este mes', value: stats.orders_this_month, color: 'text-negro', href: '/administrator/orders' },
    { label: 'Clientes', value: customers.length, color: 'text-negro', href: '/administrator/customers' },
    {
      label: 'Contactos nuevos',
      value: stats.contacts_new,
      color: 'text-terracota',
      href: stats.contacts_new > 0 ? '/administrator/contacts?estado=new' : '/administrator/contacts',
    },
    { label: 'Ingresos este mes', value: formatPrice(stats.revenue_this_month_cents), color: 'text-verde', href: '/administrator/orders' },
  ]

  return (
    <>
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
          Inicio
        </h1>
        <p className="text-sm text-marron-claro mt-1">{pendingLabel}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {cards.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-blanco border border-linea p-5 hover:border-naranja transition-colors"
          >
            <p className="font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1">
              {stat.label}
            </p>
            <p className={`font-[family-name:var(--font-archivo-narrow)] text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-blanco border border-linea p-6">
          <h2 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase mb-4 pb-2 border-b border-linea">
            Últimos pedidos
          </h2>
          {recentOrders.length === 0 ? (
            <p className="text-sm text-marron-claro py-4">No hay pedidos recientes.</p>
          ) : (
            <div className="divide-y divide-linea/60">
              {recentOrders.map((order) => {
                const status = order.status as OrderStatus
                const label = ORDER_STATUS_LABELS[status] ?? order.status
                const tone = ORDER_STATUS_CLASS[status] ?? 'bg-gray-100 text-gray-600'
                return (
                  <Link
                    key={order.id}
                    href={`/administrator/orders/${order.id}`}
                    className="flex items-center justify-between gap-3 py-2.5 text-sm hover:bg-crudo/70 -mx-2 px-2 transition-colors"
                  >
                    <div className="min-w-0">
                      <span className="font-bold font-mono text-xs">{order.order_number}</span>
                      <span className="block text-marron-claro truncate">
                        {order.customer_company || order.customer_name}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`px-2 py-0.5 text-[10px] font-bold uppercase ${tone}`}>{label}</span>
                      <span className="font-bold">{formatPrice(order.total_cents)}</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
          <Link href="/administrator/orders" className="block mt-4 text-sm text-naranja font-semibold hover:underline">
            Ver todos los pedidos →
          </Link>
        </section>

        <section className="bg-blanco border border-linea p-6">
          <h2 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase mb-4 pb-2 border-b border-linea">
            Últimos contactos
          </h2>
          {recentContacts.length === 0 ? (
            <p className="text-sm text-marron-claro py-4">No hay contactos recientes.</p>
          ) : (
            <div className="divide-y divide-linea/60">
              {recentContacts.map((contact) => (
                <Link
                  key={contact.id}
                  href={`/administrator/contacts/${contact.id}`}
                  className="flex items-center justify-between gap-3 py-2.5 text-sm hover:bg-crudo/70 -mx-2 px-2 transition-colors"
                >
                  <div className="min-w-0">
                    <span className="font-bold">{contact.name}</span>
                    <span className="block text-xs text-marron-claro truncate">
                      {inquiryLabel(contact.inquiry_type)} · {contact.country}
                    </span>
                  </div>
                  <span
                    className={`shrink-0 px-2 py-0.5 text-[10px] font-bold uppercase ${
                      contact.contact_type === 'professional' ? 'bg-naranja/10 text-naranja' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {contact.contact_type === 'professional' ? 'Pro' : 'Particular'}
                  </span>
                </Link>
              ))}
            </div>
          )}
          <Link href="/administrator/contacts" className="block mt-4 text-sm text-naranja font-semibold hover:underline">
            Ver todos los contactos →
          </Link>
        </section>
      </div>
    </>
  )
}

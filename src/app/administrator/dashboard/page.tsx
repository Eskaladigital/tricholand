export default function DashboardPage() {
  // TODO: Datos reales de Supabase
  const stats = {
    products_active: 7,
    orders_pending: 3,
    orders_this_month: 12,
    contacts_new: 5,
    revenue_this_month: '4.250,00 €',
  }

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

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Productos activos', value: stats.products_active, color: 'text-verde' },
            { label: 'Pedidos pendientes', value: stats.orders_pending, color: 'text-naranja' },
            { label: 'Pedidos este mes', value: stats.orders_this_month, color: 'text-negro' },
            { label: 'Contactos nuevos', value: stats.contacts_new, color: 'text-terracota' },
            { label: 'Ingresos este mes', value: stats.revenue_this_month, color: 'text-verde' },
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

        {/* Quick actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent orders */}
          <div className="bg-blanco border border-linea p-6">
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase mb-4 pb-2 border-b border-linea">
              Últimos pedidos
            </h2>
            <div className="space-y-3">
              {[
                { number: 'TRI-2025-0012', customer: 'Garden Center Holanda B.V.', status: 'pending', total: '1.450,00 €' },
                { number: 'TRI-2025-0011', customer: 'Viveros Mediterráneo S.L.', status: 'paid', total: '2.100,00 €' },
                { number: 'TRI-2025-0010', customer: 'Cactus World UK Ltd', status: 'shipped', total: '890,00 €' },
              ].map((order) => (
                <div key={order.number} className="flex items-center justify-between py-2 border-b border-linea/50 text-sm">
                  <div>
                    <span className="font-bold">{order.number}</span>
                    <span className="text-marron-claro ml-2">{order.customer}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 text-xs font-bold uppercase ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      order.status === 'paid' ? 'bg-green-100 text-green-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {order.status === 'pending' ? 'Pendiente' : order.status === 'paid' ? 'Pagado' : 'Enviado'}
                    </span>
                    <span className="font-bold">{order.total}</span>
                  </div>
                </div>
              ))}
            </div>
            <a href="/administrator/orders" className="block mt-4 text-sm text-naranja font-semibold hover:underline">
              Ver todos los pedidos →
            </a>
          </div>

          {/* Recent contacts */}
          <div className="bg-blanco border border-linea p-6">
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase mb-4 pb-2 border-b border-linea">
              Últimos contactos
            </h2>
            <div className="space-y-3">
              {[
                { name: 'Marco Visser', type: 'professional', inquiry: 'quote_catalog', country: 'Países Bajos' },
                { name: 'Pierre Dupont', type: 'professional', inquiry: 'shipping_info', country: 'Francia' },
                { name: 'Carlos Gómez', type: 'particular', inquiry: 'purchase', country: 'España' },
              ].map((contact, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-linea/50 text-sm">
                  <div>
                    <span className="font-bold">{contact.name}</span>
                    <span className="text-marron-claro ml-2">{contact.country}</span>
                  </div>
                  <span className={`px-2 py-0.5 text-xs font-bold uppercase ${
                    contact.type === 'professional' ? 'bg-naranja/10 text-naranja' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {contact.type === 'professional' ? 'PRO' : 'Particular'}
                  </span>
                </div>
              ))}
            </div>
            <a href="/administrator/contacts" className="block mt-4 text-sm text-naranja font-semibold hover:underline">
              Ver todos los contactos →
            </a>
          </div>
        </div>
    </>
  )
}

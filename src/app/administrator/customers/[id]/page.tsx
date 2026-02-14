import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCustomerById, deleteCustomer } from '@/lib/actions/customers'
import { formatPrice } from '@/types/shop'
import { CustomerDetailActions } from '@/components/admin/CustomerDetailActions'

export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const customer = await getCustomerById(id)
  if (!customer) notFound()

  return (
    <>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            {customer.name}
          </h1>
          <p className="text-sm text-marron-claro mt-1">
            Cliente desde {new Date(customer.first_contact_at).toLocaleDateString('es-ES')}
          </p>
        </div>
        <Link
          href="/administrator/customers"
          className="text-sm text-naranja font-semibold hover:underline"
        >
          ← Volver a clientes
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <div className="space-y-6">
          {/* Datos de contacto */}
          <section className="bg-blanco border border-linea p-6">
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase mb-4 pb-2 border-b border-linea">
              Datos de contacto
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="block text-xs font-bold uppercase text-marron-claro mb-0.5">Email</span>
                <a href={`mailto:${customer.email}`} className="text-naranja hover:underline">
                  {customer.email}
                </a>
              </div>
              {customer.phone && (
                <div>
                  <span className="block text-xs font-bold uppercase text-marron-claro mb-0.5">Teléfono</span>
                  <a href={`tel:${customer.phone}`} className="hover:underline">{customer.phone}</a>
                </div>
              )}
              <div>
                <span className="block text-xs font-bold uppercase text-marron-claro mb-0.5">País</span>
                <p>{customer.country}</p>
              </div>
              {customer.city && (
                <div>
                  <span className="block text-xs font-bold uppercase text-marron-claro mb-0.5">Ciudad</span>
                  <p>{customer.city}</p>
                </div>
              )}
              {customer.company && (
                <div>
                  <span className="block text-xs font-bold uppercase text-marron-claro mb-0.5">Empresa</span>
                  <p>{customer.company}</p>
                </div>
              )}
              {customer.vat_id && (
                <div>
                  <span className="block text-xs font-bold uppercase text-marron-claro mb-0.5">NIF / VAT</span>
                  <p className="font-mono text-xs">{customer.vat_id}</p>
                </div>
              )}
              {customer.address && (
                <div className="sm:col-span-2">
                  <span className="block text-xs font-bold uppercase text-marron-claro mb-0.5">Dirección</span>
                  <p>{customer.address}</p>
                </div>
              )}
            </div>
          </section>

          {/* Notas admin */}
          {customer.admin_notes && (
            <section className="bg-yellow-50 border border-yellow-200 p-6">
              <h2 className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide text-yellow-700 mb-2">
                Notas del admin
              </h2>
              <p className="text-sm text-yellow-800 whitespace-pre-wrap">{customer.admin_notes}</p>
            </section>
          )}
        </div>

        <div className="space-y-6">
          {/* Resumen */}
          <section className="bg-blanco border border-linea p-6">
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase mb-4 pb-2 border-b border-linea">
              Resumen
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-marron-claro">Contactos</span>
                <span className="font-bold">{customer.contact_count}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-marron-claro">Pedidos</span>
                <span className="font-bold">
                  {customer.order_count > 0 ? (
                    <Link href="/administrator/orders" className="text-naranja hover:underline">
                      {customer.order_count}
                    </Link>
                  ) : (
                    '0'
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-marron-claro">Total gastado</span>
                <span className="font-bold text-naranja">
                  {customer.total_spent_cents > 0 ? formatPrice(customer.total_spent_cents) : '—'}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-linea">
                <span className="text-marron-claro">Primer contacto</span>
                <span className="text-xs">{new Date(customer.first_contact_at).toLocaleDateString('es-ES')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-marron-claro">Último contacto</span>
                <span className="text-xs">{new Date(customer.last_contact_at).toLocaleDateString('es-ES')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-marron-claro">Mailing</span>
                {customer.mailing_consent ? (
                  <span className="px-2 py-0.5 text-xs font-bold uppercase bg-green-100 text-green-700">Sí</span>
                ) : (
                  <span className="px-2 py-0.5 text-xs font-bold uppercase bg-gray-100 text-gray-500">No</span>
                )}
              </div>
            </div>
          </section>

          {/* Acciones */}
          <CustomerDetailActions
            customerId={customer.id}
            customerName={customer.name}
            customerEmail={customer.email}
          />
        </div>
      </div>
    </>
  )
}

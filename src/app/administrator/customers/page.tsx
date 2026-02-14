import Link from 'next/link'
import { getCustomers, deleteCustomer } from '@/lib/actions/customers'
import { ExportCustomersButton } from '@/components/admin/ExportCustomersButton'
import { TableActions } from '@/components/admin/TableActions'
import { formatPrice } from '@/types/shop'

export default async function CustomersPage() {
  const customers = await getCustomers()
  const withOrders = customers.filter((c) => c.order_count > 0).length
  const withMailing = customers.filter((c) => c.mailing_consent).length

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            Clientes
          </h1>
          <p className="text-sm text-marron-claro mt-1">
            {customers.length} clientes · {withOrders} con pedidos · {withMailing} con mailing OK
          </p>
        </div>
        <ExportCustomersButton />
      </div>

      <div className="bg-blanco border border-linea overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-crudo border-b border-linea">
                <th className="text-left px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">
                  Nombre
                </th>
                <th className="text-left px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">
                  Empresa
                </th>
                <th className="text-left px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">
                  Email
                </th>
                <th className="text-left px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">
                  País
                </th>
                <th className="text-center px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">
                  Contactos
                </th>
                <th className="text-center px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">
                  Pedidos
                </th>
                <th className="text-right px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">
                  Total
                </th>
                <th className="text-center px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">
                  Mailing
                </th>
                <th className="text-center px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {customers.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-marron-claro">
                    No hay clientes. Se irán añadiendo al enviar el formulario de contacto o al hacer
                    pedidos.
                  </td>
                </tr>
              ) : (
                customers.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b border-linea/50 hover:bg-crudo/50 transition-colors"
                  >
                    <td className="px-4 py-3 font-bold">{c.name}</td>
                    <td className="px-4 py-3 text-marron-claro">{c.company || '—'}</td>
                    <td className="px-4 py-3">
                      <a
                        href={`mailto:${c.email}`}
                        className="text-naranja hover:underline text-xs"
                      >
                        {c.email}
                      </a>
                    </td>
                    <td className="px-4 py-3">{c.country}</td>
                    <td className="px-4 py-3 text-center">{c.contact_count}</td>
                    <td className="px-4 py-3 text-center">
                      {c.order_count > 0 ? (
                        <Link
                          href="/administrator/orders"
                          className="text-naranja font-semibold hover:underline"
                        >
                          {c.order_count}
                        </Link>
                      ) : (
                        '0'
                      )}
                    </td>
                    <td className="px-4 py-3 text-right font-medium">
                      {c.total_spent_cents > 0 ? formatPrice(c.total_spent_cents) : '—'}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {c.mailing_consent ? (
                        <span className="px-2 py-0.5 text-xs font-bold uppercase bg-green-100 text-green-700">
                          Sí
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 text-xs font-bold uppercase bg-gray-100 text-gray-500">
                          No
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <TableActions
                        editHref={`/administrator/customers/${c.id}`}
                        deleteAction={deleteCustomer}
                        entityId={c.id}
                        entityLabel={`el cliente ${c.name}`}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

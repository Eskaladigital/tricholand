'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { deleteCustomer, type CustomerRow } from '@/lib/actions/customers'
import { ExportCustomersButton } from '@/components/admin/ExportCustomersButton'
import { formatContactWhen } from '@/types/contact'
import { formatPrice } from '@/types/shop'

type FilterId = 'all' | 'orders' | 'none' | 'mailing'

const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'orders', label: 'Con pedidos' },
  { id: 'none', label: 'Sin pedidos' },
  { id: 'mailing', label: 'Mailing' },
]

function matches(customer: CustomerRow, filter: FilterId) {
  if (filter === 'orders') return customer.order_count > 0
  if (filter === 'none') return customer.order_count === 0
  if (filter === 'mailing') return customer.mailing_consent
  return true
}

function DeleteButton({ id, name }: { id: string; name: string }) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  async function onDelete(event: React.MouseEvent) {
    event.preventDefault()
    event.stopPropagation()
    if (!confirm(`¿Borrar el cliente ${name}? Esta acción no se puede deshacer.`)) return
    setDeleting(true)
    const { error } = await deleteCustomer(id)
    setDeleting(false)
    if (error) alert(error)
    else router.refresh()
  }

  return (
    <button
      type="button"
      onClick={onDelete}
      onKeyDown={(event) => event.stopPropagation()}
      disabled={deleting}
      aria-label={`Borrar el cliente ${name}`}
      title="Borrar"
      className="p-2 text-marron-claro hover:text-red-700 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  )
}

export function CustomersInbox({ customers }: { customers: CustomerRow[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const filtroParam = searchParams.get('filtro')
  const filtro: FilterId = FILTERS.some((f) => f.id === filtroParam) ? (filtroParam as FilterId) : 'all'
  const [query, setQuery] = useState('')

  function setFiltro(value: FilterId) {
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'all') params.delete('filtro')
    else params.set('filtro', value)
    const next = params.toString()
    router.replace(next ? `?${next}` : '/administrator/customers', { scroll: false })
  }

  const counts = useMemo(() => {
    return {
      all: customers.length,
      orders: customers.filter((c) => c.order_count > 0).length,
      none: customers.filter((c) => c.order_count === 0).length,
      mailing: customers.filter((c) => c.mailing_consent).length,
    }
  }, [customers])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return customers.filter((c) => {
      if (!matches(c, filtro)) return false
      if (!q) return true
      return [c.name, c.company, c.email, c.phone, c.country, c.city]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(q)
    })
  }, [customers, filtro, query])

  return (
    <>
      <div className="flex flex-wrap justify-between items-end gap-4 mb-6">
        <div>
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">Clientes</h1>
          <p className="text-sm text-marron-claro mt-1">
            {customers.length} en total
            <span className="mx-1.5">·</span>
            {counts.orders} con pedidos
            <span className="mx-1.5">·</span>
            {counts.mailing} con mailing
          </p>
        </div>
        <ExportCustomersButton />
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {FILTERS.map((f) => {
          const active = filtro === f.id
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFiltro(f.id)}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wide border transition-colors ${
                active ? 'bg-negro text-crudo border-negro' : 'bg-blanco text-marron border-linea hover:border-marron-claro'
              }`}
            >
              {f.label}
              <span className={`ml-1.5 tabular-nums ${active ? 'text-crudo/70' : 'text-marron-claro'}`}>{counts[f.id]}</span>
            </button>
          )
        })}
      </div>

      <label className="block mb-4">
        <span className="sr-only">Buscar clientes</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar nombre, empresa, email o país"
          className="w-full max-w-xl px-3 py-2.5 border border-linea bg-blanco text-sm focus:outline-none focus:border-naranja"
        />
      </label>

      <div className="bg-blanco border border-linea overflow-hidden">
        {customers.length === 0 ? (
          <p className="px-4 py-12 text-center text-sm text-marron-claro">
            No hay clientes. Se crean al llegar un contacto o un pedido.
          </p>
        ) : visible.length === 0 ? (
          <div className="px-4 py-12 text-center">
            <p className="text-sm text-marron-claro">Ningún cliente con este filtro.</p>
            <button
              type="button"
              onClick={() => {
                setQuery('')
                setFiltro('all')
              }}
              className="mt-3 text-sm text-naranja font-semibold hover:underline"
            >
              Quitar filtros
            </button>
          </div>
        ) : (
          <>
            <ul className="md:hidden divide-y divide-linea/70">
              {visible.map((c) => {
                const when = formatContactWhen(c.last_contact_at)
                return (
                  <li key={c.id} className="relative">
                    <Link href={`/administrator/customers/${c.id}`} className="block px-4 py-3.5 pr-12">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="font-bold">{c.name}</span>
                        <time dateTime={c.last_contact_at} title={when.absolute} className="text-[11px] text-marron-claro">
                          {when.relative}
                        </time>
                      </div>
                      <p className="text-xs text-marron-claro truncate">{c.company || c.email}</p>
                      <p className="text-xs mt-1.5">
                        {c.order_count} pedidos
                        {c.total_spent_cents > 0 ? ` · ${formatPrice(c.total_spent_cents)}` : ''}
                        {c.mailing_consent ? ' · mailing' : ''}
                      </p>
                    </Link>
                    <div className="absolute top-2 right-1">
                      <DeleteButton id={c.id} name={c.name} />
                    </div>
                  </li>
                )
              })}
            </ul>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-crudo border-b border-linea">
                    {['Cliente', 'Email', 'País', 'Contactos', 'Pedidos', 'Total', 'Mailing', ''].map((label) => (
                      <th
                        key={label || 'acciones'}
                        className={`${label === 'Total' ? 'text-right' : label === 'Contactos' || label === 'Pedidos' || label === 'Mailing' ? 'text-center' : 'text-left'} px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro`}
                      >
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visible.map((c) => (
                    <tr
                      key={c.id}
                      onClick={() => router.push(`/administrator/customers/${c.id}`)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') router.push(`/administrator/customers/${c.id}`)
                      }}
                      tabIndex={0}
                      className="border-b border-linea/50 cursor-pointer hover:bg-crudo/60"
                    >
                      <td className="px-4 py-3">
                        <span className="font-bold block">{c.name}</span>
                        <span className="block text-xs text-marron-claro">{c.company || '—'}</span>
                      </td>
                      <td className="px-4 py-3 text-xs">{c.email}</td>
                      <td className="px-4 py-3 text-xs">{c.country}</td>
                      <td className="px-4 py-3 text-center">{c.contact_count}</td>
                      <td className="px-4 py-3 text-center">
                        {c.order_count > 0 ? (
                          <Link
                            href={`/administrator/orders?q=${encodeURIComponent(c.email)}`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-naranja font-semibold hover:underline"
                          >
                            {c.order_count}
                          </Link>
                        ) : (
                          '0'
                        )}
                      </td>
                      <td className="px-4 py-3 text-right font-medium whitespace-nowrap">
                        {c.total_spent_cents > 0 ? formatPrice(c.total_spent_cents) : '—'}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`px-2 py-0.5 text-[10px] font-bold uppercase ${
                            c.mailing_consent ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {c.mailing_consent ? 'Sí' : 'No'}
                        </span>
                      </td>
                      <td className="px-2 py-3 text-right">
                        <DeleteButton id={c.id} name={c.name} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  )
}

'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { deleteOrder, type OrderListItem } from '@/lib/actions/orders'
import { formatContactWhen } from '@/types/contact'
import {
  formatPrice,
  ORDER_REVIEW_STATUSES,
  ORDER_STATUS_CLASS,
  ORDER_STATUS_LABELS,
  type OrderStatus,
} from '@/types/shop'

const ALL_STATUSES = Object.keys(ORDER_STATUS_LABELS) as OrderStatus[]

function DeleteButton({ id, label }: { id: string; label: string }) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  async function onDelete(event: React.MouseEvent) {
    event.preventDefault()
    event.stopPropagation()
    if (!confirm(`¿Borrar ${label}? Esta acción no se puede deshacer.`)) return
    setDeleting(true)
    const { error } = await deleteOrder(id)
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
      title="Borrar"
      aria-label={`Borrar ${label}`}
      className="p-2 text-marron-claro hover:text-red-700 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  )
}

export function OrdersInbox({ orders }: { orders: OrderListItem[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const estadoParam = searchParams.get('estado')
  const estado: OrderStatus | 'revision' | 'all' =
    estadoParam === 'revision' || (estadoParam && ALL_STATUSES.includes(estadoParam as OrderStatus))
      ? (estadoParam as OrderStatus | 'revision')
      : 'all'
  const [query, setQuery] = useState(searchParams.get('q') ?? '')

  function setEstado(value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'all') params.delete('estado')
    else params.set('estado', value)
    const next = params.toString()
    router.replace(next ? `?${next}` : '/administrator/orders', { scroll: false })
  }

  const counts = useMemo(() => {
    const byStatus = Object.fromEntries(ALL_STATUSES.map((s) => [s, 0])) as Record<OrderStatus, number>
    for (const order of orders) byStatus[order.status] = (byStatus[order.status] ?? 0) + 1
    const revision = ORDER_REVIEW_STATUSES.reduce((sum, s) => sum + byStatus[s], 0)
    return { byStatus, revision }
  }, [orders])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return orders.filter((order) => {
      if (estado === 'revision' && !ORDER_REVIEW_STATUSES.includes(order.status)) return false
      if (estado !== 'all' && estado !== 'revision' && order.status !== estado) return false
      if (!q) return true
      return [order.order_number, order.customer_name, order.customer_company, order.customer_email, order.customer_country]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(q)
    })
  }, [orders, estado, query])

  const chips: { id: string; label: string; n: number; attention?: boolean }[] = [
    { id: 'all', label: 'Todos', n: orders.length },
    { id: 'revision', label: 'Por revisar', n: counts.revision, attention: counts.revision > 0 },
    ...ALL_STATUSES.filter((s) => counts.byStatus[s] > 0).map((s) => ({
      id: s,
      label: ORDER_STATUS_LABELS[s],
      n: counts.byStatus[s],
    })),
  ]

  const filtering = estado !== 'all' || query.trim().length > 0

  return (
    <>
      <div className="mb-6 flex flex-wrap justify-between items-end gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">Pedidos</h1>
          <p className="text-sm text-marron-claro mt-1">
            {orders.length} en total
            <span className="mx-1.5">·</span>
            <span className={counts.revision > 0 ? 'text-naranja font-semibold' : ''}>
              {counts.revision} por revisar
            </span>
          </p>
        </div>
        <Link
          href="/administrator/orders/new"
          className="bg-naranja text-blanco px-5 py-2.5 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-marron transition-colors"
        >
          + Nuevo pedido
        </Link>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {chips.map((chip) => {
          const active = estado === chip.id
          return (
            <button
              key={chip.id}
              type="button"
              aria-pressed={active}
              onClick={() => setEstado(chip.id)}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wide border transition-colors ${
                active
                  ? 'bg-negro text-crudo border-negro'
                  : chip.attention && !active
                    ? 'bg-blanco text-naranja border-naranja hover:bg-naranja/5'
                    : 'bg-blanco text-marron border-linea hover:border-marron-claro'
              }`}
            >
              {chip.label}
              <span className={`ml-1.5 tabular-nums ${active ? 'text-crudo/70' : 'text-marron-claro'}`}>{chip.n}</span>
            </button>
          )
        })}
      </div>

      <label className="block mb-4">
        <span className="sr-only">Buscar pedidos</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar número, cliente, email o país"
          className="w-full max-w-xl px-3 py-2.5 border border-linea bg-blanco text-sm focus:outline-none focus:border-naranja"
        />
      </label>

      <div className="bg-blanco border border-linea overflow-hidden">
        {orders.length === 0 ? (
          <p className="px-4 py-12 text-center text-sm text-marron-claro">
            No hay pedidos. Llegan desde la tienda, o puedes{' '}
            <Link href="/administrator/orders/new" className="text-naranja font-semibold hover:underline">
              crear uno
            </Link>
            .
          </p>
        ) : visible.length === 0 ? (
          <div className="px-4 py-12 text-center">
            <p className="text-sm text-marron-claro">Ningún pedido con este filtro.</p>
            <button
              type="button"
              onClick={() => {
                setQuery('')
                router.replace('/administrator/orders', { scroll: false })
              }}
              className="mt-3 text-sm text-naranja font-semibold hover:underline"
            >
              Quitar filtros
            </button>
          </div>
        ) : (
          <>
            <ul className="md:hidden divide-y divide-linea/70">
              {visible.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </ul>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-crudo border-b border-linea">
                    {['Pedido', 'Cliente', 'País', 'Líneas', 'Importe', 'Estado', ''].map((label) => (
                      <th
                        key={label || 'acciones'}
                        className="text-left px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro"
                      >
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visible.map((order) => (
                    <OrderRowView
                      key={order.id}
                      order={order}
                      onOpen={() => router.push(`/administrator/orders/${order.id}`)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      {visible.length > 0 && filtering && (
        <p className="mt-3 text-xs text-marron-claro">
          {visible.length} de {orders.length}
        </p>
      )}
    </>
  )
}

function OrderCard({ order }: { order: OrderListItem }) {
  const when = formatContactWhen(order.created_at)
  const review = ORDER_REVIEW_STATUSES.includes(order.status)
  return (
    <li className={`relative ${review ? 'bg-naranja/[0.04]' : ''}`}>
      <Link href={`/administrator/orders/${order.id}`} className="block px-4 py-3.5 pr-12">
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-bold font-mono text-xs">{order.order_number}</span>
          <time dateTime={order.created_at} title={when.absolute} className="text-[11px] text-marron-claro">
            {when.relative}
          </time>
        </div>
        <p className="font-semibold mt-1">{order.customer_company || order.customer_name}</p>
        <p className="text-xs text-marron-claro truncate">{order.customer_email}</p>
        <div className="flex items-center justify-between gap-3 mt-2">
          <StatusBadge status={order.status} />
          <span className="font-bold">{formatPrice(order.subtotal_cents)}</span>
        </div>
      </Link>
      <div className="absolute top-2 right-1">
        <DeleteButton id={order.id} label={`el pedido ${order.order_number}`} />
      </div>
    </li>
  )
}

function OrderRowView({ order, onOpen }: { order: OrderListItem; onOpen: () => void }) {
  const when = formatContactWhen(order.created_at)
  const review = ORDER_REVIEW_STATUSES.includes(order.status)
  return (
    <tr
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onOpen()
      }}
      tabIndex={0}
      className={`border-b border-linea/50 cursor-pointer hover:bg-crudo/60 ${review ? 'bg-naranja/[0.05]' : ''}`}
    >
      <td className={`px-4 py-3 align-top ${review ? 'border-l-2 border-l-naranja' : 'border-l-2 border-l-transparent'}`}>
        <span className="font-bold font-mono text-xs">{order.order_number}</span>
        <time dateTime={order.created_at} title={when.absolute} className="block text-[11px] text-marron-claro mt-0.5">
          {when.relative}
        </time>
      </td>
      <td className="px-4 py-3 align-top">
        <span className="font-bold block">{order.customer_name}</span>
        <span className="block text-xs text-marron-claro">{order.customer_company || order.customer_email}</span>
      </td>
      <td className="px-4 py-3 align-top text-xs">{order.customer_country}</td>
      <td className="px-4 py-3 align-top text-center">{order.items_count}</td>
      <td className="px-4 py-3 align-top text-right font-bold whitespace-nowrap">{formatPrice(order.subtotal_cents)}</td>
      <td className="px-4 py-3 align-top">
        <StatusBadge status={order.status} />
      </td>
      <td className="px-2 py-3 align-top text-right">
        <DeleteButton id={order.id} label={`el pedido ${order.order_number}`} />
      </td>
    </tr>
  )
}

function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase whitespace-nowrap ${ORDER_STATUS_CLASS[status]}`}>
      {ORDER_STATUS_LABELS[status]}
    </span>
  )
}

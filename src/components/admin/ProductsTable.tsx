'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import type { Product } from '@/types/shop'
import { formatPrice } from '@/types/shop'
import { toggleProductStatus, deleteProduct } from '@/lib/actions/products'

const STATUS_LABEL: Record<string, string> = {
  active: 'En venta',
  draft: 'Borrador',
  out_of_stock: 'Sin stock',
  archived: 'Archivado',
}

type ProductFilter = 'all' | 'active' | 'draft' | 'out_of_stock' | 'archived' | 'low'

export function ProductsTable({ products: initial }: { products: Product[] }) {
  const [products, setProducts] = useState(initial)
  const [isPending, startTransition] = useTransition()
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<ProductFilter>('all')
  const router = useRouter()

  async function handleToggle(id: string, currentStatus: string) {
    setLoadingId(id)
    startTransition(async () => {
      const result = await toggleProductStatus(id, currentStatus)
      if (result.error) {
        alert(`Error: ${result.error}`)
      } else {
        setProducts((prev) =>
          prev.map((p) =>
            p.id === id
              ? { ...p, status: p.status === 'active' ? 'draft' : 'active' }
              : p
          )
        )
      }
      setLoadingId(null)
      router.refresh()
    })
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`¿Eliminar "${name}"?\n\nEsta acción no se puede deshacer.`)) return
    setLoadingId(id)
    startTransition(async () => {
      const result = await deleteProduct(id)
      if (result.error) {
        alert(`Error: ${result.error}`)
      } else {
        setProducts((prev) => prev.filter((p) => p.id !== id))
      }
      setLoadingId(null)
      router.refresh()
    })
  }

  const lowStock = (p: Product) => p.stock_qty !== null && p.stock_qty <= 5
  const counts = {
    all: products.length,
    active: products.filter((p) => p.status === 'active').length,
    draft: products.filter((p) => p.status === 'draft').length,
    out_of_stock: products.filter((p) => p.status === 'out_of_stock').length,
    archived: products.filter((p) => p.status === 'archived').length,
    low: products.filter(lowStock).length,
  }
  const q = query.trim().toLowerCase()
  const visible = products.filter((p) => {
    if (filter === 'low') {
      if (!lowStock(p)) return false
    } else if (filter !== 'all' && p.status !== filter) return false
    if (!q) return true
    return [p.name, p.sku, p.unit_label, p.category].filter(Boolean).join(' ').toLowerCase().includes(q)
  })

  const chips: { id: ProductFilter; label: string; n: number; attention?: boolean }[] = [
    { id: 'all', label: 'Todos', n: counts.all },
    { id: 'active', label: 'En venta', n: counts.active },
    { id: 'draft', label: 'Borradores', n: counts.draft },
    { id: 'low', label: 'Stock bajo', n: counts.low, attention: counts.low > 0 },
    { id: 'out_of_stock', label: 'Sin stock', n: counts.out_of_stock },
    { id: 'archived', label: 'Archivados', n: counts.archived },
  ]

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-3">
        {chips.filter((c) => c.id === 'all' || c.id === 'active' || c.id === 'draft' || c.id === 'low' || c.n > 0).map((chip) => {
          const active = filter === chip.id
          return (
            <button
              key={chip.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(chip.id)}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wide border transition-colors ${
                active
                  ? 'bg-negro text-crudo border-negro'
                  : chip.attention
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
        <span className="sr-only">Buscar productos</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar nombre o SKU"
          className="w-full max-w-xl px-3 py-2.5 border border-linea bg-blanco text-sm focus:outline-none focus:border-naranja"
        />
      </label>
    <div className="bg-blanco border border-linea overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-crudo border-b border-linea">
              <th className="text-left px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">
                Producto
              </th>
              <th className="text-left px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">
                SKU
              </th>
              <th className="text-right px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">
                Precio
              </th>
              <th className="text-right px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">
                €/unidad
              </th>
              <th className="text-center px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">
                Stock
              </th>
              <th className="text-center px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">
                Activo
              </th>
              <th className="text-center px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-marron-claro">
                  No hay productos. Crea el primero para empezar a vender.
                </td>
              </tr>
            ) : visible.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-marron-claro">
                  Ningún producto con este filtro.
                </td>
              </tr>
            ) : (
              visible.map((product) => {
                const isLoading = loadingId === product.id && isPending
                return (
                  <tr
                    key={product.id}
                    onClick={() => router.push(`/administrator/products/${product.id}`)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') router.push(`/administrator/products/${product.id}`)
                    }}
                    tabIndex={0}
                    className={`border-b border-linea/50 hover:bg-crudo/50 transition-colors cursor-pointer ${isLoading ? 'opacity-50' : ''} ${lowStock(product) && product.status === 'active' ? 'bg-naranja/[0.04]' : ''}`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {product.images[0]?.url ? (
                          <div className="relative w-12 h-12 shrink-0 rounded overflow-hidden bg-crudo">
                            <Image
                              src={product.images[0].url}
                              alt={product.images[0]?.alt || product.name}
                              width={48}
                              height={48}
                              className="object-cover w-full h-full"
                              unoptimized
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded bg-linea/30 flex items-center justify-center text-marron-claro text-xs shrink-0">
                            —
                          </div>
                        )}
                        <div>
                          <span className="font-bold block">{product.name}</span>
                          <span className="text-xs text-marron-claro">
                            {product.unit_label}
                            {product.status !== 'active' && ` · ${STATUS_LABEL[product.status] ?? product.status}`}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">{product.sku}</td>
                    <td className="px-4 py-3 text-right font-bold text-naranja">
                      {formatPrice(product.price_cents)}
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-marron-claro">
                      {formatPrice(Math.round(product.price_cents / product.units_per_lot))}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {product.stock_qty !== null ? (
                        <span className={`font-bold ${product.stock_qty <= 5 ? 'text-terracota' : 'text-verde'}`}>
                          {product.stock_qty}
                        </span>
                      ) : (
                        <span className="text-marron-claro">&infin;</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleToggle(product.id, product.status)
                        }}
                        disabled={isLoading}
                        aria-pressed={product.status === 'active'}
                        aria-label={product.status === 'active' ? `Pasar ${product.name} a borrador` : `Poner ${product.name} en venta`}
                        className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-naranja focus:ring-offset-1 disabled:opacity-50"
                        style={{ backgroundColor: product.status === 'active' ? '#3d5a3d' : '#d1d5db' }}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                            product.status === 'active' ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/administrator/products/${product.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-naranja font-semibold hover:underline text-xs"
                        >
                          Editar
                        </Link>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(product.id, product.name)
                          }}
                          disabled={isLoading}
                          className="text-red-500 hover:text-red-700 font-semibold text-xs disabled:opacity-50"
                          title="Eliminar producto"
                        >
                          Eliminar
                        </button>
                      </div>
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

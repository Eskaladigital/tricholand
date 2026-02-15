'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import type { Product } from '@/types/shop'
import { formatPrice } from '@/types/shop'
import { toggleProductStatus, deleteProduct } from '@/lib/actions/products'

export function ProductsTable({ products: initial }: { products: Product[] }) {
  const [products, setProducts] = useState(initial)
  const [isPending, startTransition] = useTransition()
  const [loadingId, setLoadingId] = useState<string | null>(null)
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

  return (
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
                <td colSpan={6} className="px-4 py-8 text-center text-marron-claro">
                  No hay productos. Crea el primero para empezar a vender.
                </td>
              </tr>
            ) : (
              products.map((product) => {
                const isLoading = loadingId === product.id && isPending
                return (
                  <tr key={product.id} className={`border-b border-linea/50 hover:bg-crudo/50 transition-colors ${isLoading ? 'opacity-50' : ''}`}>
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
                          <span className="text-xs text-marron-claro">{product.unit_label}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">{product.sku}</td>
                    <td className="px-4 py-3 text-right font-bold text-naranja">
                      {formatPrice(product.price_cents)}
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
                        onClick={() => handleToggle(product.id, product.status)}
                        disabled={isLoading}
                        className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-naranja focus:ring-offset-1 disabled:opacity-50"
                        style={{ backgroundColor: product.status === 'active' ? '#4ade80' : '#d1d5db' }}
                        title={product.status === 'active' ? 'Desactivar producto' : 'Activar producto'}
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
                          className="text-naranja font-semibold hover:underline text-xs"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
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
  )
}

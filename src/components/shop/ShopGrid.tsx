'use client'

import { useState, useMemo } from 'react'
import type { Product } from '@/types/shop'
import { ProductCardShop } from './ProductCardShop'

interface ShopGridProps {
  products: Product[]
  locale: string
}

type CategoryFilter = 'all' | 'trichocereus' | 'packs'

export function ShopGrid({ products, locale }: ShopGridProps) {
  const [category, setCategory] = useState<CategoryFilter>('all')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (category !== 'all' && p.category !== category) return false
      if (search) {
        const q = search.toLowerCase()
        return (
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.short_description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))
        )
      }
      return true
    })
  }, [products, category, search])

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2.5 border border-linea bg-blanco text-sm focus:outline-none focus:border-naranja transition-colors"
        />
        <div className="flex gap-2">
          {([
            { value: 'all', label: 'Todos' },
            { value: 'trichocereus', label: 'Trichocereus' },
            { value: 'packs', label: 'Packs' },
          ] as { value: CategoryFilter; label: string }[]).map((opt) => (
            <button
              key={opt.value}
              onClick={() => setCategory(opt.value)}
              className={`px-4 py-2.5 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide transition-colors ${
                category === opt.value
                  ? 'bg-negro text-crudo'
                  : 'bg-blanco border border-linea text-marron-claro hover:border-negro'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className="text-sm text-marron-claro mb-6">
        {filtered.length} {filtered.length === 1 ? 'producto' : 'productos'}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-marron-claro">
          <p className="text-lg mb-2">No se encontraron productos</p>
          <p className="text-sm">Prueba con otros filtros</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <ProductCardShop key={product.id} product={product} locale={locale} />
          ))}
        </div>
      )}
    </div>
  )
}

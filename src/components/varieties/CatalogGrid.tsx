'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getFullPath } from '@/lib/i18n/paths'
import type { Variety } from '@/types/variety'
import type { Dictionary } from '@/lib/i18n/types'

type StockFilter = 'all' | 'available' | 'limited'

interface CatalogGridProps {
  locale: string
  varieties: Variety[]
  t: Dictionary['catalog']
}

export function CatalogGrid({ locale, varieties, t }: CatalogGridProps) {
  const [stockFilter, setStockFilter] = useState<StockFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = useMemo(() => {
    return varieties.filter((v) => {
      if (stockFilter !== 'all' && v.stock !== stockFilter) return false
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        return (
          v.name.toLowerCase().includes(q) ||
          v.commonName.toLowerCase().includes(q) ||
          v.scientificName.toLowerCase().includes(q) ||
          v.code.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [varieties, stockFilter, searchQuery])

  const stockLabels = {
    available: `● ${t.available}`,
    limited: `● ${t.limited}`,
    out_of_stock: `● ${t.outOfStock}`,
  }
  const stockColors = {
    available: 'text-verde',
    limited: 'text-terracota',
    out_of_stock: 'text-red-600',
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 pb-4 border-b border-linea">
        {/* Search */}
        <input
          type="text"
          placeholder={t.searchVariety}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2.5 border border-linea bg-blanco font-[family-name:var(--font-archivo)] text-sm focus:outline-none focus:border-naranja transition-colors"
        />

        {/* Stock filter */}
        <div className="flex gap-2">
          {([
            { value: 'all' as StockFilter, label: t.filterAll },
            { value: 'available' as StockFilter, label: t.available },
            { value: 'limited' as StockFilter, label: t.limited },
          ]).map((opt) => (
            <button
              key={opt.value}
              onClick={() => setStockFilter(opt.value)}
              className={`px-4 py-2.5 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide transition-colors ${
                stockFilter === opt.value
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
        {filtered.length} {t.varietyCount}
        {stockFilter !== 'all' && ` · ${stockFilter === 'available' ? t.available : t.limited}`}
        {searchQuery && ` · "${searchQuery}"`}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-marron-claro">
          <p className="text-lg mb-2">{t.noVarietiesFound}</p>
          <p className="text-sm">{t.tryOtherFilters}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((v) => (
            <Link
              key={v.slug}
              href={getFullPath(locale, 'varieties', v.slug)}
              className="group bg-blanco border border-linea hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={v.image}
                  alt={v.imageAlt}
                  width={600}
                  height={200}
                  className="w-full h-[200px] object-cover group-hover:scale-[1.04] transition-transform duration-400"
                />
                <span className="absolute top-3 left-3 bg-negro text-blanco px-2.5 py-1 font-[family-name:var(--font-archivo-narrow)] text-[0.72rem] font-semibold tracking-wide">
                  {v.code}
                </span>
              </div>

              <div className="px-5 py-4">
                <h3 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold group-hover:text-naranja transition-colors">
                  {v.name}
                </h3>
                <p className="text-sm text-marron-claro mt-0.5">
                  {v.commonName} · <em>{v.scientificName}</em>
                </p>
                <p className="text-xs text-marron-claro mt-2 line-clamp-2">
                  {v.description.slice(0, 120)}...
                </p>
              </div>

              <div className="px-5 py-3 bg-crudo flex justify-between items-center text-sm border-t border-linea">
                <span className={`font-semibold ${stockColors[v.stock]}`}>
                  {stockLabels[v.stock]}
                </span>
                <span className="text-marron-claro">{v.sizeRange}</span>
                <span className="font-[family-name:var(--font-archivo-narrow)] text-[0.72rem] text-marron font-bold uppercase tracking-wide group-hover:text-naranja transition-colors">
                  {t.viewSheet}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

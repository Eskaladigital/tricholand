'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/lib/shop/cart-context'
import { formatPrice } from '@/types/shop'
import type { Product } from '@/types/shop'
import { getFullPath } from '@/lib/i18n/paths'
import type { Dictionary } from '@/lib/i18n/types'

interface ProductCardShopProps {
  product: Product
  locale: string
  t: Dictionary['shop']
}

export function ProductCardShop({ product, locale, t }: ProductCardShopProps) {
  const { addItem, isInCart, getItemQuantity } = useCart()
  const inCart = isInCart(product.id)
  const currentQty = getItemQuantity(product.id)
  const [additionalQty, setAdditionalQty] = useState(product.qty_step)
  
  const pricePerUnitCents = product.units_per_lot > 1 
    ? Math.round(product.price_cents / product.units_per_lot) 
    : null

  // Calcular cuántas unidades tiene actualmente en el carrito
  const currentUnits = currentQty * product.units_per_lot

  return (
    <div className="group bg-blanco border border-linea hover:shadow-lg transition-all duration-300 flex flex-col">
      {/* Image */}
      <Link href={getFullPath(locale, 'shop', product.slug)} className="relative overflow-hidden">
        {product.images[0]?.url ? (
          <Image
            src={product.images[0].url}
            alt={product.images[0]?.alt || product.name}
            width={600}
            height={240}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            quality={60}
            className="w-full h-[220px] object-cover group-hover:scale-[1.04] transition-transform duration-400"
            unoptimized
          />
        ) : (
          <div className="w-full h-[220px] bg-crudo flex items-center justify-center">
            <span className="text-4xl opacity-30">🌵</span>
          </div>
        )}
        <span className="absolute top-3 left-3 bg-negro text-blanco px-2.5 py-1 font-[family-name:var(--font-archivo-narrow)] text-[0.72rem] font-semibold tracking-wide">
          {product.sku}
        </span>
        {product.featured && (
          <span className="absolute top-3 right-3 bg-naranja text-blanco px-2.5 py-1 font-[family-name:var(--font-archivo-narrow)] text-[0.65rem] font-bold uppercase tracking-wide">
            {t.featured}
          </span>
        )}
        {currentUnits > 0 && (
          <span className="absolute bottom-3 right-3 bg-verde text-blanco px-3 py-1.5 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold">
            {currentUnits} {t.totalPlants}
          </span>
        )}
      </Link>

      {/* Body */}
      <div className="px-5 py-4 flex-1">
        <Link href={getFullPath(locale, 'shop', product.slug)}>
          <h3 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold group-hover:text-naranja transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-marron-claro mt-1">{product.short_description}</p>

        {/* Price */}
        <div className="mt-3 space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="font-[family-name:var(--font-archivo-narrow)] text-2xl font-bold text-naranja">
              {formatPrice(product.price_cents)}
            </span>
            <span className="text-xs text-marron-claro">/ {product.unit_label}</span>
          </div>
          {pricePerUnitCents && (
            <p className="text-xs text-marron-claro">
              {formatPrice(pricePerUnitCents)} {t.perUnit}
            </p>
          )}
        </div>
      </div>

      {/* Add to cart */}
      <div className="px-5 pb-4 space-y-2">
        {!inCart ? (
          <button
            onClick={() => addItem(product, product.min_order_qty)}
            className="w-full py-3 px-4 bg-naranja text-blanco font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-marron transition-colors"
          >
            {t.addToOrder} ({product.min_order_qty} uds)
          </button>
        ) : (
          <>
            <div className="flex gap-2">
              <button
                onClick={() => addItem(product, product.min_order_qty)}
                className="flex-1 py-2 px-3 bg-verde text-blanco font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide hover:bg-verde-oscuro transition-colors"
              >
                + Lote ({product.min_order_qty})
              </button>
              <button
                onClick={() => addItem(product, additionalQty)}
                className="flex-1 py-2 px-3 border-2 border-verde text-verde font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide hover:bg-verde hover:text-blanco transition-colors"
              >
                + {additionalQty} uds
              </button>
            </div>
            <select
              value={additionalQty}
              onChange={(e) => setAdditionalQty(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-linea text-sm bg-blanco"
            >
              {[1, 2, 3, 4, 5].map((multiplier) => (
                <option key={multiplier} value={product.qty_step * multiplier}>
                  Añadir {product.qty_step * multiplier} uds
                </option>
              ))}
            </select>
          </>
        )}
      </div>
    </div>
  )
}

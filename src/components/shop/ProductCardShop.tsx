'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/shop/cart-context'
import { formatPrice } from '@/types/shop'
import type { Product } from '@/types/shop'
import { getFullPath } from '@/lib/i18n/paths'
import type { Dictionary } from '@/lib/i18n/types'

interface ProductCardShopProps {
  product: Product
  locale: string
  t: Dictionary['shop']
  hasAdditionalLots?: boolean
  additionalLotProduct?: Product | null
}

export function ProductCardShop({ product, locale, t, hasAdditionalLots = false, additionalLotProduct = null }: ProductCardShopProps) {
  const { addItem, canAddProduct, isInCart, getItemQuantity } = useCart()
  const inCart = isInCart(product.id)
  const { canAdd } = canAddProduct(product)
  const quantity = getItemQuantity(product.id)
  
  const pricePerUnitCents = product.units_per_lot > 1 
    ? Math.round(product.price_cents / product.units_per_lot) 
    : null

  // Si es producto principal Y ya está en el carrito Y tiene lotes adicionales
  const showTwoButtons = product.lot_type === 'main' && inCart && hasAdditionalLots && additionalLotProduct

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
        {quantity > 0 && (
          <span className="absolute bottom-3 right-3 bg-verde text-blanco px-3 py-1.5 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold">
            {quantity}× ({quantity * product.units_per_lot} {t.totalPlants})
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
          {hasAdditionalLots && product.lot_type === 'main' && !inCart && (
            <p className="text-xs text-verde font-medium">{t.additionalLotsAvailable}</p>
          )}
        </div>
      </div>

      {/* Add to cart */}
      <div className="px-5 pb-4">
        {showTwoButtons ? (
          <div className="space-y-2">
            <button
              onClick={() => addItem(product, 1)}
              className="w-full py-2.5 px-4 bg-verde text-blanco font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde-oscuro transition-colors"
            >
              {t.addAnotherFullLot} ({product.units_per_lot})
            </button>
            <button
              onClick={() => addItem(additionalLotProduct, 1)}
              className="w-full py-2 px-4 border-2 border-verde text-verde font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide hover:bg-verde hover:text-blanco transition-colors"
            >
              {t.addAdditionalLot} ({additionalLotProduct.units_per_lot})
            </button>
          </div>
        ) : (
          <button
            onClick={() => canAdd && addItem(product, product.min_order_qty)}
            disabled={!canAdd}
            className={`w-full py-3 px-4 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide transition-colors ${
              !canAdd
                ? 'bg-linea text-marron-claro cursor-not-allowed'
                : inCart
                  ? 'bg-verde text-blanco hover:bg-verde-oscuro'
                  : 'bg-naranja text-blanco hover:bg-marron'
            }`}
            title={!canAdd ? t.addMainLotFirst : undefined}
          >
            {!canAdd ? t.addMainLotFirst : inCart ? t.inYourOrderAddAnother : t.addToOrder}
          </button>
        )}
      </div>
    </div>
  )
}

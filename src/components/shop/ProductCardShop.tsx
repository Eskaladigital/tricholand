'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/shop/cart-context'
import { formatPrice } from '@/types/shop'
import type { Product } from '@/types/shop'

interface AddToCartButtonProps {
  product: Product
  className?: string
}

export function AddToCartButton({ product, className = '' }: AddToCartButtonProps) {
  const { addItem, isInCart } = useCart()
  const inCart = isInCart(product.id)

  return (
    <button
      onClick={() => addItem(product)}
      className={`font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide transition-colors ${
        inCart
          ? 'bg-verde text-blanco hover:bg-verde-oscuro'
          : 'bg-naranja text-blanco hover:bg-marron'
      } ${className}`}
    >
      {inCart ? '✓ En tu pedido · Añadir otro' : 'Añadir al pedido →'}
    </button>
  )
}

interface ProductCardShopProps {
  product: Product
  locale: string
}

export function ProductCardShop({ product, locale }: ProductCardShopProps) {
  const isLowStock = product.stock_qty !== null && product.stock_qty <= 5

  return (
    <div className="group bg-blanco border border-linea hover:shadow-lg transition-all duration-300 flex flex-col">
      {/* Image */}
      <Link href={`/${locale}/tienda/${product.slug}`} className="relative overflow-hidden">
        <Image
          src={product.images[0]?.url || ''}
          alt={product.images[0]?.alt || product.name}
          width={600}
          height={240}
          className="w-full h-[220px] object-cover group-hover:scale-[1.04] transition-transform duration-400"
        />
        <span className="absolute top-3 left-3 bg-negro text-blanco px-2.5 py-1 font-[family-name:var(--font-archivo-narrow)] text-[0.72rem] font-semibold tracking-wide">
          {product.sku}
        </span>
        {product.featured && (
          <span className="absolute top-3 right-3 bg-naranja text-blanco px-2.5 py-1 font-[family-name:var(--font-archivo-narrow)] text-[0.65rem] font-bold uppercase tracking-wide">
            Destacado
          </span>
        )}
      </Link>

      {/* Body */}
      <div className="px-5 py-4 flex-1">
        <Link href={`/${locale}/tienda/${product.slug}`}>
          <h3 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold group-hover:text-naranja transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-marron-claro mt-1">{product.short_description}</p>

        {/* Price */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-[family-name:var(--font-archivo-narrow)] text-2xl font-bold text-naranja">
            {formatPrice(product.price_cents)}
          </span>
          <span className="text-xs text-marron-claro">/ {product.unit_label}</span>
        </div>

        {/* Stock */}
        {product.stock_qty !== null && (
          <p className={`text-xs mt-1 font-semibold ${isLowStock ? 'text-terracota' : 'text-verde'}`}>
            {isLowStock
              ? `⚡ Solo quedan ${product.stock_qty} lotes`
              : `● ${product.stock_qty} lotes disponibles`}
          </p>
        )}
      </div>

      {/* Add to cart */}
      <div className="px-5 pb-4">
        <AddToCartButton product={product} className="w-full py-3 px-4" />
      </div>
    </div>
  )
}

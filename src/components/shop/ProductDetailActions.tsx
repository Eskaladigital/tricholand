'use client'

import { useState } from 'react'
import { useCart } from '@/lib/shop/cart-context'
import { getDictionary } from '@/lib/i18n'
import type { Product } from '@/types/shop'

interface ProductDetailActionsProps {
  product: Product
  locale?: string
}

export function ProductDetailActions({ product, locale = 'es' }: ProductDetailActionsProps) {
  const { addItem, canAddProduct, isInCart } = useCart()
  const [qty, setQty] = useState(product.min_order_qty)
  const [added, setAdded] = useState(false)
  const t = getDictionary(locale).shop
  const { canAdd, reason } = canAddProduct(product)

  const handleAdd = () => {
    if (!canAdd) return
    addItem(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="space-y-4">
      {/* Quantity selector */}
      <div>
        <label className="font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro block mb-2">
          Cantidad de lotes
        </label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQty(Math.max(product.min_order_qty, qty - product.qty_step))}
            className="w-10 h-10 border border-linea text-lg font-bold hover:bg-crudo transition-colors"
          >
            −
          </button>
          <input
            type="number"
            value={qty}
            onChange={(e) => setQty(Math.max(product.min_order_qty, parseInt(e.target.value) || product.min_order_qty))}
            min={product.min_order_qty}
            step={product.qty_step}
            className="w-20 h-10 text-center border border-linea font-[family-name:var(--font-archivo-narrow)] text-lg font-bold focus:outline-none focus:border-naranja"
          />
          <button
            onClick={() => setQty(qty + product.qty_step)}
            className="w-10 h-10 border border-linea text-lg font-bold hover:bg-crudo transition-colors"
          >
            +
          </button>
        </div>
        <p className="text-xs text-marron-claro mt-1">
          Mín. {product.min_order_qty} {product.unit_label}
        </p>
      </div>

      {/* Add button */}
      <button
        onClick={handleAdd}
        disabled={!canAdd}
        className={`w-full py-4 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide transition-colors ${
          added
            ? 'bg-verde text-blanco'
            : canAdd
              ? 'bg-naranja text-blanco hover:bg-marron'
              : 'bg-linea text-marron-claro cursor-not-allowed'
        }`}
      >
        {added ? '✓ Añadido a tu pedido' : canAdd ? 'Añadir al pedido →' : t.addMainLotFirst}
      </button>

      {!canAdd && reason === 'addMainLotFirst' && (
        <p className="text-xs text-marron-claro text-center">
          {t.addMainLotFirst}
        </p>
      )}

      {isInCart(product.id) && !added && canAdd && (
        <p className="text-xs text-verde font-semibold text-center">
          ✓ Ya tienes este producto en tu pedido
        </p>
      )}

      {/* Process note */}
      <p className="text-xs text-marron-claro text-center leading-relaxed">
        Al añadir productos montas tu solicitud de pedido. No se cobra nada automáticamente.
        Revisamos tu pedido y te enviamos presupuesto final con link de pago.
      </p>
    </div>
  )
}

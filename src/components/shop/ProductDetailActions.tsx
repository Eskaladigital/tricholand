'use client'

import { useState } from 'react'
import { useCart } from '@/lib/shop/cart-context'
import type { Product } from '@/types/shop'

interface ProductDetailActionsProps {
  product: Product
}

export function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const { addItem, isInCart } = useCart()
  const [qty, setQty] = useState(product.min_order_qty)
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
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
        className={`w-full py-4 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide transition-colors ${
          added
            ? 'bg-verde text-blanco'
            : 'bg-naranja text-blanco hover:bg-marron'
        }`}
      >
        {added ? '✓ Añadido a tu pedido' : 'Añadir al pedido →'}
      </button>

      {isInCart(product.id) && !added && (
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

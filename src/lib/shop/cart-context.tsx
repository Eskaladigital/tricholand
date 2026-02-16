'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { Product } from '@/types/shop'
import { formatPrice } from '@/types/shop'

export interface CartItem {
  product: Product
  quantity: number
  notes: string
}

export interface CanAddResult {
  canAdd: boolean
  reason?: string
}

interface CartContextType {
  items: CartItem[]
  itemCount: number
  totalCents: number
  totalFormatted: string
  addItem: (product: Product, quantity?: number) => void
  canAddProduct: (product: Product) => CanAddResult
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  updateNotes: (productId: string, notes: string) => void
  clearCart: () => void
  isInCart: (productId: string) => boolean
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const canAddProduct = useCallback((product: Product): CanAddResult => {
    if (product.lot_type !== 'additional' || !product.additional_to_product_id) {
      return { canAdd: true }
    }
    const hasMainLot = items.some((item) => item.product.id === product.additional_to_product_id)
    if (!hasMainLot) {
      return { canAdd: false, reason: 'addMainLotFirst' }
    }
    return { canAdd: true }
  }, [items])

  const addItem = useCallback((product: Product, quantity: number = 1) => {
    if (product.lot_type === 'additional' && product.additional_to_product_id) {
      const hasMainLot = items.some((item) => item.product.id === product.additional_to_product_id)
      if (!hasMainLot) return
    }
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { product, quantity, notes: '' }]
    })
  }, [items])

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId))
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    )
  }, [removeItem])

  const updateNotes = useCallback((productId: string, notes: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, notes } : item
      )
    )
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const isInCart = useCallback(
    (productId: string) => items.some((item) => item.product.id === productId),
    [items]
  )

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalCents = items.reduce(
    (sum, item) => sum + item.product.price_cents * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        totalCents,
        totalFormatted: formatPrice(totalCents),
        addItem,
        canAddProduct,
        removeItem,
        updateQuantity,
        updateNotes,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextType {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider')
  }
  return context
}

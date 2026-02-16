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

export interface CartSummary {
  itemCount: number
  totalCents: number
  totalFormatted: string
  totalUnits: number  // Total de plantas
}

interface CartContextType {
  items: CartItem[]
  itemCount: number
  totalCents: number
  totalFormatted: string
  totalUnits: number  // Total de plantas en el carrito
  addItem: (product: Product, quantity?: number) => void
  canAddProduct: (product: Product) => CanAddResult
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  updateNotes: (productId: string, notes: string) => void
  clearCart: () => void
  isInCart: (productId: string) => boolean
  getItemQuantity: (productId: string) => number
  getSummary: () => CartSummary
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const canAddProduct = useCallback((product: Product): CanAddResult => {
    return { canAdd: true }
  }, [])

  const addItem = useCallback((product: Product, quantity: number = 1) => {
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
  }, [])

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

  const getItemQuantity = useCallback(
    (productId: string) => items.find((item) => item.product.id === productId)?.quantity || 0,
    [items]
  )

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalCents = items.reduce(
    (sum, item) => sum + item.product.price_cents * item.quantity,
    0
  )
  const totalUnits = items.reduce(
    (sum, item) => sum + (item.product.units_per_lot * item.quantity),
    0
  )

  const getSummary = useCallback((): CartSummary => ({
    itemCount,
    totalCents,
    totalFormatted: formatPrice(totalCents),
    totalUnits,
  }), [itemCount, totalCents, totalUnits])

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        totalCents,
        totalFormatted: formatPrice(totalCents),
        totalUnits,
        addItem,
        canAddProduct,
        removeItem,
        updateQuantity,
        updateNotes,
        clearCart,
        isInCart,
        getItemQuantity,
        getSummary,
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

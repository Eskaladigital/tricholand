'use client'

import Link from 'next/link'
import { useCart } from '@/lib/shop/cart-context'

export function CartButton({ locale }: { locale: string }) {
  const { itemCount, totalFormatted } = useCart()

  if (itemCount === 0) return null

  return (
    <Link
      href={`/${locale}/tienda/pedido`}
      className="fixed bottom-6 right-6 z-50 bg-naranja text-blanco px-5 py-3 shadow-lg hover:bg-marron transition-colors flex items-center gap-3 group"
    >
      <span className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide">
        Pedido ({itemCount})
      </span>
      <span className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold">
        {totalFormatted}
      </span>
      <span className="group-hover:translate-x-1 transition-transform">→</span>
    </Link>
  )
}

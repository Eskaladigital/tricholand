import { notFound } from 'next/navigation'
import { getOrderById } from '@/lib/actions/orders'
import { getProductsForSelect } from '@/lib/actions/products'
import { OrderDetailClient } from '@/components/admin/OrderDetailClient'

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const result = await getOrderById(id)
  if (!result) notFound()

  const products = await getProductsForSelect()

  return (
    <OrderDetailClient
      order={result.order}
      items={result.items}
      products={products}
    />
  )
}

'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { notFound } from 'next/navigation'
import { ProductForm } from '@/components/admin/ProductForm'
import { getProductById, updateProduct } from '@/lib/actions/products'
import type { Product } from '@/types/shop'

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    getProductById(id).then((p) => {
      setProduct(p)
      setLoading(false)
    })
  }, [id])

  if (loading) {
    return (
      <div className="py-8 text-marron-claro">Cargando...</div>
    )
  }

  if (!product) notFound()

  async function handleSave(data: Record<string, unknown>) {
    setIsSaving(true)
    const { error } = await updateProduct(id, data)
    setIsSaving(false)
    if (error) {
      alert(error)
      return
    }
    router.push('/administrator/products')
  }

  return (
    <>
        <div className="mb-8">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            Editar producto
          </h1>
          <p className="text-sm text-marron-claro mt-1">
            {product.name} · {product.sku}
          </p>
        </div>
        <ProductForm product={product} onSave={handleSave} isSaving={isSaving} />
    </>
  )
}

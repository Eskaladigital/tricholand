'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
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
  const [error, setError] = useState<string | null>(null)

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
    setError(null)
    const { error: saveError } = await updateProduct(id, data)
    setIsSaving(false)
    if (saveError) {
      setError(saveError)
      return
    }
    router.push('/administrator/products')
  }

  return (
    <>
        <div className="mb-8">
          <Link href="/administrator/products" className="inline-block mb-4 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro hover:text-naranja">
            ← Productos
          </Link>
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            Editar producto
          </h1>
          <p className="text-sm text-marron-claro mt-1">
            {product.name} · {product.sku}
          </p>
        </div>
        {error && (
          <p className="mb-4 px-4 py-2 text-sm bg-red-50 border border-red-200 text-red-800" role="alert">{error}</p>
        )}
        <ProductForm product={product} onSave={handleSave} isSaving={isSaving} />
    </>
  )
}

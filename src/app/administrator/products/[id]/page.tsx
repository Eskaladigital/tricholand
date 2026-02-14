'use client'

import { useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { notFound } from 'next/navigation'
import { ProductForm } from '@/components/admin/ProductForm'
import { getProductById } from '@/content/shop/products-demo'

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = getProductById(id)
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)

  if (!product) notFound()

  async function handleSave(data: Record<string, unknown>) {
    setIsSaving(true)
    // TODO: PUT a /api/admin/products/[id] (Supabase)
    console.log('💾 Editar producto:', id, data)

    await new Promise((r) => setTimeout(r, 800))
    setIsSaving(false)
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

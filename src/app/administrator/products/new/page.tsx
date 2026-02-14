'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ProductForm } from '@/components/admin/ProductForm'
import { createProduct } from '@/lib/actions/products'

export default function NewProductPage() {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)

  async function handleSave(data: Record<string, unknown>) {
    setIsSaving(true)
    const { error } = await createProduct(data)
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
            Nuevo producto
          </h1>
          <p className="text-sm text-marron-claro mt-1">
            Crea un nuevo lote o pack para la tienda B2B
          </p>
        </div>
        <ProductForm onSave={handleSave} isSaving={isSaving} />
    </>
  )
}

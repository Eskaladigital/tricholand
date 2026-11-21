'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ProductForm } from '@/components/admin/ProductForm'
import { createProduct } from '@/lib/actions/products'

export default function NewProductPage() {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSave(data: Record<string, unknown>) {
    setIsSaving(true)
    setError(null)
    const { error: saveError } = await createProduct(data)
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
            Nuevo producto
          </h1>
          <p className="text-sm text-marron-claro mt-1">
            Crea un nuevo lote o pack para la tienda B2B
          </p>
        </div>
        {error && (
          <p className="mb-4 px-4 py-2 text-sm bg-red-50 border border-red-200 text-red-800" role="alert">{error}</p>
        )}
        <ProductForm onSave={handleSave} isSaving={isSaving} />
    </>
  )
}

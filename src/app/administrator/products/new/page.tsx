'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { ProductForm } from '@/components/admin/ProductForm'

export default function NewProductPage() {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)

  async function handleSave(data: Record<string, unknown>) {
    setIsSaving(true)
    // TODO: POST a /api/admin/products (Supabase)
    console.log('📝 Nuevo producto:', data)

    // Simular guardado
    await new Promise((r) => setTimeout(r, 800))
    setIsSaving(false)
    router.push('/administrator/products')
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            Nuevo producto
          </h1>
          <p className="text-sm text-marron-claro mt-1">
            Crea un nuevo lote o pack para la tienda B2B
          </p>
        </div>
        <ProductForm onSave={handleSave} isSaving={isSaving} />
      </main>
    </div>
  )
}

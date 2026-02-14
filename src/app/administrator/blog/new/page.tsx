'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BlogPostForm } from '@/components/admin/BlogPostForm'
import { createBlogPost } from '@/lib/actions/blog'

export default function NewBlogPostPage() {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)

  async function handleSave(data: Record<string, unknown>) {
    setIsSaving(true)
    const { error } = await createBlogPost(data)
    setIsSaving(false)
    if (error) {
      alert(error)
      return
    }
    router.push('/administrator/blog')
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
          Nuevo artículo
        </h1>
        <p className="text-sm text-marron-claro mt-1">
          Crea un nuevo artículo para el blog
        </p>
      </div>
      <BlogPostForm onSave={handleSave} isSaving={isSaving} />
    </>
  )
}

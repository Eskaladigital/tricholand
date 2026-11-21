'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BlogPostForm } from '@/components/admin/BlogPostForm'
import { createBlogPost } from '@/lib/actions/blog'

export default function NewBlogPostPage() {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSave(data: Record<string, unknown>) {
    setIsSaving(true)
    setError(null)
    const { error: saveError, id } = await createBlogPost(data)
    setIsSaving(false)
    if (saveError) {
      setError(saveError)
      return
    }
    if (id) router.push(`/administrator/blog/${id}`)
    else router.push('/administrator/blog')
  }

  return (
    <>
      <div className="mb-8">
        <Link href="/administrator/blog" className="inline-block mb-4 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro hover:text-naranja">
          ← Blog
        </Link>
        <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
          Nuevo artículo
        </h1>
        <p className="text-sm text-marron-claro mt-1">
          Crea un nuevo artículo para el blog
        </p>
      </div>
      {error && (
        <p className="mb-4 px-4 py-2 text-sm bg-red-50 border border-red-200 text-red-800" role="alert">{error}</p>
      )}
      <BlogPostForm onSave={handleSave} isSaving={isSaving} />
    </>
  )
}

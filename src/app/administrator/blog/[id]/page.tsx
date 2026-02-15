'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { notFound } from 'next/navigation'
import { BlogPostForm } from '@/components/admin/BlogPostForm'
import { getBlogPostById, updateBlogPost, deleteBlogPost } from '@/lib/actions/blog'
import type { AdminBlogPost } from '@/lib/actions/blog'

export default function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [post, setPost] = useState<AdminBlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => {
    getBlogPostById(id).then((p) => {
      setPost(p)
      setLoading(false)
    })
  }, [id])

  if (loading) {
    return <div className="py-8 text-marron-claro">Cargando...</div>
  }

  if (!post) notFound()

  async function handleSave(data: Record<string, unknown>) {
    setIsSaving(true)
    setSaveSuccess(false)
    const { error } = await updateBlogPost(id, data)
    setIsSaving(false)
    if (error) {
      alert(error)
      return
    }
    // Refrescar el post con los nuevos datos y quedarnos en la página
    const updated = await getBlogPostById(id)
    if (updated) setPost(updated)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  async function handleDelete() {
    setIsSaving(true)
    const { error } = await deleteBlogPost(id)
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
        <div className="flex items-center gap-4">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            Editar artículo
          </h1>
          {saveSuccess && (
            <span className="px-3 py-1 bg-verde/10 text-verde border border-verde/30 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase animate-pulse">
              ✓ Guardado correctamente
            </span>
          )}
        </div>
        <p className="text-sm text-marron-claro mt-1">
          {post.title} · {post.locale.toUpperCase()}
        </p>
      </div>
      <BlogPostForm post={post} onSave={handleSave} onDelete={handleDelete} isSaving={isSaving} />
    </>
  )
}

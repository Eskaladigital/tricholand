'use client'

import { useState, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import type { AdminBlogPost } from '@/lib/actions/blog'

interface BlogPostFormProps {
  post?: AdminBlogPost
  onSave: (data: Record<string, unknown>) => void
  onDelete?: () => void
  isSaving: boolean
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const LOCALES = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
  { code: 'nl', label: 'Nederlands' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'it', label: 'Italiano' },
  { code: 'pt', label: 'Português' },
]

export function BlogPostForm({ post, onSave, onDelete, isSaving }: BlogPostFormProps) {
  const [title, setTitle] = useState(post?.title ?? '')
  const [slug, setSlug] = useState(post?.slug ?? '')
  const [sourceSlug, setSourceSlug] = useState(post?.source_slug ?? '')
  const [description, setDescription] = useState(post?.description ?? '')
  const [date, setDate] = useState(post?.date ?? new Date().toISOString().split('T')[0])
  const [image, setImage] = useState(post?.image ?? '')
  const [imageAlt, setImageAlt] = useState(post?.image_alt ?? '')
  const [tagsStr, setTagsStr] = useState((post?.tags ?? []).join(', '))
  const [readingTime, setReadingTime] = useState(post?.reading_time ?? 5)
  const [locale, setLocale] = useState(post?.locale ?? 'es')
  const [status, setStatus] = useState(post?.status ?? 'draft')
  const [metaTitle, setMetaTitle] = useState(post?.meta_title ?? '')
  const [metaDescription, setMetaDescription] = useState(post?.meta_description ?? '')

  const editorRef = useRef<{ getContent: () => string } | null>(null)

  const autoSlug = !post
  function handleTitleChange(value: string) {
    setTitle(value)
    if (autoSlug) {
      const s = slugify(value)
      setSlug(s)
      if (!sourceSlug || sourceSlug === slugify(title)) setSourceSlug(s)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const content = editorRef.current?.getContent() ?? post?.content ?? ''
    onSave({
      title,
      slug,
      source_slug: sourceSlug || slug,
      description,
      date,
      image,
      image_alt: imageAlt,
      tags: tagsStr.split(',').map((t) => t.trim()).filter(Boolean),
      reading_time: readingTime,
      content,
      locale,
      status,
      meta_title: metaTitle || null,
      meta_description: metaDescription || null,
    })
  }

  const fieldClass = 'w-full px-4 py-2.5 border border-linea text-sm focus:outline-none focus:border-naranja transition-colors bg-blanco'
  const labelClass = 'block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1'

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Información básica */}
      <section className="bg-blanco border border-linea p-6">
        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase mb-4 pb-2 border-b border-linea">
          Información básica
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className={labelClass}>Título *</label>
            <input type="text" value={title} onChange={(e) => handleTitleChange(e.target.value)} required className={fieldClass} placeholder="Guía de enfermedades fúngicas en cactus" />
          </div>
          <div>
            <label className={labelClass}>Slug (URL)</label>
            <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} className={fieldClass} />
          </div>
          <div>
            <label className={labelClass}>Source slug (vincula traducciones)</label>
            <input type="text" value={sourceSlug} onChange={(e) => setSourceSlug(e.target.value)} className={fieldClass} placeholder="slug en español" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Descripción / Resumen</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className={`${fieldClass} resize-none`} />
          </div>
          <div>
            <label className={labelClass}>Fecha de publicación</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={fieldClass} />
          </div>
          <div>
            <label className={labelClass}>Tiempo de lectura (min)</label>
            <input type="number" min={1} value={readingTime} onChange={(e) => setReadingTime(parseInt(e.target.value) || 5)} className={fieldClass} />
          </div>
          <div>
            <label className={labelClass}>Idioma</label>
            <select value={locale} onChange={(e) => setLocale(e.target.value)} className={fieldClass}>
              {LOCALES.map((l) => (
                <option key={l.code} value={l.code}>{l.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Estado</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className={fieldClass}>
              <option value="draft">Borrador</option>
              <option value="published">Publicado</option>
              <option value="archived">Archivado</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Tags (separados por coma)</label>
            <input type="text" value={tagsStr} onChange={(e) => setTagsStr(e.target.value)} className={fieldClass} placeholder="cactus, hongos, prevención" />
          </div>
        </div>
      </section>

      {/* Imagen */}
      <section className="bg-blanco border border-linea p-6">
        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase mb-4 pb-2 border-b border-linea">
          Imagen destacada
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>URL de la imagen</label>
            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className={fieldClass} placeholder="/images/blog/..." />
          </div>
          <div>
            <label className={labelClass}>Texto alt</label>
            <input type="text" value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} className={fieldClass} />
          </div>
        </div>
        {image && (
          <div className="mt-3">
            <img src={image} alt={imageAlt} className="w-48 h-36 object-cover border border-linea" />
          </div>
        )}
      </section>

      {/* Content Editor */}
      <section className="bg-blanco border border-linea p-6">
        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase mb-4 pb-2 border-b border-linea">
          Contenido del artículo
        </h2>
        <Editor
          onInit={(_evt, editor) => { editorRef.current = editor }}
          initialValue={post?.content ?? ''}
          apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
          licenseKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY ? undefined : 'gpl'}
          init={{
            height: 500,
            menubar: true,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
              'preview', 'anchor', 'searchreplace', 'visualblocks', 'code',
              'fullscreen', 'insertdatetime', 'media', 'table', 'help', 'wordcount',
            ],
            toolbar:
              'undo redo | blocks | bold italic forecolor | ' +
              'alignleft aligncenter alignright alignjustify | ' +
              'bullist numlist outdent indent | link image | ' +
              'removeformat | code fullscreen | help',
            content_style: 'body { font-family: system-ui, sans-serif; font-size: 14px; }',
            branding: false,
            promotion: false,
          }}
        />
      </section>

      {/* SEO */}
      <section className="bg-blanco border border-linea p-6">
        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase mb-4 pb-2 border-b border-linea">
          SEO (opcional)
        </h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className={labelClass}>Meta título</label>
            <input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} className={fieldClass} placeholder="Se usa el título si está vacío" />
          </div>
          <div>
            <label className={labelClass}>Meta descripción</label>
            <textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} rows={2} className={`${fieldClass} resize-none`} placeholder="Se usa la descripción si está vacío" />
          </div>
        </div>
      </section>

      {/* Submit */}
      <div className="flex gap-4 justify-between">
        <div>
          {post && onDelete && (
            <button
              type="button"
              onClick={() => {
                if (confirm('¿Eliminar este artículo? Esta acción no se puede deshacer.')) onDelete()
              }}
              className="px-6 py-3 border border-red-300 text-red-600 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-red-50 transition-colors"
            >
              Eliminar
            </button>
          )}
        </div>
        <div className="flex gap-4">
          <a href="/administrator/blog" className="px-6 py-3 border border-linea font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-crudo transition-colors">
            Cancelar
          </a>
          <button type="submit" disabled={isSaving}
            className="px-8 py-3 bg-naranja text-blanco font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors disabled:opacity-50">
            {isSaving ? 'Guardando...' : post ? 'Guardar cambios' : 'Crear artículo'}
          </button>
        </div>
      </div>
    </form>
  )
}

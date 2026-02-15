'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { Editor } from '@tinymce/tinymce-react'
import { marked } from 'marked'
import type { AdminBlogPost } from '@/lib/actions/blog'
import { getBlogPostsBySourceSlug } from '@/lib/actions/blog'
import { MediaPickerModal } from './MediaPickerModal'

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

const LOCALE_FLAG: Record<string, string> = {
  es: '🇪🇸', en: '🇬🇧', nl: '🇳🇱', fr: '🇫🇷', de: '🇩🇪', it: '🇮🇹', pt: '🇵🇹',
}

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
  const [status, setStatus] = useState(post?.status ?? 'draft')
  const [metaTitle, setMetaTitle] = useState(post?.meta_title ?? '')
  const [metaDescription, setMetaDescription] = useState(post?.meta_description ?? '')

  const editorRef = useRef<{ getContent: () => string } | null>(null)
  const [mediaPickerOpen, setMediaPickerOpen] = useState<'featured' | 'editor' | null>(null)
  const tinymceFilePickerRef = useRef<((url: string, meta?: { alt?: string }) => void) | null>(null)
  const [translations, setTranslations] = useState<AdminBlogPost[]>([])
  const [selectedLocale, setSelectedLocale] = useState('es')
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    if (post?.source_slug) {
      getBlogPostsBySourceSlug(post.source_slug).then(setTranslations)
    } else {
      setTranslations([])
    }
  }, [post?.source_slug])

  const translationByLocale = translations.find((t) => t.locale === selectedLocale)
  const isEditingEs = selectedLocale === 'es'
  const hasTranslation = !!translationByLocale

  async function handleGenerateTranslations() {
    if (!post?.source_slug) return
    setIsGenerating(true)
    try {
      const res = await fetch('/api/blog/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source_slug: post.source_slug }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Error al generar')
      const updated = await getBlogPostsBySourceSlug(post.source_slug)
      setTranslations(updated)
      alert(`Traducciones generadas: ${(json.created ?? []).join(', ')}${json.errors?.length ? `\nErrores: ${json.errors.join(', ')}` : ''}`)
    } catch (err) {
      alert((err as Error).message)
    }
    setIsGenerating(false)
  }

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
      locale: 'es',
      status,
      meta_title: metaTitle || null,
      meta_description: metaDescription || null,
    })
  }

  const fieldClass = 'w-full px-4 py-2.5 border border-linea text-sm focus:outline-none focus:border-naranja transition-colors bg-blanco'
  const labelClass = 'block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1'

  /** Contenido para TinyMCE. Formato estándar: HTML. Fallback: Markdown → HTML (legacy) */
  const contentForEditor = useMemo(() => {
    const raw = post?.content ?? ''
    if (!raw) return ''
    if (raw.trim().startsWith('<')) return raw // HTML — TinyMCE trabaja nativamente con HTML
    const looksLikeMarkdown = raw.includes('##') || raw.includes('**') || raw.includes('\n* ') || raw.startsWith('#')
    return looksLikeMarkdown ? (marked.parse(raw, { async: false }) as string) : raw
  }, [post?.content])

  return (
    <div className="space-y-6">
      {/* Selector de idioma + Generar traducciones (solo al editar) */}
      {post && (
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-crudo border border-linea">
          <div className="flex flex-wrap gap-1">
            {LOCALES.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => setSelectedLocale(l.code)}
                className={`px-3 py-1.5 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase border transition-colors ${
                  selectedLocale === l.code
                    ? 'bg-negro text-crudo border-negro'
                    : 'bg-blanco border-linea hover:border-naranja'
                }`}
              >
                {LOCALE_FLAG[l.code] ?? l.code} {l.code}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={handleGenerateTranslations}
            disabled={isGenerating}
            className="px-4 py-2 bg-verde text-blanco font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase hover:bg-naranja transition-colors disabled:opacity-50"
          >
            {isGenerating ? 'Generando...' : 'Generar traducciones'}
          </button>
        </div>
      )}

      {/* Vista solo lectura para traducciones */}
      {post && !isEditingEs && (
        <div className="bg-blanco border border-linea p-6">
          {hasTranslation ? (
            <div className="space-y-4">
              <p className="text-sm text-marron-claro">
                Vista de solo lectura. Las traducciones se generan automáticamente desde el español.
              </p>
              <div>
                <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold uppercase mb-2">{translationByLocale.title}</h2>
                <p className="text-sm text-marron-claro mb-4">{translationByLocale.description}</p>
                {translationByLocale.image && (
                  <div className="relative w-48 h-36 rounded overflow-hidden border border-linea mb-4">
                    <Image src={translationByLocale.image} alt={translationByLocale.image_alt ?? ''} fill className="object-cover" sizes="192px" unoptimized={translationByLocale.image.startsWith('http')} />
                  </div>
                )}
                <div
                  className="prose prose-sm max-w-none border border-linea p-4 bg-crudo/30"
                  dangerouslySetInnerHTML={{
                    __html: (() => {
                      const c = translationByLocale.content ?? ''
                      if (!c) return ''
                      if (c.trim().startsWith('<')) return c // HTML
                      const md = c.includes('##') || c.includes('**') || c.startsWith('#')
                      return md ? (marked.parse(c, { async: false }) as string) : c
                    })(),
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-marron-claro mb-4">No hay traducción en {LOCALES.find((l) => l.code === selectedLocale)?.label ?? selectedLocale}.</p>
              <p className="text-sm text-marron-claro mb-4">Guarda los cambios en español y pulsa «Generar traducciones» para crearla.</p>
              <button
                type="button"
                onClick={handleGenerateTranslations}
                disabled={isGenerating}
                className="px-5 py-2.5 bg-verde text-blanco font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase hover:bg-naranja transition-colors disabled:opacity-50"
              >
                {isGenerating ? 'Generando...' : 'Generar traducciones'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Formulario editable (solo español o nuevo) */}
      {(isEditingEs || !post) && (
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
            <div className="flex gap-2">
              <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className={fieldClass} placeholder="/images/blog/..." />
              <button
                type="button"
                onClick={() => setMediaPickerOpen('featured')}
                className="px-4 py-2.5 bg-naranja text-blanco font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase whitespace-nowrap hover:bg-verde transition-colors"
              >
                Gestor de medios
              </button>
            </div>
          </div>
          <div>
            <label className={labelClass}>Texto alt</label>
            <input type="text" value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} className={fieldClass} />
          </div>
        </div>
        {image && (
          <div className="mt-3 relative w-48 h-36 rounded overflow-hidden border border-linea bg-crudo">
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="192px"
              unoptimized={image.startsWith('http')}
            />
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
          initialValue={contentForEditor}
          apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
          licenseKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY ? undefined : 'gpl'}
          init={{
            height: 600,
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
            content_style: `
              @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=Archivo+Narrow:wght@400;500;600;700&display=swap');
              body {
                font-family: 'Archivo', system-ui, sans-serif;
                font-size: 16px;
                line-height: 1.625;
                color: #6b6258;
                padding: 1.5rem;
                max-width: 48rem;
              }
              p { margin-bottom: 1rem; }
              p:last-child { margin-bottom: 0; }
              h2 {
                font-family: 'Archivo Narrow', sans-serif;
                font-size: 1.25rem;
                font-weight: 700;
                text-transform: uppercase;
                margin-top: 2rem;
                margin-bottom: 0.75rem;
                padding-top: 1rem;
                border-top: 1px solid #d4cfc3;
                color: #1a1a1a;
              }
              h2:first-child { margin-top: 0; padding-top: 0; border-top: none; }
              h3 {
                font-family: 'Archivo Narrow', sans-serif;
                font-size: 1.125rem;
                font-weight: 700;
                margin-top: 1.5rem;
                margin-bottom: 0.5rem;
                color: #1a1a1a;
              }
              ul {
                margin: 1rem 0;
                padding-left: 1.5rem;
              }
              li {
                margin-bottom: 0.5rem;
                color: #6b6258;
              }
              a { color: #c4652a; text-decoration: underline; }
            `,
            branding: false,
            promotion: false,
            file_picker_callback: (callback, _value, meta) => {
              if (meta.filetype === 'image') {
                tinymceFilePickerRef.current = callback
                setMediaPickerOpen('editor')
              }
            },
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
      )}

      {/* Media modals — FUERA del <form> para evitar submits accidentales */}
      <MediaPickerModal
        open={mediaPickerOpen === 'featured'}
        onClose={() => setMediaPickerOpen(null)}
        onSelect={(url) => { setImage(url); setMediaPickerOpen(null) }}
        title="Seleccionar imagen destacada"
      />
      <MediaPickerModal
        open={mediaPickerOpen === 'editor'}
        onClose={() => { setMediaPickerOpen(null); tinymceFilePickerRef.current = null }}
        onSelect={(url) => {
          tinymceFilePickerRef.current?.(url, { alt: '' })
          tinymceFilePickerRef.current = null
          setMediaPickerOpen(null)
        }}
        title="Insertar imagen en el contenido"
      />
    </div>
  )
}

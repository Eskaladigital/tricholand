'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { AdminBlogPost } from '@/lib/actions/blog'
import { setBlogPostStatusFromForm } from '@/lib/actions/blog'

const STATUS_LABEL: Record<string, { text: string; cls: string }> = {
  published: { text: 'Publicado', cls: 'bg-green-100 text-green-700' },
  draft: { text: 'Borrador', cls: 'bg-gray-100 text-gray-600' },
  archived: { text: 'Archivado', cls: 'bg-gray-100 text-gray-400' },
}

type SortKey = 'title' | 'date' | 'reading_time' | 'status' | null
type SortDir = 'asc' | 'desc'

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) {
    return (
      <span className="inline-block ml-1 text-marron-claro/50" title="Ordenar">
        ↕
      </span>
    )
  }
  return (
    <span className="inline-block ml-1 text-naranja font-bold" title={dir === 'asc' ? 'Ascendente (clic para descendente)' : 'Descendente (clic para ascendente)'}>
      {dir === 'asc' ? '↑' : '↓'}
    </span>
  )
}

export function BlogTable({ posts }: { posts: AdminBlogPost[] }) {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('date')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  const filtered = useMemo(() => {
    if (!search.trim()) return posts
    const q = search.toLowerCase().trim()
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.description ?? '').toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        (p.tags ?? []).some((t) => t.toLowerCase().includes(q))
    )
  }, [posts, search])

  const sorted = useMemo(() => {
    if (!sortKey) return filtered
    return [...filtered].sort((a, b) => {
      let cmp = 0
      switch (sortKey) {
        case 'title':
          cmp = (a.title ?? '').localeCompare(b.title ?? '')
          break
        case 'date':
          cmp = (a.date ?? '').localeCompare(b.date ?? '')
          break
        case 'reading_time':
          cmp = (a.reading_time ?? 0) - (b.reading_time ?? 0)
          break
        case 'status':
          cmp = (a.status ?? '').localeCompare(b.status ?? '')
          break
        default:
          return 0
      }
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [filtered, sortKey, sortDir])

  function handleSort(key: SortKey) {
    if (!key) return
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir(key === 'date' ? 'desc' : 'asc')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <input
            type="search"
            placeholder="Buscar por título, descripción, slug o tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-linea rounded text-sm focus:outline-none focus:ring-2 focus:ring-naranja focus:border-transparent bg-blanco"
            aria-label="Buscar artículos"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-marron-claro" aria-hidden>
            🔍
          </span>
        </div>
        <p className="text-sm text-marron-claro">
          {filtered.length === posts.length ? (
            <>{posts.length} artículos</>
          ) : (
            <>
              {filtered.length} de {posts.length} artículos
            </>
          )}
        </p>
      </div>

      <div className="bg-blanco border border-linea overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-crudo border-b border-linea">
                <th className="text-left px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro w-16">
                  Imagen
                </th>
                <th className="text-left px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">
                  <button
                    type="button"
                    onClick={() => handleSort('title')}
                    className="inline-flex items-center hover:text-naranja transition-colors"
                  >
                    Título
                    <SortIcon active={sortKey === 'title'} dir={sortDir} />
                  </button>
                </th>
                <th className="text-center px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">
                  <button
                    type="button"
                    onClick={() => handleSort('date')}
                    className="inline-flex items-center hover:text-naranja transition-colors mx-auto"
                  >
                    Fecha
                    <SortIcon active={sortKey === 'date'} dir={sortDir} />
                  </button>
                </th>
                <th className="text-center px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">
                  <button
                    type="button"
                    onClick={() => handleSort('reading_time')}
                    className="inline-flex items-center hover:text-naranja transition-colors mx-auto"
                  >
                    Lectura
                    <SortIcon active={sortKey === 'reading_time'} dir={sortDir} />
                  </button>
                </th>
                <th className="text-left px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro max-w-[200px]">
                  Descripción
                </th>
                <th className="text-left px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">
                  Tags
                </th>
                <th className="text-center px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">
                  <button
                    type="button"
                    onClick={() => handleSort('status')}
                    className="inline-flex items-center hover:text-naranja transition-colors mx-auto"
                  >
                    Estado
                    <SortIcon active={sortKey === 'status'} dir={sortDir} />
                  </button>
                </th>
                <th className="text-center px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-marron-claro">
                    {search.trim() ? 'No hay artículos que coincidan con la búsqueda.' : 'No hay artículos. Crea el primero para empezar.'}
                  </td>
                </tr>
              ) : (
                sorted.map((post) => {
                  const st = STATUS_LABEL[post.status] ?? STATUS_LABEL.draft
                  return (
                    <tr key={post.id} className="border-b border-linea/50 hover:bg-crudo/50 transition-colors">
                      <td className="px-4 py-3">
                        {post.image ? (
                          <div className="relative w-12 h-12 rounded overflow-hidden bg-crudo flex-shrink-0">
                            <Image
                              src={post.image}
                              alt={post.image_alt || post.title}
                              width={48}
                              height={48}
                              className="object-cover w-full h-full"
                              unoptimized
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded bg-linea/30 flex items-center justify-center text-marron-claro text-xs">
                            —
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <span className="font-bold block">{post.title}</span>
                          <span className="text-xs text-marron-claro">/es/blog/{post.slug}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center text-xs text-marron-claro">
                        {post.date}
                      </td>
                      <td className="px-4 py-3 text-center text-xs text-marron-claro">
                        {post.reading_time} min
                      </td>
                      <td className="px-4 py-3 text-xs text-marron-claro max-w-[200px] truncate" title={post.description || undefined}>
                        {post.description || '—'}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {(post.tags || []).slice(0, 3).map((t) => (
                            <span key={t} className="px-1.5 py-0.5 bg-crudo text-marron-claro text-xs rounded">
                              {t}
                            </span>
                          ))}
                          {(post.tags?.length ?? 0) > 3 && (
                            <span className="text-marron-claro text-xs">+{(post.tags?.length ?? 0) - 3}</span>
                          )}
                          {(!post.tags || post.tags.length === 0) && <span className="text-marron-claro text-xs">—</span>}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-0.5 text-xs font-bold uppercase ${st.cls}`}>
                          {st.text}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <BlogRowActions post={post} />
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function BlogRowActions({ post }: { post: AdminBlogPost }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {post.status !== 'published' && (
        <form action={setBlogPostStatusFromForm} className="inline">
          <input type="hidden" name="id" value={post.id} />
          <input type="hidden" name="status" value="published" />
          <button
            type="submit"
            className="px-2 py-1 bg-green-600 text-white text-xs font-bold uppercase hover:bg-green-700 transition-colors"
          >
            Publicar
          </button>
        </form>
      )}
      {post.status === 'published' && (
        <form action={setBlogPostStatusFromForm} className="inline">
          <input type="hidden" name="id" value={post.id} />
          <input type="hidden" name="status" value="draft" />
          <button
            type="submit"
            className="px-2 py-1 bg-amber-600 text-white text-xs font-bold uppercase hover:bg-amber-700 transition-colors"
          >
            Despublicar
          </button>
        </form>
      )}
      <Link
        href={`/administrator/blog/${post.id}`}
        className="text-naranja font-semibold hover:underline text-xs"
      >
        Editar
      </Link>
    </div>
  )
}

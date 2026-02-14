'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { BlogPostMeta } from '@/types/blog'
import { formatDate } from '@/lib/utils'

// ─── Imágenes propias de Tricholand ───────────────────────────
const BLOG_IMAGES = [
  '/images/blog/Tricholand_blog_1.webp',
  '/images/blog/Tricholand_blog_2.webp',
  '/images/blog/Tricholand_blog_3.webp',
  '/images/blog/Tricholand_blog_4.webp',
  '/images/blog/Tricholand_blog_5.webp',
  '/images/blog/Tricholand_blog_6.webp',
  '/images/blog/Tricholand_blog_7.webp',
  '/images/blog/Tricholand_blog_8.webp',
  '/images/varieties/Trichocereus_Pachanoi_1.webp',
  '/images/varieties/Trichocereus_Pachanoi_2.webp',
  '/images/varieties/Trichocereus_Bridgessi_1.webp',
  '/images/varieties/Trichocereus_Bridgessi_2.webp',
  '/images/varieties/Trichocereus_peruvianus_1.webp',
  '/images/varieties/Trichocereus_pasacana_1.webp',
  '/images/varieties/Trichocereus_terscheckii_1.webp',
  '/images/varieties/Trichocereus_terscheckii_2.webp',
  '/images/varieties/Otros_cactus.webp',
  '/images/varieties/Otros_cactus_2.webp',
  '/images/vivero/vivero_mayorista_cactus.webp',
  '/images/vivero/productores_cactus_1.webp',
  '/images/vivero/productores_cactus_2.webp',
  '/images/products/producto_trichocereus_pachanoi_1.webp',
  '/images/products/producto_trichocereus_pachanoi_2.webp',
  '/images/products/producto_trichocereus_bridgessi_1.webp',
  '/images/products/producto_trichocereus_bridgessi_2.webp',
  '/images/products/producto_trichocereus_peruvianus_1.webp',
  '/images/products/producto_trichocereus_pachanoi_bio_1_v2.webp',
  '/images/products/producto_otros_pachanoi_crestado_1.webp',
  '/images/vivero/vivero-001.webp',
  '/images/vivero/vivero-002.webp',
  '/images/vivero/vivero-003.webp',
  '/images/vivero/vivero-004.webp',
  '/images/vivero/vivero-005.webp',
]

function getImageForPost(slug: string, index: number): string {
  // Deterministic image based on slug hash
  let hash = 0
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 5) - hash + slug.charCodeAt(i)) | 0
  }
  return BLOG_IMAGES[Math.abs(hash) % BLOG_IMAGES.length]
}

interface BlogGridProps {
  posts: BlogPostMeta[]
  locale: string
}

const POSTS_PER_PAGE = 12

export function BlogGrid({ posts, locale }: BlogGridProps) {
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE)

  // Extract unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    posts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)))
    return Array.from(tagSet).sort()
  }, [posts])

  // Filter posts
  const filtered = useMemo(() => {
    let result = posts
    if (activeTag) {
      result = result.filter((p) => p.tags.includes(activeTag))
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
    }
    return result
  }, [posts, activeTag, search])

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  // Featured post (first one)
  const featured = visible[0]
  const rest = visible.slice(1)

  return (
    <div>
      {/* Search + Tags bar */}
      <div className="mb-10 space-y-4">
        {/* Search */}
        <div className="relative max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setVisibleCount(POSTS_PER_PAGE) }}
            placeholder={locale === 'es' ? 'Buscar artículos...' : 'Search articles...'}
            className="w-full bg-blanco border border-linea px-4 py-2.5 pr-10 text-sm font-[family-name:var(--font-archivo)] text-negro placeholder:text-marron-claro/60 focus:outline-none focus:border-naranja transition-colors"
          />
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-marron-claro" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => { setActiveTag(null); setVisibleCount(POSTS_PER_PAGE) }}
            className={`px-3 py-1 text-xs font-[family-name:var(--font-archivo-narrow)] font-semibold uppercase tracking-wide border transition-colors ${
              !activeTag
                ? 'bg-negro text-crudo border-negro'
                : 'bg-transparent text-marron-claro border-linea hover:border-negro hover:text-negro'
            }`}
          >
            {locale === 'es' ? 'Todos' : 'All'}
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => { setActiveTag(activeTag === tag ? null : tag); setVisibleCount(POSTS_PER_PAGE) }}
              className={`px-3 py-1 text-xs font-[family-name:var(--font-archivo-narrow)] font-semibold uppercase tracking-wide border transition-colors ${
                activeTag === tag
                  ? 'bg-negro text-crudo border-negro'
                  : 'bg-transparent text-marron-claro border-linea hover:border-negro hover:text-negro'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      {(search || activeTag) && (
        <p className="text-xs text-marron-claro mb-6 font-[family-name:var(--font-archivo-narrow)] uppercase tracking-wide">
          {filtered.length} {locale === 'es' ? 'artículos encontrados' : 'articles found'}
        </p>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-marron-claro text-lg">
            {locale === 'es' ? 'No se encontraron artículos.' : 'No articles found.'}
          </p>
        </div>
      )}

      {/* Featured post (hero-style) */}
      {featured && !search && !activeTag && (
        <Link
          href={`/${locale}/blog/${featured.slug}`}
          className="group block mb-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-blanco border border-linea overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-[240px] md:h-[340px] overflow-hidden">
              <Image
                src={getImageForPost(featured.slug, 0)}
                alt={featured.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={70}
                className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-naranja text-blanco px-2 py-0.5 font-[family-name:var(--font-archivo-narrow)] text-[0.65rem] font-bold uppercase tracking-wider">
                  {locale === 'es' ? 'Destacado' : 'Featured'}
                </span>
                <time className="font-[family-name:var(--font-archivo-narrow)] text-xs text-marron-claro">
                  {formatDate(featured.date, locale)}
                </time>
              </div>
              <h2 className="font-[family-name:var(--font-archivo-narrow)] text-xl md:text-2xl font-bold leading-tight group-hover:text-naranja transition-colors mb-3">
                {featured.title}
              </h2>
              <p className="text-sm text-marron-claro line-clamp-3 mb-4">
                {featured.description}
              </p>
              <div className="flex items-center gap-3">
                <span className="font-[family-name:var(--font-archivo-narrow)] text-xs text-marron-claro">
                  {featured.readingTime} min {locale === 'es' ? 'de lectura' : 'read'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {featured.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="bg-verde-claro text-verde px-2 py-0.5 font-[family-name:var(--font-archivo-narrow)] text-[0.6rem] font-semibold tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Posts grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(search || activeTag ? visible : rest).map((post, i) => (
          <Link
            key={post.slug}
            href={`/${locale}/blog/${post.slug}`}
            className="group bg-blanco border border-linea hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
          >
            <div className="relative overflow-hidden h-[180px]">
              <Image
                src={getImageForPost(post.slug, i + 1)}
                alt={post.imageAlt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={65}
                className="object-cover group-hover:scale-[1.04] transition-transform duration-400"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-negro/30 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <span className="font-[family-name:var(--font-archivo-narrow)] text-[0.65rem] text-blanco/90 font-semibold tracking-wide bg-negro/50 px-2 py-0.5 backdrop-blur-sm">
                  {post.readingTime} min
                </span>
              </div>
            </div>

            <div className="px-5 py-4">
              <time className="font-[family-name:var(--font-archivo-narrow)] text-[0.7rem] text-marron-claro uppercase tracking-wide">
                {formatDate(post.date, locale)}
              </time>

              <h2 className="font-[family-name:var(--font-archivo-narrow)] text-[1.05rem] font-bold group-hover:text-naranja transition-colors leading-tight mt-1.5 line-clamp-2">
                {post.title}
              </h2>
              <p className="text-sm text-marron-claro mt-2 line-clamp-2 leading-relaxed">
                {post.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-linea/60">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="bg-verde-claro text-verde px-2 py-0.5 font-[family-name:var(--font-archivo-narrow)] text-[0.6rem] font-semibold tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Load more */}
      {hasMore && (
        <div className="text-center mt-10">
          <button
            onClick={() => setVisibleCount((c) => c + POSTS_PER_PAGE)}
            className="inline-flex items-center gap-2 bg-negro text-crudo px-6 py-2.5 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-naranja transition-colors"
          >
            {locale === 'es' ? 'Ver más artículos' : 'Load more articles'}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

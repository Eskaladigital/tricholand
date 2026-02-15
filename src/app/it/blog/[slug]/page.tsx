import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { getPostBySlug, getAllPostSlugs, getPostsMeta, getSlugsByLocaleForArticle } from '@/lib/blog'
import { formatDate } from '@/lib/utils'
import { getFullPath } from '@/lib/i18n/paths'

const LOCALE = 'it'
const BASE_URL = 'https://www.tricholand.com'

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs(LOCALE)
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug, LOCALE)
  if (!post) return { title: 'Post non trovato' }

  const slugsByLocale = await getSlugsByLocaleForArticle(slug, LOCALE)
  const languages: Record<string, string> = slugsByLocale
    ? Object.fromEntries(
        Object.entries(slugsByLocale).map(([loc, s]) => [loc, `${BASE_URL}/${loc}/blog/${s}`])
      )
    : { [LOCALE]: `${BASE_URL}/${LOCALE}/blog/${slug}` }
  languages['x-default'] = languages['es'] ?? Object.values(languages)[0]

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `${BASE_URL}/${LOCALE}/blog/${slug}`,
      languages,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [],
      type: 'article',
      publishedTime: post.date,
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug, LOCALE)

  if (!post) notFound()
  if (slug !== post.slug) redirect(`/${LOCALE}/blog/${post.slug}`)

  // Related posts (same tags, excluding current)
  const allPosts = await getPostsMeta(LOCALE)
  const related = allPosts
    .filter((p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t)))
    .slice(0, 2)

  // Simple markdown-to-JSX for content
  const paragraphs = post.content.split('\n\n')

  return (
    <article className="pb-16">
      {/* Hero image */}
      <div className="relative h-[35vh] min-h-[280px] bg-crudo">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            className="object-cover"
            priority
            unoptimized={post.image.startsWith('http')}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-marron-claro/50 text-sm font-[family-name:var(--font-archivo-narrow)] uppercase tracking-wide">
            Nessuna immagine
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-negro/70 to-transparent" />
      </div>

      <div className="px-5 lg:px-8 max-w-3xl mx-auto -mt-16 relative z-10">
        {/* Meta card */}
        <div className="bg-blanco border border-linea p-6 lg:p-8 mb-8">
          <nav className="text-sm text-marron-claro mb-4">
            <Link href="/it" className="hover:text-naranja transition-colors">Inicio</Link>
            <span className="mx-2">›</span>
            <Link href="/it/blog" className="hover:text-naranja transition-colors">Blog</Link>
          </nav>

          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase leading-tight mb-3">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-marron-claro">
            <time>{formatDate(post.date, 'es')}</time>
            <span>·</span>
            <span>{post.readingTime} min de lectura</span>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-verde-claro text-verde px-2 py-0.5 font-[family-name:var(--font-archivo-narrow)] text-[0.65rem] font-semibold tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="prose-tricholand space-y-4 mb-12">
          {paragraphs.map((para, i) => {
            if (para.startsWith('## ')) {
              return (
                <h2
                  key={i}
                  className="font-[family-name:var(--font-archivo-narrow)] text-xl font-bold uppercase mt-8 mb-3 pt-4 border-t border-linea"
                >
                  {para.replace('## ', '')}
                </h2>
              )
            }
            if (para.startsWith('### ')) {
              return (
                <h3
                  key={i}
                  className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold mt-6 mb-2"
                >
                  {para.replace('### ', '')}
                </h3>
              )
            }
            if (para.startsWith('- ')) {
              const items = para.split('\n').filter((l) => l.startsWith('- '))
              return (
                <ul key={i} className="space-y-2 my-4">
                  {items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-marron-claro">
                      <span className="text-naranja font-bold mt-0.5">→</span>
                      <span>{item.replace('- ', '')}</span>
                    </li>
                  ))}
                </ul>
              )
            }
            return (
              <p key={i} className="text-base text-marron-claro leading-relaxed">
                {para}
              </p>
            )
          })}
        </div>

        {/* CTA */}
        <div className="bg-negro text-crudo p-6 lg:p-8 mb-12 text-center">
          <h3 className="font-[family-name:var(--font-archivo-narrow)] text-xl font-bold uppercase mb-2">
            ¿Necesitas Trichocereus para tu negocio?
          </h3>
          <p className="text-sm opacity-70 mb-4">
            Presupuesto personalizado en menos de 24h laborables
          </p>
          <Link
            href={getFullPath('it', 'contact')}
            className="inline-flex bg-naranja text-blanco px-6 py-2.5 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors"
          >
            Solicitar presupuesto →
          </Link>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div>
            <h3 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold uppercase mb-4 pb-2 border-b-2 border-negro">
              Posts relacionados
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/it/blog/${r.slug}`}
                  className="group bg-blanco border border-linea p-4 hover:-translate-y-0.5 hover:shadow transition-all"
                >
                  <h4 className="font-[family-name:var(--font-archivo-narrow)] font-bold group-hover:text-naranja transition-colors">
                    {r.title}
                  </h4>
                  <p className="text-xs text-marron-claro mt-1">{formatDate(r.date, 'es')} · {r.readingTime} min</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back */}
        <div className="mt-8">
          <Link
            href="/it/blog"
            className="font-[family-name:var(--font-archivo-narrow)] text-sm text-naranja font-bold uppercase tracking-wide hover:underline"
          >
            ← Volver al blog
          </Link>
        </div>
      </div>
    </article>
  )
}

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPostsMeta } from '@/lib/blog'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Blog de Tricholand: guías técnicas sobre cultivo, cuidado, injertos y propagación de Trichocereus. Recursos para profesionales y aficionados.',
}

export default async function BlogPage() {
  const posts = await getPostsMeta('de')

  return (
    <section className="px-5 lg:px-8 py-16">
      <div className="mb-8 pb-4 border-b-2 border-negro">
        <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
          Blog
        </h1>
        <p className="text-marron-claro mt-2">
          Guías técnicas, consejos de cultivo y novedades sobre Trichocereus
        </p>
      </div>

      {/* Posts grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/de/blog/${post.slug}`}
            className="group bg-blanco border border-linea hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
          >
            <div className="relative overflow-hidden">
              <Image
                src={post.image}
                alt={post.imageAlt}
                width={600}
                height={220}
                className="w-full h-[220px] object-cover group-hover:scale-[1.04] transition-transform duration-400"
              />
            </div>

            <div className="px-5 py-4">
              <div className="flex items-center gap-3 mb-2">
                <time className="font-[family-name:var(--font-archivo-narrow)] text-xs text-marron-claro">
                  {formatDate(post.date, 'es')}
                </time>
                <span className="text-xs text-marron-claro">·</span>
                <span className="font-[family-name:var(--font-archivo-narrow)] text-xs text-marron-claro">
                  {post.readingTime} min
                </span>
              </div>

              <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold group-hover:text-naranja transition-colors leading-tight">
                {post.title}
              </h2>
              <p className="text-sm text-marron-claro mt-2 line-clamp-2">
                {post.description}
              </p>

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
          </Link>
        ))}
      </div>
    </section>
  )
}

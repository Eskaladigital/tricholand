import type { Metadata } from 'next'
import { getPostsMeta } from '@/lib/blog'
import { BlogGrid } from '@/components/blog/BlogGrid'
import { getBlogIndexAlternates } from '@/lib/i18n/paths'
import { getDictionary } from '@/lib/i18n'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Blog Tricholand : guides techniques sur la culture, l\'entretien, le greffage et la propagation des Trichocereus. Ressources pour professionnels et amateurs.',
  alternates: getBlogIndexAlternates('fr'),
}

export default async function BlogPage() {
  const posts = await getPostsMeta('fr')
  const dict = getDictionary('fr')

  return (
    <section className="px-5 lg:px-8 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 pb-5 border-b-2 border-negro">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl lg:text-4xl font-bold uppercase">
            Blog
          </h1>
          <p className="text-marron-claro mt-2 max-w-lg">
            Guides techniques, conseils de culture et actualités sur les Trichocereus pour les professionnels du secteur
          </p>
        </div>

        <BlogGrid posts={posts} locale="fr" dict={dict.blog} />
      </div>
    </section>
  )
}

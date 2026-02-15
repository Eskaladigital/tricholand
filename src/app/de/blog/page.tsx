import type { Metadata } from 'next'
import { getPostsMeta } from '@/lib/blog'
import { BlogGrid } from '@/components/blog/BlogGrid'
import { getBlogIndexAlternates } from '@/lib/i18n/paths'
import { getDictionary } from '@/lib/i18n'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Tricholand Blog: technische Leitfäden zu Anbau, Pflege, Veredelung und Vermehrung von Trichocereus. Ressourcen für Fachleute und Enthusiasten.',
  alternates: getBlogIndexAlternates('de'),
}

export default async function BlogPage() {
  const posts = await getPostsMeta('de')
  const dict = getDictionary('de')

  return (
    <section className="px-5 lg:px-8 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 pb-5 border-b-2 border-negro">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl lg:text-4xl font-bold uppercase">
            Blog
          </h1>
          <p className="text-marron-claro mt-2 max-w-lg">
            Technische Leitfäden, Anbautipps und Neuigkeiten über Trichocereus für Fachleute der Branche
          </p>
        </div>

        <BlogGrid posts={posts} locale="de" dict={dict.blog} />
      </div>
    </section>
  )
}

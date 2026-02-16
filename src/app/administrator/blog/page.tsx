import Link from 'next/link'
import { getBlogPostsEs } from '@/lib/actions/blog'
import { BlogTable } from '@/components/admin/BlogTable'

export default async function BlogListPage() {
  const posts = await getBlogPostsEs()

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            Blog
          </h1>
          <p className="text-sm text-marron-claro mt-1">
            {posts.length} artículos en total
          </p>
        </div>
        <Link
          href="/administrator/blog/new"
          className="bg-naranja text-blanco px-5 py-2.5 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-marron transition-colors"
        >
          + Nuevo artículo
        </Link>
      </div>

      <BlogTable posts={posts} />
    </>
  )
}

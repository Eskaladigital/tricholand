import Link from 'next/link'
import { getBlogPosts } from '@/lib/actions/blog'

const STATUS_LABEL: Record<string, { text: string; cls: string }> = {
  published: { text: 'Publicado', cls: 'bg-green-100 text-green-700' },
  draft: { text: 'Borrador', cls: 'bg-gray-100 text-gray-600' },
  archived: { text: 'Archivado', cls: 'bg-gray-100 text-gray-400' },
}

const LOCALE_FLAG: Record<string, string> = {
  es: '🇪🇸', en: '🇬🇧', nl: '🇳🇱', fr: '🇫🇷', de: '🇩🇪', it: '🇮🇹', pt: '🇵🇹',
}

export default async function BlogListPage() {
  const posts = await getBlogPosts()

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

      <div className="bg-blanco border border-linea overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-crudo border-b border-linea">
                <th className="text-left px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">
                  Título
                </th>
                <th className="text-center px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">
                  Idioma
                </th>
                <th className="text-center px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">
                  Fecha
                </th>
                <th className="text-center px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">
                  Estado
                </th>
                <th className="text-center px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-marron-claro">
                    No hay artículos. Crea el primero para empezar.
                  </td>
                </tr>
              ) : (
                posts.map((post) => {
                  const st = STATUS_LABEL[post.status] ?? STATUS_LABEL.draft
                  return (
                    <tr key={post.id} className="border-b border-linea/50 hover:bg-crudo/50 transition-colors">
                      <td className="px-4 py-3">
                        <div>
                          <span className="font-bold block">{post.title}</span>
                          <span className="text-xs text-marron-claro">/{post.locale}/blog/{post.slug}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center text-lg">
                        {LOCALE_FLAG[post.locale] ?? post.locale}
                      </td>
                      <td className="px-4 py-3 text-center text-xs text-marron-claro">
                        {post.date}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-0.5 text-xs font-bold uppercase ${st.cls}`}>
                          {st.text}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Link
                          href={`/administrator/blog/${post.id}`}
                          className="text-naranja font-semibold hover:underline text-xs"
                        >
                          Editar
                        </Link>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

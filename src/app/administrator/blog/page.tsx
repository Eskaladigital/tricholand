import Link from 'next/link'
import Image from 'next/image'
import { getBlogPostsEs, setBlogPostStatusFromForm } from '@/lib/actions/blog'

const STATUS_LABEL: Record<string, { text: string; cls: string }> = {
  published: { text: 'Publicado', cls: 'bg-green-100 text-green-700' },
  draft: { text: 'Borrador', cls: 'bg-gray-100 text-gray-600' },
  archived: { text: 'Archivado', cls: 'bg-gray-100 text-gray-400' },
}

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

      <div className="bg-blanco border border-linea overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-crudo border-b border-linea">
                <th className="text-left px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro w-16">
                  Imagen
                </th>
                <th className="text-left px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">
                  Título
                </th>
                <th className="text-center px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">
                  Fecha
                </th>
                <th className="text-center px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">
                  Lectura
                </th>
                <th className="text-left px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro max-w-[200px]">
                  Descripción
                </th>
                <th className="text-left px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">
                  Tags
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
                  <td colSpan={8} className="px-4 py-8 text-center text-marron-claro">
                    No hay artículos. Crea el primero para empezar.
                  </td>
                </tr>
              ) : (
                posts.map((post) => {
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

import Link from 'next/link'
import Image from 'next/image'
import { getProducts } from '@/lib/actions/products'
import { formatPrice } from '@/types/shop'

export default async function ProductsListPage() {
  const products = await getProducts()

  return (
    <>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
              Productos
            </h1>
            <p className="text-sm text-marron-claro mt-1">
              {products.length} productos en el catálogo
            </p>
          </div>
          <Link
            href="/administrator/products/new"
            className="bg-naranja text-blanco px-5 py-2.5 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-marron transition-colors"
          >
            + Nuevo producto
          </Link>
        </div>

        <div className="bg-blanco border border-linea overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-crudo border-b border-linea">
                  <th className="text-left px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">
                    Producto
                  </th>
                  <th className="text-left px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">
                    SKU
                  </th>
                  <th className="text-right px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">
                    Precio
                  </th>
                  <th className="text-center px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">
                    Stock
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
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-marron-claro">
                      No hay productos. Crea el primero para empezar a vender.
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className="border-b border-linea/50 hover:bg-crudo/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {product.images[0]?.url ? (
                            <div className="relative w-12 h-12 shrink-0 rounded overflow-hidden bg-crudo">
                              <Image
                                src={product.images[0].url}
                                alt={product.images[0]?.alt || product.name}
                                width={48}
                                height={48}
                                className="object-cover w-full h-full"
                                unoptimized
                              />
                            </div>
                          ) : (
                            <div className="w-12 h-12 rounded bg-linea/30 flex items-center justify-center text-marron-claro text-xs shrink-0">
                              —
                            </div>
                          )}
                          <div>
                            <span className="font-bold block">{product.name}</span>
                            <span className="text-xs text-marron-claro">{product.unit_label}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs">{product.sku}</td>
                      <td className="px-4 py-3 text-right font-bold text-naranja">
                        {formatPrice(product.price_cents)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {product.stock_qty !== null ? (
                          <span className={`font-bold ${product.stock_qty <= 5 ? 'text-terracota' : 'text-verde'}`}>
                            {product.stock_qty}
                          </span>
                        ) : (
                          <span className="text-marron-claro">∞</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-0.5 text-xs font-bold uppercase ${
                          product.status === 'active' ? 'bg-green-100 text-green-700' :
                          product.status === 'draft' ? 'bg-gray-100 text-gray-600' :
                          product.status === 'out_of_stock' ? 'bg-red-100 text-red-600' :
                          'bg-gray-100 text-gray-400'
                        }`}>
                          {product.status === 'active' ? 'Activo' :
                           product.status === 'draft' ? 'Borrador' :
                           product.status === 'out_of_stock' ? 'Agotado' : 'Archivado'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Link
                          href={`/administrator/products/${product.id}`}
                          className="text-naranja font-semibold hover:underline text-xs"
                        >
                          Editar
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
    </>
  )
}

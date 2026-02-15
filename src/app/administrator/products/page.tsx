import Link from 'next/link'
import { getProducts } from '@/lib/actions/products'
import { ProductsTable } from '@/components/admin/ProductsTable'

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

        <ProductsTable products={products} />
    </>
  )
}

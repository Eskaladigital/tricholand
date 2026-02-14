import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProductForLocale, getActiveProducts } from '@/content/shop/products-demo'
import { formatPrice } from '@/types/shop'
import { ProductDetailActions } from '@/components/shop/ProductDetailActions'
import { CartButton } from '@/components/shop/CartButton'
import { getAlternatesMetadata } from '@/lib/i18n/paths'

export async function generateStaticParams() {
  return getActiveProducts().map((p) => ({ slug: p.slug }))
}

const LOCALE = 'es'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductForLocale(slug, LOCALE)
  if (!product) return { title: 'Producto no encontrado' }
  return {
    title: `${product.name} — Tienda B2B`,
    description: product.description.slice(0, 160),
    alternates: getAlternatesMetadata(LOCALE, 'shop', slug),
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductForLocale(slug, LOCALE)
  if (!product) notFound()

  const isLowStock = product.stock_qty !== null && product.stock_qty <= 5

  return (
    <>
      <article className="px-5 lg:px-8 py-16 max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-marron-claro mb-6">
          <Link href="/es" className="hover:text-naranja transition-colors">Inicio</Link>
          <span className="mx-2">›</span>
          <Link href="/es/tienda" className="hover:text-naranja transition-colors">Tienda B2B</Link>
          <span className="mx-2">›</span>
          <span className="text-negro font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image */}
          <div className="relative">
            <Image
              src={product.images[0]?.url || ''}
              alt={product.images[0]?.alt || product.name}
              width={800}
              height={600}
              className="w-full aspect-[4/3] object-cover"
              priority
            />
            <span className="absolute top-4 left-4 bg-negro text-blanco px-3 py-1.5 font-[family-name:var(--font-archivo-narrow)] text-xs font-semibold tracking-wide">
              {product.sku}
            </span>
            {product.featured && (
              <span className="absolute top-4 right-4 bg-naranja text-blanco px-3 py-1.5 font-[family-name:var(--font-archivo-narrow)] text-[0.65rem] font-bold uppercase tracking-wide">
                Destacado
              </span>
            )}
          </div>

          {/* Info */}
          <div>
            <h1 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-2">
              {product.name}
            </h1>

            {product.variety_slug && (
              <Link
                href={`/es/variedades/${product.variety_slug}`}
                className="text-sm text-naranja font-semibold hover:underline"
              >
                Ver ficha de variedad →
              </Link>
            )}

            {/* Price */}
            <div className="mt-6 mb-6 pb-6 border-b border-linea">
              <div className="flex items-baseline gap-3">
                <span className="font-[family-name:var(--font-archivo-narrow)] text-4xl font-bold text-naranja">
                  {formatPrice(product.price_cents)}
                </span>
                <span className="text-sm text-marron-claro">/ {product.unit_label}</span>
              </div>
              <p className="text-xs text-marron-claro mt-1">Precio sin IVA · Pasaporte fitosanitario incluido</p>

              {product.stock_qty !== null && (
                <p className={`text-sm mt-2 font-semibold ${isLowStock ? 'text-terracota' : 'text-verde'}`}>
                  {isLowStock
                    ? `⚡ Solo quedan ${product.stock_qty} lotes disponibles`
                    : `● ${product.stock_qty} lotes disponibles`}
                </p>
              )}
            </div>

            {/* Add to order */}
            <ProductDetailActions product={product} />

            {/* Specs */}
            <div className="mt-8">
              <h2 className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide text-marron-claro mb-3">
                Características
              </h2>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                {product.specs.map((spec, i) => (
                  <div key={i} className="flex justify-between py-1.5 border-b border-linea/50 text-sm">
                    <span className="text-marron-claro">{spec.label}</span>
                    <span className="font-semibold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-12 max-w-3xl">
          <h2 className="font-[family-name:var(--font-archivo-narrow)] text-xl font-bold uppercase mb-4 pb-2 border-b-2 border-negro">
            Descripción del producto
          </h2>
          <p className="text-marron-claro leading-relaxed">{product.description}</p>
        </div>
      </article>

      <CartButton locale="es" />
    </>
  )
}

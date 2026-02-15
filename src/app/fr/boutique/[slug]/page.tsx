import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProductForLocale, getActiveProducts } from '@/lib/actions/products'
import { formatPrice } from '@/types/shop'
import { ProductDetailActions } from '@/components/shop/ProductDetailActions'
import { CartButton } from '@/components/shop/CartButton'
import { getFullPath, getAlternatesMetadata } from '@/lib/i18n/paths'

export async function generateStaticParams() {
  const products = await getActiveProducts()
  return products.map((p) => ({ slug: p.slug }))
}

const LOCALE = 'fr'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params
    const product = await getProductForLocale(slug, LOCALE)
    if (!product) return { title: 'Produit non trouvé' }
    const desc = typeof product.description === 'string' ? product.description.slice(0, 160) : ''
    return {
      title: `${product.name ?? 'Produit'} — Boutique B2B`,
      description: desc || undefined,
      alternates: getAlternatesMetadata(LOCALE, 'shop', slug),
    }
  } catch {
    return { title: 'Produit non trouvé' }
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
        <nav className="text-sm text-marron-claro mb-6">
          <Link href="/fr" className="hover:text-naranja transition-colors">Accueil</Link>
          <span className="mx-2">›</span>
          <Link href={getFullPath('fr', 'shop')} className="hover:text-naranja transition-colors">Boutique B2B</Link>
          <span className="mx-2">›</span>
          <span className="text-negro font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="relative aspect-[4/3] bg-crudo">
            {product.images[0]?.url ? (
              <Image
                src={product.images[0].url}
                alt={product.images[0]?.alt || product.name}
                fill
                className="object-cover"
                priority
                unoptimized={product.images[0].url.startsWith('http')}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-marron-claro">
                <span className="font-bold text-negro">{product.name}</span>
                <span className="text-sm mt-1">{product.sku}</span>
              </div>
            )}
            <span className="absolute top-4 left-4 bg-negro text-blanco px-3 py-1.5 font-[family-name:var(--font-archivo-narrow)] text-xs font-semibold tracking-wide">
              {product.sku}
            </span>
            {product.featured && (
              <span className="absolute top-4 right-4 bg-naranja text-blanco px-3 py-1.5 font-[family-name:var(--font-archivo-narrow)] text-[0.65rem] font-bold uppercase tracking-wide">
                Recommandé
              </span>
            )}
          </div>

          <div>
            <h1 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-2">
              {product.name}
            </h1>

            {product.variety_slug && (
              <Link
                href={getFullPath('fr', 'varieties', product.variety_slug)}
                className="text-sm text-naranja font-semibold hover:underline"
              >
                Voir la fiche variété →
              </Link>
            )}

            <div className="mt-6 mb-6 pb-6 border-b border-linea">
              <div className="flex items-baseline gap-3">
                <span className="font-[family-name:var(--font-archivo-narrow)] text-4xl font-bold text-naranja">
                  {formatPrice(product.price_cents)}
                </span>
                <span className="text-sm text-marron-claro">/ {product.unit_label}</span>
              </div>
              <p className="text-xs text-marron-claro mt-1">Prix HT · Passeport phytosanitaire inclus</p>

              {product.stock_qty !== null && (
                <p className={`text-sm mt-2 font-semibold ${isLowStock ? 'text-terracota' : 'text-verde'}`}>
                  {isLowStock
                    ? `⚡ Plus que ${product.stock_qty} lots disponibles`
                    : `● ${product.stock_qty} lots disponibles`}
                </p>
              )}
            </div>

            <ProductDetailActions product={product} />

            <div className="mt-8">
              <h2 className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide text-marron-claro mb-3">
                Caractéristiques
              </h2>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                {(Array.isArray(product.specs) ? product.specs : []).map((spec, i) => (
                  <div key={i} className="flex justify-between py-1.5 border-b border-linea/50 text-sm">
                    <span className="text-marron-claro">{spec.label}</span>
                    <span className="font-semibold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 max-w-3xl">
          <h2 className="font-[family-name:var(--font-archivo-narrow)] text-xl font-bold uppercase mb-4 pb-2 border-b-2 border-negro">
            Description du produit
          </h2>
          <p className="text-marron-claro leading-relaxed">{product.description ?? ''}</p>
        </div>
      </article>

      <CartButton locale="fr" />
    </>
  )
}

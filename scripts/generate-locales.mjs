/**
 * Genera las páginas para todos los idiomas (EN, NL, FR, DE, IT, PT)
 * Ejecutar: node scripts/generate-locales.mjs
 */
import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const SRC = join(ROOT, 'src')

let filesCreated = 0

function ensureDir(p) { if (!existsSync(p)) mkdirSync(p, { recursive: true }) }
function w(path, content) { ensureDir(dirname(path)); writeFileSync(path, content, 'utf-8'); filesCreated++ }

const LOCALES = [
  { code: 'en', name: 'English',
    s: { var: 'varieties', cat: 'catalogue', shop: 'shop', srv: 'services', about: 'about', contact: 'contact', cert: 'certifications', blog: 'blog', order: 'order', priv: 'privacy-policy', legal: 'legal-notice' },
    shopName: 'B2B Shop', orderTitle: 'Order Request', orderDesc: 'Review and send your B2B order. You will receive a quote within 24h.' },
  { code: 'nl', name: 'Nederlands',
    s: { var: 'varieteiten', cat: 'catalogus', shop: 'winkel', srv: 'diensten', about: 'over-ons', contact: 'contact', cert: 'certificeringen', blog: 'blog', order: 'bestelling', priv: 'privacybeleid', legal: 'juridische-kennisgeving' },
    shopName: 'B2B Winkel', orderTitle: 'Bestelaanvraag', orderDesc: 'Controleer en verzend uw B2B-bestelling. U ontvangt binnen 24 uur een offerte.' },
  { code: 'fr', name: 'Français',
    s: { var: 'varietes', cat: 'catalogue', shop: 'boutique', srv: 'services', about: 'a-propos', contact: 'contact', cert: 'certifications', blog: 'blog', order: 'commande', priv: 'politique-confidentialite', legal: 'mentions-legales' },
    shopName: 'Boutique B2B', orderTitle: 'Demande de commande', orderDesc: 'Vérifiez et envoyez votre commande B2B. Vous recevrez un devis sous 24h.' },
  { code: 'de', name: 'Deutsch',
    s: { var: 'sorten', cat: 'katalog', shop: 'shop', srv: 'dienstleistungen', about: 'ueber-uns', contact: 'kontakt', cert: 'zertifizierungen', blog: 'blog', order: 'bestellung', priv: 'datenschutz', legal: 'impressum' },
    shopName: 'B2B Shop', orderTitle: 'Bestellanfrage', orderDesc: 'Überprüfen und senden Sie Ihre B2B-Bestellung. Sie erhalten innerhalb von 24h ein Angebot.' },
  { code: 'it', name: 'Italiano',
    s: { var: 'varieta', cat: 'catalogo', shop: 'negozio', srv: 'servizi', about: 'chi-siamo', contact: 'contatti', cert: 'certificazioni', blog: 'blog', order: 'ordine', priv: 'privacy-policy', legal: 'note-legali' },
    shopName: 'Negozio B2B', orderTitle: 'Richiesta ordine', orderDesc: 'Rivedi e invia il tuo ordine B2B. Riceverai un preventivo entro 24h.' },
  { code: 'pt', name: 'Português',
    s: { var: 'variedades', cat: 'catalogo', shop: 'loja', srv: 'servicos', about: 'sobre-nos', contact: 'contacto', cert: 'certificacoes', blog: 'blog', order: 'encomenda', priv: 'politica-privacidade', legal: 'aviso-legal' },
    shopName: 'Loja B2B', orderTitle: 'Pedido de encomenda', orderDesc: 'Reveja e envie o seu pedido B2B. Receberá um orçamento em 24h.' },
]

// ─── Dict placeholders ──────────────────────────────
function genDict(loc) {
  const esContent = readFileSync(join(SRC, 'lib/i18n/es.ts'), 'utf-8')
  let c = esContent
    .replace('export const es:', `export const ${loc.code}:`)
    .replace("locale: 'es'", `locale: '${loc.code}'`)
    .replace(/\/es\//g, `/${loc.code}/`)
  // Remap ES slugs to locale slugs in hrefs
  const slugMap = { servicios: loc.s.srv, certificaciones: loc.s.cert, 'sobre-nosotros': loc.s.about, blog: loc.s.blog }
  for (const [es, local] of Object.entries(slugMap)) {
    c = c.replaceAll(`/${loc.code}/${es}`, `/${loc.code}/${local}`)
  }
  return c
}

// ─── Page generators ─────────────────────────────────

const L = (loc) => `import { getDictionary } from '@/lib/i18n'\nconst dict = getDictionary('${loc.code}')\n`

function genLayout(loc) {
  return `import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CartProvider } from '@/lib/shop/cart-context'
import { getDictionary } from '@/lib/i18n'

const dict = getDictionary('${loc.code}')

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="${loc.code}">
      <CartProvider>
        <Header locale="${loc.code}" dict={dict} />
        <main>{children}</main>
        <Footer locale="${loc.code}" dict={dict} />
      </CartProvider>
    </div>
  )
}
`}

function genHome(loc) {
  return `import { getDictionary } from '@/lib/i18n'
import { HeroSection } from '@/components/home/HeroSection'
import { StatsBar } from '@/components/home/StatsBar'
import { CatalogPreview } from '@/components/home/CatalogPreview'
import { ServicesSection } from '@/components/home/ServicesSection'
import { CertificationsBar } from '@/components/home/CertificationsBar'
import { CtaSection } from '@/components/home/CtaSection'

const dict = getDictionary('${loc.code}')

export default function HomePage() {
  return (
    <>
      <HeroSection locale="${loc.code}" dict={dict} />
      <StatsBar dict={dict} />
      <CatalogPreview locale="${loc.code}" dict={dict} />
      <ServicesSection dict={dict} />
      <CertificationsBar dict={dict} />
      <CtaSection locale="${loc.code}" dict={dict} />
    </>
  )
}
`}

function genVarietiesIndex(loc) {
  return `import Link from 'next/link'
import Image from 'next/image'
import { varietiesES } from '@/content/varieties/es/data'
import { getDictionary } from '@/lib/i18n'

const dict = getDictionary('${loc.code}')

export const metadata = { title: dict.nav.varieties }

export default function VarietiesPage() {
  return (
    <section className="px-5 lg:px-8 py-16">
      <div className="mb-8 pb-4 border-b-2 border-negro">
        <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">{dict.nav.varieties}</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {varietiesES.map((v) => (
          <Link key={v.slug} href={\`/${loc.code}/${loc.s.var}/\${v.slug}\`} className="group bg-blanco border border-linea hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <div className="relative overflow-hidden">
              <Image src={v.image} alt={v.imageAlt} width={600} height={240} className="w-full h-[240px] object-cover group-hover:scale-[1.04] transition-transform duration-400" />
              <span className="absolute top-3 left-3 bg-negro text-blanco px-2.5 py-1 font-[family-name:var(--font-archivo-narrow)] text-[0.72rem] font-semibold tracking-wide">{v.code}</span>
            </div>
            <div className="px-5 py-4">
              <h2 className="font-[family-name:var(--font-archivo-narrow)] text-xl font-bold group-hover:text-naranja transition-colors">{v.name}</h2>
              <p className="text-sm text-marron-claro mt-1">{v.commonName} · <em>{v.scientificName}</em></p>
            </div>
            <div className="px-5 py-3 bg-crudo flex justify-between items-center text-sm border-t border-linea">
              <span className={\`font-semibold \${v.stock === 'available' ? 'text-verde' : v.stock === 'limited' ? 'text-terracota' : 'text-red-600'}\`}>
                {v.stock === 'available' ? dict.catalog.available : v.stock === 'limited' ? dict.catalog.limited : dict.catalog.outOfStock}
              </span>
              <span className="text-marron-claro">{v.sizeRange}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
`}

function genVarietySlug(loc) {
  return `import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getVarietyBySlug, getAllVarietySlugs } from '@/content/varieties/es/data'
import { getDictionary } from '@/lib/i18n'

const dict = getDictionary('${loc.code}')

export async function generateStaticParams() {
  return getAllVarietySlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const v = getVarietyBySlug(slug)
  return v ? { title: v.name } : { title: 'Not found' }
}

export default async function VarietyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const v = getVarietyBySlug(slug)
  if (!v) notFound()

  return (
    <article className="px-5 lg:px-8 py-16">
      <nav className="text-sm text-marron-claro mb-6">
        <Link href="/${loc.code}" className="hover:text-naranja">{dict.nav.home}</Link>
        <span className="mx-2">›</span>
        <Link href="/${loc.code}/${loc.s.var}" className="hover:text-naranja">{dict.nav.varieties}</Link>
        <span className="mx-2">›</span>
        <span className="text-negro font-medium">{v.name}</span>
      </nav>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
        <div>
          <Image src={v.images[0]?.url || ''} alt={v.name} width={900} height={500} className="w-full aspect-[16/9] object-cover mb-6" priority />
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase mb-1">{v.name}</h1>
          <p className="text-sm text-marron-claro italic mb-6">{v.scientificName} · {v.commonName}</p>
          <p className="text-marron-claro leading-relaxed mb-8">{v.description}</p>
          <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold uppercase mb-3">Highlights</h2>
          <ul className="space-y-2 mb-8">
            {v.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-sm"><span className="text-verde font-bold">✓</span>{h}</li>
            ))}
          </ul>
        </div>
        <aside className="bg-blanco border border-linea p-6 h-fit sticky top-8">
          <h3 className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide text-naranja mb-4">Care Guide</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-1.5 border-b border-linea/50"><span className="text-marron-claro">☀️ Light</span><span className="font-semibold">{v.careGuide.light}</span></div>
            <div className="flex justify-between py-1.5 border-b border-linea/50"><span className="text-marron-claro">💧 Water</span><span className="font-semibold">{v.careGuide.water}</span></div>
            <div className="flex justify-between py-1.5 border-b border-linea/50"><span className="text-marron-claro">🌡️ Temp</span><span className="font-semibold">{v.careGuide.temperature}</span></div>
            <div className="flex justify-between py-1.5"><span className="text-marron-claro">🪨 Soil</span><span className="font-semibold">{v.careGuide.soil}</span></div>
          </div>
          <Link href="/${loc.code}/${loc.s.contact}" className="block mt-6 w-full py-3 bg-naranja text-blanco text-center font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-marron transition-colors">
            {dict.cta.button}
          </Link>
        </aside>
      </div>
    </article>
  )
}
`}

function genCatalog(loc) {
  return `import { getDictionary } from '@/lib/i18n'
import { CatalogGrid } from '@/components/varieties/CatalogGrid'

const dict = getDictionary('${loc.code}')
export const metadata = { title: dict.catalog.title }

export default function CatalogPage() {
  return (
    <section className="px-5 lg:px-8 py-16">
      <div className="mb-8 pb-4 border-b-2 border-negro">
        <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">{dict.catalog.title}</h1>
      </div>
      <CatalogGrid locale="${loc.code}" />
    </section>
  )
}
`}

function genShop(loc) {
  return `import { getActiveProducts } from '@/content/shop/products-demo'
import { ShopGrid } from '@/components/shop/ShopGrid'
import { CartButton } from '@/components/shop/CartButton'

export const metadata = { title: '${loc.shopName}' }

export default function ShopPage() {
  return (
    <>
      <section className="px-5 lg:px-8 py-16">
        <div className="mb-8 pb-4 border-b-2 border-negro">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">${loc.shopName}</h1>
        </div>
        <ShopGrid products={getActiveProducts()} locale="${loc.code}" />
      </section>
      <CartButton locale="${loc.code}" />
    </>
  )
}
`}

function genShopSlug(loc) {
  return `import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProductBySlug, getActiveProducts } from '@/content/shop/products-demo'
import { formatPrice } from '@/types/shop'
import { ProductDetailActions } from '@/components/shop/ProductDetailActions'
import { CartButton } from '@/components/shop/CartButton'

export async function generateStaticParams() {
  return getActiveProducts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = getProductBySlug(slug)
  return p ? { title: p.name } : { title: 'Not found' }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  return (
    <>
      <article className="px-5 lg:px-8 py-16 max-w-6xl mx-auto">
        <nav className="text-sm text-marron-claro mb-6">
          <Link href="/${loc.code}" className="hover:text-naranja">Home</Link>
          <span className="mx-2">›</span>
          <Link href="/${loc.code}/${loc.s.shop}" className="hover:text-naranja">${loc.shopName}</Link>
          <span className="mx-2">›</span>
          <span className="text-negro font-medium">{product.name}</span>
        </nav>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <Image src={product.images[0]?.url || ''} alt={product.name} width={800} height={600} className="w-full aspect-[4/3] object-cover" priority />
          <div>
            <h1 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-4">{product.name}</h1>
            <div className="mb-6 pb-6 border-b border-linea">
              <span className="font-[family-name:var(--font-archivo-narrow)] text-4xl font-bold text-naranja">{formatPrice(product.price_cents)}</span>
              <span className="text-sm text-marron-claro ml-2">/ {product.unit_label}</span>
            </div>
            <ProductDetailActions product={product} />
            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2">
              {product.specs.map((spec, i) => (
                <div key={i} className="flex justify-between py-1.5 border-b border-linea/50 text-sm">
                  <span className="text-marron-claro">{spec.label}</span>
                  <span className="font-semibold">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {product.description && (
          <div className="mt-12 max-w-3xl">
            <p className="text-marron-claro leading-relaxed">{product.description}</p>
          </div>
        )}
      </article>
      <CartButton locale="${loc.code}" />
    </>
  )
}
`}

function genOrder(loc) {
  return `import { OrderForm } from '@/components/shop/OrderForm'
import { CartButton } from '@/components/shop/CartButton'

export const metadata = { title: '${loc.orderTitle}' }

export default function OrderPage() {
  return (
    <>
      <section className="px-5 lg:px-8 py-16 max-w-5xl mx-auto">
        <div className="mb-8 pb-4 border-b-2 border-negro">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">${loc.orderTitle}</h1>
          <p className="text-marron-claro mt-2">${loc.orderDesc}</p>
        </div>
        <OrderForm locale="${loc.code}" />
      </section>
      <CartButton locale="${loc.code}" />
    </>
  )
}
`}

function genServices(loc) {
  return `import { getDictionary } from '@/lib/i18n'
const dict = getDictionary('${loc.code}')
export const metadata = { title: dict.nav.services }

export default function ServicesPage() {
  return (
    <section className="px-5 lg:px-8 py-16">
      <div className="mb-8 pb-4 border-b-2 border-negro">
        <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">{dict.services.title}</h1>
        <p className="text-marron-claro mt-2">{dict.services.subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dict.services.items.map((item, i) => (
          <div key={i} className="bg-blanco border border-linea p-6">
            <span className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold text-naranja/20">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold uppercase mt-2 mb-3">{item.title}</h3>
            <p className="text-sm text-marron-claro leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
`}

function genAbout(loc) {
  return `import { getDictionary } from '@/lib/i18n'
import { StatsBar } from '@/components/home/StatsBar'
const dict = getDictionary('${loc.code}')
export const metadata = { title: dict.nav.about }

export default function AboutPage() {
  return (
    <>
      <section className="px-5 lg:px-8 py-16">
        <div className="mb-8 pb-4 border-b-2 border-negro">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">{dict.nav.about}</h1>
        </div>
        <div className="max-w-3xl">
          <p className="text-marron-claro leading-relaxed text-lg mb-6">{dict.meta.siteDescription}</p>
          <p className="text-marron-claro leading-relaxed">{dict.cta.description}</p>
        </div>
      </section>
      <StatsBar dict={dict} />
    </>
  )
}
`}

function genContact(loc) {
  return `import { getDictionary } from '@/lib/i18n'
import { ContactFormWizard } from '@/components/contact/ContactFormWizard'
const dict = getDictionary('${loc.code}')
export const metadata = { title: dict.nav.contact }

export default function ContactPage() {
  return (
    <section className="px-5 lg:px-8 py-16">
      <div className="mb-8 pb-4 border-b-2 border-negro">
        <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">{dict.nav.contact}</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
        <ContactFormWizard locale="${loc.code}" />
        <aside className="space-y-6">
          <div className="bg-blanco border border-linea p-6">
            <h3 className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide text-naranja mb-3">{dict.footer.contact_title}</h3>
            <p className="text-sm">📧 {dict.cta.email}</p>
            <p className="text-sm mt-1">📍 {dict.cta.location}</p>
          </div>
        </aside>
      </div>
    </section>
  )
}
`}

function genCert(loc) {
  return `import { getDictionary } from '@/lib/i18n'
import { CertificationsBar } from '@/components/home/CertificationsBar'
const dict = getDictionary('${loc.code}')
export const metadata = { title: dict.nav.certifications }

export default function CertificationsPage() {
  return (
    <>
      <section className="px-5 lg:px-8 py-16">
        <div className="mb-8 pb-4 border-b-2 border-negro">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">{dict.certifications.title}</h1>
        </div>
        <div className="max-w-3xl">
          <p className="text-marron-claro leading-relaxed text-lg">{dict.certifications.description}</p>
        </div>
      </section>
      <CertificationsBar dict={dict} />
    </>
  )
}
`}

function genBlogIndex(loc) {
  return `import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/content/blog/es/data'
import { getDictionary } from '@/lib/i18n'
const dict = getDictionary('${loc.code}')
export const metadata = { title: dict.nav.blog }

export default function BlogPage() {
  const posts = getAllPosts()
  return (
    <section className="px-5 lg:px-8 py-16">
      <div className="mb-8 pb-4 border-b-2 border-negro">
        <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">{dict.blog.title}</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post.slug} href={\`/${loc.code}/${loc.s.blog}/\${post.slug}\`} className="group bg-blanco border border-linea hover:shadow-lg transition-all">
            <Image src={post.image} alt={post.title} width={600} height={300} className="w-full h-[200px] object-cover" />
            <div className="p-5">
              <p className="text-xs text-marron-claro mb-2">{post.date} · {post.readingTime} {dict.blog.readingTime}</p>
              <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold group-hover:text-naranja transition-colors">{post.title}</h2>
              <p className="text-sm text-marron-claro mt-2 line-clamp-2">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
`}

function genBlogSlug(loc) {
  return `import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPostSlugs } from '@/content/blog/es/data'
import { getDictionary } from '@/lib/i18n'
const dict = getDictionary('${loc.code}')

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = getPostBySlug(slug)
  return p ? { title: p.title } : { title: 'Not found' }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()
  return (
    <article className="px-5 lg:px-8 py-16 max-w-3xl mx-auto">
      <nav className="text-sm text-marron-claro mb-6">
        <Link href="/${loc.code}/${loc.s.blog}" className="hover:text-naranja">{dict.blog.backToList}</Link>
      </nav>
      <Image src={post.image} alt={post.title} width={900} height={400} className="w-full aspect-[2/1] object-cover mb-6" priority />
      <p className="text-xs text-marron-claro mb-2">{dict.blog.publishedOn} {post.date} · {post.readingTime} {dict.blog.readingTime}</p>
      <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase mb-6">{post.title}</h1>
      <div className="prose prose-stone max-w-none text-marron-claro leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content.replace(/\\n/g, '<br/>') }} />
      <div className="mt-12 pt-6 border-t border-linea">
        <Link href="/${loc.code}/${loc.s.blog}" className="text-naranja font-semibold hover:underline">{dict.blog.backToList}</Link>
      </div>
    </article>
  )
}
`}

function genPrivacy(loc) {
  return `export const metadata = { title: 'Privacy Policy', robots: { index: false } }

export default function PrivacyPage() {
  return (
    <section className="px-5 lg:px-8 py-16 max-w-3xl mx-auto">
      <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase mb-8 pb-4 border-b-2 border-negro">Privacy Policy</h1>
      <p className="text-marron-claro">Content will be loaded from the translations database.</p>
    </section>
  )
}
`}

function genLegal(loc) {
  return `export const metadata = { title: 'Legal Notice', robots: { index: false } }

export default function LegalPage() {
  return (
    <section className="px-5 lg:px-8 py-16 max-w-3xl mx-auto">
      <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase mb-8 pb-4 border-b-2 border-negro">Legal Notice</h1>
      <p className="text-marron-claro">Content will be loaded from the translations database.</p>
    </section>
  )
}
`}

// ─── Generate all ────────────────────────────────────

console.log('\n🌍 Generando estructura multi-idioma...\n')

for (const loc of LOCALES) {
  const base = join(SRC, 'app', loc.code)
  console.log(`\n📁 /${loc.code}/ — ${loc.name}`)

  // Dict
  const dictPath = join(SRC, 'lib/i18n', `${loc.code}.ts`)
  if (!existsSync(dictPath)) {
    w(dictPath, genDict(loc))
    console.log(`  📝 dict: ${loc.code}.ts`)
  }

  // Pages
  w(join(base, 'layout.tsx'), genLayout(loc))
  w(join(base, 'page.tsx'), genHome(loc))
  w(join(base, loc.s.var, 'page.tsx'), genVarietiesIndex(loc))
  w(join(base, loc.s.var, '[slug]', 'page.tsx'), genVarietySlug(loc))
  w(join(base, loc.s.cat, 'page.tsx'), genCatalog(loc))
  w(join(base, loc.s.shop, 'page.tsx'), genShop(loc))
  w(join(base, loc.s.shop, '[slug]', 'page.tsx'), genShopSlug(loc))
  w(join(base, loc.s.shop, loc.s.order, 'page.tsx'), genOrder(loc))
  w(join(base, loc.s.srv, 'page.tsx'), genServices(loc))
  w(join(base, loc.s.about, 'page.tsx'), genAbout(loc))
  w(join(base, loc.s.contact, 'page.tsx'), genContact(loc))
  w(join(base, loc.s.cert, 'page.tsx'), genCert(loc))
  w(join(base, loc.s.blog, 'page.tsx'), genBlogIndex(loc))
  w(join(base, loc.s.blog, '[slug]', 'page.tsx'), genBlogSlug(loc))
  w(join(base, loc.s.priv, 'page.tsx'), genPrivacy(loc))
  w(join(base, loc.s.legal, 'page.tsx'), genLegal(loc))

  console.log(`  ✅ 16 páginas creadas`)
}

// Update i18n index
const allCodes = ['es', ...LOCALES.map(l => l.code)]
const indexContent = `import type { Dictionary } from './types'
${allCodes.map(c => `import { ${c} } from './${c}'`).join('\n')}

export type Locale = ${allCodes.map(c => `'${c}'`).join(' | ')}

export const locales: Locale[] = [${allCodes.map(c => `'${c}'`).join(', ')}]
export const defaultLocale: Locale = 'es'

const dictionaries: Record<Locale, Dictionary> = {
${allCodes.map(c => `  ${c},`).join('\n')}
}

export function getDictionary(locale: string): Dictionary {
  return dictionaries[locale as Locale] || dictionaries.es
}

export type { Dictionary }
`
w(join(SRC, 'lib/i18n/index.ts'), indexContent)
console.log(`\n📝 Actualizado: lib/i18n/index.ts`)

console.log(`\n${'═'.repeat(50)}`)
console.log(`✅ Total: ${filesCreated} archivos creados`)
console.log(`   6 idiomas × 16 páginas + 6 diccionarios + index`)
console.log(`${'═'.repeat(50)}\n`)

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getFullPath } from '@/lib/i18n/paths'

const LOCALE = 'en'
const BASE_URL = 'https://www.tricholand.com'
const SLUG = 'trichocereus-pachanoi-for-sale-uk'

export const metadata: Metadata = {
  title: 'Trichocereus Pachanoi for Sale UK — Wholesale B2B | Tricholand',
  description:
    'Buy Trichocereus Pachanoi (San Pedro cactus) wholesale in the UK. B2B specialist nursery in Spain, shipping across Europe with EU Plant Passport. Minimum order 200 units.',
  keywords: [
    'trichocereus pachanoi for sale uk',
    'san pedro cactus for sale uk',
    'trichocereus wholesale uk',
    'buy trichocereus pachanoi uk',
    'san pedro cactus wholesale',
    'cactus wholesale europe',
    'trichocereus nursery',
    'B2B cactus supplier uk',
  ],
  alternates: {
    canonical: `${BASE_URL}/en/varieties/${SLUG}`,
  },
  openGraph: {
    title: 'Trichocereus Pachanoi for Sale UK — Wholesale B2B | Tricholand',
    description:
      'Buy Trichocereus Pachanoi wholesale from a specialist nursery in Spain. EU Plant Passport included. Shipping to UK & Europe.',
    images: ['/images/varieties/Trichocereus_Pachanoi_1.webp'],
    type: 'website',
    locale: 'en_GB',
  },
}

const SIZES = [
  { range: '15–20 cm', label: 'Young seedlings', desc: 'Ideal for growing on, grafting stock or retail resale' },
  { range: '25–35 cm', label: 'Juvenile plants', desc: 'Strong root system, ready for garden centre display' },
  { range: '35–55 cm', label: 'Established plants', desc: 'Our most popular wholesale size — impactful and hardy' },
  { range: '55–80 cm', label: 'Specimen size', desc: 'Statement pieces for landscaping and premium retail' },
]

const BENEFITS = [
  {
    icon: '🌱',
    title: 'EU Plant Passport Included',
    desc: 'Every shipment includes an official EU Plant Passport. Fully compliant for import into the UK under current phytosanitary regulations.',
  },
  {
    icon: '🚛',
    title: 'Direct Shipping to the UK',
    desc: 'We ship palletised orders directly from our nursery in Murcia, Spain to anywhere in the UK. Temperature-controlled transport available.',
  },
  {
    icon: '📦',
    title: 'Minimum Order 200 Units',
    desc: 'Our minimum order is 200 plants per variety — perfect for garden centres, nurseries, landscapers and specialist retailers.',
  },
  {
    icon: '💰',
    title: 'Competitive Wholesale Prices',
    desc: 'Nursery-direct pricing with no middlemen. Volume discounts available for orders over 750 units. Custom quotes within 24 hours.',
  },
  {
    icon: '☀️',
    title: 'Grown in Murcia, Spain',
    desc: 'Our Trichocereus are field-grown under the Spanish Mediterranean sun — producing stronger, healthier plants than greenhouse-grown alternatives.',
  },
  {
    icon: '🤝',
    title: 'Dedicated B2B Support',
    desc: 'Personal account manager for UK clients. We speak English and understand the UK market. Flexible payment terms for repeat customers.',
  },
]

const FAQ = [
  {
    q: 'Can I import Trichocereus Pachanoi into the UK?',
    a: 'Yes. Trichocereus Pachanoi is a legal ornamental plant in the UK. All our shipments include the required EU Plant Passport and phytosanitary documentation for smooth customs clearance.',
  },
  {
    q: 'What is the minimum order quantity?',
    a: 'Our minimum order is 200 plants per variety. For mixed orders combining different Trichocereus varieties (Pachanoi, Peruvianus, Bridgesii), we can arrange custom pallets.',
  },
  {
    q: 'How long does shipping take to the UK?',
    a: 'Standard delivery is 5–7 working days from our nursery in Murcia to anywhere in the UK. We allow 7 days for order preparation before dispatch.',
  },
  {
    q: 'Do you offer volume discounts?',
    a: 'Yes. We offer tiered pricing based on order volume. Contact us with your requirements and we will provide a bespoke quote within 24 working hours.',
  },
  {
    q: 'What sizes are available?',
    a: 'We offer Trichocereus Pachanoi in sizes from 15 cm seedlings to 80 cm+ specimen plants. The most popular wholesale size for UK buyers is 35–55 cm.',
  },
  {
    q: 'Do plants come with care instructions?',
    a: 'Yes. We provide professional growing guides with each order, including specific advice for the UK climate. Trichocereus Pachanoi is surprisingly hardy and can tolerate brief frosts down to -2°C.',
  },
]

export default function PachanoiForSaleUK() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end">
        <Image
          src="/images/varieties/Trichocereus_Pachanoi_1.webp"
          alt="Trichocereus Pachanoi — San Pedro cactus wholesale for UK buyers"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-negro/80 via-negro/30 to-transparent" />
        <div className="relative z-10 w-full px-5 lg:px-8 pb-12 lg:pb-16 max-w-5xl mx-auto">
          <span className="inline-block bg-naranja text-blanco px-3 py-1.5 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold tracking-widest uppercase mb-4">
            B2B Wholesale · UK Delivery
          </span>
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-4xl lg:text-6xl font-bold text-blanco uppercase leading-[1.05]">
            Trichocereus Pachanoi
            <br />
            <span className="text-naranja">for Sale in the UK</span>
          </h1>
          <p className="text-lg lg:text-xl text-blanco/85 mt-4 max-w-2xl">
            Specialist nursery-grown San Pedro cacti shipped directly from Spain to the UK.
            EU Plant Passport included. Wholesale pricing from 200 units.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href={getFullPath(LOCALE, 'contact')}
              className="bg-naranja text-blanco px-7 py-3.5 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors"
            >
              Request a Quote →
            </Link>
            <Link
              href={getFullPath(LOCALE, 'shop')}
              className="bg-blanco/10 backdrop-blur text-blanco border border-blanco/30 px-7 py-3.5 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-blanco/20 transition-colors"
            >
              Browse Shop
            </Link>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-negro text-crudo">
        <div className="max-w-5xl mx-auto px-5 lg:px-8 py-5 flex flex-wrap justify-center gap-x-10 gap-y-2 text-sm font-[family-name:var(--font-archivo-narrow)] uppercase tracking-wide">
          <span>EU Plant Passport ✓</span>
          <span>Direct from Nursery ✓</span>
          <span>UK Shipping ✓</span>
          <span>Quote in 24h ✓</span>
        </div>
      </section>

      {/* About this variety */}
      <section className="px-5 lg:px-8 py-16 lg:py-20 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-6 pb-3 border-b-2 border-negro">
              Why Trichocereus Pachanoi?
            </h2>
            <p className="text-marron-claro leading-relaxed mb-4">
              <strong className="text-negro">Trichocereus Pachanoi</strong> (San Pedro) is one of the most iconic and commercially
              successful columnar cacti in the European market. Native to the Andes, it thrives in the UK climate
              when given well-draining soil and a sunny position — making it a perfect addition to garden centre
              ranges, landscaping schemes and specialist retail collections.
            </p>
            <p className="text-marron-claro leading-relaxed mb-4">
              Its striking blue-green colour, elegant columnar form and fast growth rate (up to 30 cm per year)
              make it an incredibly popular choice with end consumers. It produces spectacular nocturnal white
              flowers up to 22 cm in diameter.
            </p>
            <ul className="space-y-2 mt-6">
              {[
                'Fast growth: up to 30 cm/year under optimal conditions',
                'Hardy to -2°C — suitable for UK sheltered positions',
                'Spectacular 22 cm white nocturnal flowers',
                'Minimal maintenance once established',
                'Excellent as rootstock for grafting',
                'High consumer demand — proven retail seller',
              ].map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <span className="text-naranja font-bold mt-0.5">→</span>
                  <span className="text-marron-claro text-sm">{h}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/5] bg-crudo">
            <Image
              src="/images/products/producto_trichocereus_pachanoi_1.webp"
              alt="Trichocereus Pachanoi ready for wholesale dispatch"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* Available sizes */}
      <section className="bg-crudo px-5 lg:px-8 py-16 lg:py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-2 text-center">
            Available Sizes
          </h2>
          <p className="text-marron-claro text-center mb-10">
            All sizes grown at our nursery in Murcia, Spain — shipped directly to the UK
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SIZES.map((s) => (
              <div key={s.range} className="bg-blanco border border-linea p-6 text-center hover:-translate-y-1 hover:shadow-lg transition-all">
                <p className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold text-naranja mb-1">
                  {s.range}
                </p>
                <p className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide mb-3">
                  {s.label}
                </p>
                <p className="text-xs text-marron-claro leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-sm text-marron-claro">
            Custom sizes and mixed pallets available on request.{' '}
            <Link href={getFullPath(LOCALE, 'contact')} className="text-naranja font-semibold hover:underline">
              Contact us for availability
            </Link>
          </p>
        </div>
      </section>

      {/* Photo gallery strip */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-0">
        {[
          '/images/varieties/Trichocereus_Pachanoi_2.webp',
          '/images/products/producto_trichocereus_pachanoi_bio_1_v2.webp',
          '/images/vivero/vivero_mayorista_cactus.webp',
          '/images/products/producto_trichocereus_pachanoi_2.webp',
        ].map((src, i) => (
          <div key={i} className="relative aspect-square">
            <Image
              src={src}
              alt={`Trichocereus Pachanoi nursery image ${i + 1}`}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        ))}
      </section>

      {/* Why buy from Tricholand */}
      <section className="px-5 lg:px-8 py-16 lg:py-20 max-w-5xl mx-auto">
        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-2 text-center">
          Why Buy from Tricholand?
        </h2>
        <p className="text-marron-claro text-center mb-12 max-w-2xl mx-auto">
          We are a specialist Trichocereus producer nursery based in Murcia, Spain —
          one of Europe&apos;s premier cactus-growing regions. We sell exclusively B2B.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((b) => (
            <div key={b.title} className="bg-crudo border border-linea p-6">
              <span className="text-2xl mb-3 block">{b.icon}</span>
              <h3 className="font-[family-name:var(--font-archivo-narrow)] font-bold uppercase text-sm tracking-wide mb-2">
                {b.title}
              </h3>
              <p className="text-xs text-marron-claro leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Nursery photos */}
      <section className="bg-negro text-crudo px-5 lg:px-8 py-16 lg:py-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3]">
            <Image
              src="/images/vivero/productores_cactus_1.webp"
              alt="Tricholand nursery team — Trichocereus producers in Murcia, Spain"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-6">
              Our Nursery in Murcia
            </h2>
            <p className="text-crudo/80 leading-relaxed mb-4">
              Tricholand is a family-run nursery in the Murcia region of south-east Spain, specialising
              exclusively in Trichocereus and columnar cacti. Our plants are field-grown under the
              Mediterranean sun — producing stronger, healthier specimens with superior root systems
              compared to greenhouse-grown alternatives.
            </p>
            <p className="text-crudo/80 leading-relaxed mb-6">
              We have been supplying garden centres, nurseries, landscapers and specialist retailers
              across Europe for years. Our UK clients particularly value our reliable quality,
              competitive pricing and hassle-free import process.
            </p>
            <Link
              href={`/${LOCALE}/about-us`}
              className="inline-flex font-[family-name:var(--font-archivo-narrow)] text-naranja font-bold uppercase text-sm tracking-wide hover:underline"
            >
              Learn more about us →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 lg:px-8 py-16 lg:py-20 max-w-3xl mx-auto">
        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-10 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {FAQ.map((item) => (
            <details
              key={item.q}
              className="group border border-linea bg-blanco"
            >
              <summary className="cursor-pointer px-6 py-4 font-[family-name:var(--font-archivo-narrow)] font-bold uppercase text-sm tracking-wide flex items-center justify-between hover:text-naranja transition-colors">
                {item.q}
                <span className="text-naranja ml-4 transition-transform group-open:rotate-45 text-lg">+</span>
              </summary>
              <div className="px-6 pb-5 text-sm text-marron-claro leading-relaxed">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Other varieties */}
      <section className="bg-crudo px-5 lg:px-8 py-16 lg:py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-2 text-center">
            Other Trichocereus Varieties
          </h2>
          <p className="text-marron-claro text-center mb-10">
            Combine varieties in a single shipment to maximise your order
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { slug: 'trichocereus-peruvianus', name: 'T. Peruvianus', common: 'Peruvian Torch', img: '/images/varieties/Trichocereus_peruvianus_1.webp' },
              { slug: 'trichocereus-bridgesii', name: 'T. Bridgesii', common: 'Achuma', img: '/images/varieties/Trichocereus_Bridgessi_1.webp' },
              { slug: 'trichocereus-pasacana-terscheckii', name: 'T. Terscheckii', common: 'Giant Cardón', img: '/images/varieties/Trichocereus_terscheckii_1.webp' },
            ].map((v) => (
              <Link
                key={v.slug}
                href={`/en/varieties/${v.slug}`}
                className="group bg-blanco border border-linea overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all"
              >
                <div className="relative aspect-[3/2]">
                  <Image src={v.img} alt={v.name} fill className="object-cover group-hover:scale-[1.04] transition-transform" unoptimized />
                </div>
                <div className="p-4">
                  <h3 className="font-[family-name:var(--font-archivo-narrow)] font-bold group-hover:text-naranja transition-colors">{v.name}</h3>
                  <p className="text-xs text-marron-claro">{v.common}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-negro text-crudo px-5 lg:px-8 py-16 lg:py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-[family-name:var(--font-archivo-narrow)] text-3xl lg:text-4xl font-bold uppercase mb-4">
            Ready to Order?
          </h2>
          <p className="text-crudo/75 mb-8">
            Get a custom wholesale quote for Trichocereus Pachanoi delivered to the UK.
            We respond within 24 working hours.
          </p>
          <Link
            href={getFullPath(LOCALE, 'contact')}
            className="inline-flex bg-naranja text-blanco px-8 py-4 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors"
          >
            Request Your Quote →
          </Link>
          <p className="text-xs text-crudo/50 mt-6">
            Or email us directly at{' '}
            <a href="mailto:info@tricholand.com" className="text-naranja hover:underline">info@tricholand.com</a>
          </p>
        </div>
      </section>

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Trichocereus Pachanoi (San Pedro Cactus)',
            description:
              'Wholesale Trichocereus Pachanoi plants from a specialist nursery in Spain. B2B only. EU Plant Passport included. Shipping to UK and Europe.',
            brand: { '@type': 'Brand', name: 'Tricholand' },
            image: `${BASE_URL}/images/varieties/Trichocereus_Pachanoi_1.webp`,
            category: 'Plants > Cacti > Trichocereus',
            offers: {
              '@type': 'Offer',
              priceCurrency: 'EUR',
              availability: 'https://schema.org/InStock',
              seller: {
                '@type': 'Organization',
                name: 'Tricholand',
                url: BASE_URL,
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Murcia',
                  addressCountry: 'ES',
                },
              },
              areaServed: [
                { '@type': 'Country', name: 'United Kingdom' },
                { '@type': 'Country', name: 'Spain' },
              ],
              eligibleRegion: {
                '@type': 'GeoShape',
                name: 'Europe',
              },
            },
          }),
        }}
      />
    </>
  )
}

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getFullPath } from '@/lib/i18n/paths'

const LOCALE = 'en'
const BASE_URL = 'https://www.tricholand.com'
const SLUG = 'trichocereus-pachanoi-for-sale-europe'

export const metadata: Metadata = {
  title: 'Trichocereus Pachanoi for Sale in Europe — Wholesale B2B | Tricholand',
  description:
    'Buy Trichocereus Pachanoi (San Pedro cactus) wholesale across Europe. Specialist B2B nursery in Spain. EU Plant Passport included. Free intra-EU phytosanitary. Minimum order 200 units.',
  keywords: [
    'trichocereus pachanoi for sale europe',
    'san pedro cactus wholesale europe',
    'trichocereus wholesale europe',
    'buy trichocereus pachanoi europe',
    'cactus wholesale europe',
    'trichocereus nursery europe',
    'B2B cactus supplier europe',
    'trichocereus pachanoi buy online',
    'san pedro cactus nursery spain',
    'columnar cactus wholesale',
  ],
  alternates: {
    canonical: `${BASE_URL}/en/varieties/${SLUG}`,
  },
  openGraph: {
    title: 'Trichocereus Pachanoi for Sale in Europe — Wholesale B2B | Tricholand',
    description:
      'Buy Trichocereus Pachanoi wholesale from a specialist nursery in Spain. EU Plant Passport included. Shipping across all of Europe.',
    images: ['/images/varieties/Trichocereus_Pachanoi_1.webp'],
    type: 'website',
    locale: 'en',
  },
}

const SIZES = [
  { range: '15–20 cm', label: 'Young seedlings', desc: 'Perfect for growing on, grafting stock or retail resale in your market' },
  { range: '25–35 cm', label: 'Juvenile plants', desc: 'Robust root system, ready for garden centre display or landscaping projects' },
  { range: '35–55 cm', label: 'Established plants', desc: 'Our best-selling wholesale size across Europe — impactful and cold-hardy' },
  { range: '55–80 cm', label: 'Specimen size', desc: 'Premium statement pieces for high-end landscaping and specialist retailers' },
]

const COUNTRIES = [
  'Germany', 'France', 'Netherlands', 'Belgium', 'Italy', 'Portugal',
  'Austria', 'Poland', 'Czech Republic', 'Denmark', 'Sweden',
  'Ireland', 'Greece', 'Hungary', 'Romania', 'Croatia',
]

const BENEFITS = [
  {
    icon: '🌱',
    title: 'EU Plant Passport Included',
    desc: 'Every shipment includes an official EU Plant Passport — the standard phytosanitary document for intra-EU plant trade. No additional import permits needed within the EU.',
  },
  {
    icon: '🚛',
    title: 'Shipping Across All of Europe',
    desc: 'We ship palletised orders directly from Murcia to any EU country. Temperature-controlled transport available for Northern European destinations in winter.',
  },
  {
    icon: '📦',
    title: 'Minimum Order 200 Units',
    desc: 'Our minimum order is 200 plants per variety — ideal for garden centres, nurseries, landscapers, retailers and municipal projects across Europe.',
  },
  {
    icon: '💰',
    title: 'Competitive Nursery-Direct Prices',
    desc: 'No middlemen, no importers — you buy directly from the producer. Volume discounts available from 750 units. Custom quotes within 24 hours.',
  },
  {
    icon: '☀️',
    title: 'Field-Grown in Murcia, Spain',
    desc: 'Our Trichocereus are field-grown year-round under the Spanish Mediterranean sun — producing stronger, more resilient plants than greenhouse-grown alternatives.',
  },
  {
    icon: '🤝',
    title: 'Multilingual B2B Support',
    desc: 'We communicate in English, Spanish, French and German. Dedicated account manager for European clients. Flexible payment terms for regular customers.',
  },
]

const FAQ = [
  {
    q: 'Do I need an import permit to buy Trichocereus within the EU?',
    a: 'No. Within the European Union, our EU Plant Passport is sufficient for the transport and sale of Trichocereus Pachanoi. No additional import permits or phytosanitary certificates are needed for intra-EU trade.',
  },
  {
    q: 'Which countries do you ship to?',
    a: 'We ship to all 27 EU member states plus the UK, Switzerland and Norway. Our most active markets are Germany, France, the Netherlands, Belgium, Italy, Portugal, Austria and Poland.',
  },
  {
    q: 'What is the minimum order quantity?',
    a: 'Our minimum order is 200 plants per variety. You can combine different Trichocereus varieties (Pachanoi, Peruvianus, Bridgesii, Terscheckii) on the same pallet to meet the minimum.',
  },
  {
    q: 'How long does European delivery take?',
    a: 'We allow 7 days for order preparation. Delivery times vary: 2–3 days for Spain, Portugal and France; 3–5 days for Germany, Benelux, Italy and Austria; 5–7 days for Scandinavia, Eastern Europe and the UK.',
  },
  {
    q: 'Can I visit the nursery before ordering?',
    a: 'Absolutely. We welcome professional buyers to visit our nursery in Murcia by appointment. You can see our production first-hand, select plants directly and discuss your requirements with our team.',
  },
  {
    q: 'Do you offer intra-community VAT exemption?',
    a: 'Yes. If you have a valid EU VAT number (verified via VIES), we apply the intra-community VAT exemption on your invoices. This applies to all B2B orders shipped to another EU member state.',
  },
  {
    q: 'What sizes are most popular in Europe?',
    a: 'The 35–55 cm range is our best seller across all European markets. Garden centres in Northern Europe particularly favour the 25–35 cm size, while Mediterranean markets and landscapers prefer 55–80 cm specimens.',
  },
  {
    q: 'Are the plants frost-hardy for Northern European climates?',
    a: 'Trichocereus Pachanoi tolerates brief frosts down to -2°C with dry soil. In Northern Europe, they are best grown in pots that can be moved indoors during winter, or in sheltered south-facing positions with frost protection.',
  },
]

export default function PachanoiForSaleEurope() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end">
        <Image
          src="/images/varieties/Trichocereus_Pachanoi_1.webp"
          alt="Trichocereus Pachanoi — San Pedro cactus wholesale across Europe"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-negro/80 via-negro/30 to-transparent" />
        <div className="relative z-10 w-full px-5 lg:px-8 pb-12 lg:pb-16 max-w-5xl mx-auto">
          <span className="inline-block bg-naranja text-blanco px-3 py-1.5 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold tracking-widest uppercase mb-4">
            B2B Wholesale · Europe-Wide Delivery
          </span>
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-4xl lg:text-6xl font-bold text-blanco uppercase leading-[1.05]">
            Trichocereus Pachanoi
            <br />
            <span className="text-naranja">for Sale in Europe</span>
          </h1>
          <p className="text-lg lg:text-xl text-blanco/85 mt-4 max-w-2xl">
            Specialist nursery-grown San Pedro cacti shipped directly from Spain across Europe.
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
          <span>Direct from Producer ✓</span>
          <span>All EU Countries ✓</span>
          <span>Intra-EU VAT Exempt ✓</span>
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
              <strong className="text-negro">Trichocereus Pachanoi</strong> (San Pedro) is one of the most commercially
              successful columnar cacti in the European market. Native to the Andes of Ecuador and Peru,
              it thrives across Southern and Central Europe and can be grown in pots anywhere on the continent.
              Its popularity with consumers has surged in recent years, driven by the growing trend for
              drought-tolerant, low-maintenance landscaping.
            </p>
            <p className="text-marron-claro leading-relaxed mb-4">
              With its striking blue-green colour, elegant columnar form and fast growth rate (up to 30 cm per year),
              it is a proven seller in garden centres, specialist plant shops and landscaping projects across
              Germany, France, the Netherlands, Italy, Portugal and beyond.
            </p>
            <ul className="space-y-2 mt-6">
              {[
                'Fast growth: up to 30 cm/year in Mediterranean climates',
                'Tolerates -2°C — grow outdoors in Southern Europe, in pots elsewhere',
                'Spectacular 22 cm white nocturnal flowers',
                'Minimal maintenance — drought-tolerant once established',
                'Excellent as rootstock for professional grafting',
                'High consumer demand across all European markets',
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
              alt="Trichocereus Pachanoi ready for wholesale dispatch across Europe"
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
            All sizes field-grown at our nursery in Murcia, Spain — shipped directly across Europe
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
              alt={`Trichocereus Pachanoi nursery production image ${i + 1}`}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        ))}
      </section>

      {/* We ship to */}
      <section className="px-5 lg:px-8 py-16 lg:py-20 max-w-5xl mx-auto text-center">
        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-2">
          We Ship Across Europe
        </h2>
        <p className="text-marron-claro mb-10 max-w-2xl mx-auto">
          Direct palletised delivery from our nursery in Murcia, Spain to your door.
          EU Plant Passport included — no additional import paperwork within the EU.
        </p>
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {COUNTRIES.map((c) => (
            <span
              key={c}
              className="bg-crudo border border-linea px-4 py-2 font-[family-name:var(--font-archivo-narrow)] text-sm font-semibold"
            >
              {c}
            </span>
          ))}
          <span className="bg-negro text-crudo px-4 py-2 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold">
            + UK, Switzerland, Norway
          </span>
        </div>
        <p className="text-xs text-marron-claro mt-6">
          Delivery times: 2–3 days Iberian Peninsula · 3–5 days Central Europe · 5–7 days Scandinavia &amp; Eastern Europe
        </p>
      </section>

      {/* Why buy from Tricholand */}
      <section className="bg-crudo px-5 lg:px-8 py-16 lg:py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-2 text-center">
            Why Buy from Tricholand?
          </h2>
          <p className="text-marron-claro text-center mb-12 max-w-2xl mx-auto">
            We are a specialist Trichocereus producer nursery based in Murcia, Spain —
            one of Europe&apos;s premier cactus-growing regions. We sell exclusively B2B.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-blanco border border-linea p-6">
                <span className="text-2xl mb-3 block">{b.icon}</span>
                <h3 className="font-[family-name:var(--font-archivo-narrow)] font-bold uppercase text-sm tracking-wide mb-2">
                  {b.title}
                </h3>
                <p className="text-xs text-marron-claro leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nursery */}
      <section className="bg-negro text-crudo px-5 lg:px-8 py-16 lg:py-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3]">
            <Image
              src="/images/vivero/productores_cactus_2.webp"
              alt="Tricholand nursery — Trichocereus producer in Murcia, Spain"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-6">
              Our Nursery in Murcia, Spain
            </h2>
            <p className="text-crudo/80 leading-relaxed mb-4">
              Tricholand is a family-run nursery in the Murcia region of south-east Spain, specialising
              exclusively in Trichocereus and columnar cacti. Our plants are field-grown year-round under
              the Mediterranean sun, producing stronger and more resilient specimens with superior root
              systems compared to greenhouse-grown alternatives from Northern Europe.
            </p>
            <p className="text-crudo/80 leading-relaxed mb-4">
              We supply garden centres, wholesale nurseries, landscaping firms and specialist retailers
              in over 15 European countries. Our clients value our consistent quality, competitive
              producer-direct pricing and professional logistics.
            </p>
            <p className="text-crudo/80 leading-relaxed mb-6">
              Visits are welcome by appointment — come see our production and select your plants in person.
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
            Get a custom wholesale quote for Trichocereus Pachanoi delivered anywhere in Europe.
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
            name: 'Trichocereus Pachanoi (San Pedro Cactus) — Wholesale Europe',
            description:
              'Wholesale Trichocereus Pachanoi plants from a specialist producer nursery in Spain. B2B only. EU Plant Passport included. Shipping across all of Europe.',
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
              eligibleRegion: {
                '@type': 'GeoShape',
                name: 'Europe',
              },
              areaServed: [
                { '@type': 'Place', name: 'European Union' },
                { '@type': 'Country', name: 'United Kingdom' },
                { '@type': 'Country', name: 'Switzerland' },
                { '@type': 'Country', name: 'Norway' },
              ],
            },
          }),
        }}
      />
    </>
  )
}

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getFullPath } from '@/lib/i18n/paths'

const LOCALE = 'en'
const BASE_URL = 'https://www.tricholand.com'
const SLUG = 'trichocereus-pachanoi-for-sale-europe'

export const metadata: Metadata = {
  title: 'Trichocereus Pachanoi for Sale Europe — Wholesale B2B | Tricholand',
  description:
    'Buy Trichocereus Pachanoi (San Pedro cactus) wholesale in Europe. B2B nursery in Spain shipping to EU-27 & UK with EU Plant Passport included. Minimum order 200 units.',
  keywords: [
    'trichocereus pachanoi for sale europe',
    'san pedro cactus wholesale europe',
    'trichocereus wholesale',
    'buy trichocereus pachanoi europe',
    'cactus wholesale europe',
    'trichocereus nursery spain',
    'B2B cactus supplier europe',
    'columnar cactus wholesale',
    'san pedro cactus nursery',
  ],
  alternates: {
    canonical: `${BASE_URL}/en/varieties/${SLUG}`,
  },
  openGraph: {
    title: 'Trichocereus Pachanoi for Sale Europe — Wholesale B2B | Tricholand',
    description:
      'Buy Trichocereus Pachanoi wholesale from a specialist nursery in Spain. EU Plant Passport included. Shipping across Europe.',
    images: ['/images/varieties/Trichocereus_Pachanoi_1.webp'],
    type: 'website',
    locale: 'en',
  },
}

const SIZES = [
  { range: '15–20 cm', label: 'Young seedlings', desc: 'Perfect for growing on, grafting stock or retail resale across Europe' },
  { range: '25–35 cm', label: 'Juvenile plants', desc: 'Strong root system, ready for garden centre shelves' },
  { range: '35–55 cm', label: 'Established plants', desc: 'Our best-selling wholesale size — the sweet spot of impact and value' },
  { range: '55–80 cm', label: 'Specimen size', desc: 'Premium pieces for landscaping projects and high-end retail' },
]

const BENEFITS = [
  {
    icon: '🌱',
    title: 'EU Plant Passport Included',
    desc: 'Every order ships with an official EU Plant Passport — no extra paperwork for EU-27 countries. Full phytosanitary compliance for UK imports too.',
  },
  {
    icon: '🚛',
    title: 'Shipping Across Europe',
    desc: 'Palletised shipments from Murcia to any EU country and the UK. Regular routes to France, Germany, Netherlands, Italy, Portugal, Belgium and more.',
  },
  {
    icon: '📦',
    title: 'Minimum Order 200 Units',
    desc: 'Start with 200 plants per variety — ideal for garden centres, nurseries, landscapers, wholesalers and specialist retailers.',
  },
  {
    icon: '💰',
    title: 'Nursery-Direct Pricing',
    desc: 'No middlemen. You buy directly from the producer. Volume discounts for orders over 750 units. Custom quote within 24 hours.',
  },
  {
    icon: '☀️',
    title: 'Field-Grown in Murcia, Spain',
    desc: 'Mediterranean sun-grown Trichocereus produce stronger, healthier plants with superior root systems compared to greenhouse-grown alternatives.',
  },
  {
    icon: '🤝',
    title: 'Multilingual B2B Support',
    desc: 'We speak English, Spanish, French and German. Dedicated account management, flexible payment terms and reliable supply all year round.',
  },
]

const COUNTRIES = [
  { name: 'France', flag: '🇫🇷' },
  { name: 'Germany', flag: '🇩🇪' },
  { name: 'Netherlands', flag: '🇳🇱' },
  { name: 'Belgium', flag: '🇧🇪' },
  { name: 'Italy', flag: '🇮🇹' },
  { name: 'Portugal', flag: '🇵🇹' },
  { name: 'United Kingdom', flag: '🇬🇧' },
  { name: 'Austria', flag: '🇦🇹' },
  { name: 'Ireland', flag: '🇮🇪' },
  { name: 'Switzerland', flag: '🇨🇭' },
  { name: 'Poland', flag: '🇵🇱' },
  { name: 'Czech Republic', flag: '🇨🇿' },
]

const FAQ = [
  {
    q: 'Which European countries do you ship to?',
    a: 'We ship to all EU-27 member states and the United Kingdom. Our most frequent routes cover France, Germany, Netherlands, Belgium, Italy, Portugal, Austria, Ireland and Switzerland. For other destinations, contact us for a shipping quote.',
  },
  {
    q: 'Is an EU Plant Passport included?',
    a: 'Yes. Every shipment includes an official EU Plant Passport at no extra cost. This is mandatory for intra-EU plant trade and ensures compliance with all phytosanitary regulations.',
  },
  {
    q: 'What is the minimum order quantity?',
    a: 'Our minimum order is 200 plants per variety. You can combine different Trichocereus varieties (Pachanoi, Peruvianus, Bridgesii, Terscheckii) in a single shipment to reach the minimum.',
  },
  {
    q: 'How long does shipping take within Europe?',
    a: 'Typical delivery times: France 2–3 days, Germany/Netherlands/Belgium 3–4 days, Italy/Portugal 2–3 days, UK 5–7 days, Eastern Europe 4–6 days. We allow 7 days for order preparation before dispatch.',
  },
  {
    q: 'Can Trichocereus Pachanoi survive European winters?',
    a: 'Trichocereus Pachanoi tolerates brief frosts down to -2°C when the soil is dry. In Mediterranean climates (Spain, Portugal, southern France, Italy) it thrives outdoors year-round. In northern Europe it performs well in sheltered positions or as a seasonal outdoor display.',
  },
  {
    q: 'Do you offer exclusivity for my region?',
    a: 'We offer preferred supplier agreements for high-volume clients. Contact us to discuss exclusivity terms for your market or region.',
  },
]

export default function PachanoiForSaleEurope() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end">
        <Image
          src="/images/varieties/Trichocereus_Pachanoi_2.webp"
          alt="Trichocereus Pachanoi — San Pedro cactus wholesale for European buyers"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-negro/80 via-negro/30 to-transparent" />
        <div className="relative z-10 w-full px-5 lg:px-8 pb-12 lg:pb-16 max-w-5xl mx-auto">
          <span className="inline-block bg-naranja text-blanco px-3 py-1.5 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold tracking-widest uppercase mb-4">
            B2B Wholesale · EU &amp; UK Delivery
          </span>
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-4xl lg:text-6xl font-bold text-blanco uppercase leading-[1.05]">
            Trichocereus Pachanoi
            <br />
            <span className="text-naranja">for Sale in Europe</span>
          </h1>
          <p className="text-lg lg:text-xl text-blanco/85 mt-4 max-w-2xl">
            Wholesale San Pedro cacti grown in our nursery in Murcia, Spain — shipped across
            all of Europe with EU Plant Passport included. From 200 units.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href={getFullPath(LOCALE, 'contact')}
              className="bg-naranja text-blanco px-7 py-3.5 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors"
            >
              Request a Quote →
            </Link>
            <Link
              href={getFullPath(LOCALE, 'varieties')}
              className="bg-blanco/10 backdrop-blur text-blanco border border-blanco/30 px-7 py-3.5 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-blanco/20 transition-colors"
            >
              View All Varieties
            </Link>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-negro text-crudo">
        <div className="max-w-5xl mx-auto px-5 lg:px-8 py-5 flex flex-wrap justify-center gap-x-10 gap-y-2 text-sm font-[family-name:var(--font-archivo-narrow)] uppercase tracking-wide">
          <span>EU Plant Passport ✓</span>
          <span>Producer Nursery ✓</span>
          <span>EU-27 &amp; UK Shipping ✓</span>
          <span>Quote in 24h ✓</span>
        </div>
      </section>

      {/* About this variety */}
      <section className="px-5 lg:px-8 py-16 lg:py-20 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-6 pb-3 border-b-2 border-negro">
              The Most Popular Columnar Cactus in Europe
            </h2>
            <p className="text-marron-claro leading-relaxed mb-4">
              <strong className="text-negro">Trichocereus Pachanoi</strong> (San Pedro) is the best-selling
              columnar cactus across European garden centres, nurseries and landscaping projects.
              Its striking blue-green colour, elegant form and fast growth rate make it an irresistible
              choice for consumers — and a reliable profit driver for B2B buyers.
            </p>
            <p className="text-marron-claro leading-relaxed mb-4">
              Native to the Andes of Ecuador and Peru, it adapts remarkably well to Mediterranean and
              temperate European climates. Under optimal conditions it grows up to 30 cm per year and
              produces spectacular nocturnal white flowers up to 22 cm in diameter.
            </p>
            <ul className="space-y-2 mt-6">
              {[
                'Fast growth: up to 30 cm/year — visible results for end consumers',
                'Hardy to -2°C — thrives outdoors in southern and western Europe',
                'Spectacular 22 cm white nocturnal flowers',
                'Minimal maintenance — ideal low-care plant for retail',
                'Excellent as rootstock for grafting',
                'Proven high demand across all European markets',
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
              alt="Trichocereus Pachanoi plants ready for European wholesale dispatch"
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
            Field-grown at our nursery in Murcia, Spain — shipped directly to your door across Europe
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
          '/images/varieties/Trichocereus_Pachanoi_1.webp',
          '/images/products/producto_trichocereus_pachanoi_bio_1_v2.webp',
          '/images/vivero/vivero_mayorista_cactus.webp',
          '/images/products/producto_trichocereus_pachanoi_bio_3.webp',
        ].map((src, i) => (
          <div key={i} className="relative aspect-square">
            <Image
              src={src}
              alt={`Trichocereus Pachanoi nursery — wholesale Europe image ${i + 1}`}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        ))}
      </section>

      {/* We ship across Europe */}
      <section className="px-5 lg:px-8 py-16 lg:py-20 max-w-5xl mx-auto">
        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-2 text-center">
          We Ship Across Europe
        </h2>
        <p className="text-marron-claro text-center mb-10 max-w-2xl mx-auto">
          Regular palletised shipments from our nursery in Murcia to all major European markets
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {COUNTRIES.map((c) => (
            <div key={c.name} className="bg-crudo border border-linea p-4 text-center">
              <span className="text-2xl block mb-1">{c.flag}</span>
              <p className="font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide">{c.name}</p>
            </div>
          ))}
        </div>
        <p className="text-center mt-6 text-sm text-marron-claro">
          + all other EU-27 countries.{' '}
          <Link href={getFullPath(LOCALE, 'contact')} className="text-naranja font-semibold hover:underline">
            Ask for a shipping quote
          </Link>
        </p>
      </section>

      {/* Why buy from Tricholand */}
      <section className="bg-crudo px-5 lg:px-8 py-16 lg:py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-2 text-center">
            Why Buy from Tricholand?
          </h2>
          <p className="text-marron-claro text-center mb-12 max-w-2xl mx-auto">
            We are a specialist Trichocereus producer nursery in Murcia, Spain —
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

      {/* Nursery section */}
      <section className="bg-negro text-crudo px-5 lg:px-8 py-16 lg:py-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3]">
            <Image
              src="/images/vivero/productores_cactus_2.webp"
              alt="Tricholand nursery — Trichocereus producers in Murcia, Spain"
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
              exclusively in Trichocereus and columnar cacti. Our plants are field-grown under over
              300 days of sunshine per year — producing stronger, healthier specimens that arrive
              in peak condition anywhere in Europe.
            </p>
            <p className="text-crudo/80 leading-relaxed mb-6">
              We supply garden centres, wholesale nurseries, landscaping firms and specialist retailers
              across France, Germany, Netherlands, Belgium, Italy, Portugal, the UK and beyond.
              Reliable quality, competitive pricing and hassle-free logistics — that&apos;s the Tricholand promise.
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

      {/* JSON-LD: Organization + FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Tricholand',
              url: BASE_URL,
              logo: `${BASE_URL}/images/icons/logo_tricho_yellow_200_200.webp`,
              description: 'Specialist Trichocereus producer nursery in Murcia, Spain. B2B wholesale for professionals across Europe.',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Murcia',
                addressRegion: 'Murcia',
                addressCountry: 'ES',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'info@tricholand.com',
                contactType: 'sales',
                availableLanguage: ['English', 'Spanish', 'French', 'German'],
              },
              areaServed: {
                '@type': 'GeoShape',
                name: 'Europe',
              },
            },
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: FAQ.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            },
          ]),
        }}
      />
    </>
  )
}

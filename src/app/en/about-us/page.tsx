import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { en } from '@/lib/i18n/en'
import { StatsBar } from '@/components/home/StatsBar'
import { getAlternatesMetadata } from '@/lib/i18n/paths'
export const metadata: Metadata = {
  title: 'About Us',
  description: 'Meet Tricholand: producer nursery specialized in Trichocereus and columnar cacti in Murcia, Spain. 5+ Trichocereus varieties, 2,500 m² of cultivation.',
  alternates: getAlternatesMetadata('en', 'about'),
}

export default function SobreNosotrosPage() {
  return (
    <>
      <section className="px-5 lg:px-8 py-16">
        <div className="mb-8 pb-4 border-b-2 border-negro">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            About Us
          </h1>
          <p className="text-marron-claro mt-2">Producer nursery in Murcia, Spain</p>
        </div>

        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl font-bold uppercase mb-4">
              We are <span className="text-naranja">producers</span>
            </h2>
            <div className="space-y-4 text-marron-claro leading-relaxed">
              <p>
                Tricholand is a producer nursery specialized in the cultivation and wholesale distribution
                of cacti of the Trichocereus genus and other columnar cacti. From our 2,500 m² facilities
                in Murcia, Spain, we cultivate 5+ Trichocereus varieties that we distribute to nurseries, garden
                centers and distributors across Europe.
              </p>
              <p>
                Trichocereus cacti are a genus of succulent plants belonging to the Cactaceae family,
                native to South America — particularly Argentina, Bolivia, Chile, Ecuador and Peru.
                They are known for their imposing columnar form and spectacular nocturnal flowering.
              </p>
              <p>
                We are a company in continuous growth with the aim of offering all our customers the
                plants they need each year, reserving part of our cultivation to guarantee stock adapted
                to each client&apos;s demand.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Image
              src="/images/vivero/productores_cactus_1.webp"
              alt="Tricholand nursery"
              width={500}
              height={350}
              sizes="(max-width: 1024px) 50vw, 25vw"
              quality={65}
              unoptimized
              className="w-full h-[200px] lg:h-full object-cover"
            />
            <Image
              src="/images/vivero/productores_cactus_2.webp"
              alt="Trichocereus cultivation"
              width={500}
              height={350}
              sizes="(max-width: 1024px) 50vw, 25vw"
              quality={65}
              unoptimized
              className="w-full h-[200px] lg:h-full object-cover"
            />
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: 'Own production',
              text: 'All our stock comes from our facilities. We control the entire process from seed or cutting to plant ready for sale.',
            },
            {
              title: 'Europe-wide shipping',
              text: 'We ship to the entire European Union and import to the United Kingdom with all documentation up to date for wholesale shipments.',
            },
            {
              title: 'Phytosanitary certification',
              text: 'All our specimens include EU phytosanitary passport. Complete customs documentation for export to the UK.',
            },
            {
              title: '5+ Trichocereus varieties',
              text: 'Our collection covers the main Trichocereus species plus select hybrids, crested forms and rare varieties.',
            },
            {
              title: 'Guaranteed supply',
              text: 'Advance production reservation to guarantee supply of the varieties and quantities your business needs.',
            },
            {
              title: 'Professional advice',
              text: 'We support our customers with technical advice on cultivation, care and plant presentation.',
            },
          ].map((item, i) => (
            <div key={i} className="bg-blanco border border-linea p-6">
              <h3 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-marron-claro leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-negro text-crudo p-8 lg:p-12 text-center max-w-3xl mx-auto">
          <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl font-bold uppercase mb-3">
            Want to work with us?
          </h2>
          <p className="opacity-70 mb-6">
            If you are an industry professional and interested in our products, contact us to receive
            our catalog and conditions.
          </p>
          <Link
            href="/en/contact"
            className="inline-flex bg-naranja text-blanco px-8 py-3 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors"
          >
            Request information →
          </Link>
        </div>
      </section>

      <StatsBar dict={en} />
    </>
  )
}

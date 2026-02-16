import type { Metadata } from 'next'
import Link from 'next/link'
import { en } from '@/lib/i18n/en'
import { CertificationsBar } from '@/components/home/CertificationsBar'
import { getAlternatesMetadata } from '@/lib/i18n/paths'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Tricholand services: wholesale Trichocereus sales, Europe-wide shipping, EU/UK phytosanitary documentation and custom cultivation.',
  alternates: getAlternatesMetadata('en', 'services'),
}

export default function ServiciosPage() {
  return (
    <>
      {/* Intro */}
      <section className="px-5 lg:px-8 py-16">
        <div className="mb-8 pb-4 border-b-2 border-negro">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            Services
          </h1>
          <p className="text-marron-claro mt-2">Complete solutions for industry professionals</p>
        </div>

        <div className="max-w-3xl space-y-4 text-marron-claro leading-relaxed mb-12">
          <p>
            At Tricholand we offer a comprehensive service for nursery and horticulture professionals.
            From production and cultivation to shipping with all necessary documentation, we ensure you
            receive your plants in perfect condition and with full legal guarantees.
          </p>
        </div>

        {/* Detailed services */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {[
            {
              num: '01',
              title: 'Wholesale sales',
              details: [
                'Minimum order: 200 units',
                'Special conditions for recurring orders and large volumes',
                'Payment by bank transfer',
                'Custom quote in less than 24 business hours',
                'Advance production reservation available',
              ],
            },
            {
              num: '02',
              title: 'Europe-wide shipping',
              details: [
                'Mainland Spain: 48–72 hours (or even less)',
                'European Union: 3 business days',
                'United Kingdom: 5–7 business days (or even less)',
                'Specialized logistics and packaging for cacti, temperature-controlled according to season (refrigerated or heated) guaranteeing quality during transport',
                'Real-time shipment tracking',
                'Insurance included on all shipments',
              ],
            },
            {
              num: '03',
              title: 'Documentation and certifications',
              details: [
                'EU plant passport included with each shipment',
                'Phytosanitary certificate available for exports outside the EU (additional cost approx. €60)',
                'Certificate of origin when required',
                'Labelling compliant with current European regulations',
                'Advice on import requirements',
              ],
            },
            {
              num: '04',
              title: 'Custom cultivation',
              details: [
                'Advance production reservation for the following year',
                'Specific varieties on request',
                'Annual supply guarantee for customers with agreement',
                'Custom sizes according to needs',
                'Exclusive variety cultivation available',
              ],
            },
          ].map((service) => (
            <div key={service.num} className="bg-blanco border border-linea p-8">
              <div className="font-[family-name:var(--font-archivo-narrow)] text-4xl font-bold text-naranja leading-none mb-4">
                {service.num}
              </div>
              <h2 className="font-[family-name:var(--font-archivo-narrow)] text-xl font-bold uppercase mb-4">
                {service.title}
              </h2>
              <ul className="space-y-2">
                {service.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-marron-claro">
                    <span className="text-naranja font-bold mt-0.5">→</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-negro text-crudo p-8 lg:p-12 text-center max-w-3xl mx-auto">
          <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl font-bold uppercase mb-3">
            Need a custom service?
          </h2>
          <p className="opacity-70 mb-6">
            Contact our sales team and we will prepare a proposal tailored to your business needs.
          </p>
          <Link
            href="/en/contact"
            className="inline-flex bg-naranja text-blanco px-8 py-3 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors"
          >
            Request information →
          </Link>
        </div>
      </section>

      <CertificationsBar dict={en} />
    </>
  )
}

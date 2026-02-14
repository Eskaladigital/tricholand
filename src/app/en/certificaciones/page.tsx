import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Phytosanitary certifications',
  description: 'Tricholand certifications: EU phytosanitary passport, UK export documentation, European regulatory compliance for cacti.',
}

export default function CertificacionesPage() {
  return (
    <section className="pb-16">
      {/* Hero band */}
      <div className="bg-verde text-blanco px-5 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl lg:text-4xl font-bold uppercase mb-3">
            Phytosanitary certifications
          </h1>
          <p className="text-lg opacity-85 max-w-2xl mx-auto">
            All our shipments include the documentation required by current European regulations
          </p>
        </div>
      </div>

      <div className="px-5 lg:px-8 py-16 max-w-5xl mx-auto">
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 mb-16">
          <div className="space-y-6 text-marron-claro leading-relaxed">
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl font-bold uppercase text-negro">
              EU phytosanitary <span className="text-naranja">passport</span>
            </h2>
            <p>
              The phytosanitary passport is an official document certifying that plants comply with
              the phytosanitary requirements of the European Union. It is mandatory for the marketing
              of live plants within EU territory and guarantees that specimens are free from regulated
              pests and diseases.
            </p>
            <p>
              At Tricholand, all our specimens include an individual phytosanitary passport. Our
              facilities are registered and subject to periodic inspections by the official plant health
              services of the Region of Murcia.
            </p>
            <p>
              The phytosanitary passport includes: authorised operator code, traceability code,
              scientific name of the species, country of origin and, when applicable, protected zone
              of destination.
            </p>

            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl font-bold uppercase text-negro pt-4">
              Export to <span className="text-naranja">United Kingdom</span>
            </h2>
            <p>
              Following Brexit, plant exports to the United Kingdom require additional documentation.
              Tricholand manages all necessary documentation so your shipments arrive without incident:
            </p>
            <ul className="space-y-2 ml-1">
              {[
                'Phytosanitary export certificate (issued by Spanish authorities)',
                'Customs export declaration',
                'Pre-notification to the British IPAFFS system',
                'Labelling compliant with UK import requirements',
                'Complete traceability documentation',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-naranja font-bold mt-0.5">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar badges */}
          <aside className="space-y-4">
            {[
              {
                icon: '🇪🇺',
                title: 'EU phytosanitary passport',
                desc: 'Included in all intra-community shipments. Compliance with Regulation (EU) 2016/2031.',
              },
              {
                icon: '🇬🇧',
                title: 'UK export docs',
                desc: 'Phytosanitary certificate + customs documentation for import to the United Kingdom.',
              },
              {
                icon: '🔍',
                title: 'Full traceability',
                desc: 'Each plant is traceable from its origin at our nursery to the delivery point.',
              },
              {
                icon: '✓',
                title: 'Official inspections',
                desc: 'Registered facilities subject to periodic plant health control.',
              },
            ].map((badge, i) => (
              <div key={i} className="bg-blanco border border-linea p-5">
                <div className="text-2xl mb-2">{badge.icon}</div>
                <h3 className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase mb-1">
                  {badge.title}
                </h3>
                <p className="text-sm text-marron-claro leading-relaxed">{badge.desc}</p>
              </div>
            ))}
          </aside>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="font-[family-name:var(--font-archivo-narrow)] text-xl font-bold uppercase mb-6 pb-3 border-b-2 border-negro">
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'Can I buy plants without a phytosanitary passport?',
                a: 'No. European regulations require that all live plants marketed within the EU include a phytosanitary passport. It is a health guarantee for the buyer and a legal requirement for the seller.',
              },
              {
                q: 'Does the phytosanitary passport have an additional cost?',
                a: 'No. The phytosanitary passport is included in the price of all our plants. There are no surcharges or hidden costs.',
              },
              {
                q: 'Do you ship outside the European Union (besides UK)?',
                a: 'We currently ship to the entire EU and United Kingdom. For other destinations, contact us and we will assess feasibility and required documentation on a case-by-case basis.',
              },
              {
                q: 'What happens if my shipment is held at customs?',
                a: 'Our shipments include all required documentation, which minimises the risk of holds. In the unlikely event it occurs, our team will assist you in resolving it.',
              },
            ].map((faq, i) => (
              <div key={i}>
                <h3 className="font-[family-name:var(--font-archivo-narrow)] font-bold text-base mb-1">
                  {faq.q}
                </h3>
                <p className="text-sm text-marron-claro leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-negro text-crudo p-8 lg:p-12 text-center">
          <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl font-bold uppercase mb-3">
            Need more information?
          </h2>
          <p className="opacity-70 mb-6">
            If you have questions about documentation, import requirements or certifications, contact our team.
          </p>
          <Link
            href="/en/contacto"
            className="inline-flex bg-naranja text-blanco px-8 py-3 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors"
          >
            Contact us →
          </Link>
        </div>
      </div>
    </section>
  )
}

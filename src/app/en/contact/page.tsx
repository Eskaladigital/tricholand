import type { Metadata } from 'next'
import { ContactFormWizard } from '@/components/contact/ContactFormWizard'
import { en } from '@/lib/i18n/en'
import { getAlternatesMetadata } from '@/lib/i18n/paths'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Tricholand to request a wholesale quote for Trichocereus. Response within 24 business hours.',
  alternates: getAlternatesMetadata('en', 'contact'),
}

export default function ContactoPage() {
  return (
    <section className="px-5 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 pb-4 border-b-2 border-negro">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            Contact
          </h1>
          <p className="text-marron-claro mt-2">
            Request your quote or ask us any question. We respond within 24 business hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          {/* Form */}
          <ContactFormWizard locale="en" dict={en} />

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Direct contact */}
            <div className="bg-negro text-crudo p-6">
              <h3 className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide text-naranja mb-4">
                Direct contact
              </h3>
              <a
                href="mailto:info@tricholand.com"
                className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold hover:text-naranja transition-colors block mb-2"
              >
                info@tricholand.com
              </a>
              <p className="text-sm opacity-60">Murcia, Spain</p>

              <div className="flex gap-4 mt-4 pt-4 border-t border-white/10">
                <a
                  href="https://www.facebook.com/tricholand/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm opacity-65 hover:opacity-100 transition-opacity"
                >
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/tricholand/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm opacity-65 hover:opacity-100 transition-opacity"
                >
                  Instagram
                </a>
              </div>
            </div>

            {/* FAQ mini */}
            <div className="bg-blanco border border-linea p-6">
              <h3 className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide text-naranja mb-4">
                Quick questions
              </h3>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-bold mb-0.5">What is the minimum order?</h4>
                  <p className="text-marron-claro">100 units per order.</p>
                </div>
                <div>
                  <h4 className="font-bold mb-0.5">Do you ship to individuals?</h4>
                  <p className="text-marron-claro">
                    We are a B2B wholesale nursery. For small purchases, we can direct you to distributors in your area.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-0.5">How quickly do you respond?</h4>
                  <p className="text-marron-claro">Within 24 business hours.</p>
                </div>
                <div>
                  <h4 className="font-bold mb-0.5">Do you ship across Europe?</h4>
                  <p className="text-marron-claro">
                    Yes. EU and UK with full phytosanitary documentation included.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

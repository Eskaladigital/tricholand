import type { Metadata } from 'next'
import { ContactFormWizard } from '@/components/contact/ContactFormWizard'
import { nl } from '@/lib/i18n/nl'
import { getAlternatesMetadata } from '@/lib/i18n/paths'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Neem contact op met Tricholand voor een groothandelsofferte voor Trichocereus. Antwoord binnen 24 werkuren.',
  alternates: getAlternatesMetadata('nl', 'contact'),
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
            Vraag uw offerte aan of stel ons een vraag. We reageren binnen 24 werkuren.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          {/* Form */}
          <ContactFormWizard locale="nl" dict={nl} />

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
              <p className="text-sm opacity-60">Murcia, Spanje</p>

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
                Snelle vragen
              </h3>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-bold mb-0.5">Wat is de minimale bestelling?</h4>
                  <p className="text-marron-claro">100 stuks per bestelling.</p>
                </div>
                <div>
                  <h4 className="font-bold mb-0.5">Leveren jullie aan particulieren?</h4>
                  <p className="text-marron-claro">
                    Wij zijn een B2B-groothandelskwekerij. Voor kleine aankopen kunnen we u doorverwijzen naar distributeurs in uw regio.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-0.5">Hoe snel reageren jullie?</h4>
                  <p className="text-marron-claro">Binnen 24 werkuren.</p>
                </div>
                <div>
                  <h4 className="font-bold mb-0.5">Leveren jullie in heel Europa?</h4>
                  <p className="text-marron-claro">
                    Ja. EU en VK met volledige fytosanitaire documentatie inbegrepen.
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

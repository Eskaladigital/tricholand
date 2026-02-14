import type { Metadata } from 'next'
import { ContactFormWizard } from '@/components/contact/ContactFormWizard'
import { de } from '@/lib/i18n/de'

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Kontaktieren Sie Tricholand für ein Großhandelsangebot für Trichocereus. Antwort innerhalb von 24 Arbeitsstunden.',
}

export default function ContactoPage() {
  return (
    <section className="px-5 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 pb-4 border-b-2 border-negro">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            Kontakt
          </h1>
          <p className="text-marron-claro mt-2">
            Fordern Sie Ihr Angebot an oder stellen Sie uns eine Frage. Wir antworten innerhalb von 24 Arbeitsstunden.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          {/* Form */}
          <ContactFormWizard locale="de" dict={de} />

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Direct contact */}
            <div className="bg-negro text-crudo p-6">
              <h3 className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide text-naranja mb-4">
                Direkter Kontakt
              </h3>
              <a
                href="mailto:info@tricholand.com"
                className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold hover:text-naranja transition-colors block mb-2"
              >
                info@tricholand.com
              </a>
              <p className="text-sm opacity-60">Murcia, Spanien</p>

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
                Schnelle Fragen
              </h3>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-bold mb-0.5">Was ist die Mindestbestellung?</h4>
                  <p className="text-marron-claro">100 Einheiten pro Bestellung.</p>
                </div>
                <div>
                  <h4 className="font-bold mb-0.5">Liefern Sie an Privatpersonen?</h4>
                  <p className="text-marron-claro">
                    Wir sind eine B2B-Großhandelsgärtnerei. Für kleine Einkäufe können wir Sie an Händler in Ihrer Region verweisen.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-0.5">Wie schnell antworten Sie?</h4>
                  <p className="text-marron-claro">Innerhalb von 24 Arbeitsstunden.</p>
                </div>
                <div>
                  <h4 className="font-bold mb-0.5">Liefern Sie in ganz Europa?</h4>
                  <p className="text-marron-claro">
                    Ja. EU und UK mit vollständiger phytosanitärer Dokumentation inklusive.
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

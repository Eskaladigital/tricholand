import type { Metadata } from 'next'
import { ContactFormWizard } from '@/components/contact/ContactFormWizard'
import { fr } from '@/lib/i18n/fr'
import { getAlternatesMetadata } from '@/lib/i18n/paths'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez Tricholand pour demander un devis en gros de Trichocereus. Réponse sous 24h ouvrées.',
  alternates: getAlternatesMetadata('fr', 'contact'),
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
            Demandez votre devis ou posez-nous toute question. Nous répondons sous 24h ouvrées.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          {/* Form */}
          <ContactFormWizard locale="fr" dict={fr} />

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Direct contact */}
            <div className="bg-negro text-crudo p-6">
              <h3 className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide text-naranja mb-4">
                Contact direct
              </h3>
              <a
                href="mailto:info@tricholand.com"
                className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold hover:text-naranja transition-colors block mb-2"
              >
                info@tricholand.com
              </a>
              <p className="text-sm opacity-60">Murcie, Espagne</p>

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
                Questions rapides
              </h3>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-bold mb-0.5">Quelle est la commande minimum ?</h4>
                  <p className="text-marron-claro">100 unités par commande.</p>
                </div>
                <div>
                  <h4 className="font-bold mb-0.5">Livrez-vous aux particuliers ?</h4>
                  <p className="text-marron-claro">
                    Nous sommes une pépinière B2B en gros. Pour les petits achats, nous pouvons vous orienter vers des distributeurs dans votre région.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-0.5">Combien de temps pour répondre ?</h4>
                  <p className="text-marron-claro">Sous 24 heures ouvrées.</p>
                </div>
                <div>
                  <h4 className="font-bold mb-0.5">Livrez-vous dans toute l&apos;Europe ?</h4>
                  <p className="text-marron-claro">
                    Oui. UE et Royaume-Uni avec toute la documentation phytosanitaire incluse.
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

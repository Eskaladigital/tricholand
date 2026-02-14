import type { Metadata } from 'next'
import Link from 'next/link'
import { de } from '@/lib/i18n/de'
import { getFullPath, getAlternatesMetadata } from '@/lib/i18n/paths'
import { CertificationsBar } from '@/components/home/CertificationsBar'

export const metadata: Metadata = {
  title: 'Dienstleistungen',
  description: 'Tricholand Dienstleistungen: Großhandel Trichocereus, Europaweiter Versand, EU/UK phytosanitäre Dokumentation und Anbau auf Bestellung.',
  alternates: getAlternatesMetadata('de', 'services'),
}

export default function ServiciosPage() {
  return (
    <>
      <section className="px-5 lg:px-8 py-16">
        <div className="mb-8 pb-4 border-b-2 border-negro">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            Dienstleistungen
          </h1>
          <p className="text-marron-claro mt-2">Komplette Lösungen für Fachleute der Branche</p>
        </div>

        <div className="max-w-3xl space-y-4 text-marron-claro leading-relaxed mb-12">
          <p>
            Bei Tricholand bieten wir einen umfassenden Service für Fachleute der Baumschul- und Gartenbaubranche.
            Von der Produktion und dem Anbau bis zum Versand mit allen erforderlichen Unterlagen sorgen wir dafür,
            dass Sie Ihre Pflanzen in perfektem Zustand und mit allen rechtlichen Garantien erhalten.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {[
            { num: '01', title: 'Großhandel', details: ['Mindestbestellung: 100 Einheiten', 'Sonderkonditionen für wiederkehrende Bestellungen und große Mengen', 'Zahlung per Überweisung oder 30 Tage für Stammkunden', 'Individuelles Angebot in weniger als 24 Arbeitsstunden', 'Frühzeitige Produktionsreservierung verfügbar'] },
            { num: '02', title: 'Europaweiter Versand', details: ['Spanien Festland: 48–72 Stunden', 'Europäische Union: 72–96 Stunden', 'Vereinigtes Königreich: 5–7 Werktage', 'Spezialverpackung für Kakteen (Einzelschutz)', 'Echtzeit-Sendungsverfolgung', 'Versicherung bei allen Sendungen inklusive'] },
            { num: '03', title: 'Dokumentation und Zertifizierungen', details: ['EU-Pflanzenpass bei jeder Sendung inklusive', 'Zolldokumentation für Export nach Großbritannien', 'Ursprungszeugnis bei Bedarf', 'Etikettierung gemäß geltender EU-Vorschriften', 'Beratung zu Importanforderungen'] },
            { num: '04', title: 'Anbau auf Bestellung', details: ['Frühzeitige Produktionsreservierung für das folgende Jahr', 'Spezifische Sorten auf Anfrage', 'Jährliche Liefergarantie für Kunden mit Vereinbarung', 'Maßgeschneiderte Größen nach Bedarf', 'Exklusive Sortenanzucht verfügbar'] },
          ].map((service) => (
            <div key={service.num} className="bg-blanco border border-linea p-8">
              <div className="font-[family-name:var(--font-archivo-narrow)] text-4xl font-bold text-naranja leading-none mb-4">{service.num}</div>
              <h2 className="font-[family-name:var(--font-archivo-narrow)] text-xl font-bold uppercase mb-4">{service.title}</h2>
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

        <div className="bg-negro text-crudo p-8 lg:p-12 text-center max-w-3xl mx-auto">
          <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl font-bold uppercase mb-3">
            Benötigen Sie einen maßgeschneiderten Service?
          </h2>
          <p className="opacity-70 mb-6">
            Kontaktieren Sie unser Vertriebsteam und wir erstellen ein auf Ihre Geschäftsanforderungen zugeschnittenes Angebot.
          </p>
          <Link href={getFullPath('de', 'contact')} className="inline-flex bg-naranja text-blanco px-8 py-3 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors">
            Informationen anfordern →
          </Link>
        </div>
      </section>

      <CertificationsBar dict={de} />
    </>
  )
}

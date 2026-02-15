import type { Metadata } from 'next'
import Link from 'next/link'
import { getFullPath, getAlternatesMetadata } from '@/lib/i18n/paths'

export const metadata: Metadata = {
  title: 'Phytosanitäre Zertifizierungen',
  description: 'Tricholand Zertifizierungen: EU-Pflanzenpass, UK-Exportdokumentation, europäische Regelkonformität für Kakteen.',
  alternates: getAlternatesMetadata('de', 'certifications'),
}

export default function CertificacionesPage() {
  return (
    <section className="pb-16">
      {/* Hero band */}
      <div className="bg-verde text-blanco px-5 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl lg:text-4xl font-bold uppercase mb-3">
            Phytosanitäre Zertifizierungen
          </h1>
          <p className="text-lg opacity-85 max-w-2xl mx-auto">
            Alle unsere Sendungen enthalten die von der geltenden europäischen Gesetzgebung geforderte Dokumentation
          </p>
        </div>
      </div>

      <div className="px-5 lg:px-8 py-16 max-w-5xl mx-auto">
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 mb-16">
          <div className="space-y-6 text-marron-claro leading-relaxed">
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl font-bold uppercase text-negro">
              EU-Pflanzenpass <span className="text-naranja">phytosanitär</span>
            </h2>
            <p>
              Der Pflanzenpass ist ein offizielles Dokument, das bescheinigt, dass Pflanzen die
              phytosanitären Anforderungen der Europäischen Union erfüllen. Er ist für den Handel
              mit lebenden Pflanzen innerhalb des EU-Gebiets obligatorisch und garantiert, dass die
              Exemplare frei von geregelten Schädlingen und Krankheiten sind.
            </p>
            <p>
              Bei Tricholand enthalten alle unsere Exemplare einen individuellen Pflanzenpass. Unsere
              Anlagen sind registriert und unterliegen regelmäßigen Inspektionen durch die offiziellen
              Pflanzengesundheitsdienste der Region Murcia.
            </p>
            <p>
              Der Pflanzenpass enthält: Code des zugelassenen Betreibers, Rückverfolgbarkeitscode,
              wissenschaftlicher Name der Art, Herkunftsland und gegebenenfalls geschützte
              Bestimmungszone.
            </p>

            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl font-bold uppercase text-negro pt-4">
              Export nach <span className="text-naranja">Großbritannien</span>
            </h2>
            <p>
              Nach dem Brexit erfordern Pflanzeneinfuhren nach Großbritannien zusätzliche
              Dokumentation. Tricholand verwaltet alle erforderlichen Unterlagen, damit Ihre Sendungen
              ohne Zwischenfälle ankommen:
            </p>
            <ul className="space-y-2 ml-1">
              {[
                'Phytosanitäres Exportzertifikat (ausgestellt von den spanischen Behörden)',
                'Zollausfuhrerklärung',
                'Vorabmeldung im britischen IPAFFS-System',
                'Etikettierung gemäß UK-Importanforderungen',
                'Vollständige Rückverfolgbarkeitsdokumentation',
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
                title: 'EU-Pflanzenpass',
                desc: 'In allen innergemeinschaftlichen Sendungen enthalten. Einhaltung der Verordnung (EU) 2016/2031.',
              },
              {
                icon: '🇬🇧',
                title: 'UK-Exportdokumente',
                desc: 'Phytosanitäres Zertifikat + Zolldokumentation für die Einfuhr nach Großbritannien.',
              },
              {
                icon: '🔍',
                title: 'Vollständige Rückverfolgbarkeit',
                desc: 'Jede Pflanze ist von ihrem Ursprung in unserer Gärtnerei bis zum Lieferpunkt rückverfolgbar.',
              },
              {
                icon: '✓',
                title: 'Offizielle Inspektionen',
                desc: 'Registrierte Anlagen unterliegen der regelmäßigen Kontrolle durch Pflanzengesundheit.',
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
            Häufig gestellte Fragen
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'Kann ich Pflanzen ohne Pflanzenpass kaufen?',
                a: 'Nein. Die europäische Gesetzgebung verlangt, dass alle lebenden Pflanzen, die innerhalb der EU vermarktet werden, einen Pflanzenpass enthalten. Es ist eine Gesundheitsgarantie für den Käufer und eine gesetzliche Anforderung für den Verkäufer.',
              },
              {
                q: 'Hat der Pflanzenpass zusätzliche Kosten?',
                a: 'Nein. Der Pflanzenpass ist im Preis aller unserer Pflanzen enthalten. Es gibt keine Aufschläge oder versteckte Kosten.',
              },
              {
                q: 'Versenden Sie außerhalb der Europäischen Union (außer UK)?',
                a: 'Derzeit versenden wir in die gesamte EU und nach Großbritannien. Für andere Ziele kontaktieren Sie uns und wir prüfen die Machbarkeit und erforderliche Dokumentation fallweise.',
              },
              {
                q: 'Was passiert, wenn meine Sendung beim Zoll festgehalten wird?',
                a: 'Unsere Sendungen enthalten alle erforderlichen Unterlagen, was das Risiko von Festhalten minimiert. Sollte dies dennoch eintreten, unterstützt Sie unser Team bei der Lösung.',
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
            Benötigen Sie weitere Informationen?
          </h2>
          <p className="opacity-70 mb-6">
            Bei Fragen zu Dokumentation, Importanforderungen oder Zertifizierungen kontaktieren Sie unser Team.
          </p>
          <Link
            href={getFullPath('de', 'contact')}
            className="inline-flex bg-naranja text-blanco px-8 py-3 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors"
          >
            Kontakt aufnehmen →
          </Link>
        </div>
      </div>
    </section>
  )
}

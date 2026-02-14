import type { Metadata } from 'next'
import Link from 'next/link'
import { getFullPath, getAlternatesMetadata } from '@/lib/i18n/paths'

export const metadata: Metadata = {
  title: 'Fytosanitaire certificeringen',
  description: 'Tricholand certificeringen: EU fytosanitair paspoort, VK exportdocumentatie, Europese regelgevingsconformiteit voor cactussen.',
  alternates: getAlternatesMetadata('nl', 'certifications'),
}

export default function CertificacionesPage() {
  return (
    <section className="pb-16">
      {/* Hero band */}
      <div className="bg-verde text-blanco px-5 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl lg:text-4xl font-bold uppercase mb-3">
            Fytosanitaire certificeringen
          </h1>
          <p className="text-lg opacity-85 max-w-2xl mx-auto">
            Al onze zendingen bevatten de documentatie die door de huidige Europese regelgeving wordt vereist
          </p>
        </div>
      </div>

      <div className="px-5 lg:px-8 py-16 max-w-5xl mx-auto">
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 mb-16">
          <div className="space-y-6 text-marron-claro leading-relaxed">
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl font-bold uppercase text-negro">
              EU fytosanitair <span className="text-naranja">paspoort</span>
            </h2>
            <p>
              Het fytosanitair paspoort is een officieel document dat certificeert dat planten voldoen aan
              de fytosanitaire vereisten van de Europese Unie. Het is verplicht voor de marketing van
              levende planten binnen het EU-grondgebied en garandeert dat exemplaren vrij zijn van gereguleerde
              plagen en ziekten.
            </p>
            <p>
              Bij Tricholand bevatten al onze exemplaren een individueel fytosanitair paspoort. Onze
              faciliteiten zijn geregistreerd en onderworpen aan periodieke inspecties door de officiële
              plantengezondheidsdiensten van de Regio Murcia.
            </p>
            <p>
              Het fytosanitair paspoort bevat: geautoriseerde exploitantcode, traceerbaarheidscode,
              wetenschappelijke naam van de soort, land van oorsprong en, indien van toepassing, beschermde
              bestemmingszone.
            </p>

            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl font-bold uppercase text-negro pt-4">
              Export naar <span className="text-naranja">Verenigd Koninkrijk</span>
            </h2>
            <p>
              Na de Brexit vereist de export van planten naar het Verenigd Koninkrijk aanvullende documentatie.
              Tricholand beheert alle benodigde documentatie zodat uw zendingen zonder problemen aankomen:
            </p>
            <ul className="space-y-2 ml-1">
              {[
                'Fytosanitair exportcertificaat (afgegeven door Spaanse autoriteiten)',
                'Douane-exportverklaring',
                'Voorafgaande melding aan het Britse IPAFFS-systeem',
                'Etikettering conform VK-importvereisten',
                'Volledige traceerbaarheidsdocumentatie',
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
                title: 'EU fytosanitair paspoort',
                desc: 'Inbegrepen bij alle intracommunautaire zendingen. Conform Verordening (EU) 2016/2031.',
              },
              {
                icon: '🇬🇧',
                title: 'VK exportdocumenten',
                desc: 'Fytosanitair certificaat + douanedocumentatie voor import naar het Verenigd Koninkrijk.',
              },
              {
                icon: '🔍',
                title: 'Volledige traceerbaarheid',
                desc: 'Elke plant is traceerbaar van oorsprong in onze kwekerij tot het leveringspunt.',
              },
              {
                icon: '✓',
                title: 'Officiële inspecties',
                desc: 'Geregistreerde faciliteiten onderworpen aan periodieke plantengezondheidscontrole.',
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
            Veelgestelde vragen
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'Kan ik planten kopen zonder fytosanitair paspoort?',
                a: 'Nee. De Europese regelgeving vereist dat alle levende planten die binnen de EU worden verhandeld, een fytosanitair paspoort bevatten. Het is een gezondheidsgarantie voor de koper en een wettelijke vereiste voor de verkoper.',
              },
              {
                q: 'Heeft het fytosanitair paspoort extra kosten?',
                a: 'Nee. Het fytosanitair paspoort is inbegrepen in de prijs van al onze planten. Er zijn geen toeslagen of verborgen kosten.',
              },
              {
                q: 'Leveren jullie buiten de Europese Unie (behalve VK)?',
                a: 'Momenteel leveren we aan de hele EU en het Verenigd Koninkrijk. Voor andere bestemmingen neem contact met ons op en we beoordelen de haalbaarheid en benodigde documentatie per geval.',
              },
              {
                q: 'Wat gebeurt er als mijn zending bij de douane wordt vastgehouden?',
                a: 'Onze zendingen bevatten alle vereiste documentatie, wat het risico op vastzetting minimaliseert. Mocht het onwaarschijnlijke geval zich voordoen, dan helpt ons team u bij de oplossing.',
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
            Heeft u meer informatie nodig?
          </h2>
          <p className="opacity-70 mb-6">
            Als u vragen heeft over documentatie, importvereisten of certificeringen, neem contact op met ons team.
          </p>
          <Link
            href={getFullPath('nl', 'contact')}
            className="inline-flex bg-naranja text-blanco px-8 py-3 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors"
          >
            Neem contact op →
          </Link>
        </div>
      </div>
    </section>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { getFullPath, getAlternatesMetadata } from '@/lib/i18n/paths'
import { nl } from '@/lib/i18n/nl'
import { CertificationsBar } from '@/components/home/CertificationsBar'

export const metadata: Metadata = {
  title: 'Diensten',
  description: 'Tricholand diensten: groothandel Trichocereus, leveringen in heel Europa, EU/VK fytosanitaire documentatie en teelt op bestelling.',
  alternates: getAlternatesMetadata('nl', 'services'),
}

export default function ServiciosPage() {
  return (
    <>
      {/* Intro */}
      <section className="px-5 lg:px-8 py-16">
        <div className="mb-8 pb-4 border-b-2 border-negro">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            Diensten
          </h1>
          <p className="text-marron-claro mt-2">Complete oplossingen voor professionals in de sector</p>
        </div>

        <div className="max-w-3xl space-y-4 text-marron-claro leading-relaxed mb-12">
          <p>
            Bij Tricholand bieden we een uitgebreide service voor professionals in de kwekerij- en tuinbouwsector.
            Van productie en teelt tot verzending met alle benodigde documentatie, wij zorgen ervoor dat u
            uw planten in perfecte staat ontvangt en met alle wettelijke garanties.
          </p>
        </div>

        {/* Detailed services */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {[
            {
              num: '01',
              title: 'Groothandel',
              details: [
                'Minimale bestelling: 200 stuks',
                'Speciale voorwaarden voor terugkerende bestellingen en grote volumes',
                'Betaling per overschrijving',
                'Offerte op maat in minder dan 24 werkuren',
                'Vroegtijdige productiereservering beschikbaar',
              ],
            },
            {
              num: '02',
              title: 'Leveringen in heel Europa',
              details: [
                'Vasteland Spanje: 48–72 uur',
                'Europese Unie: 72–96 uur',
                'Verenigd Koninkrijk: 5–7 werkdagen',
                'Gespecialiseerde verpakking voor cactussen (individuele bescherming)',
                'Real-time zendingsvolging',
                'Verzekering inbegrepen bij alle zendingen',
              ],
            },
            {
              num: '03',
              title: 'Documentatie en certificeringen',
              details: [
                'EU plantenpaspoort inbegrepen bij elke zending',
                'Fytosanitair certificaat beschikbaar voor exporten buiten de EU (extra kosten ca. €60)',
                'Certificaat van oorsprong indien vereist',
                'Etikettering conform de huidige Europese regelgeving',
                'Advies over importvereisten',
              ],
            },
            {
              num: '04',
              title: 'Teelt op bestelling',
              details: [
                'Vroegtijdige productiereservering voor het volgende jaar',
                'Specifieke variëteiten op aanvraag',
                'Jaarlijkse leveringsgarantie voor klanten met overeenkomst',
                'Maatwerk volgens behoeften',
                'Exclusieve variëteitenteelt beschikbaar',
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
            Heeft u een maatwerkservice nodig?
          </h2>
          <p className="opacity-70 mb-6">
            Neem contact op met ons verkoopteam en wij bereiden een voorstel op maat van uw bedrijfsbehoeften voor.
          </p>
          <Link
            href={getFullPath('nl', 'contact')}
            className="inline-flex bg-naranja text-blanco px-8 py-3 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors"
          >
            Informatie aanvragen →
          </Link>
        </div>
      </section>

      <CertificationsBar dict={nl} />
    </>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { getFullPath, getAlternatesMetadata } from '@/lib/i18n/paths'
import { it } from '@/lib/i18n/it'
import { CertificationsBar } from '@/components/home/CertificationsBar'

export const metadata: Metadata = {
  title: 'Servizi',
  description: 'Servizi Tricholand: vendita all\'ingrosso Trichocereus, spedizioni in tutta Europa, documentazione fitosanitaria UE/UK e coltivazione su ordinazione.',
  alternates: getAlternatesMetadata('it', 'services'),
}

export default function ServiciosPage() {
  return (
    <>
      {/* Intro */}
      <section className="px-5 lg:px-8 py-16">
        <div className="mb-8 pb-4 border-b-2 border-negro">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            Servizi
          </h1>
          <p className="text-marron-claro mt-2">Soluzioni complete per i professionisti del settore</p>
        </div>

        <div className="max-w-3xl space-y-4 text-marron-claro leading-relaxed mb-12">
          <p>
            Tricholand offre un servizio completo per i professionisti del settore vivaistico e del giardinaggio.
            Dalla produzione e coltivazione alla spedizione con tutta la documentazione necessaria, ci occupiamo
            di farvi ricevere le vostre piante in perfette condizioni e con tutte le garanzie legali.
          </p>
        </div>

        {/* Detailed services */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {[
            {
              num: '01',
              title: 'Vendita all\'ingrosso',
              details: [
                'Ordine minimo: 200 pezzi',
                'Condizioni speciali per ordini ricorrenti e grandi volumi',
                'Pagamento tramite bonifico',
                'Preventivo personalizzato in meno di 24 ore lavorative',
                'Possibilità di prenotazione anticipata della produzione',
              ],
            },
            {
              num: '02',
              title: 'Spedizioni in tutta Europa',
              details: [
                'Spagna continentale: 48–72 ore',
                'Unione Europea: 72–96 ore',
                'Regno Unito: 5–7 giorni lavorativi',
                'Imballaggio specializzato per cactus (protezione individuale)',
                'Tracciamento spedizione in tempo reale',
                'Assicurazione inclusa in tutte le spedizioni',
              ],
            },
            {
              num: '03',
              title: 'Documentazione e certificazioni',
              details: [
                'Passaporto vegetale europeo incluso in ogni spedizione',
                'Certificato fitosanitario disponibile per esportazioni fuori UE (costo aggiuntivo ca. 60 €)',
                'Certificato di origine se richiesto',
                'Etichettatura conforme alla normativa europea vigente',
                'Consulenza sui requisiti di importazione',
              ],
            },
            {
              num: '04',
              title: 'Coltivazione su ordinazione',
              details: [
                'Prenotazione anticipata della produzione per l\'anno successivo',
                'Varietà specifiche su richiesta',
                'Garanzia di consegna annuale per clienti con accordo',
                'Personalizzazione secondo le esigenze',
                'Coltivazione esclusiva di varietà disponibile',
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
            Avete bisogno di un servizio su misura?
          </h2>
          <p className="opacity-70 mb-6">
            Contattate il nostro team commerciale e prepareremo una proposta personalizzata in base alle esigenze della vostra azienda.
          </p>
          <Link
            href={getFullPath('it', 'contact')}
            className="inline-flex bg-naranja text-blanco px-8 py-3 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors"
          >
            Richiedi informazioni →
          </Link>
        </div>
      </section>

      <CertificationsBar dict={it} />
    </>
  )
}

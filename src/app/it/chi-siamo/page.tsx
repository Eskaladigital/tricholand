import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getFullPath, getAlternatesMetadata } from '@/lib/i18n/paths'
import { it } from '@/lib/i18n/it'
import { StatsBar } from '@/components/home/StatsBar'

export const metadata: Metadata = {
  title: 'Chi siamo',
  description: 'Scopri Tricholand: vivaio produttore specializzato in Trichocereus e cactacee colonnari a Murcia, Spagna. Oltre 50 varietà, 2.500 m² di coltivazione.',
  alternates: getAlternatesMetadata('it', 'about'),
}

export default function SobreNosotrosPage() {
  return (
    <>
      <section className="px-5 lg:px-8 py-16">
        <div className="mb-8 pb-4 border-b-2 border-negro">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            Chi siamo
          </h1>
          <p className="text-marron-claro mt-2">Vivaio produttore a Murcia, Spagna</p>
        </div>

        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl font-bold uppercase mb-4">
              Siamo <span className="text-naranja">produttori</span>
            </h2>
            <div className="space-y-4 text-marron-claro leading-relaxed">
              <p>
                Tricholand è un vivaio produttore specializzato nella coltivazione e distribuzione all&apos;ingrosso
                di cactus del genere Trichocereus e altre cactacee colonnari. Dalle nostre strutture di 2.500 m²
                a Murcia, Spagna, coltiviamo oltre 50 varietà che distribuiamo a vivai, garden center e
                distributori in tutta Europa.
              </p>
              <p>
                I cactus Trichocereus sono un genere di piante succulente appartenenti alla famiglia Cactaceae,
                originarie del Sud America — in particolare Argentina, Bolivia, Cile, Ecuador e Perù.
                Sono noti per la loro imponente forma colonnare e la spettacolare fioritura notturna.
              </p>
              <p>
                Siamo un&apos;azienda in continua crescita con l&apos;obiettivo di offrire a tutti i nostri clienti
                le piante di cui hanno bisogno ogni anno, riservando parte della nostra coltivazione per
                garantire uno stock adattato alla domanda di ogni cliente.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Image
              src="/images/vivero/productores_cactus_1.png"
              alt="Vivaio Tricholand"
              width={500}
              height={350}
              sizes="(max-width: 1024px) 50vw, 25vw"
              quality={65}
              className="w-full h-[200px] lg:h-full object-cover"
            />
            <Image
              src="/images/vivero/productores_cactus_2.png"
              alt="Coltivazione Trichocereus"
              width={500}
              height={350}
              sizes="(max-width: 1024px) 50vw, 25vw"
              quality={65}
              className="w-full h-[200px] lg:h-full object-cover"
            />
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: 'Produzione propria',
              text: 'Tutto il nostro stock proviene dalle nostre strutture. Controlliamo l\'intero processo dal seme o talea alla pianta pronta per la vendita.',
            },
            {
              title: 'Spedizioni in tutta Europa',
              text: 'Consegniamo in tutta l\'Unione Europea e importiamo nel Regno Unito con tutta la documentazione aggiornata per le spedizioni all\'ingrosso.',
            },
            {
              title: 'Certificazione fitosanitaria',
              text: 'Tutti i nostri esemplari includono il passaporto fitosanitario UE. Documentazione doganale completa per l\'export verso il Regno Unito.',
            },
            {
              title: 'Oltre 50 varietà',
              text: 'La nostra collezione comprende le principali specie di Trichocereus più ibridi selezionati, forme crestate e varietà rare.',
            },
            {
              title: 'Consegna garantita',
              text: 'Prenotazione anticipata della produzione per garantire la consegna delle varietà e quantità necessarie alla vostra azienda.',
            },
            {
              title: 'Consulenza professionale',
              text: 'Supportiamo i nostri clienti con consulenza tecnica su coltivazione, cura e presentazione delle piante.',
            },
          ].map((item, i) => (
            <div key={i} className="bg-blanco border border-linea p-6">
              <h3 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-marron-claro leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-negro text-crudo p-8 lg:p-12 text-center max-w-3xl mx-auto">
          <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl font-bold uppercase mb-3">
            Vuoi collaborare con noi?
          </h2>
          <p className="opacity-70 mb-6">
            Se sei un professionista del settore e interessato ai nostri prodotti, contattaci per ricevere il nostro catalogo e le condizioni.
          </p>
          <Link
            href={getFullPath('it', 'contact')}
            className="inline-flex bg-naranja text-blanco px-8 py-3 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors"
          >
            Richiedi informazioni →
          </Link>
        </div>
      </section>

      <StatsBar dict={it} />
    </>
  )
}

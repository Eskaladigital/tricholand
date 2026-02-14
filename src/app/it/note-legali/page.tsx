import type { Metadata } from 'next'
import { getAlternatesMetadata } from '@/lib/i18n/paths'

export const metadata: Metadata = {
  title: 'Avviso legale',
  description: 'Avviso legale e condizioni d\'uso del sito web Tricholand.',
  robots: { index: false, follow: false },
  alternates: getAlternatesMetadata('it', 'legal'),
}

export default function AvisoLegalPage() {
  return (
    <section className="px-5 lg:px-8 py-16 max-w-3xl mx-auto">
      <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase mb-6">
        Avviso legale
      </h1>

      <div className="space-y-6 text-sm text-marron-claro leading-relaxed">
        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          1. Dati identificativi
        </h2>
        <p>
          Titolare: Tricholand · Sede: Murcia, Spagna · Email: info@tricholand.com
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          2. Oggetto
        </h2>
        <p>
          Questo sito web ha lo scopo di fornire informazioni sui prodotti e servizi Tricholand, un
          vivaio produttore specializzato in Trichocereus e cactacee colonnari per la vendita B2B all&apos;ingrosso.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          3. Proprietà intellettuale
        </h2>
        <p>
          Tutti i contenuti di questo sito (testi, foto, design grafico, codice sorgente, loghi,
          marchi) sono di proprietà di Tricholand o dei suoi legittimi titolari e sono protetti dalle
          leggi sulla proprietà intellettuale e industriale.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          4. Condizioni d&apos;uso
        </h2>
        <p>
          Le informazioni su questo sito sono solo a scopo orientativo. Prezzi, disponibilità e condizioni
          di vendita sono forniti su richiesta e possono variare senza preavviso. Tricholand si riserva
          il diritto di modificare i contenuti del sito senza preavviso.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          5. Legge applicabile
        </h2>
        <p>
          Questo sito web è soggetto alla legislazione spagnola. Per qualsiasi controversia derivante dall&apos;uso
          di questo sito, le parti si sottomettono ai tribunali di Murcia, Spagna.
        </p>
      </div>
    </section>
  )
}

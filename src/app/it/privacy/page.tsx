import type { Metadata } from 'next'
import { getAlternatesMetadata } from '@/lib/i18n/paths'

export const metadata: Metadata = {
  title: 'Politica sulla privacy',
  description: 'Politica sulla privacy e protezione dei dati personali di Tricholand.',
  robots: { index: false, follow: false },
  alternates: getAlternatesMetadata('it', 'privacy'),
}

export default function PoliticaPrivacidadPage() {
  return (
    <section className="px-5 lg:px-8 py-16 max-w-3xl mx-auto">
      <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase mb-6">
        Politica sulla privacy
      </h1>

      <div className="space-y-6 text-sm text-marron-claro leading-relaxed">
        <p>
          <strong className="text-negro">Ultimo aggiornamento:</strong> Gennaio 2025
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          1. Responsabile del trattamento
        </h2>
        <p>
          Tricholand · Murcia, Spagna · info@tricholand.com
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          2. Dati che raccogliamo
        </h2>
        <p>
          Tramite il modulo di contatto raccogliamo: nome, email, telefono (opzionale), azienda (opzionale),
          paese, città (opzionale) e il contenuto del messaggio. Raccogliamo anche il tipo di richiesta
          e come ci avete trovato per migliorare il nostro servizio.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          3. Finalità del trattamento
        </h2>
        <p>
          I dati sono trattati per: gestire le richieste ricevute tramite il sito web, inviare i preventivi
          richiesti e rispondere alle richieste di informazioni.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          4. Base giuridica
        </h2>
        <p>
          Il trattamento si basa sul consenso esplicito dell&apos;interessato, concesso accettando questa
          politica e inviando il modulo di contatto.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          5. Conservazione dei dati
        </h2>
        <p>
          I dati sono conservati per il tempo necessario a rispondere alla richiesta e, se applicabile,
          per il periodo necessario a soddisfare gli obblighi legali applicabili.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          6. Diritti dell&apos;interessato
        </h2>
        <p>
          Potete esercitare i vostri diritti di accesso, rettifica, cancellazione, opposizione, limitazione
          del trattamento e portabilità dei dati contattando info@tricholand.com.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          7. Cookie
        </h2>
        <p>
          Questo sito web non utilizza cookie di terze parti o cookie di tracciamento. Vengono utilizzati
          solo cookie tecnici strettamente necessari per il funzionamento del sito.
        </p>
      </div>
    </section>
  )
}

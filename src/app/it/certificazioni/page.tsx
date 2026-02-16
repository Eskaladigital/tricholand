import type { Metadata } from 'next'
import Link from 'next/link'
import { getFullPath, getAlternatesMetadata } from '@/lib/i18n/paths'

export const metadata: Metadata = {
  title: 'Certificazioni fitosanitarie',
  description: 'Certificazioni Tricholand: passaporto di pianta europeo UE, documentazione export UK, conformità normativa europea per cactus.',
  alternates: getAlternatesMetadata('it', 'certifications'),
}

export default function CertificacionesPage() {
  return (
    <section className="pb-16">
      {/* Hero band */}
      <div className="bg-verde text-blanco px-5 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl lg:text-4xl font-bold uppercase mb-3">
            Certificazioni fitosanitarie
          </h1>
          <p className="text-lg opacity-85 max-w-2xl mx-auto">
            Tutte le nostre spedizioni includono la documentazione richiesta dalla normativa europea vigente
          </p>
        </div>
      </div>

      <div className="px-5 lg:px-8 py-16 max-w-5xl mx-auto">
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 mb-16">
          <div className="space-y-6 text-marron-claro leading-relaxed">
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl font-bold uppercase text-negro">
              Passaporto di pianta europeo <span className="text-naranja">UE</span>
            </h2>
            <p>
              Il passaporto di pianta europeo è un documento ufficiale che certifica che le piante soddisfano i
              requisiti fitosanitari dell&apos;Unione Europea. È obbligatorio per la commercializzazione di
              piante vive all&apos;interno del territorio UE e garantisce che gli esemplari siano privi di
              organismi nocivi e malattie regolamentati.
            </p>
            <p>
              Presso Tricholand tutti i nostri esemplari includono un passaporto di pianta europeo individuale. Le
              nostre strutture sono registrate e soggette a ispezioni periodiche da parte dei servizi ufficiali
              di sanità vegetale della Regione di Murcia.
            </p>
            <p>
              Il passaporto di pianta europeo contiene: codice operatore autorizzato, codice di tracciabilità,
              nome scientifico della specie, paese di origine e, se applicabile, zona protetta di destinazione.
            </p>

            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl font-bold uppercase text-negro pt-4">
              Export verso <span className="text-naranja">Regno Unito</span>
            </h2>
            <p>
              Dopo la Brexit, l&apos;export di piante verso il Regno Unito richiede documentazione aggiuntiva.
              Tricholand gestisce tutta la documentazione necessaria affinché le vostre spedizioni arrivino senza problemi:
            </p>
            <ul className="space-y-2 ml-1">
              {[
                'Certificato fitosanitario di esportazione (rilasciato dalle autorità spagnole)',
                'Dichiarazione doganale di esportazione',
                'Notifica preventiva al sistema IPAFFS britannico',
                'Etichettatura conforme ai requisiti di importazione UK',
                'Documentazione completa di tracciabilità',
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
                title: 'Passaporto di pianta europeo UE',
                desc: 'Incluso senza costi aggiuntivi in tutte le spedizioni intracomunitarie. Conforme al Regolamento (UE) 2016/2031.',
              },
              {
                icon: '🇬🇧',
                title: 'Documenti export UK',
                desc: 'Certificato fitosanitario + documentazione doganale per l\'importazione nel Regno Unito.',
              },
              {
                icon: '🔍',
                title: 'Tracciabilità completa',
                desc: 'Ogni pianta è tracciabile dall\'origine nel nostro vivaio fino al punto di consegna.',
              },
              {
                icon: '✓',
                title: 'Ispezioni ufficiali',
                desc: 'Strutture registrate soggette a controlli periodici di sanità vegetale.',
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
            Domande frequenti
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'Posso acquistare piante senza passaporto di pianta europeo?',
                a: 'No. La normativa europea richiede che tutte le piante vive commercializzate nell\'UE abbiano un passaporto di pianta europeo. È una garanzia sanitaria per l\'acquirente e un requisito legale per il venditore.',
              },
              {
                q: 'Il passaporto di pianta europeo ha costi aggiuntivi?',
                a: 'No. Il passaporto di pianta europeo è incluso senza costi aggiuntivi nel prezzo di tutte le nostre piante. Il certificato fitosanitario (richiesto solo per esportazioni fuori dall\'UE) ha un costo aggiuntivo di circa 60€.',
              },
              {
                q: 'Consegnate fuori dall\'Unione Europea (oltre al Regno Unito)?',
                a: 'Attualmente consegniamo in tutta l\'UE e nel Regno Unito. Per altre destinazioni contattateci e valuteremo la fattibilità e la documentazione necessaria caso per caso.',
              },
              {
                q: 'Cosa succede se la mia spedizione viene trattenuta in dogana?',
                a: 'Le nostre spedizioni includono tutta la documentazione richiesta, il che minimizza il rischio di trattenimento. Nel caso improbabile che si verifichi, il nostro team vi assisterà nella risoluzione.',
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
            Avete bisogno di maggiori informazioni?
          </h2>
          <p className="opacity-70 mb-6">
            Se avete domande su documentazione, requisiti di importazione o certificazioni, contattate il nostro team.
          </p>
          <Link
            href={getFullPath('it', 'contact')}
            className="inline-flex bg-naranja text-blanco px-8 py-3 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors"
          >
            Contattaci →
          </Link>
        </div>
      </div>
    </section>
  )
}

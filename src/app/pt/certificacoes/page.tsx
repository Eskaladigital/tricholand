import type { Metadata } from 'next'
import Link from 'next/link'
import { getFullPath, getAlternatesMetadata } from '@/lib/i18n/paths'

export const metadata: Metadata = {
  title: 'Certificações fitossanitárias',
  description: 'Certificações Tricholand: passaporte fitossanitário UE, documentação de exportação UK, conformidade regulamentar europeia para cactos.',
  alternates: getAlternatesMetadata('pt', 'certifications'),
}

export default function CertificacionesPage() {
  return (
    <section className="pb-16">
      {/* Hero band */}
      <div className="bg-verde text-blanco px-5 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl lg:text-4xl font-bold uppercase mb-3">
            Certificações fitossanitárias
          </h1>
          <p className="text-lg opacity-85 max-w-2xl mx-auto">
            Todos os nossos envios incluem a documentação exigida pela regulamentação europeia vigente
          </p>
        </div>
      </div>

      <div className="px-5 lg:px-8 py-16 max-w-5xl mx-auto">
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 mb-16">
          <div className="space-y-6 text-marron-claro leading-relaxed">
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl font-bold uppercase text-negro">
              Passaporte fitossanitário <span className="text-naranja">UE</span>
            </h2>
            <p>
              O passaporte fitossanitário é um documento oficial que certifica que as plantas cumprem os
              requisitos fitossanitários da União Europeia. É obrigatório para a comercialização de
              plantas vivas no território da UE e garante que os exemplares estão livres de pragas e
              doenças regulamentadas.
            </p>
            <p>
              Na Tricholand, todos os nossos exemplares incluem um passaporte fitossanitário individual. As
              nossas instalações estão registadas e sujeitas a inspeções periódicas pelos serviços oficiais
              de sanidade vegetal da Região de Múrcia.
            </p>
            <p>
              O passaporte fitossanitário contém: código do operador autorizado, código de rastreabilidade,
              nome científico da espécie, país de origem e, se aplicável, zona protegida de destino.
            </p>

            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl font-bold uppercase text-negro pt-4">
              Exportação para <span className="text-naranja">Reino Unido</span>
            </h2>
            <p>
              Após o Brexit, a exportação de plantas para o Reino Unido requer documentação adicional.
              A Tricholand gere toda a documentação necessária para que os seus envios cheguem sem problemas:
            </p>
            <ul className="space-y-2 ml-1">
              {[
                'Certificado fitossanitário de exportação (emitido pelas autoridades espanholas)',
                'Declaração aduaneira de exportação',
                'Notificação prévia ao sistema IPAFFS britânico',
                'Etiquetagem conforme requisitos de importação UK',
                'Documentação completa de rastreabilidade',
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
                title: 'Passaporte fitossanitário UE',
                desc: 'Incluído em todos os envios intracomunitários. Conforme Regulamento (UE) 2016/2031.',
              },
              {
                icon: '🇬🇧',
                title: 'Documentos de exportação UK',
                desc: 'Certificado fitossanitário + documentação aduaneira para importação no Reino Unido.',
              },
              {
                icon: '🔍',
                title: 'Rastreabilidade completa',
                desc: 'Cada planta é rastreável desde a origem no nosso viveiro até ao ponto de entrega.',
              },
              {
                icon: '✓',
                title: 'Inspeções oficiais',
                desc: 'Instalações registadas sujeitas a controlo periódico de sanidade vegetal.',
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
            Perguntas frequentes
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'Posso comprar plantas sem passaporte fitossanitário?',
                a: 'Não. A regulamentação europeia exige que todas as plantas vivas comercializadas na UE tenham passaporte fitossanitário. É uma garantia sanitária para o comprador e um requisito legal para o vendedor.',
              },
              {
                q: 'O passaporte fitossanitário tem custos adicionais?',
                a: 'Não. O passaporte fitossanitário está incluído no preço de todas as nossas plantas. Não há suplementos ou custos ocultos.',
              },
              {
                q: 'Entregam fora da União Europeia (além do Reino Unido)?',
                a: 'Atualmente entregamos em toda a UE e no Reino Unido. Para outros destinos contacte-nos e avaliaremos a viabilidade e documentação necessária caso a caso.',
              },
              {
                q: 'O que acontece se o meu envio for retido na alfândega?',
                a: 'Os nossos envios incluem toda a documentação exigida, o que minimiza o risco de retenção. No caso improvável de ocorrer, a nossa equipa ajudá-lo-á na resolução.',
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
            Precisa de mais informações?
          </h2>
          <p className="opacity-70 mb-6">
            Se tiver dúvidas sobre documentação, requisitos de importação ou certificações, contacte a nossa equipa.
          </p>
          <Link
            href={getFullPath('pt', 'contact')}
            className="inline-flex bg-naranja text-blanco px-8 py-3 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors"
          >
            Contacte-nos →
          </Link>
        </div>
      </div>
    </section>
  )
}

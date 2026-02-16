import type { Metadata } from 'next'
import Link from 'next/link'
import { getFullPath, getAlternatesMetadata } from '@/lib/i18n/paths'
import { pt } from '@/lib/i18n/pt'
import { CertificationsBar } from '@/components/home/CertificationsBar'

export const metadata: Metadata = {
  title: 'Serviços',
  description: 'Serviços Tricholand: venda por atacado de Trichocereus, envios para toda a Europa, documentação fitossanitária UE/UK e cultivo sob encomenda.',
  alternates: getAlternatesMetadata('pt', 'services'),
}

export default function ServiciosPage() {
  return (
    <>
      {/* Intro */}
      <section className="px-5 lg:px-8 py-16">
        <div className="mb-8 pb-4 border-b-2 border-negro">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            Serviços
          </h1>
          <p className="text-marron-claro mt-2">Soluções completas para profissionais do setor</p>
        </div>

        <div className="max-w-3xl space-y-4 text-marron-claro leading-relaxed mb-12">
          <p>
            Na Tricholand oferecemos um serviço integral para profissionais do setor viveirista e de
            jardinagem. Da produção e cultivo ao envio com toda a documentação necessária, encarregamo-nos
            de que receba as suas plantas em perfeitas condições e com todas as garantias legais.
          </p>
        </div>

        {/* Detailed services */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {[
            {
              num: '01',
              title: 'Venda por atacado',
              details: [
                'Pedido mínimo: 200 unidades',
                'Condições especiais para pedidos recorrentes e grandes volumes',
                'Pagamento por transferência bancária',
                'Orçamento personalizado em menos de 24 horas úteis',
                'Possibilidade de reserva antecipada de produção',
              ],
            },
            {
              num: '02',
              title: 'Envios para toda a Europa',
              details: [
                'Espanha continental: 48–72 horas',
                'União Europeia: 72–96 horas',
                'Reino Unido: 5–7 dias úteis',
                'Embalagem especializada para cactos (proteção individual)',
                'Rastreamento de envio em tempo real',
                'Seguro incluído em todos os envios',
              ],
            },
            {
              num: '03',
              title: 'Documentação e certificações',
              details: [
                'Passaporte de planta europeu incluído em cada envio',
                'Documentação aduaneira para exportação para o Reino Unido',
                'Certificado de origem se necessário',
                'Etiquetagem conforme a regulamentação europeia vigente',
                'Aconselhamento sobre requisitos de importação',
              ],
            },
            {
              num: '04',
              title: 'Cultivo sob encomenda',
              details: [
                'Reserva antecipada de produção para o ano seguinte',
                'Variedades específicas sob pedido',
                'Garantia de entrega anual para clientes com acordo',
                'Personalização conforme necessidades',
                'Cultivo exclusivo de variedades disponível',
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
            Precisa de um serviço personalizado?
          </h2>
          <p className="opacity-70 mb-6">
            Contacte a nossa equipa comercial e prepararemos uma proposta personalizada de acordo com as necessidades da sua empresa.
          </p>
          <Link
            href={getFullPath('pt', 'contact')}
            className="inline-flex bg-naranja text-blanco px-8 py-3 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors"
          >
            Solicitar informações →
          </Link>
        </div>
      </section>

      <CertificationsBar dict={pt} />
    </>
  )
}

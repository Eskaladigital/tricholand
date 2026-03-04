import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getFullPath } from '@/lib/i18n/paths'

const LOCALE = 'pt'
const BASE_URL = 'https://www.tricholand.com'
const SLUG = 'trichocereus-pachanoi-venda-portugal'

export const metadata: Metadata = {
  title: 'Trichocereus Pachanoi à Venda Portugal — Grossista B2B | Tricholand',
  description:
    'Comprar Trichocereus Pachanoi por grosso em Portugal, viveiro B2B em Espanha, Passaporte Fitossanitário UE, mínimo 750 unidades',
  keywords: [
    'trichocereus pachanoi à venda',
    'san pedro cactus portugal',
    'cactus grossista portugal',
    'comprar trichocereus pachanoi',
    'trichocereus pachanoi grossista',
    'cactus san pedro por grosso',
    'viveiro trichocereus',
    'fornecedor cactus B2B portugal',
  ],
  alternates: {
    canonical: `${BASE_URL}/pt/variedades/${SLUG}`,
  },
  openGraph: {
    title: 'Trichocereus Pachanoi à Venda Portugal — Grossista B2B | Tricholand',
    description:
      'Comprar Trichocereus Pachanoi por grosso de um viveiro especializado em Espanha. Passaporte Fitossanitário UE incluído. Entrega em Portugal.',
    images: ['/images/varieties/Trichocereus_Pachanoi_1.webp'],
    type: 'website',
    locale: 'pt_PT',
  },
}

const SIZES = [
  { range: '15–20 cm', label: 'Plântulas', desc: 'Ideais para revenda, enxertia ou retalho' },
  { range: '25–35 cm', label: 'Plantas jovens', desc: 'Sistema radicular desenvolvido, prontas para centros de jardinagem' },
  { range: '35–55 cm', label: 'Plantas estabelecidas', desc: 'A nossa medida mais procurada — impacto visual e rusticidade' },
  { range: '55–80 cm', label: 'Exemplares', desc: 'Peças de destaque para paisagismo e retalho premium' },
]

const BENEFITS = [
  {
    icon: '🌱',
    title: 'Passaporte Fitossanitário UE',
    desc: 'Cada envio inclui o Passaporte Fitossanitário UE oficial. Totalmente conforme para importação em Portugal (troca intracomunitária, sem formalidades aduaneiras adicionais).',
  },
  {
    icon: '🚛',
    title: 'Entrega Portugal',
    desc: 'Enviamos as suas encomendas paletizadas diretamente do nosso viveiro em Múrcia, Espanha, para todo o Portugal. Transporte com controlo de temperatura disponível.',
  },
  {
    icon: '📦',
    title: 'Mín. 750 unidades',
    desc: 'Encomenda mínima de 750 plantas por variedade, depois em incrementos de 150 unidades. Ideal para centros de jardinagem, viveiros, paisagistas e retalhistas especializados.',
  },
  {
    icon: '💰',
    title: 'Preços Competitivos',
    desc: 'Preços diretos do viveiro, sem intermediários. Descontos por volume para encomendas acima de 750 unidades. Orçamento personalizado em 24 horas.',
  },
  {
    icon: '☀️',
    title: 'Cultivado em Múrcia',
    desc: 'Os nossos Trichocereus são cultivados em campo aberto sob o sol mediterrânico espanhol — plantas mais vigorosas e saudáveis do que em estufa.',
  },
  {
    icon: '🤝',
    title: 'Apoio B2B em Português',
    desc: 'Interlocutor dedicado para clientes portugueses. Falamos português e conhecemos o mercado. Condições de pagamento flexíveis para clientes regulares.',
  },
]

const FAQ = [
  {
    q: 'Posso importar Trichocereus Pachanoi em Portugal?',
    a: 'Sim. O Trichocereus Pachanoi é uma planta ornamental legal em Portugal. Portugal é país membro da UE — não há formalidades aduaneiras nem controlos na fronteira com Espanha. Todas as nossas remessas incluem o Passaporte Fitossanitário UE exigido para troca intracomunitária.',
  },
  {
    q: 'Qual é a quantidade mínima de encomenda?',
    a: 'O nosso mínimo é de 750 plantas por variedade (um lote completo). Depois pode acrescentar incrementos de 150 unidades. Para encomendas mistas com diferentes variedades de Trichocereus (Pachanoi, Peruvianus, Bridgesii), podemos preparar paletes à medida.',
  },
  {
    q: 'Quanto tempo demora a entrega a Portugal?',
    a: 'A entrega standard é de 1 a 2 dias úteis do nosso viveiro em Múrcia até Portugal. A proximidade da fronteira Espanha-Portugal permite entregas rápidas. Prevemos 7 dias para preparação da encomenda antes da expedição.',
  },
  {
    q: 'Oferecem descontos por volume?',
    a: 'Sim. Aplicamos preços escalonados conforme o volume encomendado. Contacte-nos com as suas necessidades e enviaremos um orçamento personalizado em 24 horas úteis.',
  },
  {
    q: 'Que tamanhos estão disponíveis?',
    a: 'Fornecemos Trichocereus Pachanoi em tamanhos desde 15 cm (plântulas) até 80 cm e mais (exemplares). O tamanho mais procurado pelos compradores portugueses é 35–55 cm.',
  },
  {
    q: 'O clima português é adequado para Trichocereus Pachanoi?',
    a: 'Sim. O Trichocereus Pachanoi adapta-se perfeitamente ao clima mediterrânico português. Na maior parte do país pode permanecer ao ar livre todo o ano com proteção mínima. Tolera geadas breves até -2°C. No Algarve e na costa, prospera sem necessidade de abrigo no inverno.',
  },
]

export default function PachanoiVendaPortugal() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end">
        <Image
          src="/images/varieties/Trichocereus_Pachanoi_1.webp"
          alt="Trichocereus Pachanoi — Cactus San Pedro por grosso para compradores portugueses"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-negro/80 via-negro/30 to-transparent" />
        <div className="relative z-10 w-full px-5 lg:px-8 pb-12 lg:pb-16 max-w-5xl mx-auto">
          <span className="inline-block bg-naranja text-blanco px-3 py-1.5 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold tracking-widest uppercase mb-4">
            Grossista B2B · Entrega Portugal
          </span>
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-4xl lg:text-6xl font-bold text-blanco uppercase leading-[1.05]">
            Trichocereus Pachanoi
            <br />
            <span className="text-naranja">à Venda em Portugal</span>
          </h1>
          <p className="text-lg lg:text-xl text-blanco/85 mt-4 max-w-2xl">
            Cactos San Pedro de viveiro especializado, expedidos diretamente de Espanha para Portugal.
            Passaporte Fitossanitário UE incluído. Preços grossista a partir de 750 unidades.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href={getFullPath(LOCALE, 'contact')}
              className="bg-naranja text-blanco px-7 py-3.5 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors"
            >
              Pedir Orçamento →
            </Link>
            <Link
              href={getFullPath(LOCALE, 'varieties')}
              className="bg-blanco/10 backdrop-blur text-blanco border border-blanco/30 px-7 py-3.5 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-blanco/20 transition-colors"
            >
              Todas as Variedades
            </Link>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-negro text-crudo">
        <div className="max-w-5xl mx-auto px-5 lg:px-8 py-5 flex flex-wrap justify-center gap-x-10 gap-y-2 text-sm font-[family-name:var(--font-archivo-narrow)] uppercase tracking-wide">
          <span>Passaporte Fitossanitário UE ✓</span>
          <span>Direto do Viveiro ✓</span>
          <span>Entrega Portugal ✓</span>
          <span>Orçamento em 24h ✓</span>
        </div>
      </section>

      {/* About this variety */}
      <section className="px-5 lg:px-8 py-16 lg:py-20 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-6 pb-3 border-b-2 border-negro">
              Porquê Trichocereus Pachanoi?
            </h2>
            <p className="text-marron-claro leading-relaxed mb-4">
              <strong className="text-negro">Trichocereus Pachanoi</strong> (San Pedro) é um dos cactos colunares mais icónicos e comercialmente bem-sucedidos no mercado europeu. Originário dos Andes, adapta-se perfeitamente ao clima português — mediterrânico, com solo bem drenado e exposição solar. A proximidade com Espanha permite entregas rápidas em 1 a 2 dias úteis.
            </p>
            <p className="text-marron-claro leading-relaxed mb-4">
              A cor azul-esverdeada distintiva, a forma colunar elegante e o crescimento rápido (até 30 cm por ano) tornam-no muito popular junto dos consumidores. Produz flores brancas noturnas espetaculares com até 22 cm de diâmetro.
            </p>
            <ul className="space-y-2 mt-6">
              {[
                'Crescimento rápido: até 30 cm/ano em condições ótimas',
                'Rústico até -2°C — adequado para posições abrigadas em Portugal',
                'Flores brancas noturnas espetaculares de 22 cm',
                'Manutenção mínima uma vez estabelecido',
                'Excelente como porta-enxerto',
                'Alta procura — valor retail comprovado',
              ].map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <span className="text-naranja font-bold mt-0.5">→</span>
                  <span className="text-marron-claro text-sm">{h}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/5] bg-crudo">
            <Image
              src="/images/products/producto_trichocereus_pachanoi_1.webp"
              alt="Trichocereus Pachanoi pronto para expedição por grosso"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* Available sizes */}
      <section className="bg-crudo px-5 lg:px-8 py-16 lg:py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-2 text-center">
            Tamanhos disponíveis
          </h2>
          <p className="text-marron-claro text-center mb-10">
            Todos os tamanhos cultivados no nosso viveiro em Múrcia, Espanha — expedição direta para Portugal
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SIZES.map((s) => (
              <div key={s.range} className="bg-blanco border border-linea p-6 text-center hover:-translate-y-1 hover:shadow-lg transition-all">
                <p className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold text-naranja mb-1">
                  {s.range}
                </p>
                <p className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide mb-3">
                  {s.label}
                </p>
                <p className="text-xs text-marron-claro leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-sm text-marron-claro">
            Tamanhos à medida e paletes mistas sob pedido.{' '}
            <Link href={getFullPath(LOCALE, 'contact')} className="text-naranja font-semibold hover:underline">
              Contacte-nos para disponibilidade
            </Link>
          </p>
        </div>
      </section>

      {/* Photo gallery strip */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-0">
        {[
          '/images/varieties/Trichocereus_Pachanoi_2.webp',
          '/images/products/producto_trichocereus_pachanoi_bio_1_v2.webp',
          '/images/vivero/vivero_mayorista_cactus.webp',
          '/images/products/producto_trichocereus_pachanoi_2.webp',
        ].map((src, i) => (
          <div key={i} className="relative aspect-square">
            <Image
              src={src}
              alt={`Trichocereus Pachanoi viveiro imagem ${i + 1}`}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        ))}
      </section>

      {/* Why Tricholand */}
      <section className="px-5 lg:px-8 py-16 lg:py-20 max-w-5xl mx-auto">
        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-2 text-center">
          Porquê Tricholand?
        </h2>
        <p className="text-marron-claro text-center mb-12 max-w-2xl mx-auto">
          Somos um viveiro especializado em Trichocereus em Múrcia, Espanha —
          uma das principais regiões de cultivo de cactos na Europa. Vendemos exclusivamente B2B.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((b) => (
            <div key={b.title} className="bg-crudo border border-linea p-6">
              <span className="text-2xl mb-3 block">{b.icon}</span>
              <h3 className="font-[family-name:var(--font-archivo-narrow)] font-bold uppercase text-sm tracking-wide mb-2">
                {b.title}
              </h3>
              <p className="text-xs text-marron-claro leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Nursery section */}
      <section className="bg-negro text-crudo px-5 lg:px-8 py-16 lg:py-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3]">
            <Image
              src="/images/vivero/productores_cactus_2.webp"
              alt="Tricholand viveiro — Produtores de Trichocereus em Múrcia, Espanha"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-6">
              O nosso viveiro em Múrcia
            </h2>
            <p className="text-crudo/80 leading-relaxed mb-4">
              Tricholand é um viveiro familiar na região de Múrcia, no sudeste de Espanha, especializado exclusivamente em Trichocereus e cactos colunares. As nossas plantas são cultivadas em campo aberto sob o sol mediterrânico — exemplares mais vigorosos e saudáveis com sistemas radiculares superiores em comparação com culturas em estufa.
            </p>
            <p className="text-crudo/80 leading-relaxed mb-6">
              Fornecemos centros de jardinagem, viveiros, paisagistas e retalhistas especializados em toda a Europa há anos. Os nossos clientes portugueses valorizam especialmente a nossa qualidade fiável, preços competitivos e processo de importação simplificado.
            </p>
            <Link
              href={getFullPath(LOCALE, 'about')}
              className="inline-flex font-[family-name:var(--font-archivo-narrow)] text-naranja font-bold uppercase text-sm tracking-wide hover:underline"
            >
              Mais sobre nós →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 lg:px-8 py-16 lg:py-20 max-w-3xl mx-auto">
        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-10 text-center">
          Perguntas frequentes
        </h2>
        <div className="space-y-6">
          {FAQ.map((item) => (
            <details
              key={item.q}
              className="group border border-linea bg-blanco"
            >
              <summary className="cursor-pointer px-6 py-4 font-[family-name:var(--font-archivo-narrow)] font-bold uppercase text-sm tracking-wide flex items-center justify-between hover:text-naranja transition-colors">
                {item.q}
                <span className="text-naranja ml-4 transition-transform group-open:rotate-45 text-lg">+</span>
              </summary>
              <div className="px-6 pb-5 text-sm text-marron-claro leading-relaxed">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Other varieties */}
      <section className="bg-crudo px-5 lg:px-8 py-16 lg:py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-2 text-center">
            Outras variedades de Trichocereus
          </h2>
          <p className="text-marron-claro text-center mb-10">
            Combine variedades numa única remessa para otimizar a sua encomenda
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { slug: 'trichocereus-peruvianus', name: 'T. Peruvianus', common: 'Tocha Peruana', img: '/images/varieties/Trichocereus_peruvianus_1.webp' },
              { slug: 'trichocereus-bridgesii', name: 'T. Bridgesii', common: 'Achuma', img: '/images/varieties/Trichocereus_Bridgessi_1.webp' },
              { slug: 'trichocereus-pasacana-terscheckii', name: 'T. Terscheckii', common: 'Cardón Gigante', img: '/images/varieties/Trichocereus_terscheckii_1.webp' },
            ].map((v) => (
              <Link
                key={v.slug}
                href={`/pt/variedades/${v.slug}`}
                className="group bg-blanco border border-linea overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all"
              >
                <div className="relative aspect-[3/2]">
                  <Image src={v.img} alt={v.name} fill className="object-cover group-hover:scale-[1.04] transition-transform" unoptimized />
                </div>
                <div className="p-4">
                  <h3 className="font-[family-name:var(--font-archivo-narrow)] font-bold group-hover:text-naranja transition-colors">{v.name}</h3>
                  <p className="text-xs text-marron-claro">{v.common}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-negro text-crudo px-5 lg:px-8 py-16 lg:py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-[family-name:var(--font-archivo-narrow)] text-3xl lg:text-4xl font-bold uppercase mb-4">
            Pronto para Encomendar?
          </h2>
          <p className="text-crudo/75 mb-8">
            Receba um orçamento personalizado para Trichocereus Pachanoi entregue em Portugal.
            Respondemos em 24 horas úteis.
          </p>
          <Link
            href={getFullPath(LOCALE, 'contact')}
            className="inline-flex bg-naranja text-blanco px-8 py-4 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors"
          >
            Pedir Orçamento →
          </Link>
          <p className="text-xs text-crudo/50 mt-6">
            Ou envie-nos um email para{' '}
            <a href="mailto:info@tricholand.com" className="text-naranja hover:underline">info@tricholand.com</a>
          </p>
        </div>
      </section>

      {/* JSON-LD: Organization + FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Tricholand',
              url: BASE_URL,
              logo: `${BASE_URL}/images/icons/logo_tricho_yellow_200_200.webp`,
              description: 'Viveiro especializado em Trichocereus em Múrcia, Espanha. Grossista B2B para profissionais em Portugal e em toda a Europa.',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Murcia',
                addressRegion: 'Murcia',
                addressCountry: 'ES',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'info@tricholand.com',
                contactType: 'sales',
                availableLanguage: ['Portuguese', 'English', 'Spanish'],
              },
              areaServed: [
                { '@type': 'Country', name: 'Portugal' },
                { '@type': 'Country', name: 'Spain' },
                { '@type': 'Country', name: 'United Kingdom' },
                { '@type': 'Country', name: 'France' },
                { '@type': 'Country', name: 'Germany' },
                { '@type': 'Country', name: 'Netherlands' },
                { '@type': 'Country', name: 'Italy' },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: FAQ.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            },
          ]),
        }}
      />
    </>
  )
}

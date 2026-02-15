import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { pt } from '@/lib/i18n/pt'
import { getFullPath, getAlternatesMetadata } from '@/lib/i18n/paths'
import { StatsBar } from '@/components/home/StatsBar'
import { getPlantImageUrl } from '@/lib/storage'

export const metadata: Metadata = {
  title: 'Sobre nós',
  description: 'Conheça a Tricholand: viveiro produtor especializado em Trichocereus e cactáceas colunares em Múrcia, Espanha. Mais de 50 variedades, 2.500 m² de cultivo.',
  alternates: getAlternatesMetadata('pt', 'about'),
}

export default function SobreNosotrosPage() {
  return (
    <>
      <section className="px-5 lg:px-8 py-16">
        <div className="mb-8 pb-4 border-b-2 border-negro">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            Sobre nós
          </h1>
          <p className="text-marron-claro mt-2">Viveiro produtor em Múrcia, Espanha</p>
        </div>

        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl font-bold uppercase mb-4">
              Somos <span className="text-naranja">produtores</span>
            </h2>
            <div className="space-y-4 text-marron-claro leading-relaxed">
              <p>
                Tricholand é um viveiro produtor especializado no cultivo e distribuição por atacado
                de cactos do género Trichocereus e outras cactáceas colunares. Das nossas instalações
                de 2.500 m² em Múrcia, Espanha, cultivamos mais de 50 variedades que distribuímos a
                viveiros, garden centers e distribuidores de toda a Europa.
              </p>
              <p>
                Os cactos Trichocereus são um género de plantas suculentas pertencentes à família
                Cactaceae, originários da América do Sul — em particular Argentina, Bolívia, Chile,
                Equador e Peru. São conhecidos pela sua imponente forma colunar e espetacular floração noturna.
              </p>
              <p>
                Somos uma empresa em crescimento contínuo com o objetivo de oferecer a todos os nossos
                clientes as plantas de que precisam cada ano, reservando parte do nosso cultivo para
                garantir um stock adaptado à procura de cada cliente.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Image
              src={getPlantImageUrl('Vivero/productores_cactus_1.webp')}
              alt="Viveiro Tricholand"
              width={500}
              height={350}
              sizes="(max-width: 1024px) 50vw, 25vw"
              quality={65}
              unoptimized
              className="w-full h-[200px] lg:h-full object-cover"
            />
            <Image
              src={getPlantImageUrl('Vivero/productores_cactus_2.webp')}
              alt="Cultivo Trichocereus"
              width={500}
              height={350}
              sizes="(max-width: 1024px) 50vw, 25vw"
              quality={65}
              unoptimized
              className="w-full h-[200px] lg:h-full object-cover"
            />
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: 'Produção própria',
              text: 'Todo o nosso stock provém das nossas instalações. Controlamos todo o processo da semente ou estaca até à planta pronta para venda.',
            },
            {
              title: 'Envios para toda a Europa',
              text: 'Entregamos em toda a União Europeia e importamos para o Reino Unido com toda a documentação atualizada para envios por atacado.',
            },
            {
              title: 'Certificação fitossanitária',
              text: 'Todos os nossos exemplares incluem o passaporte fitossanitário UE. Documentação aduaneira completa para exportação para o Reino Unido.',
            },
            {
              title: 'Mais de 50 variedades',
              text: 'A nossa coleção inclui as principais espécies de Trichocereus mais híbridos selecionados, formas cristadas e variedades raras.',
            },
            {
              title: 'Entrega garantida',
              text: 'Reserva antecipada de produção para garantir a entrega das variedades e quantidades que a sua empresa necessita.',
            },
            {
              title: 'Aconselhamento profissional',
              text: 'Apoiamos os nossos clientes com aconselhamento técnico sobre cultivo, cuidados e apresentação das plantas.',
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
            Quer colaborar connosco?
          </h2>
          <p className="opacity-70 mb-6">
            Se é um profissional do setor e está interessado nos nossos produtos, contacte-nos para receber o nosso catálogo e condições.
          </p>
          <Link
            href={getFullPath('pt', 'contact')}
            className="inline-flex bg-naranja text-blanco px-8 py-3 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors"
          >
            Solicitar informações →
          </Link>
        </div>
      </section>

      <StatsBar dict={pt} />
    </>
  )
}

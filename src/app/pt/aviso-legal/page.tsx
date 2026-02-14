import type { Metadata } from 'next'
import { getAlternatesMetadata } from '@/lib/i18n/paths'

export const metadata: Metadata = {
  title: 'Aviso legal',
  description: 'Aviso legal e condições de utilização do site web Tricholand.',
  robots: { index: false, follow: false },
  alternates: getAlternatesMetadata('pt', 'legal'),
}

export default function AvisoLegalPage() {
  return (
    <section className="px-5 lg:px-8 py-16 max-w-3xl mx-auto">
      <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase mb-6">
        Aviso legal
      </h1>

      <div className="space-y-6 text-sm text-marron-claro leading-relaxed">
        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          1. Dados identificativos
        </h2>
        <p>
          Titular: Tricholand · Localização: Múrcia, Espanha · Email: info@tricholand.com
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          2. Objeto
        </h2>
        <p>
          Este site web tem como objetivo fornecer informações sobre os produtos e serviços Tricholand, um
          viveiro produtor especializado em Trichocereus e cactáceas colunares para venda B2B por atacado.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          3. Propriedade intelectual
        </h2>
        <p>
          Todo o conteúdo deste site (textos, fotos, design gráfico, código fonte, logótipos,
          marcas) é propriedade da Tricholand ou dos seus legítimos titulares e está protegido pelas
          leis de propriedade intelectual e industrial.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          4. Condições de utilização
        </h2>
        <p>
          As informações neste site são apenas para fins orientativos. Preços, disponibilidade e condições
          de venda são fornecidos mediante pedido e podem alterar-se sem aviso prévio. A Tricholand
          reserva-se o direito de modificar o conteúdo do site sem aviso prévio.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          5. Lei aplicável
        </h2>
        <p>
          Este site web está sujeito à legislação espanhola. Para qualquer litígio decorrente da utilização
          deste site, as partes submetem-se aos tribunais de Múrcia, Espanha.
        </p>
      </div>
    </section>
  )
}

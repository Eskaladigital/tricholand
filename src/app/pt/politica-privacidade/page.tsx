import type { Metadata } from 'next'
import { getAlternatesMetadata } from '@/lib/i18n/paths'

export const metadata: Metadata = {
  title: 'Política de privacidade',
  description: 'Política de privacidade e proteção de dados pessoais da Tricholand.',
  robots: { index: false, follow: false },
  alternates: getAlternatesMetadata('pt', 'privacy'),
}

export default function PoliticaPrivacidadPage() {
  return (
    <section className="px-5 lg:px-8 py-16 max-w-3xl mx-auto">
      <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase mb-6">
        Política de privacidade
      </h1>

      <div className="space-y-6 text-sm text-marron-claro leading-relaxed">
        <p>
          <strong className="text-negro">Última atualização:</strong> Janeiro 2025
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          1. Responsável pelo tratamento
        </h2>
        <p>
          Tricholand · Múrcia, Espanha · info@tricholand.com
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          2. Dados que recolhemos
        </h2>
        <p>
          Através do formulário de contacto recolhemos: nome, email, telefone (opcional), empresa (opcional),
          país, cidade (opcional) e o conteúdo da sua mensagem. Também recolhemos o tipo de pedido
          e como nos encontrou para melhorar o nosso serviço.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          3. Finalidade do tratamento
        </h2>
        <p>
          Os dados são tratados para: gerir os pedidos recebidos através do site web, enviar os orçamentos
          solicitados e responder aos pedidos de informação.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          4. Base jurídica
        </h2>
        <p>
          O tratamento baseia-se no consentimento explícito do titular dos dados, concedido ao aceitar
          esta política e enviar o formulário de contacto.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          5. Conservação dos dados
        </h2>
        <p>
          Os dados são conservados durante o tempo necessário para responder ao pedido e, se aplicável,
          pelo período necessário para cumprir as obrigações legais aplicáveis.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          6. Direitos do titular
        </h2>
        <p>
          Pode exercer os seus direitos de acesso, retificação, eliminação, oposição, limitação do
          tratamento e portabilidade dos dados contactando info@tricholand.com.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          7. Cookies
        </h2>
        <p>
          Este site web não utiliza cookies de terceiros ou cookies de rastreamento. São utilizados apenas
          cookies técnicos estritamente necessários para o funcionamento do site.
        </p>
      </div>
    </section>
  )
}

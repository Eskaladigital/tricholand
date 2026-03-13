import type { Metadata } from 'next'
import { getAlternatesMetadata } from '@/lib/i18n/paths'

export const metadata: Metadata = {
  title: 'Aviso legal',
  description: 'Aviso legal y condiciones de uso del sitio web de Tricholand.',
  robots: 'index, follow',
  alternates: getAlternatesMetadata('es', 'legal'),
}

export default function AvisoLegalPage() {
  return (
    <section className="px-5 lg:px-8 py-16 max-w-3xl mx-auto">
      <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase mb-6">
        Aviso legal
      </h1>

      <div className="space-y-6 text-sm text-marron-claro leading-relaxed">
        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          1. Datos identificativos
        </h2>
        <p>
          Titular: Tricholand · Ubicación: Murcia, España · Email: info@tricholand.com
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          2. Objeto
        </h2>
        <p>
          El presente sitio web tiene como objeto proporcionar información sobre los productos y servicios
          de Tricholand, vivero productor especializado en Trichocereus y cactáceas columnares para venta
          mayorista B2B.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          3. Propiedad intelectual
        </h2>
        <p>
          Todos los contenidos de este sitio web (textos, fotografías, diseño gráfico, código fuente, logos,
          marcas) son propiedad de Tricholand o de sus legítimos propietarios y están protegidos por las
          leyes de propiedad intelectual e industrial.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          4. Condiciones de uso
        </h2>
        <p>
          La información de este sitio web es de carácter orientativo. Los precios, disponibilidad y
          condiciones de venta se proporcionan bajo solicitud y pueden variar sin previo aviso. Tricholand
          se reserva el derecho de modificar el contenido del sitio web sin previo aviso.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          5. Ley aplicable
        </h2>
        <p>
          Este sitio web se rige por la legislación española. Para cualquier controversia derivada del
          uso de este sitio web, las partes se someten a los juzgados y tribunales de Murcia, España.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          6. Responsabilidad
        </h2>
        <p>
          Tricholand se esfuerza por mantener la información de este sitio web actualizada y precisa. Sin embargo, no garantiza la ausencia de errores, inexactitudes u omisiones en los contenidos publicados. Tricholand no se hace responsable de los daños o perjuicios que puedan derivarse del uso de la información contenida en este sitio web, ni de la imposibilidad de acceso al mismo o de problemas técnicos que puedan producirse.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          7. Enlaces externos
        </h2>
        <p>
          Este sitio web puede contener enlaces a sitios web de terceros. Tricholand no se responsabiliza del contenido, políticas de privacidad ni prácticas de estos sitios externos. La inclusión de enlaces no implica necesariamente la aprobación de los contenidos enlazados.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          8. Uso comercial
        </h2>
        <p>
          Este sitio web está destinado exclusivamente a profesionales del sector viverístico y de jardinería (venta B2B). El acceso y uso del sitio web por parte de particulares es permitido únicamente con fines informativos. Cualquier uso comercial no autorizado de los contenidos del sitio web está expresamente prohibido.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          9. Protección de datos
        </h2>
        <p>
          El tratamiento de datos personales recogidos a través de este sitio web se realiza conforme a lo establecido en nuestra Política de Privacidad y en cumplimiento del Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica de Protección de Datos y Garantía de los Derechos Digitales (LOPDGDD).
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          10. Modificaciones
        </h2>
        <p>
          Tricholand se reserva el derecho de modificar el presente aviso legal en cualquier momento. Los usuarios están obligados a consultar periódicamente este aviso legal para conocer las posibles modificaciones. El uso continuado del sitio web tras la publicación de cambios constituye la aceptación de los mismos.
        </p>
      </div>
    </section>
  )
}

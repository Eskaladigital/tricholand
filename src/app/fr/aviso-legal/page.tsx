import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aviso legal',
  description: 'Aviso legal y condiciones de uso del sitio web de Tricholand.',
  robots: { index: false, follow: false },
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
      </div>
    </section>
  )
}

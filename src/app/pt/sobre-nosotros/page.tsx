import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { es } from '@/lib/i18n/es'
import { StatsBar } from '@/components/home/StatsBar'

export const metadata: Metadata = {
  title: 'Sobre nosotros',
  description: 'Conoce Tricholand: vivero productor especializado en Trichocereus y cactáceas columnares en Murcia, España. Más de 50 variedades, 2.500 m² de cultivo.',
}

export default function SobreNosotrosPage() {
  return (
    <>
      <section className="px-5 lg:px-8 py-16">
        <div className="mb-8 pb-4 border-b-2 border-negro">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            Sobre nosotros
          </h1>
          <p className="text-marron-claro mt-2">Vivero productor en Murcia, España</p>
        </div>

        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl font-bold uppercase mb-4">
              Somos <span className="text-naranja">productores</span>
            </h2>
            <div className="space-y-4 text-marron-claro leading-relaxed">
              <p>
                Tricholand es un vivero productor especializado en el cultivo y distribución mayorista
                de cactus del género Trichocereus y otras cactáceas columnares. Desde nuestras
                instalaciones de 2.500 m² en Murcia, España, cultivamos más de 50 variedades que
                distribuimos a viveros, garden centers y distribuidores de toda Europa.
              </p>
              <p>
                Los cactus Trichocereus son un género de plantas suculentas pertenecientes a la
                familia Cactaceae, originarios de América del Sur — particularmente de Argentina,
                Bolivia, Chile, Ecuador y Perú. Son conocidos por su forma columnar imponente y su
                espectacular floración nocturna.
              </p>
              <p>
                Somos una empresa en continuo crecimiento con el objetivo de ofrecer a todos
                nuestros clientes las plantas que necesiten al año, reservando parte del cultivo
                para garantizar un stock adaptado a la demanda de cada cliente.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Image
              src="/images/vivero/productores_cactus_1.png"
              alt="Vivero Tricholand"
              width={500}
              height={350}
              className="w-full h-[200px] lg:h-full object-cover"
            />
            <Image
              src="/images/vivero/productores_cactus_2.png"
              alt="Cultivo de Trichocereus"
              width={500}
              height={350}
              className="w-full h-[200px] lg:h-full object-cover"
            />
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: 'Producción propia',
              text: 'Todo nuestro stock procede de nuestras instalaciones. Controlamos el proceso completo desde la semilla o esqueje hasta la planta lista para venta.',
            },
            {
              title: 'Envíos a toda Europa',
              text: 'Realizamos envíos a toda la Unión Europea e importamos a Reino Unido con toda la documentación actualizada para envíos al por mayor.',
            },
            {
              title: 'Certificación fitosanitaria',
              text: 'Todos nuestros ejemplares incluyen pasaporte fitosanitario UE. Documentación aduanera completa para exportación a UK.',
            },
            {
              title: 'Más de 50 variedades',
              text: 'Nuestra colección abarca las principales especies de Trichocereus más híbridos selectos, formas crestadas y variedades raras.',
            },
            {
              title: 'Suministro garantizado',
              text: 'Reserva anticipada de producción para garantizar el suministro de las variedades y cantidades que tu negocio necesita.',
            },
            {
              title: 'Asesoramiento profesional',
              text: 'Acompañamos a nuestros clientes con asesoramiento técnico sobre cultivo, cuidado y presentación de las plantas.',
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
            ¿Quieres trabajar con nosotros?
          </h2>
          <p className="opacity-70 mb-6">
            Si eres un profesional del sector y estás interesado en nuestros productos, contacta con
            nosotros para recibir catálogo y condiciones.
          </p>
          <Link
            href="/pt/contacto"
            className="inline-flex bg-naranja text-blanco px-8 py-3 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors"
          >
            Solicitar información →
          </Link>
        </div>
      </section>

      <StatsBar dict={es} />
    </>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { es } from '@/lib/i18n/es'
import { ServicesSection } from '@/components/home/ServicesSection'
import { CertificationsBar } from '@/components/home/CertificationsBar'

export const metadata: Metadata = {
  title: 'Servicios',
  description: 'Servicios de Tricholand: venta mayorista de Trichocereus, envíos a toda Europa, documentación fitosanitaria UE/UK y cultivo por encargo.',
}

export default function ServiciosPage() {
  return (
    <>
      {/* Intro */}
      <section className="px-5 lg:px-8 py-16">
        <div className="mb-8 pb-4 border-b-2 border-negro">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            Servicios
          </h1>
          <p className="text-marron-claro mt-2">Soluciones completas para profesionales del sector</p>
        </div>

        <div className="max-w-3xl space-y-4 text-marron-claro leading-relaxed mb-12">
          <p>
            En Tricholand ofrecemos un servicio integral para profesionales del sector viverístico
            y de jardinería. Desde la producción y cultivo hasta el envío con toda la documentación
            necesaria, nos encargamos de que recibas tus plantas en perfectas condiciones y con
            todas las garantías legales.
          </p>
        </div>

        {/* Detailed services */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {[
            {
              num: '01',
              title: 'Venta mayorista',
              details: [
                'Pedido mínimo: 100 unidades',
                'Condiciones especiales para pedidos recurrentes y grandes volúmenes',
                'Pago por transferencia bancaria o a 30 días para clientes habituales',
                'Presupuesto personalizado en menos de 24h laborables',
                'Posibilidad de reserva anticipada de producción',
              ],
            },
            {
              num: '02',
              title: 'Envíos a toda Europa',
              details: [
                'España peninsular: 48–72 horas',
                'Unión Europea: 72–96 horas',
                'Reino Unido: 5–7 días laborables',
                'Embalaje especializado para cactáceas (protección individual)',
                'Seguimiento de envío en tiempo real',
                'Seguro incluido en todos los envíos',
              ],
            },
            {
              num: '03',
              title: 'Documentación y certificaciones',
              details: [
                'Pasaporte fitosanitario UE incluido en cada envío',
                'Documentación aduanera para exportación a Reino Unido',
                'Certificado de origen cuando sea requerido',
                'Etiquetado conforme a la normativa europea vigente',
                'Asesoramiento sobre requisitos de importación',
              ],
            },
            {
              num: '04',
              title: 'Cultivo por encargo',
              details: [
                'Reserva anticipada de producción para el siguiente año',
                'Variedades específicas bajo pedido',
                'Garantía de suministro anual para clientes con acuerdo',
                'Tamaños personalizados según necesidades',
                'Posibilidad de cultivo de variedades exclusivas',
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
            ¿Necesitas un servicio personalizado?
          </h2>
          <p className="opacity-70 mb-6">
            Contacta con nuestro equipo comercial y te preparamos una propuesta adaptada a las necesidades de tu negocio.
          </p>
          <Link
            href="/pt/contacto"
            className="inline-flex bg-naranja text-blanco px-8 py-3 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors"
          >
            Solicitar información →
          </Link>
        </div>
      </section>

      <CertificationsBar dict={es} />
    </>
  )
}

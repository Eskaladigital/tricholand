import type { Metadata } from 'next'
import Link from 'next/link'
import { ContactFormWizard } from '@/components/contact/ContactFormWizard'
import { es } from '@/lib/i18n/es'
import { getAlternatesMetadata } from '@/lib/i18n/paths'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contacta con Tricholand para solicitar presupuesto de Trichocereus al por mayor. Respuesta en menos de 24h laborables.',
  alternates: getAlternatesMetadata('es', 'contact'),
}

export default function ContactoPage() {
  return (
    <section className="px-5 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 pb-4 border-b-2 border-negro">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            Contacto
          </h1>
          <p className="text-marron-claro mt-2">
            Solicita tu presupuesto o haznos cualquier consulta sobre nuestras <Link href="/es/variedades" className="text-naranja hover:underline">variedades</Link> y <Link href="/es/servicios" className="text-naranja hover:underline">servicios</Link>. Respondemos en menos de 24h laborables.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          {/* Form */}
          <ContactFormWizard locale="es" dict={es} />

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Direct contact */}
            <div className="bg-negro text-crudo p-6">
              <h3 className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide text-naranja mb-4">
                Contacto directo
              </h3>
              <a
                href="mailto:info@tricholand.com"
                className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold hover:text-naranja transition-colors block mb-2"
              >
                info@tricholand.com
              </a>
              <p className="text-sm opacity-60">Murcia, España</p>

              <div className="flex gap-4 mt-4 pt-4 border-t border-white/10">
                <a
                  href="https://www.facebook.com/tricholand/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm opacity-65 hover:opacity-100 transition-opacity"
                >
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/tricholand/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm opacity-65 hover:opacity-100 transition-opacity"
                >
                  Instagram
                </a>
              </div>
            </div>

            {/* FAQ mini */}
            <div className="bg-blanco border border-linea p-6">
              <h3 className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide text-naranja mb-4">
                Preguntas rápidas
              </h3>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-bold mb-0.5">¿Cuál es el pedido mínimo?</h4>
                  <p className="text-marron-claro">100 unidades por pedido.</p>
                </div>
                <div>
                  <h4 className="font-bold mb-0.5">¿Hacéis envíos a particulares?</h4>
                  <p className="text-marron-claro">
                    Somos un <Link href="/es/sobre-nosotros" className="text-naranja hover:underline">vivero mayorista B2B</Link>. Para compras pequeñas, podemos orientarte a distribuidores en tu zona.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-0.5">¿Cuánto tardáis en responder?</h4>
                  <p className="text-marron-claro">Menos de 24 horas laborables.</p>
                </div>
                <div>
                  <h4 className="font-bold mb-0.5">¿Enviáis a toda Europa?</h4>
                  <p className="text-marron-claro">
                    Sí. UE y Reino Unido con toda la documentación fitosanitaria incluida.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* SEO Content Section */}
        <div className="mt-16 pt-12 border-t border-linea">
          <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl font-bold uppercase mb-6">
            Contacto profesional para pedidos mayoristas de Trichocereus
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-marron-claro leading-relaxed">
            <div className="space-y-4">
              <h3 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase">
                ¿Por qué contactar con Tricholand?
              </h3>
              <p>
                Tricholand es un vivero productor especializado en el cultivo y distribución mayorista de cactus del género Trichocereus. Desde nuestras instalaciones de 2.500 m² en Murcia, España, atendemos pedidos profesionales de viveros, garden centers y distribuidores de toda Europa.
              </p>
              <p>
                Nuestro equipo técnico responde a todas las consultas en menos de 24 horas laborables, ofreciendo asesoramiento personalizado sobre variedades, disponibilidad, condiciones de envío y plazos de entrega. Trabajamos exclusivamente en formato B2B con pedido mínimo de 100 unidades.
              </p>
              <p>
                Al contactar con nosotros recibirás información detallada sobre nuestras <Link href="/es/variedades" className="text-naranja hover:underline">variedades de Trichocereus disponibles</Link>, precios mayoristas actualizados, condiciones de pago y toda la documentación fitosanitaria necesaria para envíos dentro y fuera de la Unión Europea.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase">
                Información importante antes de contactar
              </h3>
              <p>
                <strong className="text-negro">Venta exclusiva B2B:</strong> Solo atendemos pedidos de empresas y profesionales del sector viverístico. No realizamos ventas a particulares. Si buscas comprar en pequeñas cantidades, podemos orientarte a distribuidores en tu zona.
              </p>
              <p>
                <strong className="text-negro">Pedido mínimo:</strong> El pedido mínimo es de 100 unidades por pedido total. Puedes combinar diferentes variedades y tamaños para alcanzar este mínimo.
              </p>
              <p>
                <strong className="text-negro">Tiempo de respuesta:</strong> Respondemos a todas las consultas en menos de 24 horas laborables. Si tu consulta es urgente, indícalo en el mensaje.
              </p>
              <p>
                <strong className="text-negro">Documentación:</strong> Para realizar pedidos necesitarás acreditar tu actividad profesional mediante CIF/NIF de empresa, certificado de actividades económicas o registro en VIES para empresas de la UE.
              </p>
              <p>
                Consulta nuestros <Link href="/es/servicios" className="text-naranja hover:underline">servicios y condiciones de venta mayorista</Link> para más información sobre plazos de entrega, condiciones de pago y certificaciones fitosanitarias incluidas en todos nuestros envíos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

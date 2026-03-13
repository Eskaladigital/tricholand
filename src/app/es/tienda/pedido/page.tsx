import type { Metadata } from 'next'
import { OrderForm } from '@/components/shop/OrderForm'
import { CartButton } from '@/components/shop/CartButton'
import { getAlternatesMetadata } from '@/lib/i18n/paths'

export const metadata: Metadata = {
  title: 'Solicitud de pedido mayorista B2B',
  description: 'Revisa y envía tu solicitud de pedido B2B. Recibirás presupuesto final en menos de 24h.',
  alternates: getAlternatesMetadata('es', 'shopOrder'),
}

export default function PedidoPage() {
  return (
    <>
      <section className="px-5 lg:px-8 py-16 max-w-5xl mx-auto">
        <div className="mb-8 pb-4 border-b-2 border-negro">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            Solicitud de pedido
          </h1>
          <p className="text-marron-claro mt-2">
            Revisa tu pedido, completa tus datos y envíanos la solicitud. Te enviaremos presupuesto final en menos de 24h.
          </p>
        </div>

        <OrderForm locale="es" />

        {/* SEO Content Section */}
        <div className="mt-16 pt-12 border-t border-linea">
          <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl font-bold uppercase mb-6">
            Proceso de pedido mayorista de Trichocereus
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-marron-claro leading-relaxed">
            <div className="space-y-4">
              <h3 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase">
                ¿Cómo funciona el proceso de pedido?
              </h3>
              <p>
                <strong className="text-negro">1. Solicitud inicial:</strong> Completa el formulario con tu selección de productos y tus datos de contacto. Esta solicitud no es vinculante, es simplemente una petición de presupuesto.
              </p>
              <p>
                <strong className="text-negro">2. Presupuesto detallado:</strong> En menos de 24 horas laborables recibirás un presupuesto final con precios confirmados, disponibilidad real, coste de envío y condiciones de pago.
              </p>
              <p>
                <strong className="text-negro">3. Confirmación:</strong> Una vez revises el presupuesto y confirmes, te enviaremos los datos bancarios para realizar la transferencia. El pedido se prepara tras recibir el pago.
              </p>
              <p>
                <strong className="text-negro">4. Preparación y envío:</strong> Preparamos tu pedido en 7 días laborables. Embalaje especializado para cactáceas con temperatura controlada según temporada.
              </p>
              <p>
                <strong className="text-negro">5. Entrega:</strong> Envío con agencia especializada. España 48-72h, resto de UE 3-5 días, Reino Unido 5-7 días. Incluye seguimiento y pasaporte de planta europeo.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase">
                Condiciones del pedido mayorista
              </h3>
              <p>
                <strong className="text-negro">Pedido mínimo:</strong> 100 unidades totales por pedido. Puedes combinar diferentes variedades y tamaños de nuestra tienda para alcanzar este mínimo.
              </p>
              <p>
                <strong className="text-negro">Condición de profesional:</strong> Venta exclusiva B2B. Tras recibir tu solicitud, deberás acreditar tu actividad profesional mediante CIF/NIF de empresa, certificado de actividades económicas (AEAT) o NIF-IVA verificable en VIES para empresas de la UE.
              </p>
              <p>
                <strong className="text-negro">Precios:</strong> Los precios mostrados en la tienda son orientativos sin IVA. El presupuesto final puede variar según disponibilidad real, volumen del pedido y destino de envío.
              </p>
              <p>
                <strong className="text-negro">Forma de pago:</strong> Transferencia bancaria anticipada. No aceptamos tarjeta de crédito ni contra reembolso en pedidos mayoristas.
              </p>
              <p>
                <strong className="text-negro">Documentación incluida:</strong> Todos los envíos incluyen pasaporte de planta europeo sin coste adicional. Para exportaciones fuera de la UE, certificado fitosanitario internacional disponible (coste adicional aprox. 60 €).
              </p>
              <p>
                <strong className="text-negro">Garantía de calidad:</strong> Garantizamos plantas sanas, bien enraizadas y en perfectas condiciones. Tasa de entrega satisfactoria del 99%. Si tienes dudas, consulta nuestros servicios y condiciones completas.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CartButton locale="es" />
    </>
  )
}

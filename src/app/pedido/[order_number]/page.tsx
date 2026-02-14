import { notFound } from 'next/navigation'
import { getOrderByNumber } from '@/lib/actions/orders'
import { PaymentButtons } from '@/components/shop/PaymentButtons'
import type { Metadata } from 'next'

type Props = { params: Promise<{ order_number: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { order_number } = await params
  return {
    title: `Pedido ${order_number} | Tricholand`,
    robots: { index: false, follow: false },
  }
}

function formatCents(cents: number): string {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(cents / 100)
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending: { label: 'Recibido', color: 'bg-yellow-100 text-yellow-800' },
  reviewing: { label: 'En revisión', color: 'bg-blue-100 text-blue-800' },
  quoted: { label: 'Presupuestado', color: 'bg-purple-100 text-purple-800' },
  payment_pending: { label: 'Pendiente de pago', color: 'bg-orange-100 text-orange-800' },
  paid: { label: 'Pagado', color: 'bg-green-100 text-green-800' },
  preparing: { label: 'Preparando envío', color: 'bg-blue-100 text-blue-800' },
  shipped: { label: 'Enviado', color: 'bg-indigo-100 text-indigo-800' },
  delivered: { label: 'Entregado', color: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Cancelado', color: 'bg-red-100 text-red-800' },
}

export default async function OrderPublicPage({ params }: Props) {
  const { order_number } = await params
  const result = await getOrderByNumber(order_number)

  if (!result) notFound()

  const { order, items } = result
  const statusInfo = STATUS_LABELS[order.status] ?? { label: order.status, color: 'bg-gray-100 text-gray-800' }
  const showPayment = order.status === 'payment_pending'
  const isPaid = ['paid', 'preparing', 'shipped', 'delivered'].includes(order.status)
  const isPrePayment = ['pending', 'reviewing', 'quoted'].includes(order.status)

  return (
    <div className="min-h-screen bg-crudo" lang="es">
      {/* Header mínimo */}
      <header className="bg-negro py-6 px-4 text-center">
        <a href="https://www.tricholand.com" className="inline-block">
          <span className="text-2xl font-bold text-crudo tracking-[3px] uppercase font-[family-name:var(--font-archivo-narrow)]">
            TRICHOLAND
          </span>
          <br />
          <span className="text-[11px] text-marron-claro tracking-[2px] uppercase">
            Vivero de Trichocereus y cactáceas columnares
          </span>
        </a>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10">
        {/* Cabecera del pedido */}
        <div className="bg-blanco border border-linea p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold font-[family-name:var(--font-archivo-narrow)] uppercase tracking-wide">
                Pedido {order.order_number}
              </h1>
              <p className="text-sm text-marron-claro mt-1">
                {new Date(order.created_at).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <span className={`text-xs font-bold uppercase px-3 py-1 ${statusInfo.color}`}>
              {statusInfo.label}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-marron-claro text-xs uppercase font-bold mb-1">Cliente</p>
              <p className="font-semibold">{order.customer_name}</p>
              {order.customer_company && <p className="text-marron-claro">{order.customer_company}</p>}
              <p className="text-marron-claro">{order.customer_email}</p>
            </div>
            <div>
              <p className="text-marron-claro text-xs uppercase font-bold mb-1">Dirección</p>
              {order.customer_address && <p>{order.customer_address}</p>}
              {order.customer_city && <p>{order.customer_city}</p>}
              <p>{order.customer_country}</p>
            </div>
          </div>
        </div>

        {/* Mensaje pre-pago */}
        {isPrePayment && (
          <div className="bg-blue-50 border border-blue-200 p-6 mb-6 text-center">
            <p className="text-blue-800 text-sm">
              Tu pedido está siendo revisado por nuestro equipo. Te enviaremos un email con el presupuesto final y el enlace de pago en breve.
            </p>
          </div>
        )}

        {/* Tabla de productos */}
        <div className="bg-blanco border border-linea p-6 mb-6">
          <h2 className="text-sm font-bold font-[family-name:var(--font-archivo-narrow)] uppercase tracking-wide mb-4">
            Productos
          </h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-linea text-xs text-marron-claro uppercase">
                <th className="py-2 text-left">Producto</th>
                <th className="py-2 text-center w-16">Cant.</th>
                <th className="py-2 text-right w-24">Precio</th>
                <th className="py-2 text-right w-24">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-linea/50">
                  <td className="py-3">
                    <p className="font-medium">{item.product_name}</p>
                    <p className="text-xs text-marron-claro">{item.product_sku}</p>
                  </td>
                  <td className="py-3 text-center">{item.quantity}</td>
                  <td className="py-3 text-right">{formatCents(item.unit_price_cents)}</td>
                  <td className="py-3 text-right font-semibold">{formatCents(item.total_cents)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totales */}
          <div className="border-t border-linea mt-4 pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Base imponible</span>
              <span>{formatCents(order.subtotal_cents)}</span>
            </div>
            {order.discount_cents > 0 && (
              <div className="flex justify-between text-verde">
                <span>Descuento</span>
                <span>-{formatCents(order.discount_cents)}</span>
              </div>
            )}
            {order.shipping_cents > 0 && (
              <div className="flex justify-between">
                <span>Envío</span>
                <span>{formatCents(order.shipping_cents)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>IVA (21%)</span>
              <span>{formatCents(order.tax_cents)}</span>
            </div>
            <div className="flex justify-between border-t border-linea pt-3 text-lg font-bold">
              <span>Total con IVA</span>
              <span className="text-naranja">{formatCents(order.total_cents)}</span>
            </div>
            <p className="text-xs text-marron-claro pt-1">
              Todos los precios de productos se muestran sin IVA. El IVA se aplica sobre la base imponible.
            </p>
          </div>
        </div>

        {/* Notas del cliente */}
        {order.customer_notes && (
          <div className="bg-yellow-50 border border-yellow-200 p-6 mb-6">
            <h3 className="text-xs font-bold uppercase text-yellow-700 mb-2">Tus notas</h3>
            <p className="text-sm text-yellow-800">{order.customer_notes}</p>
          </div>
        )}

        {/* Tracking */}
        {order.shipping_tracking && (
          <div className="bg-indigo-50 border border-indigo-200 p-6 mb-6">
            <h3 className="text-xs font-bold uppercase text-indigo-700 mb-2">Seguimiento de envío</h3>
            <p className="text-sm text-indigo-800 font-mono">{order.shipping_tracking}</p>
          </div>
        )}

        {/* Botones de pago reales */}
        {showPayment && (
          <PaymentButtons
            orderId={order.id}
            orderNumber={order.order_number}
            totalCents={order.total_cents}
          />
        )}

        {/* Pago confirmado */}
        {isPaid && (
          <div className="bg-green-50 border border-green-200 p-6 mb-6">
            <div className="text-center mb-4">
              <p className="text-green-800 font-bold text-sm uppercase">
                {order.status === 'paid' && 'Pago confirmado. Tu pedido se está preparando.'}
                {order.status === 'preparing' && 'Tu pedido se está preparando para el envío.'}
                {order.status === 'shipped' && 'Tu pedido ha sido enviado.'}
                {order.status === 'delivered' && 'Tu pedido ha sido entregado. ¡Gracias!'}
              </p>
            </div>
            {/* Link para descargar factura */}
            {order.invoice_url && (
              <div className="text-center">
                <a
                  href={order.invoice_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-verde text-white text-xs font-bold uppercase tracking-wide hover:opacity-90 transition-opacity"
                >
                  Descargar factura (PDF)
                </a>
              </div>
            )}
          </div>
        )}

        {/* Cancelado */}
        {order.status === 'cancelled' && (
          <div className="bg-red-50 border border-red-200 p-6 mb-6 text-center">
            <p className="text-red-800 font-bold text-sm uppercase">Este pedido ha sido cancelado.</p>
          </div>
        )}

        {/* Footer mínimo */}
        <div className="text-center mt-10 text-xs text-marron-claro">
          <p>¿Tienes alguna duda? Escríbenos a{' '}
            <a href="mailto:info@tricholand.com" className="text-naranja underline">info@tricholand.com</a>
          </p>
          <p className="mt-2">
            <a href="https://www.tricholand.com" className="text-naranja underline">www.tricholand.com</a>
          </p>
        </div>
      </main>
    </div>
  )
}

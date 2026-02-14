// ============================================
// EMAIL TEMPLATES — Tricholand
// HTML con tablas para máxima compatibilidad
// (Outlook, Gmail, Yahoo, Apple Mail, etc.)
// Emails al ADMIN: siempre en español
// Emails al CLIENTE: en su idioma (locale)
// ============================================

import { type EmailLocale, resolveLocale, formatCentsLocalized, formatDateTimeLocalized, t } from './i18n'

const COLORS = {
  crudo: '#f5f2eb',
  blanco: '#faf9f7',
  negro: '#1a1a1a',
  marron: '#3d3730',
  marronClaro: '#6b6258',
  verde: '#3d5a3d',
  naranja: '#c4652a',
  linea: '#d4cfc3',
}

/** Formato moneda en español (para emails al admin) */
function formatCents(cents: number): string {
  return formatCentsLocalized(cents, 'es')
}

/** Envuelve el contenido en el layout base de Tricholand */
function layout(content: string, locale: EmailLocale = 'es'): string {
  const tr = t(locale)
  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Tricholand</title>
</head>
<body style="margin:0;padding:0;background-color:${COLORS.crudo};font-family:Arial,Helvetica,sans-serif;color:${COLORS.negro};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${COLORS.crudo};">
<tr>
<td align="center" style="padding:24px 16px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:${COLORS.blanco};border:1px solid ${COLORS.linea};">
<!-- Header -->
<tr>
<td style="background-color:${COLORS.negro};padding:24px 32px;text-align:center;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td align="center">
<span style="font-size:24px;font-weight:bold;color:${COLORS.crudo};letter-spacing:3px;text-transform:uppercase;">TRICHOLAND</span>
</td>
</tr>
<tr>
<td align="center" style="padding-top:4px;">
<span style="font-size:11px;color:${COLORS.marronClaro};letter-spacing:2px;text-transform:uppercase;">${tr.layoutSubtitle}</span>
</td>
</tr>
</table>
</td>
</tr>
<!-- Content -->
<tr>
<td style="padding:32px;">
${content}
</td>
</tr>
<!-- Footer -->
<tr>
<td style="background-color:${COLORS.crudo};padding:20px 32px;border-top:1px solid ${COLORS.linea};text-align:center;">
<p style="margin:0;font-size:12px;color:${COLORS.marronClaro};">
Tricholand &mdash; www.tricholand.com
</p>
<p style="margin:6px 0 0;font-size:11px;color:${COLORS.linea};">
${tr.layoutFooterAuto}
</p>
</td>
</tr>
</table>
</td>
</tr>
</table>
</body>
</html>`
}

// ============================================
// PEDIDOS
// ============================================

interface OrderEmailItem {
  product_name: string
  product_sku: string
  quantity: number
  unit_price_cents: number
}

interface OrderEmailData {
  order_number: string
  customer_name: string
  customer_company: string | null
  customer_email: string
  customer_phone: string | null
  customer_country: string
  customer_city: string | null
  customer_vat_id: string | null
  customer_address: string | null
  customer_notes: string | null
  items: OrderEmailItem[]
  subtotal_cents: number
  locale: string
}

/** Email al admin cuando llega un pedido nuevo */
export function orderAdminEmail(data: OrderEmailData): string {
  const itemsRows = data.items
    .map(
      (item) => `
<tr>
<td style="padding:8px 12px;border-bottom:1px solid ${COLORS.linea};font-size:13px;">${item.product_name}<br><span style="color:${COLORS.marronClaro};font-size:11px;">${item.product_sku}</span></td>
<td style="padding:8px 12px;border-bottom:1px solid ${COLORS.linea};font-size:13px;text-align:center;">${item.quantity}</td>
<td style="padding:8px 12px;border-bottom:1px solid ${COLORS.linea};font-size:13px;text-align:right;">${formatCents(item.unit_price_cents)}</td>
<td style="padding:8px 12px;border-bottom:1px solid ${COLORS.linea};font-size:13px;text-align:right;font-weight:bold;">${formatCents(item.unit_price_cents * item.quantity)}</td>
</tr>`
    )
    .join('')

  const content = `
<h1 style="margin:0 0 4px;font-size:20px;font-weight:bold;text-transform:uppercase;color:${COLORS.naranja};">Nuevo pedido</h1>
<p style="margin:0 0 24px;font-size:14px;color:${COLORS.marronClaro};">${data.order_number} &mdash; ${new Date().toLocaleDateString('es-ES')}</p>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
<tr>
<td style="padding:16px;background-color:${COLORS.crudo};border:1px solid ${COLORS.linea};">
<p style="margin:0 0 2px;font-size:11px;font-weight:bold;text-transform:uppercase;color:${COLORS.marronClaro};letter-spacing:1px;">Cliente</p>
<p style="margin:0;font-size:14px;font-weight:bold;">${data.customer_name}</p>
${data.customer_company ? `<p style="margin:2px 0 0;font-size:13px;color:${COLORS.marronClaro};">${data.customer_company}</p>` : ''}
<p style="margin:4px 0 0;font-size:13px;"><a href="mailto:${data.customer_email}" style="color:${COLORS.naranja};">${data.customer_email}</a></p>
${data.customer_phone ? `<p style="margin:2px 0 0;font-size:13px;">${data.customer_phone}</p>` : ''}
<p style="margin:4px 0 0;font-size:13px;">${[data.customer_city, data.customer_country].filter(Boolean).join(', ')}</p>
${data.customer_vat_id ? `<p style="margin:2px 0 0;font-size:12px;color:${COLORS.marronClaro};">VAT: ${data.customer_vat_id}</p>` : ''}
${data.customer_address ? `<p style="margin:2px 0 0;font-size:12px;color:${COLORS.marronClaro};">${data.customer_address}</p>` : ''}
</td>
</tr>
</table>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${COLORS.linea};margin-bottom:16px;">
<tr style="background-color:${COLORS.negro};">
<td style="padding:8px 12px;font-size:11px;font-weight:bold;text-transform:uppercase;color:${COLORS.crudo};letter-spacing:1px;">Producto</td>
<td style="padding:8px 12px;font-size:11px;font-weight:bold;text-transform:uppercase;color:${COLORS.crudo};letter-spacing:1px;text-align:center;">Cant.</td>
<td style="padding:8px 12px;font-size:11px;font-weight:bold;text-transform:uppercase;color:${COLORS.crudo};letter-spacing:1px;text-align:right;">P. unit.</td>
<td style="padding:8px 12px;font-size:11px;font-weight:bold;text-transform:uppercase;color:${COLORS.crudo};letter-spacing:1px;text-align:right;">Total</td>
</tr>
${itemsRows}
</table>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td align="right" style="padding:8px 0;">
<span style="font-size:14px;color:${COLORS.marronClaro};">Base imponible (sin IVA):&nbsp;&nbsp;</span>
<span style="font-size:18px;font-weight:bold;color:${COLORS.naranja};">${formatCents(data.subtotal_cents)}</span>
</td>
</tr>
<tr>
<td align="right" style="padding:2px 0;">
<span style="font-size:11px;color:${COLORS.marronClaro};">* IVA no incluido. Se detallar&aacute; en el presupuesto final.</span>
</td>
</tr>
</table>

${data.customer_notes ? `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:16px;">
<tr>
<td style="padding:12px 16px;background-color:#fef9e7;border:1px solid #f0e6c8;">
<p style="margin:0 0 4px;font-size:11px;font-weight:bold;text-transform:uppercase;color:${COLORS.marronClaro};">Notas del cliente</p>
<p style="margin:0;font-size:13px;">${data.customer_notes}</p>
</td>
</tr>
</table>
` : ''}

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:24px;">
<tr>
<td align="center">
<a href="https://www.tricholand.com/administrator/orders" style="display:inline-block;padding:12px 32px;background-color:${COLORS.naranja};color:#ffffff;font-size:13px;font-weight:bold;text-transform:uppercase;text-decoration:none;letter-spacing:1px;">Ver en el panel admin</a>
</td>
</tr>
</table>`

  return layout(content)
}

/** Email de confirmación al cliente cuando hace un pedido (en su idioma) */
export function orderClientEmail(data: OrderEmailData): string {
  const locale = resolveLocale(data.locale)
  const tr = t(locale)
  const fmt = (c: number) => formatCentsLocalized(c, locale)

  const itemsList = data.items
    .map(
      (item) => `
<tr>
<td style="padding:8px 0;border-bottom:1px solid ${COLORS.linea};font-size:13px;">${item.quantity}x ${item.product_name}</td>
<td style="padding:8px 0;border-bottom:1px solid ${COLORS.linea};font-size:13px;text-align:right;font-weight:bold;">${fmt(item.unit_price_cents * item.quantity)}</td>
</tr>`
    )
    .join('')

  const content = `
<h1 style="margin:0 0 4px;font-size:20px;font-weight:bold;text-transform:uppercase;color:${COLORS.verde};">${tr.orderReceived}</h1>
<p style="margin:0 0 24px;font-size:14px;color:${COLORS.marronClaro};">${tr.orderNumber} ${data.order_number}</p>

<p style="margin:0 0 16px;font-size:14px;line-height:1.6;">
${tr.orderHello} <strong>${data.customer_name}</strong>,
</p>
<p style="margin:0 0 24px;font-size:14px;line-height:1.6;">
${tr.orderConfirmation.replace('{email}', data.customer_email)}
</p>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:16px;">
<tr>
<td style="padding:16px;background-color:${COLORS.crudo};border:1px solid ${COLORS.linea};">
<p style="margin:0 0 12px;font-size:11px;font-weight:bold;text-transform:uppercase;color:${COLORS.marronClaro};letter-spacing:1px;">${tr.orderSummary}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
${itemsList}
<tr>
<td style="padding:12px 0 0;font-size:14px;">${tr.subtotalEstimated}</td>
<td style="padding:12px 0 0;font-size:16px;text-align:right;font-weight:bold;color:${COLORS.naranja};">${fmt(data.subtotal_cents)}</td>
</tr>
</table>
<p style="margin:12px 0 0;font-size:11px;color:${COLORS.marronClaro};">
${tr.orderSubtotalNote}
</p>
</td>
</tr>
</table>

<p style="margin:0 0 8px;font-size:14px;line-height:1.6;">
${tr.orderQuestion} <a href="mailto:info@tricholand.com" style="color:${COLORS.naranja};">info@tricholand.com</a>.
</p>

<p style="margin:24px 0 0;font-size:14px;line-height:1.6;">
${tr.orderThanks}
</p>`

  return layout(content, locale)
}


// ============================================
// CONTACTOS
// ============================================

interface ContactEmailData {
  name: string
  company: string | null
  email: string
  phone: string | null
  country: string
  city: string | null
  contact_type: string
  professional_subtype: string | null
  inquiry_type: string | null
  message: string
  referral_source: string | null
  locale?: string
}

/** Email al admin cuando llega un contacto nuevo */
export function contactAdminEmail(data: ContactEmailData): string {
  const isPro = data.contact_type === 'professional'

  const content = `
<h1 style="margin:0 0 4px;font-size:20px;font-weight:bold;text-transform:uppercase;color:${isPro ? COLORS.naranja : COLORS.verde};">
Nueva consulta${isPro ? ' (Profesional)' : ''}
</h1>
<p style="margin:0 0 24px;font-size:14px;color:${COLORS.marronClaro};">${new Date().toLocaleDateString('es-ES')} &mdash; ${data.name}</p>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
<tr>
<td style="padding:16px;background-color:${COLORS.crudo};border:1px solid ${COLORS.linea};">
<p style="margin:0 0 2px;font-size:11px;font-weight:bold;text-transform:uppercase;color:${COLORS.marronClaro};letter-spacing:1px;">Contacto</p>
<p style="margin:0;font-size:14px;font-weight:bold;">${data.name}</p>
${data.company ? `<p style="margin:2px 0 0;font-size:13px;color:${COLORS.marronClaro};">${data.company}</p>` : ''}
<p style="margin:4px 0 0;font-size:13px;"><a href="mailto:${data.email}" style="color:${COLORS.naranja};">${data.email}</a></p>
${data.phone ? `<p style="margin:2px 0 0;font-size:13px;">${data.phone}</p>` : ''}
<p style="margin:4px 0 0;font-size:13px;">${[data.city, data.country].filter(Boolean).join(', ')}</p>
</td>
</tr>
</table>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
<tr>
<td style="padding:16px;border:1px solid ${COLORS.linea};">
<p style="margin:0 0 2px;font-size:11px;font-weight:bold;text-transform:uppercase;color:${COLORS.marronClaro};letter-spacing:1px;">Tipo de consulta</p>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:8px;">
<tr>
<td style="font-size:12px;color:${COLORS.marronClaro};padding-right:8px;">Tipo:</td>
<td style="font-size:13px;font-weight:bold;">${isPro ? 'Profesional' : 'Particular'}${data.professional_subtype ? ` — ${data.professional_subtype}` : ''}</td>
</tr>
${data.inquiry_type ? `<tr>
<td style="font-size:12px;color:${COLORS.marronClaro};padding-right:8px;padding-top:4px;">Consulta:</td>
<td style="font-size:13px;padding-top:4px;">${data.inquiry_type.replace(/_/g, ' ')}</td>
</tr>` : ''}
${data.referral_source ? `<tr>
<td style="font-size:12px;color:${COLORS.marronClaro};padding-right:8px;padding-top:4px;">Origen:</td>
<td style="font-size:13px;padding-top:4px;">${data.referral_source}</td>
</tr>` : ''}
</table>
</td>
</tr>
</table>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
<tr>
<td style="padding:16px;background-color:${COLORS.blanco};border:1px solid ${COLORS.linea};">
<p style="margin:0 0 8px;font-size:11px;font-weight:bold;text-transform:uppercase;color:${COLORS.marronClaro};letter-spacing:1px;">Mensaje</p>
<p style="margin:0;font-size:14px;line-height:1.6;white-space:pre-wrap;">${data.message}</p>
</td>
</tr>
</table>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td align="center">
<a href="https://www.tricholand.com/administrator/contacts" style="display:inline-block;padding:12px 32px;background-color:${COLORS.naranja};color:#ffffff;font-size:13px;font-weight:bold;text-transform:uppercase;text-decoration:none;letter-spacing:1px;">Ver en el panel admin</a>
</td>
</tr>
</table>`

  return layout(content)
}

/** Email de confirmación al cliente cuando envía un formulario de contacto (en su idioma) */
export function contactClientEmail(data: ContactEmailData): string {
  const locale = resolveLocale(data.locale)
  const tr = t(locale)

  const content = `
<h1 style="margin:0 0 4px;font-size:20px;font-weight:bold;text-transform:uppercase;color:${COLORS.verde};">${tr.contactReceived}</h1>
<p style="margin:0 0 24px;font-size:14px;color:${COLORS.marronClaro};">Tricholand</p>

<p style="margin:0 0 16px;font-size:14px;line-height:1.6;">
${tr.contactHello} <strong>${data.name}</strong>,
</p>
<p style="margin:0 0 24px;font-size:14px;line-height:1.6;">
${tr.contactConfirmation.replace('{email}', data.email)}
</p>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
<tr>
<td style="padding:16px;background-color:${COLORS.crudo};border:1px solid ${COLORS.linea};">
<p style="margin:0 0 8px;font-size:11px;font-weight:bold;text-transform:uppercase;color:${COLORS.marronClaro};letter-spacing:1px;">${tr.contactYourMessage}</p>
<p style="margin:0;font-size:13px;line-height:1.6;color:${COLORS.marron};white-space:pre-wrap;">${data.message}</p>
</td>
</tr>
</table>

<p style="margin:0 0 8px;font-size:14px;line-height:1.6;">
${tr.contactAddMore} <a href="mailto:info@tricholand.com" style="color:${COLORS.naranja};">info@tricholand.com</a>.
</p>

<p style="margin:24px 0 0;font-size:14px;line-height:1.6;">
${tr.contactThanks}
</p>`

  return layout(content, locale)
}


// ============================================
// EMAIL DE PAGO (admin valida → cliente paga)
// ============================================

interface PaymentEmailData {
  order_number: string
  customer_name: string
  items: { product_name: string; product_sku: string; quantity: number; unit_price_cents: number }[]
  subtotal_cents: number
  discount_cents: number
  shipping_cents: number
  tax_cents: number
  total_cents: number
  order_url: string
  locale?: string
}

/** Email que se envía al cliente cuando el admin valida el pedido (en su idioma) */
export function paymentEmail(data: PaymentEmailData): string {
  const locale = resolveLocale(data.locale)
  const tr = t(locale)
  const fmt = (c: number) => formatCentsLocalized(c, locale)

  const itemsRows = data.items
    .map(
      (item) => `
<tr>
<td style="padding:8px 0;border-bottom:1px solid ${COLORS.linea};font-size:13px;">${item.quantity}x ${item.product_name}<br><span style="color:${COLORS.marronClaro};font-size:11px;">${item.product_sku}</span></td>
<td style="padding:8px 0;border-bottom:1px solid ${COLORS.linea};font-size:13px;text-align:right;">${fmt(item.unit_price_cents)}</td>
<td style="padding:8px 0;border-bottom:1px solid ${COLORS.linea};font-size:13px;text-align:right;font-weight:bold;">${fmt(item.unit_price_cents * item.quantity)}</td>
</tr>`
    )
    .join('')

  const content = `
<h1 style="margin:0 0 4px;font-size:20px;font-weight:bold;text-transform:uppercase;color:${COLORS.verde};">${tr.paymentValidated}</h1>
<p style="margin:0 0 24px;font-size:14px;color:${COLORS.marronClaro};">${tr.orderNumber} ${data.order_number}</p>

<p style="margin:0 0 16px;font-size:14px;line-height:1.6;">
${tr.paymentHello} <strong>${data.customer_name}</strong>,
</p>
<p style="margin:0 0 8px;font-size:14px;line-height:1.6;">
${tr.paymentBody}
</p>
<p style="margin:0 0 24px;font-size:14px;line-height:1.6;">
${tr.paymentBreakdown}
</p>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
<tr>
<td style="padding:16px;background-color:${COLORS.crudo};border:1px solid ${COLORS.linea};">
<p style="margin:0 0 12px;font-size:11px;font-weight:bold;text-transform:uppercase;color:${COLORS.marronClaro};letter-spacing:1px;">${tr.paymentDetails}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
${itemsRows}
<tr>
<td colspan="2" style="padding:8px 0 0;font-size:13px;">${tr.paymentSubtotal}</td>
<td style="padding:8px 0 0;font-size:13px;text-align:right;">${fmt(data.subtotal_cents)}</td>
</tr>
${data.discount_cents > 0 ? `<tr>
<td colspan="2" style="padding:4px 0;font-size:13px;color:${COLORS.verde};">${tr.paymentDiscount}</td>
<td style="padding:4px 0;font-size:13px;text-align:right;color:${COLORS.verde};">-${fmt(data.discount_cents)}</td>
</tr>` : ''}
${data.shipping_cents > 0 ? `<tr>
<td colspan="2" style="padding:4px 0;font-size:13px;">${tr.paymentShipping}</td>
<td style="padding:4px 0;font-size:13px;text-align:right;">${fmt(data.shipping_cents)}</td>
</tr>` : ''}
<tr>
<td colspan="2" style="padding:4px 0;font-size:13px;">${tr.paymentTax}</td>
<td style="padding:4px 0;font-size:13px;text-align:right;">${fmt(data.tax_cents)}</td>
</tr>
<tr>
<td colspan="2" style="padding:12px 0 0;font-size:16px;font-weight:bold;border-top:2px solid ${COLORS.linea};">${tr.paymentTotal}</td>
<td style="padding:12px 0 0;font-size:18px;font-weight:bold;text-align:right;color:${COLORS.naranja};border-top:2px solid ${COLORS.linea};">${fmt(data.total_cents)}</td>
</tr>
</table>
</td>
</tr>
</table>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;">
<tr>
<td align="center">
<a href="${data.order_url}" style="display:inline-block;padding:16px 40px;background-color:${COLORS.naranja};color:#ffffff;font-size:15px;font-weight:bold;text-transform:uppercase;text-decoration:none;letter-spacing:1px;">${tr.paymentViewAndPay}</a>
</td>
</tr>
<tr>
<td align="center" style="padding-top:8px;">
<span style="font-size:11px;color:${COLORS.marronClaro};">${tr.paymentSecure}</span>
</td>
</tr>
</table>

<p style="margin:0;font-size:14px;line-height:1.6;">
${tr.paymentQuestion} <a href="mailto:info@tricholand.com" style="color:${COLORS.naranja};">info@tricholand.com</a>.
</p>

<p style="margin:24px 0 0;font-size:14px;line-height:1.6;">
${tr.paymentThanks}
</p>`

  return layout(content, locale)
}

/** Email al admin confirmando que se ha enviado el presupuesto al cliente */
export function validationSentAdminEmail(data: { order_number: string; customer_name: string; customer_email: string; total_cents: number }): string {
  const content = `
<h1 style="margin:0 0 4px;font-size:20px;font-weight:bold;text-transform:uppercase;color:${COLORS.verde};">Pedido validado y enviado</h1>
<p style="margin:0 0 24px;font-size:14px;color:${COLORS.marronClaro};">${data.order_number}</p>

<p style="margin:0 0 16px;font-size:14px;line-height:1.6;">
Se ha validado el pedido <strong>${data.order_number}</strong> y se ha enviado el presupuesto al cliente:
</p>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
<tr>
<td style="padding:16px;background-color:${COLORS.crudo};border:1px solid ${COLORS.linea};">
<p style="margin:0;font-size:14px;"><strong>${data.customer_name}</strong></p>
<p style="margin:4px 0 0;font-size:13px;"><a href="mailto:${data.customer_email}" style="color:${COLORS.naranja};">${data.customer_email}</a></p>
<p style="margin:8px 0 0;font-size:16px;font-weight:bold;color:${COLORS.naranja};">Total con IVA: ${formatCents(data.total_cents)}</p>
</td>
</tr>
</table>

<p style="margin:0;font-size:14px;line-height:1.6;">
El cliente ha recibido el email con la proforma adjunta y el enlace de pago. Estado: <strong>Esperando pago</strong>.
</p>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:24px;">
<tr>
<td align="center">
<a href="https://www.tricholand.com/administrator/orders" style="display:inline-block;padding:12px 32px;background-color:${COLORS.naranja};color:#ffffff;font-size:13px;font-weight:bold;text-transform:uppercase;text-decoration:none;letter-spacing:1px;">Ver en el panel admin</a>
</td>
</tr>
</table>`

  return layout(content)
}


// ============================================
// CONFIRMACION DE PAGO
// ============================================

interface PaymentConfirmedData {
  order_number: string
  customer_name: string
  customer_email: string
  total_cents: number
  payment_method: string
  paid_at: string
  order_url: string
  locale?: string
}

/** Email al cliente cuando se confirma el pago (en su idioma) */
export function paymentConfirmedEmail(data: PaymentConfirmedData): string {
  const locale = resolveLocale(data.locale)
  const tr = t(locale)
  const fmt = (c: number) => formatCentsLocalized(c, locale)

  const content = `
<h1 style="margin:0 0 4px;font-size:20px;font-weight:bold;text-transform:uppercase;color:${COLORS.verde};">${tr.paymentConfirmedTitle}</h1>
<p style="margin:0 0 24px;font-size:14px;color:${COLORS.marronClaro};">${tr.paymentConfirmedOrder} ${data.order_number}</p>

<p style="margin:0 0 16px;font-size:14px;line-height:1.6;">
${tr.paymentConfirmedHello} <strong>${data.customer_name}</strong>,
</p>
<p style="margin:0 0 24px;font-size:14px;line-height:1.6;">
${tr.paymentConfirmedBody}
</p>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
<tr>
<td style="padding:16px;background-color:${COLORS.crudo};border:1px solid ${COLORS.linea};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td style="padding:4px 0;font-size:13px;color:${COLORS.marronClaro};">${tr.paymentConfirmedOrder}:</td>
<td style="padding:4px 0;font-size:13px;font-weight:bold;">${data.order_number}</td>
</tr>
<tr>
<td style="padding:4px 0;font-size:13px;color:${COLORS.marronClaro};">${tr.paymentConfirmedTotalPaid}:</td>
<td style="padding:4px 0;font-size:16px;font-weight:bold;color:${COLORS.naranja};">${fmt(data.total_cents)}</td>
</tr>
<tr>
<td style="padding:4px 0;font-size:13px;color:${COLORS.marronClaro};">${tr.paymentConfirmedMethod}:</td>
<td style="padding:4px 0;font-size:13px;">${data.payment_method}</td>
</tr>
<tr>
<td style="padding:4px 0;font-size:13px;color:${COLORS.marronClaro};">${tr.paymentConfirmedDate}:</td>
<td style="padding:4px 0;font-size:13px;">${formatDateTimeLocalized(data.paid_at, locale)}</td>
</tr>
</table>
</td>
</tr>
</table>

<p style="margin:0 0 16px;font-size:14px;line-height:1.6;">
${tr.paymentConfirmedInvoice}
</p>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;">
<tr>
<td align="center">
<a href="${data.order_url}" style="display:inline-block;padding:14px 36px;background-color:${COLORS.verde};color:#ffffff;font-size:14px;font-weight:bold;text-transform:uppercase;text-decoration:none;letter-spacing:1px;">${tr.paymentConfirmedViewOrder}</a>
</td>
</tr>
</table>

<p style="margin:0;font-size:14px;line-height:1.6;">
${tr.paymentConfirmedShipping} <a href="mailto:info@tricholand.com" style="color:${COLORS.naranja};">info@tricholand.com</a>.
</p>

<p style="margin:24px 0 0;font-size:14px;line-height:1.6;">
${tr.paymentConfirmedThanks}
</p>`

  return layout(content, locale)
}

/** Email al admin cuando se confirma un pago */
export function paymentConfirmedAdminEmail(data: PaymentConfirmedData): string {
  const content = `
<h1 style="margin:0 0 4px;font-size:20px;font-weight:bold;text-transform:uppercase;color:${COLORS.verde};">Pago recibido</h1>
<p style="margin:0 0 24px;font-size:14px;color:${COLORS.marronClaro};">${data.order_number}</p>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
<tr>
<td style="padding:16px;background-color:${COLORS.crudo};border:1px solid ${COLORS.linea};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td style="padding:4px 0;font-size:13px;color:${COLORS.marronClaro};">Pedido:</td>
<td style="padding:4px 0;font-size:13px;font-weight:bold;">${data.order_number}</td>
</tr>
<tr>
<td style="padding:4px 0;font-size:13px;color:${COLORS.marronClaro};">Cliente:</td>
<td style="padding:4px 0;font-size:13px;font-weight:bold;">${data.customer_name}</td>
</tr>
<tr>
<td style="padding:4px 0;font-size:13px;color:${COLORS.marronClaro};">Email:</td>
<td style="padding:4px 0;font-size:13px;"><a href="mailto:${data.customer_email}" style="color:${COLORS.naranja};">${data.customer_email}</a></td>
</tr>
<tr>
<td style="padding:4px 0;font-size:13px;color:${COLORS.marronClaro};">Total (IVA incl.):</td>
<td style="padding:4px 0;font-size:18px;font-weight:bold;color:${COLORS.naranja};">${formatCents(data.total_cents)}</td>
</tr>
<tr>
<td style="padding:4px 0;font-size:13px;color:${COLORS.marronClaro};">M&eacute;todo:</td>
<td style="padding:4px 0;font-size:13px;">${data.payment_method}</td>
</tr>
</table>
</td>
</tr>
</table>

<p style="margin:0 0 16px;font-size:14px;line-height:1.6;">
Se ha generado la factura autom&aacute;ticamente y se ha enviado al cliente. El pedido est&aacute; listo para preparar.
</p>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td align="center">
<a href="https://www.tricholand.com/administrator/orders" style="display:inline-block;padding:12px 32px;background-color:${COLORS.naranja};color:#ffffff;font-size:13px;font-weight:bold;text-transform:uppercase;text-decoration:none;letter-spacing:1px;">Ver en el panel admin</a>
</td>
</tr>
</table>`

  return layout(content)
}

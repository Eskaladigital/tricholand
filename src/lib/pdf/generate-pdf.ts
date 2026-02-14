import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

// ============================================
// PDF Generator — Tricholand
// Genera proformas y facturas en servidor
// ============================================

const COLORS = {
  negro: [26, 26, 26] as [number, number, number],
  crudo: [245, 242, 235] as [number, number, number],
  marronClaro: [107, 98, 88] as [number, number, number],
  naranja: [196, 101, 42] as [number, number, number],
  verde: [61, 90, 61] as [number, number, number],
  linea: [212, 207, 195] as [number, number, number],
  blanco: [255, 255, 255] as [number, number, number],
}

function formatEur(cents: number): string {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(cents / 100)
}

interface PdfOrderData {
  order_number: string
  created_at: string
  customer_name: string
  customer_company: string | null
  customer_email: string
  customer_phone: string | null
  customer_country: string
  customer_city: string | null
  customer_vat_id: string | null
  customer_address: string | null
  subtotal_cents: number
  discount_cents: number
  shipping_cents: number
  tax_cents: number
  total_cents: number
  invoice_number?: string | null
}

interface PdfItemData {
  product_name: string
  product_sku: string
  quantity: number
  unit_price_cents: number
  total_cents: number
}

type DocType = 'proforma' | 'factura'

function generatePdf(
  docType: DocType,
  order: PdfOrderData,
  items: PdfItemData[]
): Buffer {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 20
  const contentWidth = pageWidth - margin * 2

  // --- Header band ---
  doc.setFillColor(...COLORS.negro)
  doc.rect(0, 0, pageWidth, 35, 'F')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(20)
  doc.setTextColor(...COLORS.crudo)
  doc.text('TRICHOLAND', pageWidth / 2, 18, { align: 'center' })

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(...COLORS.marronClaro)
  doc.text('Vivero de Trichocereus y cactáceas columnares', pageWidth / 2, 26, { align: 'center' })

  // --- Document title ---
  let y = 48
  const isFactura = docType === 'factura'
  const title = isFactura ? 'FACTURA' : 'PRESUPUESTO / FACTURA PROFORMA'

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(16)
  doc.setTextColor(...(isFactura ? COLORS.naranja : COLORS.verde))
  doc.text(title, margin, y)

  if (!isFactura) {
    y += 6
    doc.setFont('helvetica', 'italic')
    doc.setFontSize(9)
    doc.setTextColor(...COLORS.marronClaro)
    doc.text('(Nota de cargo — sin valor fiscal hasta el pago)', margin, y)
  }

  y += 8
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(...COLORS.marronClaro)
  const dateStr = new Date(order.created_at).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  doc.text(`${order.order_number}  ·  ${dateStr}`, margin, y)

  if (isFactura && order.invoice_number) {
    y += 5
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(...COLORS.negro)
    doc.text(`Nº Factura: ${order.invoice_number}`, margin, y)
  }

  // --- Two column: Emisor / Cliente ---
  y += 12
  const colWidth = contentWidth / 2 - 2

  // Emisor
  doc.setFillColor(...COLORS.crudo)
  doc.roundedRect(margin, y, colWidth, 32, 2, 2, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(...COLORS.marronClaro)
  doc.text('EMISOR', margin + 4, y + 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.setTextColor(...COLORS.negro)
  doc.text('Tricholand', margin + 4, y + 13)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(...COLORS.marronClaro)
  doc.text('www.tricholand.com', margin + 4, y + 18)
  doc.text('info@tricholand.com', margin + 4, y + 23)

  // Cliente
  const cx = margin + colWidth + 4
  doc.setFillColor(...COLORS.crudo)
  doc.roundedRect(cx, y, colWidth, 32, 2, 2, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(...COLORS.marronClaro)
  doc.text('CLIENTE', cx + 4, y + 6)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.setTextColor(...COLORS.negro)
  doc.text(order.customer_name, cx + 4, y + 13)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(...COLORS.marronClaro)

  const clientLines: string[] = []
  if (order.customer_company) clientLines.push(order.customer_company)
  clientLines.push(order.customer_email)
  if (order.customer_phone) clientLines.push(order.customer_phone)
  const location = [order.customer_city, order.customer_country].filter(Boolean).join(', ')
  if (location) clientLines.push(location)
  if (order.customer_vat_id) clientLines.push(`VAT: ${order.customer_vat_id}`)

  let cy = y + 18
  for (const line of clientLines.slice(0, 3)) {
    doc.text(line, cx + 4, cy)
    cy += 4.5
  }

  // --- Items table ---
  y += 40

  const tableBody = items.map((item) => [
    item.product_name,
    item.product_sku,
    String(item.quantity),
    formatEur(item.unit_price_cents),
    formatEur(item.total_cents),
  ])

  autoTable(doc, {
    startY: y,
    margin: { left: margin, right: margin },
    head: [['Producto', 'SKU', 'Cant.', 'P. unit.', 'Total']],
    body: tableBody,
    headStyles: {
      fillColor: COLORS.negro,
      textColor: COLORS.crudo,
      fontSize: 8,
      fontStyle: 'bold',
      cellPadding: 3,
    },
    bodyStyles: {
      fontSize: 9,
      textColor: COLORS.negro,
      cellPadding: 3,
    },
    alternateRowStyles: {
      fillColor: COLORS.crudo,
    },
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { cellWidth: 30, textColor: COLORS.marronClaro },
      2: { cellWidth: 15, halign: 'center' },
      3: { cellWidth: 25, halign: 'right' },
      4: { cellWidth: 25, halign: 'right', fontStyle: 'bold' },
    },
    theme: 'plain',
    styles: {
      lineColor: COLORS.linea,
      lineWidth: 0.3,
    },
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  y = (doc as any).lastAutoTable?.finalY ?? y + 40
  y += 8

  // --- Totals ---
  const totalsX = pageWidth - margin - 70
  const valX = pageWidth - margin

  const addTotalLine = (label: string, value: string, bold = false, color = COLORS.negro) => {
    doc.setFont('helvetica', bold ? 'bold' : 'normal')
    doc.setFontSize(bold ? 11 : 9)
    doc.setTextColor(...color)
    doc.text(label, totalsX, y)
    doc.text(value, valX, y, { align: 'right' })
    y += bold ? 7 : 5
  }

  addTotalLine('Base imponible', formatEur(order.subtotal_cents))
  if (order.discount_cents > 0) {
    addTotalLine('Descuento', `-${formatEur(order.discount_cents)}`, false, COLORS.verde)
  }
  if (order.shipping_cents > 0) {
    addTotalLine('Envío', formatEur(order.shipping_cents))
  }
  addTotalLine('IVA (21%)', formatEur(order.tax_cents))

  // Total line with background
  doc.setDrawColor(...COLORS.linea)
  doc.line(totalsX, y - 1, valX, y - 1)
  y += 3
  addTotalLine('TOTAL CON IVA', formatEur(order.total_cents), true, COLORS.naranja)

  // --- Footer ---
  const footerY = doc.internal.pageSize.getHeight() - 15
  doc.setFillColor(...COLORS.crudo)
  doc.rect(0, footerY - 5, pageWidth, 20, 'F')
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(...COLORS.marronClaro)
  doc.text(
    'Tricholand · www.tricholand.com · info@tricholand.com',
    pageWidth / 2,
    footerY + 2,
    { align: 'center' }
  )

  // Return as Buffer
  const arrayBuffer = doc.output('arraybuffer')
  return Buffer.from(arrayBuffer)
}

/** Genera PDF de proforma/presupuesto */
export function generateProformaPdf(order: PdfOrderData, items: PdfItemData[]): Buffer {
  return generatePdf('proforma', order, items)
}

/** Genera PDF de factura final */
export function generateInvoicePdf(order: PdfOrderData, items: PdfItemData[]): Buffer {
  return generatePdf('factura', order, items)
}

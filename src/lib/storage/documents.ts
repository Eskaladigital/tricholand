import { createServiceClient } from '@/lib/supabase/api'

// ============================================
// Document Storage — Supabase Storage
// Bucket: order-documents
// ============================================

const BUCKET = 'order-documents'

type DocumentType = 'proforma' | 'factura'

/**
 * Sube un PDF a Supabase Storage.
 * Path: orders/{orderId}/{type}-{orderNumber}.pdf
 * Devuelve la URL pública del archivo.
 */
export async function uploadDocument(
  orderId: string,
  orderNumber: string,
  type: DocumentType,
  pdfBuffer: Buffer
): Promise<{ url: string | null; error?: string }> {
  const supabase = createServiceClient()

  const filePath = `orders/${orderId}/${type}-${orderNumber}.pdf`

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filePath, pdfBuffer, {
      contentType: 'application/pdf',
      upsert: true, // Sobreescribir si ya existe
    })

  if (error) {
    console.error(`[Storage] Error subiendo ${type} PDF:`, error.message)
    return { url: null, error: error.message }
  }

  // Obtener URL pública
  const { data: urlData } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(filePath)

  console.log(`[Storage] ${type} PDF subido: ${filePath}`)
  return { url: urlData.publicUrl }
}

/**
 * Obtiene la URL pública de un documento.
 */
export function getDocumentUrl(orderId: string, orderNumber: string, type: DocumentType): string {
  const supabase = createServiceClient()
  const filePath = `orders/${orderId}/${type}-${orderNumber}.pdf`
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filePath)
  return data.publicUrl
}

/**
 * Genera una URL firmada (con expiración) para documentos privados.
 * Útil si el bucket no es público.
 */
export async function getSignedDocumentUrl(
  orderId: string,
  orderNumber: string,
  type: DocumentType,
  expiresInSeconds = 3600
): Promise<string | null> {
  const supabase = createServiceClient()
  const filePath = `orders/${orderId}/${type}-${orderNumber}.pdf`

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(filePath, expiresInSeconds)

  if (error) {
    console.error(`[Storage] Error generando URL firmada:`, error.message)
    return null
  }

  return data.signedUrl
}

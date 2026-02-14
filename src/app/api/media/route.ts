import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const ALLOWED_BUCKETS = ['blog', 'plants']

/** GET /api/media?bucket=blog — Lista archivos del bucket */
export async function GET(request: NextRequest) {
  const bucket = request.nextUrl.searchParams.get('bucket') ?? 'blog'
  if (!ALLOWED_BUCKETS.includes(bucket)) {
    return NextResponse.json({ error: 'Bucket no permitido' }, { status: 400 })
  }
  const path = request.nextUrl.searchParams.get('path') ?? ''

  const supabase = await createClient()
  const { data, error } = await supabase.storage.from(bucket).list(path, {
    limit: 200,
    sortBy: { column: 'created_at', order: 'desc' },
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const files = (data ?? []).map((f) => {
    const fullPath = path ? `${path}/${f.name}` : f.name
    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(fullPath)
    return {
      name: f.name,
      path: fullPath,
      size: f.metadata?.size ?? 0,
      type: f.metadata?.mimetype ?? '',
      created_at: f.created_at,
      url: urlData.publicUrl,
      isFolder: f.id === null,
    }
  })

  return NextResponse.json({ files })
}

/** POST /api/media — Subir archivo al bucket */
export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file') as File | null
  const bucket = (formData.get('bucket') as string) ?? 'blog'
  const folder = (formData.get('folder') as string) ?? ''

  if (!file) return NextResponse.json({ error: 'No se envió archivo' }, { status: 400 })
  if (!ALLOWED_BUCKETS.includes(bucket)) {
    return NextResponse.json({ error: 'Bucket no permitido' }, { status: 400 })
  }

  // Sanitize filename
  const safeName = file.name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .toLowerCase()

  const filePath = folder ? `${folder}/${safeName}` : safeName

  const supabase = await createClient()
  const { error } = await supabase.storage.from(bucket).upload(filePath, file, {
    cacheControl: '31536000',
    upsert: false,
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath)
  return NextResponse.json({ url: urlData.publicUrl, path: filePath })
}

/** DELETE /api/media — Eliminar archivo del bucket */
export async function DELETE(request: NextRequest) {
  const body = await request.json()
  const bucket = body.bucket ?? 'blog'
  const paths: string[] = body.paths ?? []

  if (!ALLOWED_BUCKETS.includes(bucket)) {
    return NextResponse.json({ error: 'Bucket no permitido' }, { status: 400 })
  }
  if (paths.length === 0) {
    return NextResponse.json({ error: 'No se indicaron archivos' }, { status: 400 })
  }

  const supabase = await createClient()
  const { error } = await supabase.storage.from(bucket).remove(paths)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ deleted: paths.length })
}

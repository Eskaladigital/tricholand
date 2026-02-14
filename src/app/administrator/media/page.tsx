'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface MediaFile {
  name: string
  path: string
  size: number
  type: string
  created_at: string
  url: string
  isFolder: boolean
}

const BUCKETS = [
  { id: 'blog', label: 'Blog', description: 'Imágenes para artículos del blog' },
  { id: 'plants', label: 'Plants', description: 'Imágenes del catálogo de variedades' },
]

function formatBytes(bytes: number) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

export default function MediaPage() {
  const [bucket, setBucket] = useState('blog')
  const [folder, setFolder] = useState('')
  const [files, setFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [copied, setCopied] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const fetchFiles = useCallback(async () => {
    setLoading(true)
    setSelected(new Set())
    try {
      const params = new URLSearchParams({ bucket })
      if (folder) params.set('path', folder)
      const res = await fetch(`/api/media?${params}`)
      const json = await res.json()
      if (json.error) {
        alert(json.error)
        setFiles([])
      } else {
        setFiles(json.files ?? [])
      }
    } catch {
      alert('Error cargando archivos')
      setFiles([])
    }
    setLoading(false)
  }, [bucket, folder])

  useEffect(() => { fetchFiles() }, [fetchFiles])

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files
    if (!fileList?.length) return
    setUploading(true)

    for (let i = 0; i < fileList.length; i++) {
      const formData = new FormData()
      formData.append('file', fileList[i])
      formData.append('bucket', bucket)
      if (folder) formData.append('folder', folder)

      const res = await fetch('/api/media', { method: 'POST', body: formData })
      const json = await res.json()
      if (json.error) {
        alert(`Error subiendo ${fileList[i].name}: ${json.error}`)
      }
    }

    setUploading(false)
    if (inputRef.current) inputRef.current.value = ''
    fetchFiles()
  }

  async function handleDelete() {
    if (selected.size === 0) return
    if (!confirm(`¿Eliminar ${selected.size} archivo(s)?`)) return

    const res = await fetch('/api/media', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bucket, paths: Array.from(selected) }),
    })
    const json = await res.json()
    if (json.error) {
      alert(json.error)
    }
    fetchFiles()
  }

  function toggleSelect(path: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(path)) next.delete(path)
      else next.add(path)
      return next
    })
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url)
    setCopied(url)
    setTimeout(() => setCopied(null), 2000)
  }

  function enterFolder(name: string) {
    setFolder((prev) => prev ? `${prev}/${name}` : name)
  }

  function goUp() {
    setFolder((prev) => {
      const parts = prev.split('/')
      parts.pop()
      return parts.join('/')
    })
  }

  const imageFiles = files.filter((f) => !f.isFolder)
  const folders = files.filter((f) => f.isFolder)

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            Media
          </h1>
          <p className="text-sm text-marron-claro mt-1">
            Gestión de imágenes en Supabase Storage
          </p>
        </div>
      </div>

      {/* Bucket selector */}
      <div className="flex gap-3 mb-6">
        {BUCKETS.map((b) => (
          <button
            key={b.id}
            onClick={() => { setBucket(b.id); setFolder('') }}
            className={`px-5 py-2.5 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide border transition-colors ${
              bucket === b.id
                ? 'bg-negro text-crudo border-negro'
                : 'bg-blanco text-marron-claro border-linea hover:border-naranja hover:text-naranja'
            }`}
          >
            {b.label}
          </button>
        ))}
      </div>

      {/* Breadcrumb + Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 text-sm">
          <button onClick={() => setFolder('')} className="text-naranja font-semibold hover:underline">
            {bucket}/
          </button>
          {folder && folder.split('/').map((part, i, arr) => (
            <span key={i} className="flex items-center gap-1">
              <span className="text-marron-claro">/</span>
              <button
                onClick={() => setFolder(arr.slice(0, i + 1).join('/'))}
                className="text-naranja font-semibold hover:underline"
              >
                {part}
              </button>
            </span>
          ))}
          {folder && (
            <button onClick={goUp} className="ml-2 text-xs text-marron-claro hover:text-naranja">
              ↑ Subir
            </button>
          )}
        </div>

        <div className="flex gap-3">
          {selected.size > 0 && (
            <button
              onClick={handleDelete}
              className="px-4 py-2 border border-red-300 text-red-600 text-xs font-bold uppercase hover:bg-red-50 transition-colors"
            >
              Eliminar ({selected.size})
            </button>
          )}
          <label className={`px-5 py-2.5 bg-naranja text-blanco font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors cursor-pointer ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
            {uploading ? 'Subiendo...' : '+ Subir archivo'}
            <input
              ref={inputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="py-12 text-center text-marron-claro">Cargando...</div>
      ) : (
        <div>
          {/* Folders */}
          {folders.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
              {folders.map((f) => (
                <button
                  key={f.name}
                  onClick={() => enterFolder(f.name)}
                  className="flex items-center gap-2 p-3 bg-blanco border border-linea hover:border-naranja transition-colors text-left"
                >
                  <span className="text-2xl">📁</span>
                  <span className="text-sm font-bold truncate">{f.name}</span>
                </button>
              ))}
            </div>
          )}

          {/* Files grid */}
          {imageFiles.length === 0 && folders.length === 0 ? (
            <div className="py-12 text-center text-marron-claro bg-blanco border border-linea">
              No hay archivos en esta carpeta. Sube el primero.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {imageFiles.map((f) => {
                const isSelected = selected.has(f.path)
                const isImage = f.type?.startsWith('image/') || /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f.name)
                return (
                  <div
                    key={f.path}
                    className={`bg-blanco border transition-colors group relative ${
                      isSelected ? 'border-naranja ring-2 ring-naranja/30' : 'border-linea hover:border-naranja/50'
                    }`}
                  >
                    {/* Checkbox */}
                    <label className="absolute top-2 left-2 z-10 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(f.path)}
                        className="w-4 h-4 accent-naranja"
                      />
                    </label>

                    {/* Preview */}
                    <div className="aspect-square bg-crudo flex items-center justify-center overflow-hidden">
                      {isImage ? (
                        <img src={f.url} alt={f.name} className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        <span className="text-4xl">📄</span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-2">
                      <p className="text-xs font-bold truncate" title={f.name}>{f.name}</p>
                      <p className="text-[0.65rem] text-marron-claro">{formatBytes(f.size)}</p>
                      <button
                        onClick={() => copyUrl(f.url)}
                        className="mt-1 text-[0.65rem] text-naranja font-semibold hover:underline"
                      >
                        {copied === f.url ? '✓ Copiado' : 'Copiar URL'}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </>
  )
}

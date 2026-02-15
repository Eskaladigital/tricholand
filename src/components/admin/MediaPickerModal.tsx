'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'

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
  { id: 'blog', label: 'Blog' },
  { id: 'plants', label: 'Plants' },
]

function formatBytes(bytes: number) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

interface MediaPickerModalProps {
  open: boolean
  onClose: () => void
  onSelect: (url: string) => void
  title?: string
}

export function MediaPickerModal({ open, onClose, onSelect, title = 'Seleccionar imagen' }: MediaPickerModalProps) {
  const [bucket, setBucket] = useState('blog')
  const [folder, setFolder] = useState('')
  const [files, setFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const fetchFiles = useCallback(async () => {
    setLoading(true)
    setSelectedUrl(null)
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

  useEffect(() => {
    if (open) fetchFiles()
  }, [open, fetchFiles])

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
      if (json.error) alert(`Error subiendo ${fileList[i].name}: ${json.error}`)
    }
    setUploading(false)
    if (inputRef.current) inputRef.current.value = ''
    fetchFiles()
  }

  function enterFolder(name: string) {
    setFolder((prev) => (prev ? `${prev}/${name}` : name))
  }

  function goUp() {
    setFolder((prev) => {
      const parts = prev.split('/')
      parts.pop()
      return parts.join('/')
    })
  }

  function handleConfirm() {
    if (selectedUrl) {
      onSelect(selectedUrl)
      onClose()
    }
  }

  const imageFiles = files.filter((f) => !f.isFolder)
  const folders = files.filter((f) => f.isFolder)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-negro/60" onClick={onClose}>
      <div
        className="bg-blanco border border-linea w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-linea">
          <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold uppercase">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-marron-claro hover:text-negro text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Bucket + Breadcrumb + Upload */}
        <div className="p-4 border-b border-linea space-y-3">
          <div className="flex gap-3">
            {BUCKETS.map((b) => (
              <button
                key={b.id}
                onClick={() => { setBucket(b.id); setFolder('') }}
                className={`px-4 py-2 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide border transition-colors ${
                  bucket === b.id ? 'bg-negro text-crudo border-negro' : 'bg-blanco text-marron-claro border-linea hover:border-naranja'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
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
            <label className={`px-4 py-2 bg-naranja text-blanco font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase cursor-pointer hover:bg-verde transition-colors ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
              {uploading ? 'Subiendo...' : '+ Subir'}
              <input ref={inputRef} type="file" multiple accept="image/*" onChange={handleUpload} className="hidden" />
            </label>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 min-h-[300px]">
          {loading ? (
            <div className="py-12 text-center text-marron-claro">Cargando...</div>
          ) : (
            <div>
              {folders.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                  {folders.map((f) => (
                    <button
                      key={f.name}
                      onClick={() => enterFolder(f.name)}
                      className="flex items-center gap-2 p-2 bg-crudo border border-linea hover:border-naranja text-left"
                    >
                      <span className="text-xl">📁</span>
                      <span className="text-xs font-bold truncate">{f.name}</span>
                    </button>
                  ))}
                </div>
              )}
              {imageFiles.length === 0 && folders.length === 0 ? (
                <div className="py-12 text-center text-marron-claro bg-crudo border border-linea">
                  No hay imágenes. Sube una para empezar.
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                  {imageFiles.map((f) => {
                    const isImage = f.type?.startsWith('image/') || /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f.name)
                    const isSelected = selectedUrl === f.url
                    return (
                      <button
                        key={f.path}
                        type="button"
                        onClick={() => isImage && setSelectedUrl(f.url)}
                        className={`text-left border transition-colors ${
                          isSelected ? 'border-naranja ring-2 ring-naranja/30' : 'border-linea hover:border-naranja/50'
                        }`}
                      >
                        <div className="aspect-square bg-crudo flex items-center justify-center overflow-hidden relative">
                          {isImage ? (
                            <Image
                              src={f.url}
                              alt={f.name}
                              fill
                              className="object-cover"
                              sizes="120px"
                              unoptimized={f.url.startsWith('http')}
                            />
                          ) : (
                            <span className="text-3xl">📄</span>
                          )}
                        </div>
                        <div className="p-1.5">
                          <p className="text-[0.65rem] font-bold truncate" title={f.name}>{f.name}</p>
                          <p className="text-[0.6rem] text-marron-claro">{formatBytes(f.size)}</p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-4 border-t border-linea bg-crudo">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-linea font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase hover:border-naranja"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!selectedUrl}
            className="px-5 py-2 bg-naranja text-blanco font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase hover:bg-verde disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Usar imagen
          </button>
        </div>
      </div>
    </div>
  )
}

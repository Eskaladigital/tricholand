'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import type { Product, ProductSpec, ProductStatus } from '@/types/shop'
import { MediaPickerModal } from './MediaPickerModal'
import { getProductsForSelect } from '@/lib/actions/products'

interface ProductFormProps {
  product?: Product
  onSave: (data: Record<string, unknown>) => void
  isSaving: boolean
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function ProductForm({ product, onSave, isSaving }: ProductFormProps) {
  const [name, setName] = useState(product?.name || '')
  const [slug, setSlug] = useState(product?.slug || '')
  const [sku, setSku] = useState(product?.sku || '')
  const [description, setDescription] = useState(product?.description || '')
  const [shortDescription, setShortDescription] = useState(product?.short_description || '')
  const [priceCents, setPriceCents] = useState(product?.price_cents ? product.price_cents / 100 : 0)
  const [unitsPerLot, setUnitsPerLot] = useState(product?.units_per_lot || 750)
  const [minOrderQty, setMinOrderQty] = useState(product?.min_order_qty || 1)
  const [qtyStep, setQtyStep] = useState(product?.qty_step || 1)
  const [sizeRange, setSizeRange] = useState(product?.size_range || '')
  const [status, setStatus] = useState<ProductStatus>(product?.status || 'draft')
  const [stockQty, setStockQty] = useState<number | ''>(product?.stock_qty ?? '')
  const [category, setCategory] = useState(product?.category || 'trichocereus')
  const [featured, setFeatured] = useState(product?.featured || false)
  const [sortOrder, setSortOrder] = useState(product?.sort_order || 0)
  const [imageUrl, setImageUrl] = useState(product?.images[0]?.url || '')
  const [imageAlt, setImageAlt] = useState(product?.images[0]?.alt || '')
  const [varietySlug, setVarietySlug] = useState(product?.variety_slug || '')
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false)

  const [specs, setSpecs] = useState<ProductSpec[]>(product?.specs || [
    { label: '', value: '' },
  ])

  const autoSlug = !product

  function handleNameChange(value: string) {
    setName(value)
    if (autoSlug) setSlug(slugify(value))
  }

  function addSpec() {
    setSpecs([...specs, { label: '', value: '' }])
  }

  function updateSpec(index: number, field: 'label' | 'value', value: string) {
    setSpecs(specs.map((s, i) => i === index ? { ...s, [field]: value } : s))
  }

  function removeSpec(index: number) {
    setSpecs(specs.filter((_, i) => i !== index))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    // Generar unit_label automáticamente
    const unitLabel = `lotes de ${unitsPerLot} uds`
    
    onSave({
      name,
      slug,
      sku,
      description,
      short_description: shortDescription,
      price_cents: Math.round(priceCents * 100),
      units_per_lot: unitsPerLot,
      min_order_qty: minOrderQty,
      qty_step: qtyStep,
      unit_label: unitLabel,
      size_range: sizeRange,
      status,
      stock_qty: stockQty === '' ? null : stockQty,
      category,
      featured,
      sort_order: sortOrder,
      variety_slug: varietySlug || null,
      images: imageUrl ? [{ id: 'img_new', url: imageUrl, alt: imageAlt || name, order: 0 }] : [],
      specs: specs.filter((s) => s.label && s.value),
      tags: [],
    })
  }

  const fieldClass = 'w-full px-4 py-2.5 border border-linea text-sm focus:outline-none focus:border-naranja transition-colors bg-blanco'
  const labelClass = 'block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1'

  return (
    <>
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Básicos */}
      <section className="bg-blanco border border-linea p-6">
        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase mb-4 pb-2 border-b border-linea">
          Información básica
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className={labelClass}>Nombre del producto *</label>
            <input type="text" value={name} onChange={(e) => handleNameChange(e.target.value)} required className={fieldClass} placeholder="Lote T. Pachanoi 15-20 cm" />
          </div>
          <div>
            <label className={labelClass}>Slug (URL)</label>
            <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} className={fieldClass} placeholder="lote-pachanoi-15-20" />
          </div>
          <div>
            <label className={labelClass}>SKU *</label>
            <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} required className={fieldClass} placeholder="TRI-PAC-015-100" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Descripción corta (para cards)</label>
            <input type="text" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} className={fieldClass} placeholder="San Pedro 15-20 cm · Maceta Ø 8.5" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Descripción completa</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className={`${fieldClass} resize-none`} />
          </div>
          <div>
            <label className={labelClass}>Variedad relacionada (slug)</label>
            <input type="text" value={varietySlug} onChange={(e) => setVarietySlug(e.target.value)} className={fieldClass} placeholder="trichocereus-pachanoi" />
          </div>
          <div>
            <label className={labelClass}>Rango de tamaño</label>
            <input type="text" value={sizeRange} onChange={(e) => setSizeRange(e.target.value)} className={fieldClass} placeholder="15-20 cm" />
          </div>
        </div>
      </section>

      {/* Precio y stock */}
      <section className="bg-blanco border border-linea p-6">
        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase mb-4 pb-2 border-b border-linea">
          Precio y stock
        </h2>

        {/* Unidades y precio */}
        <div className="mb-6">
          <h3 className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase text-marron-claro mb-3">
            Unidades y precio
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Unidades por lote *</label>
              <input 
                type="number" 
                min="1" 
                value={unitsPerLot} 
                onChange={(e) => setUnitsPerLot(parseInt(e.target.value) || 1)} 
                required 
                className={fieldClass} 
                placeholder="750" 
              />
              <p className="text-xs text-marron-claro mt-1">Cuántas plantas incluye este producto</p>
            </div>
            <div>
              <label className={labelClass}>Precio por lote (€ sin IVA) *</label>
              <input 
                type="number" 
                step="0.01" 
                min="0" 
                value={priceCents} 
                onChange={(e) => setPriceCents(parseFloat(e.target.value) || 0)} 
                required 
                className={fieldClass} 
                placeholder="2775.00" 
              />
              {unitsPerLot > 0 && priceCents > 0 && (
                <p className="text-xs text-verde font-medium mt-1">
                  Precio por unidad: {(priceCents / unitsPerLot).toFixed(2)} €
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Pedido */}
        <div className="mb-6 pb-6 border-b border-linea">
          <h3 className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase text-marron-claro mb-3">
            Configuración de pedidos
          </h3>
          <div className="bg-azul-claro/10 border border-azul p-3 rounded mb-4">
            <p className="text-sm text-negro">
              💡 <strong>Sistema de lotes:</strong><br/>
              • El cliente DEBE comprar primero el "Pedido mínimo" (ej: 750 uds)<br/>
              • Después puede añadir más unidades de "Incremento mínimo" en "Incremento mínimo" (ej: de 150 en 150 uds)<br/>
              • Ejemplo: puede comprar 750, 900 (750+150), 1050 (750+150+150), 1500 (750+750), etc.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Pedido mínimo (unidades) *</label>
              <input 
                type="number" 
                min="1" 
                value={minOrderQty} 
                onChange={(e) => setMinOrderQty(parseInt(e.target.value) || 1)} 
                className={fieldClass} 
                placeholder="750"
              />
              <p className="text-xs text-marron-claro mt-1">
                Cuántas unidades MÍNIMO debe comprar el cliente (ej: 750)
              </p>
            </div>
            <div>
              <label className={labelClass}>Incremento mínimo (unidades) *</label>
              <input 
                type="number" 
                min="1"
                value={qtyStep} 
                onChange={(e) => setQtyStep(parseInt(e.target.value) || 1)} 
                className={fieldClass} 
                placeholder="150"
              />
              <p className="text-xs text-marron-claro mt-1">
                Cuántas unidades puede añadir después (ej: 150). Puede añadir también múltiplos del pedido mínimo.
              </p>
            </div>
          </div>
        </div>

        {/* Stock y disponibilidad */}
        <div className="mb-6 pb-6 border-b border-linea">
          <h3 className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase text-marron-claro mb-3">
            Stock y disponibilidad
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Stock (lotes disponibles)</label>
              <input type="number" min="0" value={stockQty} onChange={(e) => setStockQty(e.target.value === '' ? '' : parseInt(e.target.value))} className={fieldClass} placeholder="Vacío = sin límite" />
            </div>
            <div>
              <label className={labelClass}>Estado</label>
              <select value={status} onChange={(e) => setStatus(e.target.value as ProductStatus)} className={fieldClass}>
                <option value="draft">Borrador</option>
                <option value="active">Activo</option>
                <option value="out_of_stock">Agotado</option>
                <option value="archived">Archivado</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Imagen */}
      <section className="bg-blanco border border-linea p-6">
        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase mb-4 pb-2 border-b border-linea">
          Imagen principal
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Imagen</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setMediaPickerOpen(true)}
                className="px-4 py-2.5 bg-naranja text-blanco font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase whitespace-nowrap hover:bg-verde transition-colors"
              >
                Gestor de medios
              </button>
            </div>
            {imageUrl && (
              <div className="mt-3 relative w-48 h-36 rounded overflow-hidden border border-linea bg-crudo group">
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  sizes="192px"
                  unoptimized={imageUrl.startsWith('http')}
                />
                <button
                  type="button"
                  onClick={() => setMediaPickerOpen(true)}
                  className="absolute inset-0 bg-negro/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-blanco font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase"
                >
                  Cambiar
                </button>
              </div>
            )}
          </div>
          <div>
            <label className={labelClass}>Texto alt</label>
            <input type="text" value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} className={fieldClass} placeholder="Descripción de la imagen" />
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="bg-blanco border border-linea p-6">
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-linea">
          <h2 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase">
            Características
          </h2>
          <button type="button" onClick={addSpec} className="text-xs text-naranja font-bold hover:underline">
            + Añadir
          </button>
        </div>
        <div className="space-y-2">
          {specs.map((spec, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input type="text" value={spec.label} onChange={(e) => updateSpec(i, 'label', e.target.value)}
                className={`flex-1 ${fieldClass}`} placeholder="Etiqueta (ej: Especie)" />
              <input type="text" value={spec.value} onChange={(e) => updateSpec(i, 'value', e.target.value)}
                className={`flex-1 ${fieldClass}`} placeholder="Valor (ej: Echinopsis pachanoi)" />
              <button type="button" onClick={() => removeSpec(i)} className="text-red-400 hover:text-red-600 px-2">✕</button>
            </div>
          ))}
        </div>
      </section>

      {/* Categorización */}
      <section className="bg-blanco border border-linea p-6">
        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase mb-4 pb-2 border-b border-linea">
          Categorización
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Categoría</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className={fieldClass}>
              <option value="trichocereus">Trichocereus</option>
              <option value="packs">Packs</option>
              <option value="otros-cactus">Otros cactus</option>
              <option value="accesorios">Accesorios</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Orden en catálogo</label>
            <input type="number" min="0" value={sortOrder} onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)} className={fieldClass} />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer py-2.5">
              <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="w-4 h-4 accent-naranja" />
              <span className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase">Destacado</span>
            </label>
          </div>
        </div>
      </section>

      {/* Submit */}
      <div className="flex gap-4 justify-end">
        <a href="/administrator/products" className="px-6 py-3 border border-linea font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-crudo transition-colors">
          Cancelar
        </a>
        <button type="submit" disabled={isSaving}
          className="px-8 py-3 bg-naranja text-blanco font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors disabled:opacity-50">
          {isSaving ? 'Guardando...' : product ? 'Guardar cambios' : 'Crear producto'}
        </button>
      </div>
    </form>
    <MediaPickerModal
      open={mediaPickerOpen}
      onClose={() => setMediaPickerOpen(false)}
      onSelect={(url) => { setImageUrl(url); setMediaPickerOpen(false) }}
      title="Seleccionar imagen del producto"
    />
    </>
  )
}

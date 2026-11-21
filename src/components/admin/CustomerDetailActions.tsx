'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { deleteCustomer, updateCustomerNotes } from '@/lib/actions/customers'

interface CustomerDetailActionsProps {
  customerId: string
  customerName: string
  customerEmail: string
  customerPhone: string | null
  adminNotes: string | null
}

export function CustomerDetailActions({
  customerId,
  customerName,
  customerEmail,
  customerPhone,
  adminNotes,
}: CustomerDetailActionsProps) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)
  const [notes, setNotes] = useState(adminNotes ?? '')
  const [savedNotes, setSavedNotes] = useState((adminNotes ?? '').trim())
  const [savingNotes, setSavingNotes] = useState(false)
  const [notesMsg, setNotesMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const notesDirty = notes.trim() !== savedNotes
  const first = customerName.trim().split(/\s+/)[0] || customerName
  const mail = `mailto:${customerEmail}?subject=${encodeURIComponent('Tricholand')}&body=${encodeURIComponent(`Hola ${first},\n\n`)}`
  const tel = customerPhone?.replace(/[^\d+]/g, '')

  async function saveNotes() {
    setSavingNotes(true)
    setNotesMsg(null)
    const { error } = await updateCustomerNotes(customerId, notes)
    setSavingNotes(false)
    if (error) {
      setNotesMsg({ ok: false, text: error })
      return
    }
    const trimmed = notes.trim()
    setSavedNotes(trimmed)
    setNotesMsg({ ok: true, text: trimmed ? 'Notas guardadas' : 'Notas borradas' })
    router.refresh()
  }

  async function handleDelete() {
    if (!confirm(`¿Borrar el cliente ${customerName}? Esta acción no se puede deshacer. Los pedidos no se borran.`)) return
    setDeleting(true)
    const { error } = await deleteCustomer(customerId)
    setDeleting(false)
    if (error) alert(error)
    else router.push('/administrator/customers')
  }

  return (
    <>
      <section className="bg-blanco border border-linea p-6">
        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase mb-3">
          Contactar
        </h2>
        <a
          href={mail}
          className="block w-full py-3 text-center bg-negro text-crudo font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide hover:bg-marron transition-colors"
        >
          Escribir email
        </a>
        {tel && (
          <a
            href={`tel:${tel}`}
            className="block w-full mt-2 py-2.5 text-center border border-linea text-xs font-bold uppercase tracking-wide hover:bg-crudo transition-colors"
          >
            Llamar {customerPhone}
          </a>
        )}
      </section>

      <section className="bg-blanco border border-linea p-6">
        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase mb-1">
          Notas internas
        </h2>
        <p className="text-xs text-marron-claro mb-3">Solo se ven en el panel.</p>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          placeholder="Condiciones, variedades habituales, siguiente paso…"
          className="w-full px-3 py-2 border border-linea bg-crudo text-sm leading-relaxed focus:outline-none focus:border-naranja resize-y min-h-[96px]"
        />
        <div className="flex items-center justify-between gap-3 mt-3">
          <button
            type="button"
            onClick={saveNotes}
            disabled={!notesDirty || savingNotes}
            className="px-4 py-2 bg-verde text-blanco font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide hover:opacity-90 disabled:opacity-40"
          >
            {savingNotes ? 'Guardando…' : 'Guardar notas'}
          </button>
          {notesMsg && (
            <p className={`text-xs ${notesMsg.ok ? 'text-verde-oscuro' : 'text-red-600'}`} role="status">
              {notesMsg.text}
            </p>
          )}
        </div>
      </section>

      <section className="px-1 pt-1">
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="text-xs text-marron-claro hover:text-red-700 disabled:opacity-50"
        >
          {deleting ? 'Borrando…' : 'Borrar este cliente'}
        </button>
      </section>
    </>
  )
}

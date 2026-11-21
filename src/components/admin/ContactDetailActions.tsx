'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { deleteContact, updateContactNotes, updateContactStatus } from '@/lib/actions/contacts'
import type { ContactStatusValue } from '@/lib/actions/contacts'
import { CONTACT_STATUS_LABELS, contactMailto } from '@/types/contact'

const statusOptions: ContactStatusValue[] = ['new', 'read', 'replied', 'archived', 'spam']

const selectedClass: Record<ContactStatusValue, string> = {
  new: 'border-amber-400 bg-amber-50 text-amber-950',
  read: 'border-verde bg-verde-claro text-verde-oscuro',
  replied: 'border-green-600 bg-green-50 text-green-900',
  archived: 'border-marron bg-crudo text-marron',
  spam: 'border-red-400 bg-red-50 text-red-800',
}

interface ContactDetailActionsProps {
  contactId: string
  contactName: string
  contactEmail: string
  inquiryType: string | null
  phone: string | null
  currentStatus: ContactStatusValue
  adminNotes: string | null
}

export function ContactDetailActions({
  contactId,
  contactName,
  contactEmail,
  inquiryType,
  phone,
  currentStatus,
  adminNotes,
}: ContactDetailActionsProps) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)
  const [status, setStatus] = useState<ContactStatusValue>(currentStatus)
  const [savingStatus, setSavingStatus] = useState(false)
  const [statusMsg, setStatusMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const [notes, setNotes] = useState(adminNotes ?? '')
  const [savedNotes, setSavedNotes] = useState((adminNotes ?? '').trim())
  const [savingNotes, setSavingNotes] = useState(false)
  const [notesMsg, setNotesMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const notesDirty = notes.trim() !== savedNotes
  const autoRead = useRef(false)

  useEffect(() => {
    setStatus(currentStatus)
  }, [currentStatus])

  useEffect(() => {
    setSavedNotes((adminNotes ?? '').trim())
  }, [adminNotes])

  useEffect(() => {
    if (autoRead.current || currentStatus !== 'new') return
    const key = `tricholand-contact-seen-${contactId}`
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem(key)) return
    autoRead.current = true
    sessionStorage.setItem(key, '1')
    void changeStatus('read', 'Marcado como leído')
    // Solo al abrir un contacto nuevo. Si luego lo devuelven a Nuevo, no se vuelve a marcar.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactId, currentStatus])

  async function changeStatus(next: ContactStatusValue, quietText?: string) {
    if (next === status && !quietText) return
    setStatus(next)
    setSavingStatus(true)
    setStatusMsg(null)
    const { error } = await updateContactStatus(contactId, next)
    setSavingStatus(false)
    if (error) {
      setStatusMsg({ ok: false, text: error })
      setStatus(currentStatus)
      return
    }
    setStatusMsg({ ok: true, text: quietText ?? 'Estado actualizado' })
    router.refresh()
    window.setTimeout(() => setStatusMsg(null), 2500)
  }

  async function saveNotes() {
    setSavingNotes(true)
    setNotesMsg(null)
    const { error } = await updateContactNotes(contactId, notes)
    setSavingNotes(false)
    if (error) {
      setNotesMsg({ ok: false, text: error })
      return
    }
    const trimmed = notes.trim()
    setSavedNotes(trimmed)
    setNotesMsg({ ok: true, text: trimmed ? 'Notas guardadas' : 'Notas borradas' })
    router.refresh()
    window.setTimeout(() => setNotesMsg(null), 2500)
  }

  async function handleDelete() {
    if (!confirm(`¿Borrar el contacto de ${contactName}? Esta acción no se puede deshacer.`)) return
    setDeleting(true)
    const { error } = await deleteContact(contactId)
    setDeleting(false)
    if (error) alert(error)
    else router.push('/administrator/contacts')
  }

  const mail = contactMailto(contactEmail, contactName, inquiryType)
  const tel = phone?.replace(/[^\d+]/g, '')

  return (
    <>
      <section className="bg-blanco border border-linea p-6">
        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase mb-1">
          Responder
        </h2>
        <p className="text-xs text-marron-claro mb-4">
          Se abre tu correo con el asunto y un saludo. Cuando lo hayas enviado, márcalo como respondido.
        </p>
        <a
          href={mail}
          className="block w-full py-3 text-center bg-negro text-crudo font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide hover:bg-marron transition-colors"
        >
          Responder por email
        </a>
        {tel && (
          <a
            href={`tel:${tel}`}
            className="block w-full mt-2 py-2.5 text-center border border-linea text-xs font-bold uppercase tracking-wide hover:bg-crudo transition-colors"
          >
            Llamar {phone}
          </a>
        )}
      </section>

      <section className="bg-blanco border border-linea p-6">
        <div className="flex items-baseline justify-between gap-3 mb-3">
          <h2 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase">
            Estado
          </h2>
          {savingStatus && <span className="text-[11px] text-marron-claro">Guardando…</span>}
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Estado del contacto">
          {statusOptions.map((value) => {
            const selected = status === value
            return (
              <button
                key={value}
                type="button"
                aria-pressed={selected}
                disabled={savingStatus}
                onClick={() => changeStatus(value)}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wide border transition-colors disabled:opacity-50 ${
                  selected ? selectedClass[value] : 'border-linea bg-blanco text-marron-claro hover:border-marron-claro hover:text-negro'
                }`}
              >
                {CONTACT_STATUS_LABELS[value]}
              </button>
            )
          })}
        </div>
        {statusMsg && (
          <p className={`text-xs mt-3 ${statusMsg.ok ? 'text-verde-oscuro' : 'text-red-600'}`} role="status">
            {statusMsg.text}
          </p>
        )}
      </section>

      <section className="bg-blanco border border-linea p-6">
        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase mb-1">
          Notas internas
        </h2>
        <p className="text-xs text-marron-claro mb-3">Solo las veis en el panel. No se envían al cliente.</p>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          placeholder="Precio hablado, variedades, siguiente paso…"
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
          {deleting ? 'Borrando…' : 'Borrar este contacto'}
        </button>
      </section>
    </>
  )
}

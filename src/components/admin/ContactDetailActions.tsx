'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { deleteContact, updateContactStatus } from '@/lib/actions/contacts'
import type { ContactStatusValue } from '@/lib/actions/contacts'

const statusOptions: { value: ContactStatusValue; label: string }[] = [
  { value: 'new', label: 'Nuevo' },
  { value: 'read', label: 'Leído' },
  { value: 'replied', label: 'Respondido' },
  { value: 'archived', label: 'Archivado' },
  { value: 'spam', label: 'Spam' },
]

interface ContactDetailActionsProps {
  contactId: string
  contactName: string
  contactEmail: string
  currentStatus: ContactStatusValue
}

export function ContactDetailActions({ contactId, contactName, contactEmail, currentStatus }: ContactDetailActionsProps) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)
  const [status, setStatus] = useState<ContactStatusValue>(currentStatus)
  const [savingStatus, setSavingStatus] = useState(false)
  const [statusMsg, setStatusMsg] = useState<{ ok: boolean; text: string } | null>(null)

  const handleStatusChange = async (newStatus: ContactStatusValue) => {
    setStatus(newStatus)
    setSavingStatus(true)
    setStatusMsg(null)
    const { error } = await updateContactStatus(contactId, newStatus)
    setSavingStatus(false)
    if (error) {
      setStatusMsg({ ok: false, text: error })
      setStatus(currentStatus)
    } else {
      setStatusMsg({ ok: true, text: 'Estado actualizado' })
      router.refresh()
      setTimeout(() => setStatusMsg(null), 2500)
    }
  }

  const handleDelete = async () => {
    if (!confirm(`¿Borrar el contacto de ${contactName}? Esta acción no se puede deshacer.`)) return
    setDeleting(true)
    const { error } = await deleteContact(contactId)
    setDeleting(false)
    if (error) {
      alert(error)
    } else {
      router.push('/administrator/contacts')
    }
  }

  return (
    <>
      {/* Estado del contacto */}
      <section className="bg-blanco border border-linea p-6">
        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase mb-3">
          Estado
        </h2>
        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value as ContactStatusValue)}
          disabled={savingStatus}
          className="w-full px-3 py-2 border border-linea text-sm focus:outline-none focus:border-naranja bg-blanco disabled:opacity-50"
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {savingStatus && (
          <p className="text-xs text-marron-claro mt-1">Guardando...</p>
        )}
        {statusMsg && (
          <p className={`text-xs mt-1 ${statusMsg.ok ? 'text-green-700' : 'text-red-600'}`}>
            {statusMsg.text}
          </p>
        )}
      </section>

      {/* Acciones */}
      <section className="bg-blanco border border-linea p-6 space-y-2">
        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase mb-3">
          Acciones
        </h2>
        <a
          href={`mailto:${contactEmail}?subject=Re: Tu consulta a Tricholand`}
          className="block w-full py-2.5 text-center border border-linea text-xs font-bold uppercase hover:bg-crudo transition-colors"
        >
          Responder por email
        </a>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="w-full py-2.5 text-center border border-linea text-xs font-bold uppercase hover:bg-crudo transition-colors disabled:opacity-50 text-marron-claro hover:text-red-600"
        >
          Borrar contacto
        </button>
      </section>
    </>
  )
}

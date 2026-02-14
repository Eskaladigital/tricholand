'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { deleteContact } from '@/lib/actions/contacts'

interface ContactDetailActionsProps {
  contactId: string
  contactName: string
  contactEmail: string
}

export function ContactDetailActions({ contactId, contactName, contactEmail }: ContactDetailActionsProps) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

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
    <section className="bg-blanco border border-linea p-6 space-y-2">
      <h2 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase mb-3">
        Acciones
      </h2>
      <a
        href={`mailto:${contactEmail}?subject=Re: Tu consulta a Tricholand`}
        className="block w-full py-2.5 text-center border border-linea text-xs font-bold uppercase hover:bg-crudo transition-colors"
      >
        📧 Responder por email
      </a>
      <button
        type="button"
        onClick={handleDelete}
        disabled={deleting}
        className="w-full py-2.5 text-center border border-linea text-xs font-bold uppercase hover:bg-crudo transition-colors disabled:opacity-50 text-marron-claro hover:text-red-600"
      >
        🗑️ Borrar contacto
      </button>
    </section>
  )
}

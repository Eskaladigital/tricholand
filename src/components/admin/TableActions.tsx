'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const iconClass = 'w-4 h-4'

const PencilIcon = () => (
  <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
)

const TrashIcon = () => (
  <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
)

interface TableActionsProps {
  editHref: string
  deleteAction: (id: string) => Promise<{ error?: string }>
  entityId: string
  entityLabel?: string
}

export function TableActions({ editHref, deleteAction, entityId, entityLabel = 'este elemento' }: TableActionsProps) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`¿Borrar ${entityLabel}? Esta acción no se puede deshacer.`)) return
    setDeleting(true)
    const { error } = await deleteAction(entityId)
    setDeleting(false)
    if (error) {
      alert(error)
    } else {
      router.refresh()
    }
  }

  return (
    <div className="flex items-center justify-center gap-1">
      <Link
        href={editHref}
        className="p-2 text-naranja hover:bg-naranja/10 rounded transition-colors"
        title="Editar"
      >
        <PencilIcon />
      </Link>
      <button
        type="button"
        onClick={handleDelete}
        disabled={deleting}
        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
        title="Borrar"
      >
        <TrashIcon />
      </button>
    </div>
  )
}

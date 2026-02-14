'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { deleteCustomer } from '@/lib/actions/customers'

interface CustomerDetailActionsProps {
  customerId: string
  customerName: string
  customerEmail: string
}

export function CustomerDetailActions({ customerId, customerName, customerEmail }: CustomerDetailActionsProps) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`¿Borrar el cliente ${customerName}? Esta acción no se puede deshacer.`)) return
    setDeleting(true)
    const { error } = await deleteCustomer(customerId)
    setDeleting(false)
    if (error) {
      alert(error)
    } else {
      router.push('/administrator/customers')
    }
  }

  return (
    <section className="bg-blanco border border-linea p-6 space-y-2">
      <h2 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase mb-3">
        Acciones
      </h2>
      <a
        href={`mailto:${customerEmail}?subject=Tricholand`}
        className="block w-full py-2.5 text-center border border-linea text-xs font-bold uppercase hover:bg-crudo transition-colors"
      >
        Enviar email
      </a>
      <button
        type="button"
        onClick={handleDelete}
        disabled={deleting}
        className="w-full py-2.5 text-center border border-linea text-xs font-bold uppercase hover:bg-crudo transition-colors disabled:opacity-50 text-marron-claro hover:text-red-600"
      >
        Borrar cliente
      </button>
    </section>
  )
}

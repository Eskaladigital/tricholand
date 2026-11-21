import { Suspense } from 'react'
import { getContacts } from '@/lib/actions/contacts'
import { ContactsInbox } from '@/components/admin/ContactsInbox'

export default async function ContactsPage() {
  let contacts: Awaited<ReturnType<typeof getContacts>> = []
  let error: string | null = null

  try {
    contacts = await getContacts()
  } catch (e) {
    error = e instanceof Error ? e.message : 'Error al cargar contactos'
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 p-6 rounded">
        <h2 className="font-bold text-red-800 mb-2">Error al cargar contactos</h2>
        <p className="text-sm text-red-700">{error}</p>
        <p className="text-xs text-red-600 mt-2">Comprueba que la tabla contacts existe en Supabase y que tienes permisos.</p>
      </div>
    )
  }

  return (
    <Suspense fallback={<p className="text-sm text-marron-claro">Cargando contactos…</p>}>
      <ContactsInbox contacts={contacts} />
    </Suspense>
  )
}

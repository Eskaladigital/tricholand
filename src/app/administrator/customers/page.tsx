import { Suspense } from 'react'
import { getCustomers } from '@/lib/actions/customers'
import { CustomersInbox } from '@/components/admin/CustomersInbox'

export default async function CustomersPage() {
  const customers = await getCustomers()

  return (
    <Suspense fallback={<p className="text-sm text-marron-claro">Cargando clientes…</p>}>
      <CustomersInbox customers={customers} />
    </Suspense>
  )
}

'use client'

import { useState } from 'react'
import { exportCustomersCsv } from '@/lib/actions/customers'

export function ExportCustomersButton() {
  const [loading, setLoading] = useState(false)

  async function handleExport() {
    setLoading(true)
    try {
      const csv = await exportCustomersCsv()
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `clientes-tricholand-${new Date().toISOString().slice(0, 10)}.csv`
      a.click()
      URL.revokeObjectURL(url)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleExport}
      disabled={loading}
      className="bg-verde text-blanco px-4 py-2 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide hover:opacity-90 transition-opacity disabled:opacity-60"
    >
      {loading ? 'Exportando…' : 'Exportar CSV'}
    </button>
  )
}

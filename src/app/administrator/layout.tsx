import type { Metadata, Viewport } from 'next'
import { AdminLayoutShell } from '@/components/admin/AdminLayoutShell'
import { PwaInstallPrompt } from '@/components/admin/PwaInstallPrompt'

export const metadata: Metadata = {
  title: 'Administración | Tricholand',
  robots: { index: false, follow: false },
  manifest: '/administrator/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Tricholand Admin',
  },
  icons: {
    icon: '/favicon.png',
    apple: '/administrator/icon-192.svg',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1a1a',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      <AdminLayoutShell>{children}</AdminLayoutShell>
      <PwaInstallPrompt />
    </div>
  )
}

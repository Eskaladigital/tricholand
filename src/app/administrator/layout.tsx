import type { Metadata, Viewport } from 'next'
import { AdminLayoutShell } from '@/components/admin/AdminLayoutShell'
import { PwaInstallPrompt } from '@/components/admin/PwaInstallPrompt'
import { RootHtml } from '@/components/layout/RootHtml'

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
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootHtml lang="es">
      <div className="min-h-screen bg-[#f5f5f0]">
        <AdminLayoutShell>{children}</AdminLayoutShell>
        <PwaInstallPrompt />
      </div>
    </RootHtml>
  )
}

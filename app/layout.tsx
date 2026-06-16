import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AppLayout } from '@/components/layout/app-layout'
import { AuthProvider } from '@/hooks/use-auth'
import { AuthGuard } from '@/components/auth/auth-guard'
import { DataProvider } from '@/hooks/use-data'
import './globals.css'

const geist = Geist({ subsets: ["latin"], variable: '--font-sans' })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'MediClinic Pro - Clinic Management',
  description: 'Professional clinic management system for healthcare providers',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/hospital.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/hospital.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/hospital.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0052CC'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        <AuthProvider>
          <AuthGuard>
            <DataProvider>
              <AppLayout>{children}</AppLayout>
            </DataProvider>
          </AuthGuard>
        </AuthProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

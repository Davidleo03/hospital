'use client'

import { usePathname } from 'next/navigation'
import { Sidebar } from './sidebar'
import { Header } from './header'

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginRoute = pathname === '/login'

  if (isLoginRoute) {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col w-full lg:ml-64">
        {/* Header */}
        <Header />

        {/* Page content */}
        <main className="flex-1 overflow-auto pt-16 bg-white">
          <div className="max-w-7xl mx-auto p-4 sm:p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}

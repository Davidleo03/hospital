'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthenticated, ready } = useAuth()

  useEffect(() => {
    if (!ready) {
      return
    }

    if (pathname === '/login') {
      if (isAuthenticated) {
        router.replace('/')
      }
      return
    }

    if (!isAuthenticated) {
      router.replace('/login')
    }
  }, [pathname, router, isAuthenticated, ready])

  if (!ready) {
    return null
  }

  if (pathname !== '/login' && !isAuthenticated) {
    return null
  }

  return <>{children}</>
}

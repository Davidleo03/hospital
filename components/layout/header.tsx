'use client'

import { Bell, Settings, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'

export function Header() {
  const router = useRouter()
  const { logout, currentUser } = useAuth()

  const handleLogout = () => {
    logout()
    router.replace('/login')
  }

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 bg-secondary/90 border-b border-border/60 backdrop-blur-sm flex items-center justify-between px-4 sm:px-6 z-30">
      <div className="text-sm text-muted-foreground hidden sm:block sm:ml-10">
        Bienvenido de nuevo, {currentUser?.name ?? 'Usuario'}
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
       

        {/* Settings */}
        <Button variant="ghost" size="icon">
          <Settings className="w-5 h-5" onClick={() => router.push('/settings')} />
        </Button>

        {/* Profile Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => router.push('/profile')}>Perfil</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/settings')}>Configuración</DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>Cerrar Sesión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

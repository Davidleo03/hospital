'use client'

import { useMemo } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function ProfilePage() {
  const { currentUser } = useAuth()

  const userRole = useMemo(() => {
    if (!currentUser) return 'Usuario'
    return currentUser.role === 'admin' ? 'Administrador' : 'Usuario'
  }, [currentUser])

  if (!currentUser) {
    return (
      <div className="rounded-3xl border border-border bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-semibold text-foreground">Perfil</h1>
        <p className="mt-4 text-muted-foreground">No se encontró usuario autenticado.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Perfil</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Revisa y administra tu información de usuario.
          </p>
        </div>
        <Badge className="rounded-full px-3 py-1 text-sm bg-accent text-accent-foreground shadow-sm">
          {userRole}
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <Card className="space-y-6 bg-white border-border p-6">
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground">Nombre completo</p>
              <p className="mt-2 text-lg font-semibold text-foreground">{currentUser.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Correo electrónico</p>
              <p className="mt-2 text-lg font-semibold text-foreground">{currentUser.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Rol</p>
              <p className="mt-2 text-lg font-semibold text-foreground">{userRole}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-accent/10 border-accent/30 p-6">
          <h2 className="text-lg font-semibold text-foreground">Consejos</h2>
          <p className="mt-3 text-sm text-muted-foreground leading-7">
            Mantén actualizados tus datos para que el equipo pueda contactarte fácilmente. Puedes cambiar tu contraseña y correo en la vista de configuración.
          </p>
          <Button
            onClick={() => window.location.assign('/settings')}
            className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Ir a configuración
          </Button>
        </Card>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form'

type SettingsFormValues = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export default function SettingsPage() {
  const router = useRouter()
  const { currentUser, updateUser } = useAuth()
  const [successMessage, setSuccessMessage] = useState('')

  const form = useForm<SettingsFormValues>({
    defaultValues: {
      name: currentUser?.name ?? '',
      email: currentUser?.email ?? '',
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit = (values: SettingsFormValues) => {
    if (!currentUser) {
      return
    }

    if (values.password && values.password !== values.confirmPassword) {
      form.setError('confirmPassword', {
        type: 'validate',
        message: 'Las contraseñas no coinciden.'
      })
      return
    }

    updateUser({
      ...currentUser,
      name: values.name,
      email: values.email,
      password: values.password ? values.password : currentUser.password
    })

    setSuccessMessage('Tus cambios se guardaron correctamente.')
    router.refresh()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Configuración</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Actualiza tus datos de acceso y información personal.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                rules={{ required: 'El nombre es obligatorio.' }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre completo</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Nombre completo" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                rules={{
                  required: 'El correo es obligatorio.',
                  pattern: {
                    value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                    message: 'Correo inválido.'
                  }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="usuario@dominio.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nueva contraseña</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="••••••••" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar contraseña</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="••••••••" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {successMessage && (
                <div className="rounded-2xl bg-accent/10 border border-accent/20 p-4 text-sm text-accent-foreground">
                  {successMessage}
                </div>
              )}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Guardar cambios
                </Button>
                <Button variant="secondary" onClick={() => router.push('/profile')}>
                  Volver al perfil
                </Button>
              </div>
            </form>
          </Form>
        </div>

        <div className="space-y-4 rounded-3xl border border-border bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm text-muted-foreground">Seguridad</p>
            <p className="mt-2 text-foreground">
              Si dejas el campo de contraseña vacío, tu contraseña actual seguirá activa.
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Consejo</p>
            <p className="mt-2 text-foreground">
              Utiliza una contraseña segura con al menos 8 caracteres y una combinación de letras y números.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

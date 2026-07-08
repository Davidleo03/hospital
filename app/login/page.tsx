'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Mail, Lock } from 'lucide-react'
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
import { useAuth } from '@/hooks/use-auth'

type LoginFormValues = {
  email: string
  password: string
}

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const { login, ready, isAuthenticated } = useAuth()

  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  useEffect(() => {
    if (ready && isAuthenticated) {
      router.replace('/')
    }
  }, [ready, isAuthenticated, router])

  const onSubmit = (values: LoginFormValues) => {
    setError('')

    const success = login(values.email, values.password)

    if (!success) {
      setError('Correo o contraseña incorrectos.')
      return
    }

    router.replace('/')
  }

  if (!ready) {
    return null
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden bg-slate-950 text-white"
      style={{
        backgroundImage:
          "linear-gradient(rgba(2, 24, 45, 0.8), rgba(7, 46, 74, 0.9)), url('/medicarmen-logo.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-slate-950/70" />
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 sm:py-14">
        <div className="w-full max-w-4xl overflow-hidden rounded-[32px] border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl animate-fade-in-up">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="hidden lg:flex flex-col justify-between space-y-6 bg-slate-900/80 p-10 text-white lg:p-12">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-sky-300/80">
                  Bienvenido a MediCarmen
                </p>
                <h1 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
                  Control total de tu clínica
                </h1>
                <p className="mt-4 max-w-lg text-sm leading-7 text-slate-300">
                  Accede a pacientes, citas, inventario y consultas desde un panel seguro y fácil de usar.
                </p>
              </div>

              

              
            </div>

            <div className="bg-white px-5 py-8 sm:px-8 sm:py-10 lg:p-12">
              <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                <img
                  src="/flayer.jpeg"
                  alt="Flayer"
                  className="h-40 w-full object-cover"
                />
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6 max-w-md mx-auto lg:max-w-none lg:mx-0">
                  <FormField
                    control={form.control}
                    name="email"
                    rules={{ required: 'El correo es obligatorio.' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correo electrónico</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <Input
                              {...field}
                              type="email"
                              placeholder="admin@hospital.com"
                              autoComplete="email"
                              className="pl-10"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    rules={{ required: 'La contraseña es obligatoria.' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <Input
                              {...field}
                              type="password"
                              placeholder="••••••••"
                              autoComplete="current-password"
                              className="pl-10"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {error ? (
                    <p className="text-sm text-destructive">{error}</p>
                  ) : null}

                  <Button type="submit" className="h-12 w-full bg-sky-600 text-white hover:bg-sky-700">
                    Entrar
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

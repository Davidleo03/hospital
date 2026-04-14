'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FieldGroup, FieldLabel } from '@/components/ui/field'
import { Spinner } from '@/components/ui/spinner'

interface DoctorFormProps {
  onSuccess: () => void
}

export function DoctorForm({ onSuccess }: DoctorFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    license: '',
    email: '',
    phone: '',
    specialty: 'Cardiología',
    availability: 'available'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    setIsLoading(false)
    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FieldGroup>
        <FieldLabel>Nombre Completo</FieldLabel>
        <Input
          name="name"
          placeholder="Dr. Francisco Ruiz"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </FieldGroup>

      <FieldGroup>
        <FieldLabel>Numero de Licencia</FieldLabel>
        <Input
          name="license"
          placeholder="LIC-2001-001"
          value={formData.license}
          onChange={handleChange}
          required
        />
      </FieldGroup>

      <FieldGroup>
        <FieldLabel>Email</FieldLabel>
        <Input
          name="email"
          type="email"
          placeholder="francisco@clinic.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </FieldGroup>

      <FieldGroup>
        <FieldLabel>Telefono</FieldLabel>
        <Input
          name="phone"
          placeholder="0422-8962109"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </FieldGroup>

      <FieldGroup>
        <FieldLabel>Especialidad</FieldLabel>
        <select
          name="specialty"
          value={formData.specialty}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-border rounded-lg bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option>Cardiología</option>
          <option>Dermatología</option>
          <option>Traumatología</option>
          <option>Oftalmología</option>
          <option>Neurología</option>
          <option>Neumología</option>
          <option>Endocrinología</option>
          <option>Gastroenterología</option>
          <option>Reumatología</option>
        </select>
      </FieldGroup>

      <FieldGroup>
        <FieldLabel>Disponibilidad</FieldLabel>
        <select
          name="availability"
          value={formData.availability}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-border rounded-lg bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="Disponible">Disponible</option>
          <option value="Ocupado">Ocupado</option>
          
        </select>
      </FieldGroup>

      <div className="flex gap-2 pt-4">
        <Button
          type="submit"
          className="flex-1 bg-primary text-primary-foreground"
          disabled={isLoading}
        >
          {isLoading ? <Spinner className="mr-2" /> : null}
          {isLoading ? 'Agregando...' : 'Agregar Doctor'}
        </Button>
      </div>
    </form>
  )
}

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FieldGroup, FieldLabel } from '@/components/ui/field'
import { Spinner } from '@/components/ui/spinner'

interface PatientFormProps {
  onSuccess: () => void
}

export function PatientForm({ onSuccess }: PatientFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    dni: '',
    email: '',
    phone: '',
    specialty: 'Cardiología',
    dateOfBirth: '',
    address: ''
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
          placeholder="Juan García López"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </FieldGroup>

      <FieldGroup>
        <FieldLabel>DNI</FieldLabel>
        <Input
          name="dni"
          placeholder="12345678A"
          value={formData.dni}
          onChange={handleChange}
          required
        />
      </FieldGroup>

      <FieldGroup>
        <FieldLabel>Correo</FieldLabel>
        <Input
          name="email"
          type="email"
          placeholder="juan@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </FieldGroup>

      <FieldGroup>
        <FieldLabel>Teléfono</FieldLabel>
        <Input
          name="phone"
          placeholder="+34 912 34 56 78"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </FieldGroup>

      <FieldGroup>
        <FieldLabel>Fecha de Nacimiento</FieldLabel>
        <Input
          name="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
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
        <FieldLabel>Dirección</FieldLabel>
        <Input
          name="address"
          placeholder="Calle Mayor 123, Madrid"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </FieldGroup>

      <div className="flex gap-2 pt-4">
        <Button
          type="submit"
          className="flex-1 bg-primary text-primary-foreground"
          disabled={isLoading}
        >
          {isLoading ? <Spinner className="mr-2" /> : null}
          {isLoading ? 'Agregando...' : 'Agregar Paciente'}
        </Button>
      </div>
    </form>
  )
}

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FieldGroup, FieldLabel } from '@/components/ui/field'
import { Spinner } from '@/components/ui/spinner'
import { generateId, Medication } from '@/lib/data-store'

interface InventoryFormProps {
  onSuccess: () => void
  onAddMedication: (medication: Medication) => void
}

export function InventoryForm({ onSuccess, onAddMedication }: InventoryFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    quantity: '',
    expiryDate: '',
    supplier: '',
    alertLevel: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await new Promise(resolve => setTimeout(resolve, 500))

    const newMedication: Medication = {
      id: generateId('MED'),
      name: formData.name,
      dosage: formData.dosage,
      quantity: Number(formData.quantity),
      expiryDate: formData.expiryDate,
      supplier: formData.supplier,
      alertLevel: Number(formData.alertLevel)
    }

    onAddMedication(newMedication)
    setIsLoading(false)
    onSuccess()
    setFormData({
      name: '',
      dosage: '',
      quantity: '',
      expiryDate: '',
      supplier: '',
      alertLevel: ''
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FieldGroup>
        <FieldLabel>Medicamento</FieldLabel>
        <Input
          name="name"
          placeholder="e.g., Aspirina"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </FieldGroup>

      <FieldGroup>
        <FieldLabel>Dosis</FieldLabel>
        <Input
          name="dosage"
          placeholder="e.g., 500mg"
          value={formData.dosage}
          onChange={handleChange}
          required
        />
      </FieldGroup>

      <FieldGroup>
        <FieldLabel>Cantidad</FieldLabel>
        <Input
          name="quantity"
          type="number"
          placeholder="Cantidad"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
      </FieldGroup>

      <FieldGroup>
        <FieldLabel>Fecha de expiración</FieldLabel>
        <Input
          name="expiryDate"
          type="date"
          value={formData.expiryDate}
          onChange={handleChange}
          required
        />
      </FieldGroup>

      <FieldGroup>
        <FieldLabel>Proveedor</FieldLabel>
        <Input
          name="supplier"
          placeholder="e.g., Pharma Company"
          value={formData.supplier}
          onChange={handleChange}
          required
        />
      </FieldGroup>

      <FieldGroup>
        <FieldLabel>Estado</FieldLabel>
        <Input
          name="alertLevel"
          type="number"
          value={formData.alertLevel}
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
          {isLoading ? 'Agregando...' : 'Agregar medicamento'}
        </Button>
      </div>
    </form>
  )
}

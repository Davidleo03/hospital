'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FieldGroup, FieldLabel } from '@/components/ui/field'
import { Spinner } from '@/components/ui/spinner'
import { generateId, Appointment, Patient, Doctor } from '@/lib/data-store'

interface AppointmentFormProps {
  onSuccess: () => void
  onAddAppointment: (appointment: Appointment) => void
  patients: Patient[]
  doctors: Doctor[]
}

export function AppointmentForm({ onSuccess, onAddAppointment, patients, doctors }: AppointmentFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    patientId: patients.length > 0 ? patients[0].id : '',
    doctorId: doctors.length > 0 ? doctors[0].id : '',
    date: '',
    time: '10:00',
    reason: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 500))

    const newAppointment: Appointment = {
      id: generateId('APT'),
      patientId: formData.patientId,
      doctorId: formData.doctorId,
      date: formData.date,
      time: formData.time,
      reason: formData.reason,
      status: 'scheduled'
    }

    onAddAppointment(newAppointment)
    setIsLoading(false)
    onSuccess()
    setFormData({
      patientId: patients.length > 0 ? patients[0].id : '',
      doctorId: doctors.length > 0 ? doctors[0].id : '',
      date: '',
      time: '10:00',
      reason: ''
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FieldGroup>
        <FieldLabel>Paciente</FieldLabel>
        <select
          name="patientId"
          value={formData.patientId}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-border rounded-lg bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {patients.map(patient => (
            <option key={patient.id} value={patient.id}>
              {patient.name}
            </option>
          ))}
        </select>
      </FieldGroup>

      <FieldGroup>
        <FieldLabel>Doctor</FieldLabel>
        <select
          name="doctorId"
          value={formData.doctorId}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-border rounded-lg bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {doctors.map(doctor => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name} - {doctor.specialty}
            </option>
          ))}
        </select>
      </FieldGroup>

      <FieldGroup>
        <FieldLabel>Fecha</FieldLabel>
        <Input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </FieldGroup>

      <FieldGroup>
        <FieldLabel>Hora</FieldLabel>
        <Input
          name="time"
          type="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
      </FieldGroup>

      <FieldGroup>
        <FieldLabel>Razón de la visita</FieldLabel>
        <textarea
          name="reason"
          placeholder="e.g., Chequeo regular"
          value={formData.reason}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-border rounded-lg bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
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
          {isLoading ? 'Agregando...' : 'Agregar Cita'}
        </Button>
      </div>
    </form>
  )
}

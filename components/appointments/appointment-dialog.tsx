'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { AppointmentForm } from './appointment-form'
import { Appointment, Patient, Doctor } from '@/lib/data-store'

interface AppointmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddAppointment: (appointment: Appointment) => void
  patients: Patient[]
  doctors: Doctor[]
}

export function AppointmentDialog({ open, onOpenChange, onAddAppointment, patients, doctors }: AppointmentDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Programar Cita</DialogTitle>
        </DialogHeader>
        <AppointmentForm
          onSuccess={() => onOpenChange(false)}
          onAddAppointment={onAddAppointment}
          patients={patients}
          doctors={doctors}
        />
      </DialogContent>
    </Dialog>
  )
}

'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { AppointmentForm } from './appointment-form'

interface AppointmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AppointmentDialog({ open, onOpenChange }: AppointmentDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Programar Cita</DialogTitle>
        </DialogHeader>
        <AppointmentForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  )
}

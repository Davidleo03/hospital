'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { DoctorForm } from './doctor-form'

interface DoctorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DoctorDialog({ open, onOpenChange }: DoctorDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Médico</DialogTitle>
        </DialogHeader>
        <DoctorForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  )
}

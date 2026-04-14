'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { PatientForm } from './patient-form'

interface PatientDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PatientDialog({ open, onOpenChange }: PatientDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Paciente</DialogTitle>
        </DialogHeader>
        <PatientForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  )
}

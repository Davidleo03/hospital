'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { PatientForm } from './patient-form'
import { Patient } from '@/lib/data-store'

interface PatientDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddPatient: (patient: Patient) => void
  onUpdatePatient?: (patient: Patient) => void
  initialPatient?: Patient | null
}

export function PatientDialog({
  open,
  onOpenChange,
  onAddPatient,
  onUpdatePatient,
  initialPatient = null,
}: PatientDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialPatient ? 'Editar Paciente' : 'Agregar Nuevo Paciente'}
          </DialogTitle>
        </DialogHeader>
        <PatientForm
          onSuccess={() => onOpenChange(false)}
          onAddPatient={onAddPatient}
          onUpdatePatient={onUpdatePatient}
          initialPatient={initialPatient}
        />
      </DialogContent>
    </Dialog>
  )
}

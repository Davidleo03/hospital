'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { DoctorForm } from './doctor-form'
import { Doctor } from '@/lib/data-store'

interface DoctorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddDoctor: (doctor: Doctor) => void
}

export function DoctorDialog({ open, onOpenChange, onAddDoctor }: DoctorDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Médico</DialogTitle>
        </DialogHeader>
        <DoctorForm
          onSuccess={() => onOpenChange(false)}
          onAddDoctor={onAddDoctor}
        />
      </DialogContent>
    </Dialog>
  )
}

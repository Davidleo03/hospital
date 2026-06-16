'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { InventoryForm } from './inventory-form'
import { Medication } from '@/lib/data-store'

interface InventoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddMedication: (medication: Medication) => void
}

export function InventoryDialog({ open, onOpenChange, onAddMedication }: InventoryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar Medicamento</DialogTitle>
        </DialogHeader>
        <InventoryForm
          onSuccess={() => onOpenChange(false)}
          onAddMedication={onAddMedication}
        />
      </DialogContent>
    </Dialog>
  )
}

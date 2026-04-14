'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { InventoryForm } from './inventory-form'

interface InventoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function InventoryDialog({ open, onOpenChange }: InventoryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar Medicamento</DialogTitle>
        </DialogHeader>
        <InventoryForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  )
}

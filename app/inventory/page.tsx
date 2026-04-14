'use client'

import { useState, useMemo } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Search, MoreVertical, Edit, Trash2, AlertTriangle, Plus } from 'lucide-react'
import { mockMedications, Medication } from '@/lib/mock-data'
import { InventoryDialog } from '@/components/inventory/inventory-dialog'

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [medications, setMedications] = useState<Medication[]>(mockMedications)

  const filteredMedications = useMemo(() => {
    return medications.filter((med) => {
      return (
        med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.dosage.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.supplier.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
  }, [searchTerm, medications])

  const handleDeleteMedication = (id: string) => {
    setMedications(medications.filter(m => m.id !== id))
  }

  const isLowStock = (medication: Medication) => {
    return medication.quantity < medication.alertLevel
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Inventario de Medicamentos</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Gestiona el stock y suministros de medicamentos
          </p>
        </div>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Agregar Medicamento
        </Button>
      </div>

      {/* Inventory Table */}
      <Card className="bg-white border-border">
        <div className="p-4 sm:p-6 border-b border-border">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, dosis o proveedor..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead className="font-semibold">Nombre del Medicamento</TableHead>
                <TableHead className="font-semibold">Dosis</TableHead>
                <TableHead className="font-semibold">Cantidad</TableHead>
                <TableHead className="font-semibold">Fecha de Vencimiento</TableHead>
                <TableHead className="font-semibold">Proveedor</TableHead>
                <TableHead className="font-semibold">Estado</TableHead>
                <TableHead className="text-right font-semibold">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMedications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <p className="text-muted-foreground">No se encontraron medicamentos</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredMedications.map((med) => (
                  <TableRow key={med.id} className="border-b border-border hover:bg-muted/30">
                    <TableCell className="font-medium">{med.name}</TableCell>
                    <TableCell className="text-sm">{med.dosage}</TableCell>
                    <TableCell className="text-sm font-medium">
                      {med.quantity} unidades
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(med.expiryDate).toLocaleDateString('es-ES')}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {med.supplier}
                    </TableCell>
                    <TableCell>
                      {isLowStock(med) ? (
                        <Badge variant="destructive" className="gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          Stock Bajo
                        </Badge>
                      ) : (
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          En Stock
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2 cursor-pointer">
                            <Edit className="w-4 h-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="gap-2 cursor-pointer text-red-600"
                            onClick={() => handleDeleteMedication(med.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border text-sm text-muted-foreground">
          Mostrando {filteredMedications.length} de {medications.length} medicamentos
        </div>
      </Card>

      {/* Inventory Dialog */}
      <InventoryDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  )
}

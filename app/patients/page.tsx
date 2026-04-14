'use client'

import { PatientsTable } from '@/components/patients/patients-table'
import { PatientDialog } from '@/components/patients/patient-dialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useState } from 'react'

export default function PatientsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Pacientes</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Gestiona la información de pacientes y registros médicos
          </p>
        </div>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Agregar Paciente
        </Button>
      </div>

      {/* Patients Table */}
      <PatientsTable />

      {/* Patient Dialog */}
      <PatientDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  )
}

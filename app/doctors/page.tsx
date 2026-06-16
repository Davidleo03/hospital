'use client'

import { useState } from 'react'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { DoctorsTable } from '@/components/doctors/doctors-table'
import { DoctorDialog } from '@/components/doctors/doctor-dialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { STORAGE_KEYS, initialDoctors, Doctor } from '@/lib/data-store'

export default function DoctorsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [doctors, setDoctors] = useLocalStorage<Doctor[]>(STORAGE_KEYS.doctors, initialDoctors)

  const handleAddDoctor = (doctor: Doctor) => {
    setDoctors(prev => [...prev, doctor])
  }

  const handleDeleteDoctor = (id: string) => {
    setDoctors(prev => prev.filter(doctor => doctor.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Médicos</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Gestiona el personal médico y horarios de doctores
          </p>
        </div>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Agregar Médico
        </Button>
      </div>

      {/* Doctors Table */}
      <DoctorsTable doctors={doctors} onDeleteDoctor={handleDeleteDoctor} />

      {/* Doctor Dialog */}
      <DoctorDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAddDoctor={handleAddDoctor}
      />
    </div>
  )
}

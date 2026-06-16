'use client'

import { useState } from 'react'
import { useData } from '@/hooks/use-data'
import { AppointmentCalendar } from '@/components/appointments/appointment-calendar'
import { AppointmentsList } from '@/components/appointments/appointments-list'
import { AppointmentDialog } from '@/components/appointments/appointment-dialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default function AppointmentsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { appointments, patients, doctors, addAppointment } = useData()

  const handleAddAppointment = (appointment: any) => {
    addAppointment(appointment)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Citas</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Gestiona y programa citas de pacientes
          </p>
        </div>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Programar Cita
        </Button>
      </div>

      {/* Calendar and List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2">
          <AppointmentCalendar appointments={appointments} />
        </div>
        <AppointmentsList appointments={appointments} patients={patients} doctors={doctors} />
      </div>

      {/* Appointment Dialog */}
      <AppointmentDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        patients={patients}
        doctors={doctors}
        onAddAppointment={handleAddAppointment}
      />
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Appointment } from '@/lib/data-store'

interface AppointmentCalendarProps {
  appointments: Appointment[]
}

export function AppointmentCalendar({ appointments }: AppointmentCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const appointmentsOnDate = selectedDate
    ? appointments.filter(
        apt =>
          new Date(apt.date).toDateString() ===
          selectedDate.toDateString()
      )
    : []

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled':
        return 'Programada'
      case 'completed':
        return 'Completada'
      case 'cancelled':
        return 'Cancelada'
      default:
        return status
    }
  }

  return (
    <Card className="p-6 bg-white border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Calendario de Citas
      </h3>
      
      <div className="space-y-6">
        {/* Calendar */}
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-lg border border-border"
          />
        </div>

        {/* Appointments for selected date */}
        <div className="border-t border-border pt-4">
          <h4 className="font-medium text-foreground mb-3">
            {selectedDate
              ? `Citas para ${selectedDate.toLocaleDateString('es-ES')}`
              : 'Selecciona una fecha'}
          </h4>
          
          {appointmentsOnDate.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No hay citas programadas para esta fecha
            </p>
          ) : (
            <div className="space-y-2">
              {appointmentsOnDate.map((apt) => (
                <div
                  key={apt.id}
                  className="p-3 rounded-lg bg-muted/30 border border-border/50"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="font-medium text-sm text-foreground">
                        {apt.time} - {apt.reason}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        ID Paciente: {apt.patientId}
                      </p>
                    </div>
                    <Badge variant="default" className={getStatusColor(apt.status)}>
                      {getStatusLabel(apt.status)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

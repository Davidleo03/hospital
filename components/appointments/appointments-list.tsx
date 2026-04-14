'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockAppointments, mockPatients, mockDoctors } from '@/lib/mock-data'

export function AppointmentsList() {
  const upcomingAppointments = mockAppointments
    .filter(apt => new Date(apt.date) >= new Date() && apt.status === 'scheduled')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 10)

  const getPatientName = (patientId: string) => {
    return mockPatients.find(p => p.id === patientId)?.name || 'Desconocido'
  }

  const getDoctorName = (doctorId: string) => {
    return mockDoctors.find(d => d.id === doctorId)?.name || 'Desconocido'
  }

  const getStatusColor = (status: string) => {
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

  const getStatusLabel = (status: string) => {
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
        Próximas Citas
      </h3>
      
      {upcomingAppointments.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No hay citas próximas programadas
        </p>
      ) : (
        <div className="space-y-3">
          {upcomingAppointments.map((apt) => (
            <div
              key={apt.id}
              className="p-4 rounded-lg bg-muted/30 border border-border/50 hover:border-border/100 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground truncate">
                    {getPatientName(apt.patientId)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(apt.date).toLocaleDateString('es-ES')} a las {apt.time}
                  </p>
                </div>
                <Badge variant="default" className={getStatusColor(apt.status)}>
                  {getStatusLabel(apt.status)}
                </Badge>
              </div>
              
              <div className="space-y-1 text-xs text-muted-foreground">
                <p>Dr. {getDoctorName(apt.doctorId).split(' ').pop()}</p>
                <p className="italic">{apt.reason}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}

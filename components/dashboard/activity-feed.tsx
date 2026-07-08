'use client'

import { useMemo } from 'react'
import { useData } from '@/hooks/use-data'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, AlertCircle, FileText, Calendar } from 'lucide-react'

interface Activity {
  id: string
  type: 'appointment' | 'consultation' | 'alert' | 'record'
  title: string
  description: string
  timestamp: string
  icon: React.ReactNode
}

export function ActivityFeed() {
  const { appointments, consultations, medications, patients, doctors } = useData()

  const activities = useMemo<Activity[]>(() => {
    const items: Activity[] = []

    appointments.slice(0, 3).forEach((appointment) => {
      const patient = patients.find((item) => item.id === appointment.patientId)
      const doctor = doctors.find((item) => item.id === appointment.doctorId)
      const isCancelled = appointment.status === 'cancelled'

      items.push({
        id: `appointment-${appointment.id}`,
        type: 'appointment',
        title: isCancelled ? 'Cita cancelada' : 'Nueva cita programada',
        description: `${patient?.name ?? 'Paciente'} con ${doctor?.name ?? 'médico'} el ${new Date(appointment.date).toLocaleDateString('es-ES')} a las ${appointment.time}`,
        timestamp: appointment.status === 'completed' ? 'Completada' : 'Registrada en el sistema',
        icon: <Calendar className="w-4 h-4" />
      })
    })

    consultations.slice(0, 2).forEach((consultation) => {
      const patient = patients.find((item) => item.id === consultation.patientId)
      const doctor = doctors.find((item) => item.id === consultation.doctorId)

      items.push({
        id: `consultation-${consultation.id}`,
        type: 'consultation',
        title: 'Consulta registrada',
        description: `${patient?.name ?? 'Paciente'} atendido por ${doctor?.name ?? 'médico'}: ${consultation.diagnosis}`,
        timestamp: new Date(consultation.date).toLocaleDateString('es-ES'),
        icon: <CheckCircle2 className="w-4 h-4" />
      })
    })

    medications
      .filter((medication) => medication.quantity < medication.alertLevel)
      .slice(0, 1)
      .forEach((medication) => {
        items.push({
          id: `alert-${medication.id}`,
          type: 'alert',
          title: 'Alerta de bajo stock',
          description: `${medication.name} ${medication.dosage} está por debajo del umbral (${medication.quantity} unidades)`,
          timestamp: 'Requiere reposición',
          icon: <AlertCircle className="w-4 h-4" />
        })
      })

    if (consultations.length > 0) {
      const latestConsultation = consultations[consultations.length - 1]
      const patient = patients.find((item) => item.id === latestConsultation.patientId)

      items.push({
        id: `record-${latestConsultation.id}`,
        type: 'record',
        title: 'Registro médico actualizado',
        description: `${patient?.name ?? 'Paciente'} - ${latestConsultation.notes || 'Nuevo diagnóstico registrado'}`,
        timestamp: new Date(latestConsultation.date).toLocaleDateString('es-ES'),
        icon: <FileText className="w-4 h-4" />
      })
    }

    return items.slice(0, 5)
  }, [appointments, consultations, doctors, medications, patients])

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'appointment':
        return 'bg-blue-50'
      case 'consultation':
        return 'bg-green-50'
      case 'alert':
        return 'bg-red-50'
      case 'record':
        return 'bg-purple-50'
      default:
        return 'bg-gray-50'
    }
  }

  const getBadgeVariant = (type: Activity['type']) => {
    switch (type) {
      case 'appointment':
        return 'default'
      case 'consultation':
        return 'default'
      case 'alert':
        return 'destructive'
      case 'record':
        return 'secondary'
      default:
        return 'default'
    }
  }

  return (
    <Card className="p-6 bg-white border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Actividad Reciente
      </h3>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className={`p-4 rounded-lg ${getActivityColor(
              activity.type
            )} border border-border/50 transition-colors hover:border-border/100`}
          >
            <div className="flex items-start gap-3">
              <div className="text-primary mt-0.5">{activity.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm text-foreground">
                    {activity.title}
                  </p>
                  <Badge variant={getBadgeVariant(activity.type)} className="text-xs">
                    {activity.type}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {activity.description}
                </p>
                <p className="text-xs text-muted-foreground/60 mt-2">
                  {activity.timestamp}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

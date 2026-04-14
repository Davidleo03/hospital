'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, AlertCircle, FileText, Calendar, Plus } from 'lucide-react'

interface Activity {
  id: string
  type: 'appointment' | 'consultation' | 'alert' | 'record'
  title: string
  description: string
  timestamp: string
  icon: React.ReactNode
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'appointment',
    title: 'Nueva Cita Programada',
    description: 'Dr. Ruiz tiene una consulta con Juan García a las 10:30 AM',
    timestamp: 'Hace 30 minutos',
    icon: <Calendar className="w-4 h-4" />
  },
  {
    id: '2',
    type: 'consultation',
    title: 'Consulta Completada',
    description: 'Elena García completó consulta con María Rodríguez',
    timestamp: 'Hace 2 horas',
    icon: <CheckCircle2 className="w-4 h-4" />
  },
  {
    id: '3',
    type: 'alert',
    title: 'Alerta de Bajo Stock',
    description: 'Stock de Ibuprofeno 400mg por debajo del nivel de alerta (25 unidades)',
    timestamp: 'Hace 4 horas',
    icon: <AlertCircle className="w-4 h-4" />
  },
  {
    id: '4',
    type: 'record',
    title: 'Registro Médico Actualizado',
    description: 'Paciente P005 - Nuevo diagnóstico registrado en el sistema',
    timestamp: 'Hace 1 día',
    icon: <FileText className="w-4 h-4" />
  },
  {
    id: '5',
    type: 'appointment',
    title: 'Cita Cancelada',
    description: 'Paciente P010 canceló cita con la Dra. López',
    timestamp: 'Hace 2 días',
    icon: <Calendar className="w-4 h-4" />
  }
]

export function ActivityFeed() {
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

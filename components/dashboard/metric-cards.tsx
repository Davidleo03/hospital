'use client'

import { useMemo } from 'react'
import { useData } from '@/hooks/use-data'
import { Card } from '@/components/ui/card'
import { Users, Activity, DollarSign, Calendar } from 'lucide-react'

interface MetricCardProps {
  label: string
  value: string | number
  change: string
  icon: React.ReactNode
  trend: 'up' | 'down'
}

function MetricCard({ label, value, change, icon, trend }: MetricCardProps) {
  return (
    <Card className="p-4 sm:p-6 bg-white border-border">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl sm:text-3xl font-bold text-foreground mt-2">{value}</p>
          <p
            className={`text-xs mt-2 ${
              trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {trend === 'up' ? '↑' : '↓'} {change}
          </p>
        </div>
        <div className="p-3 bg-accent/10 rounded-lg text-accent">
          {icon}
        </div>
      </div>
    </Card>
  )
}

export function MetricCards() {
  const { patients, appointments, consultations, medications } = useData()

  const metrics = useMemo(() => {
    const scheduledAppointments = appointments.filter((appointment) => appointment.status === 'scheduled').length
    const completedAppointments = appointments.filter((appointment) => appointment.status === 'completed').length
    const activePatients = patients.filter((patient) => patient.status === 'active').length
    const lowStockMedications = medications.filter((medication) => medication.quantity < medication.alertLevel).length
    const monthlyRevenue = completedAppointments * 180

    return [
      {
        label: 'Total de Pacientes',
        value: patients.length,
        change: `${activePatients} activos`,
        icon: <Users className="w-6 h-6" />,
        trend: 'up' as const
      },
      {
        label: 'Consultas Activas',
        value: consultations.length,
        change: `${scheduledAppointments} citas pendientes`,
        icon: <Activity className="w-6 h-6" />,
        trend: 'up' as const
      },
      {
        label: 'Ingresos Mensuales',
        value: `$${monthlyRevenue.toLocaleString('es-ES')}`,
        change: `${completedAppointments} completadas`,
        icon: <DollarSign className="w-6 h-6" />,
        trend: 'up' as const
      },
      {
        label: 'Citas Programadas',
        value: scheduledAppointments,
        change: `${lowStockMedications} meds. en alerta`,
        icon: <Calendar className="w-6 h-6" />,
        trend: 'up' as const
      }
    ]
  }, [appointments, consultations.length, medications, patients])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <MetricCard
          key={metric.label}
          label={metric.label}
          value={metric.value}
          change={metric.change}
          icon={metric.icon}
          trend={metric.trend}
        />
      ))}
    </div>
  )
}

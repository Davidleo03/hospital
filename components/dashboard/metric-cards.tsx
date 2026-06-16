'use client'

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
        <div className="p-3 bg-primary/10 rounded-lg text-primary">
          {icon}
        </div>
      </div>
    </Card>
  )
}

export function MetricCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        label="Total de Pacientes"
        value={154}
        change="12% desde el mes pasado"
        icon={<Users className="w-6 h-6" />}
        trend="up"
      />
      <MetricCard
        label="Consultas Activas"
        value={23}
        change="5% desde la semana pasada"
        icon={<Activity className="w-6 h-6" />}
        trend="up"
      />
      <MetricCard
        label="Ingresos Mensuales"
        value="$5000"
        change="8% desde el mes pasado"
        icon={<DollarSign className="w-6 h-6" />}
        trend="up"
      />
      <MetricCard
        label="Citas Programadas"
        value={47}
        change="3% desde la semana pasada"
        icon={<Calendar className="w-6 h-6" />}
        trend="down"
      />
    </div>
  )
}

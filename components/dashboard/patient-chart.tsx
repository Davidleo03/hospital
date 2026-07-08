'use client'

import { useMemo } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts'
import { Card } from '@/components/ui/card'
import { useData } from '@/hooks/use-data'

interface PatientChartPoint {
  month: string
  patients: number
  returned: number
}

interface RevenueChartPoint {
  month: string
  revenue: number
}

export function PatientChart() {
  const { appointments } = useData()

  const patientData = useMemo<PatientChartPoint[]>(() => {
    const grouped = appointments.reduce<Record<string, PatientChartPoint>>((acc, appointment) => {
      const date = new Date(appointment.date)
      if (Number.isNaN(date.getTime())) {
        return acc
      }

      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      const monthLabel = date.toLocaleDateString('es-ES', { month: 'short' }).replace(/\./g, '')

      if (!acc[monthKey]) {
        acc[monthKey] = { month: monthLabel, patients: 0, returned: 0 }
      }

      acc[monthKey].patients += 1
      if (appointment.status === 'completed') {
        acc[monthKey].returned += 1
      }

      return acc
    }, {})

    return Object.values(grouped).slice(-6)
  }, [appointments])

  return (
    <Card className="p-6 bg-white border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Crecimiento de Pacientes
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={patientData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E1EBED" />
          <XAxis dataKey="month" stroke="#5C6E7A" />
          <YAxis stroke="#5C6E7A" />
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #DCE8EA' }}
          />
          <Bar dataKey="patients" fill="#0F3E6B" name="Citas" />
          <Bar dataKey="returned" fill="#B2D9DE" name="Completadas" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

export function RevenueChart() {
  const { appointments } = useData()

  const revenueData = useMemo<RevenueChartPoint[]>(() => {
    const grouped = appointments.reduce<Record<string, RevenueChartPoint>>((acc, appointment) => {
      const date = new Date(appointment.date)
      if (Number.isNaN(date.getTime())) {
        return acc
      }

      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      const monthLabel = date.toLocaleDateString('es-ES', { month: 'short' }).replace(/\./g, '')

      if (!acc[monthKey]) {
        acc[monthKey] = { month: monthLabel, revenue: 0 }
      }

      acc[monthKey].revenue += appointment.status === 'completed' ? 180 : 120

      return acc
    }, {})

    return Object.values(grouped).slice(-6)
  }, [appointments])

  return (
    <Card className="p-6 bg-white border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Ingresos Mensuales
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={revenueData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E1EBED" />
          <XAxis dataKey="month" stroke="#5C6E7A" />
          <YAxis stroke="#5C6E7A" />
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #DCE8EA' }}
            formatter={(value) => `$${Number(value).toLocaleString('es-ES')}`}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#279386"
            strokeWidth={2}
            dot={{ fill: '#279386', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}

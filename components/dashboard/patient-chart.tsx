'use client'

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

const patientData = [
  { month: 'Ene', patients: 65, returned: 28 },
  { month: 'Feb', patients: 78, returned: 35 },
  { month: 'Mar', patients: 92, returned: 42 },
  { month: 'Abr', patients: 110, returned: 48 },
  { month: 'May', patients: 130, returned: 55 },
  { month: 'Jun', patients: 154, returned: 62 }
]

const revenueData = [
  { month: 'Ene', revenue: 32000 },
  { month: 'Feb', revenue: 38000 },
  { month: 'Mar', revenue: 42000 },
  { month: 'Abr', revenue: 41000 },
  { month: 'May', revenue: 46000 },
  { month: 'Jun', revenue: 45230 }
]

export function PatientChart() {
  return (
    <Card className="p-6 bg-white border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Crecimiento de Pacientes
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={patientData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" stroke="#666" />
          <YAxis stroke="#666" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0' }}
          />
          <Bar dataKey="patients" fill="#0052CC" name="Pacientes Nuevos" />
          <Bar dataKey="returned" fill="#e0e0e0" name="Retornando" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

export function RevenueChart() {
  return (
    <Card className="p-6 bg-white border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Ingresos Mensuales
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={revenueData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" stroke="#666" />
          <YAxis stroke="#666" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0' }}
            formatter={(value) => `$${value.toLocaleString()}`}
          />
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="#0052CC" 
            strokeWidth={2}
            dot={{ fill: '#0052CC', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}

'use client'

import { MetricCards } from './metric-cards'
import { PatientChart, RevenueChart } from './patient-chart'
import { ActivityFeed } from './activity-feed'

export function DashboardContent() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Panel de Control</h1>
        <p className="text-muted-foreground mt-1">
          Bienvenido a tu sistema de gestión clínica
        </p>
      </div>

      {/* Metric Cards */}
      <MetricCards />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PatientChart />
        <RevenueChart />
      </div>

      {/* Activity Feed */}
      <ActivityFeed />
    </div>
  )
}

'use client'

import { useData } from '@/hooks/use-data'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function ConsultationsPage() {
  const { consultations, patients, doctors } = useData()

  const getPatientName = (patientId: string) => {
    return patients.find(p => p.id === patientId)?.name || 'Desconocido'
  }

  const getDoctorName = (doctorId: string) => {
    return doctors.find(d => d.id === doctorId)?.name || 'Desconocido'
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Consultas</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Ve y gestiona las consultas de los pacientes
        </p>
      </div>

      {/* Consultations List */}
      <div className="grid gap-4 sm:gap-6">
        {consultations.length === 0 ? (
          <Card className="p-8 bg-white border-border text-center">
            <p className="text-muted-foreground">No se encontraron consultas</p>
          </Card>
        ) : (
          consultations.map((consultation) => (
            <Card key={consultation.id} className="p-6 bg-white border-border">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {getPatientName(consultation.patientId)}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    ID Consulta: {consultation.id}
                  </p>
                </div>
                <Badge variant="default" className="bg-primary text-primary-foreground">
                  Completada
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground">Médico</p>
                  <p className="font-medium">{getDoctorName(consultation.doctorId)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Fecha</p>
                  <p className="font-medium">
                    {new Date(consultation.date).toLocaleDateString('es-ES')}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Diagnóstico</p>
                  <p className="text-sm text-foreground">{consultation.diagnosis}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Notas</p>
                  <p className="text-sm text-foreground">{consultation.notes}</p>
                </div>
                {consultation.followUpDate && (
                  <div>
                    <p className="text-xs text-muted-foreground">Fecha de Seguimiento</p>
                    <p className="text-sm text-foreground">
                      {new Date(consultation.followUpDate).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                )}
                {consultation.prescriptions.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground">Prescripciones</p>
                    <div className="space-y-1 mt-1">
                      {consultation.prescriptions.map((rx) => (
                        <p key={rx.id} className="text-sm text-foreground">
                          • {rx.medication.name} {rx.medication.dosage}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

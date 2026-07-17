'use client'

import { useMemo } from 'react'
import { BookOpen, CalendarCheck, Stethoscope } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { useData } from '@/hooks/use-data'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function MedicalRecordsPage() {
  const { currentUser } = useAuth()
  const { patients, doctors, consultations } = useData()

  const patientsWithRecords = useMemo(() => {
    const patientMap = new Map<string, typeof consultations>()

    consultations.forEach((consultation) => {
      const records = patientMap.get(consultation.patientId) ?? []
      patientMap.set(consultation.patientId, [...records, consultation])
    })

    return patients
      .map((patient) => ({
        patient,
        consultations: patientMap.get(patient.id) ?? []
      }))
      .filter((item) => item.consultations.length > 0)
      .sort((a, b) => a.patient.name.localeCompare(b.patient.name))
  }, [patients, consultations])

  const getDoctorName = (doctorId: string) => {
    return doctors.find((doctor) => doctor.id === doctorId)?.name || 'Desconocido'
  }

  const getAge = (dateOfBirth: string) => {
    const birthDate = new Date(dateOfBirth)
    const now = new Date()
    let age = now.getFullYear() - birthDate.getFullYear()
    const monthDiff = now.getMonth() - birthDate.getMonth()
    const dayDiff = now.getDate() - birthDate.getDate()

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age -= 1
    }

    return age
  }

 const downloadMedicalRecord = async (patient: typeof patients[number], patientConsultations: typeof consultations) => {
  if (typeof window === 'undefined') {
    return
  }

  const { jsPDF } = await import('jspdf/dist/jspdf.es.min.js')
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  
  // Configuración de márgenes y estilos
  const margin = 40
  const pageWidth = doc.internal.pageSize.width
  const pageHeight = doc.internal.pageSize.height
  let y = 60
  const lineHeight = 18
  const maxY = pageHeight - margin - 40 // Margen inferior

  // Colores corporativos
  const primaryColor = [41, 128, 185] // Azul profesional
  const secondaryColor = [52, 73, 94] // Gris oscuro
  const accentColor = [231, 76, 60] // Rojo para énfasis

  const loadImage = (src: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image()
      img.src = src
      img.onload = () => resolve(img)
      img.onerror = reject
    })

  const logoImage = await loadImage('/medicarmen-logo.jpeg')
  const logoWidth = 70
  const logoHeight = (logoImage.height / logoImage.width) * logoWidth
  const headerHeight = logoHeight + 40

  // Función para verificar y agregar página
  const checkPage = () => {
    if (y > maxY) {
      doc.addPage()
      y = margin
      drawHeader()
      y = margin + headerHeight
    }
  }

  // Función para dibujar encabezado en cada página
  const drawHeader = () => {
    // Línea decorativa superior
    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2])
    doc.setLineWidth(3)
    doc.line(margin, y - 5, pageWidth - margin, y - 5)

    // Logo
    doc.addImage(logoImage, 'JPEG', margin, y - 8, logoWidth, logoHeight)

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(16)
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
    doc.text('HISTORIA CLÍNICA', pageWidth / 2, y + logoHeight / 2 + 4, { align: 'center' })
    
    // Línea decorativa inferior del encabezado
    doc.setLineWidth(0.5)
    doc.line(margin, y + logoHeight + 12, pageWidth - margin, y + logoHeight + 12)
    doc.setTextColor(0, 0, 0)
  }

  // Función para dibujar pie de página
  const drawFooter = (pageNumber: number) => {
    doc.setFontSize(8)
    doc.setTextColor(128, 128, 128)
    doc.text(`Página ${pageNumber} de ${doc.getNumberOfPages()}`, pageWidth / 2, pageHeight - margin + 20, {
      align: 'center'
    })
    doc.text(
      `Generado: ${new Date().toLocaleString('es-ES')}`,
      pageWidth - margin,
      pageHeight - margin + 20,
      { align: 'right' }
    )
  }

  // --- ENCABEZADO INICIAL ---
  drawHeader()
  y = margin + headerHeight + 15

  // --- SECCIÓN: DATOS DEL PACIENTE ---
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2])
  doc.text('DATOS DEL PACIENTE', margin, y)
  y += 15

  // Línea decorativa debajo del título
  doc.setDrawColor(200, 200, 200)
  doc.setLineWidth(0.5)
  doc.line(margin, y, pageWidth - margin, y)
  y += 15

  // Datos del paciente en formato tabla
  doc.setFontSize(11)
  doc.setTextColor(0, 0, 0)
  const age = getAge(patient.dateOfBirth)
  const patientFields = [
    ['Nombre completo', patient.name],
    ['DNI / Identificación', patient.dni],
    ['Edad', `${age} años`],
    ['Fecha de nacimiento', new Date(patient.dateOfBirth).toLocaleDateString('es-ES')],
    ['Correo electrónico', patient.email],
    ['Teléfono', patient.phone],
    ['Dirección', patient.address],
    ['Especialidad médica', patient.specialty],
    ['Antecedentes médicos', patient.medicalHistory.length > 0 ? patient.medicalHistory.join(', ') : 'No registrados']
  ]

  // Ancho de columna para etiquetas
  const labelWidth = 150
  const valueStartX = margin + labelWidth + 15

  patientFields.forEach(([label, value]) => {
    checkPage()
    
    // Etiqueta
    doc.setFont('helvetica', 'bold')
    doc.text(`${label}:`, margin, y)
    
    // Valor
    doc.setFont('helvetica', 'normal')
    const valueLines = doc.splitTextToSize(String(value), pageWidth - margin * 2 - labelWidth - 20)
    doc.text(valueLines, valueStartX, y)
    
    // Calcular altura de las líneas
    const lineCount = Array.isArray(valueLines) ? valueLines.length : 1
    y += Math.max(lineHeight, lineCount * 15)
  })

  y += 15

  // --- SECCIÓN: CONSULTAS REGISTRADAS ---
  checkPage()
  
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2])
  doc.text('CONSULTAS REGISTRADAS', margin, y)
  y += 15

  doc.setDrawColor(200, 200, 200)
  doc.setLineWidth(0.5)
  doc.line(margin, y, pageWidth - margin, y)
  y += 15

  // Ordenar consultas por fecha (más reciente primero)
  const sortedConsultations = [...patientConsultations]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  sortedConsultations.forEach((consultation, index) => {
    checkPage()
    
    // Título de la consulta con número y fecha
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
    const consultDate = new Date(consultation.date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
    doc.text(`Consulta #${consultation.id} - ${consultDate}`, margin, y)
    y += 15

    // Detalles de la consulta
    doc.setFontSize(10.5)
    doc.setTextColor(0, 0, 0)
    const consultationFields = [
      ['Médico responsable', getDoctorName(consultation.doctorId)],
      ['Diagnóstico', consultation.diagnosis || 'No especificado'],
      ['Notas', consultation.notes || 'Sin notas adicionales'],
      ['Próximo seguimiento', consultation.followUpDate ? 
        new Date(consultation.followUpDate).toLocaleDateString('es-ES') : 'No programado']
    ]

    consultationFields.forEach(([label, value]) => {
      checkPage()
      
      // Etiqueta con indentación
      doc.setFont('helvetica', 'bold')
      doc.text(`${label}:`, margin + 15, y)
      
      // Valor
      doc.setFont('helvetica', 'normal')
      const valueLines = doc.splitTextToSize(String(value), pageWidth - margin * 2 - 140)
      doc.text(valueLines, margin + 150, y)
      
      const lineCount = Array.isArray(valueLines) ? valueLines.length : 1
      y += Math.max(lineHeight, lineCount * 13)
    })

    // --- PRESCRIPCIONES ---
    if (consultation.prescriptions.length > 0) {
      checkPage()
      
      // Título de prescripciones
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(11)
      doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2])
      doc.text('Prescripciones:', margin + 15, y)
      y += 12

      // Tabla de prescripciones
      consultation.prescriptions.forEach((prescription, pIndex) => {
        checkPage()
        
        // Número de prescripción
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(10)
        doc.setTextColor(0, 0, 0)
        doc.text(`${pIndex + 1}.`, margin + 30, y)
        
        // Detalles del medicamento
        doc.setFont('helvetica', 'normal')
        const medicamento = `${prescription.medication.name} — ${prescription.dosage}`
        const instrucciones = `${prescription.frequency}, ${prescription.duration}. ${prescription.instructions}`
        
        // Calcular y dibujar el texto del medicamento
        const medText = doc.splitTextToSize(medicamento, pageWidth - margin * 2 - 60)
        doc.text(medText, margin + 45, y)
        y += medText.length * 13

        checkPage()
        
        // Instrucciones
        doc.setFont('helvetica', 'italic')
        doc.setFontSize(9)
        doc.setTextColor(80, 80, 80)
        const instText = doc.splitTextToSize(`▸ ${instrucciones}`, pageWidth - margin * 2 - 60)
        doc.text(instText, margin + 45, y)
        y += instText.length * 12 + 5
      })
      
      y += 5
    }

    // Separador entre consultas
    if (index < sortedConsultations.length - 1) {
      y += 10
      checkPage()
      doc.setDrawColor(220, 220, 220)
      doc.setLineWidth(0.3)
      doc.line(margin + 20, y, pageWidth - margin - 20, y)
      y += 15
    }
  })

  // --- PIE DE PÁGINA ---
  const totalPages = doc.getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    drawFooter(i)
  }

  // Guardar PDF
  const filename = `historia-clinica-${patient.name.replace(/\s+/g, '-').toLowerCase()}-${new Date().getTime()}.pdf`
  doc.save(filename)
}

  if (!currentUser) {
    return null
  }

  if (currentUser.role !== 'admin') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Historias Clínicas</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Acceso restringido. Solo los administradores pueden ver las historias clínicas.
          </p>
        </div>

        <Card className="p-6 bg-white border-border">
          <p className="text-base text-foreground font-medium">Acceso denegado</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Tu usuario no tiene permiso para acceder a esta sección.
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Historias Clínicas</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Genera historias médicas a partir de las consultas almacenadas en localStorage.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6 bg-white border-border">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Pacientes con registro</p>
              <p className="text-2xl font-semibold text-foreground">{patientsWithRecords.length}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Pacientes que tienen al menos una consulta registrada.
          </p>
        </Card>

        <Card className="p-6 bg-white border-border">
          <div className="flex items-center gap-3 mb-4">
            <CalendarCheck className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Consultas totales</p>
              <p className="text-2xl font-semibold text-foreground">{consultations.length}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Todas las consultas almacenadas en el historial médico.
          </p>
        </Card>

        <Card className="p-6 bg-white border-border">
          <div className="flex items-center gap-3 mb-4">
            <Stethoscope className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Médicos registrados</p>
              <p className="text-2xl font-semibold text-foreground">{doctors.length}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Médicos disponibles vinculados a las consultas.
          </p>
        </Card>
      </div>

      {patientsWithRecords.length === 0 ? (
        <Card className="p-8 bg-white border-border text-center">
          <p className="text-muted-foreground">No hay historias clínicas disponibles.</p>
        </Card>
      ) : (
        <div className="space-y-6">
          {patientsWithRecords.map(({ patient, consultations }) => (
            <Card key={patient.id} className="bg-white border-border">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border px-6 py-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Paciente</p>
                  <h2 className="text-xl font-semibold text-foreground">{patient.name}</h2>
                  <p className="text-sm text-muted-foreground mt-1">DNI: {patient.dni}</p>
                </div>
                <div className="flex flex-col sm:items-end gap-3">
                  <Badge className="bg-secondary text-secondary-foreground">{consultations.length} consultas</Badge>
                  <Button
                    onClick={() => downloadMedicalRecord(patient, consultations)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Descargar Historia Clínica
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 p-6">
                {consultations
                  .slice()
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((consultation) => (
                    <div key={consultation.id} className="space-y-3 rounded-2xl border border-border bg-slate-50 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                            Consulta {consultation.id}
                          </p>
                          <p className="font-semibold text-foreground mt-1">{new Date(consultation.date).toLocaleDateString('es-ES')}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Médico</p>
                          <p className="font-medium text-foreground">{getDoctorName(consultation.doctorId)}</p>
                        </div>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <p className="text-xs text-muted-foreground">Diagnóstico</p>
                          <p className="text-sm text-foreground">{consultation.diagnosis}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Notas</p>
                          <p className="text-sm text-foreground">{consultation.notes || 'Sin notas adicionales'}</p>
                        </div>
                      </div>

                      {consultation.prescriptions.length > 0 ? (
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Prescripciones</p>
                          <div className="mt-2 space-y-2">
                            {consultation.prescriptions.map((prescription) => (
                              <div key={prescription.id} className="rounded-xl bg-white p-3 border border-border">
                                <p className="text-sm font-semibold text-foreground">{prescription.medication.name}</p>
                                <p className="text-sm text-muted-foreground">{prescription.dosage} · {prescription.frequency} · {prescription.duration}</p>
                                <p className="text-sm text-muted-foreground mt-1">{prescription.instructions}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-xs text-muted-foreground">Prescripciones</p>
                          <p className="text-sm text-foreground">No hay prescripciones registradas.</p>
                        </div>
                      )}

                      {consultation.followUpDate && (
                        <div className="rounded-xl bg-slate-100 p-3 text-sm text-foreground">
                          <p className="font-medium">Seguimiento programado</p>
                          <p>{new Date(consultation.followUpDate).toLocaleDateString('es-ES')}</p>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

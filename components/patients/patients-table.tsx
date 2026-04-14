'use client'

import { useState, useMemo } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Search, MoreVertical, Edit, Trash2, Eye } from 'lucide-react'
import { mockPatients, Patient } from '@/lib/mock-data'

const specialties = ['Todas', 'Cardiología', 'Dermatología', 'Traumatología', 'Oftalmología', 'Neurología', 'Neumología', 'Endocrinología', 'Gastroenterología', 'Reumatología']

export function PatientsTable() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('Todas')
  const [patients, setPatients] = useState<Patient[]>(mockPatients)

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const matchesSearch =
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.dni.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesSpecialty = selectedSpecialty === 'Todas' || patient.specialty === selectedSpecialty
      return matchesSearch && matchesSpecialty
    })
  }, [searchTerm, selectedSpecialty, patients])

  const handleDeletePatient = (id: string) => {
    setPatients(patients.filter(p => p.id !== id))
  }

  return (
    <Card className="bg-white border-border">
      <div className="p-4 sm:p-6 border-b border-border space-y-4">
        {/* Search and Filters */}
        <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, Cédula o correo..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {specialties.map((specialty) => (
              <option key={specialty} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border hover:bg-transparent">
              <TableHead className="font-semibold text-xs sm:text-sm">Nombre</TableHead>
              <TableHead className="font-semibold text-xs sm:text-sm hidden md:table-cell">Cédula</TableHead>
              <TableHead className="font-semibold text-xs sm:text-sm hidden lg:table-cell">Correo</TableHead>
              <TableHead className="font-semibold text-xs sm:text-sm hidden xl:table-cell">Teléfono</TableHead>
              <TableHead className="font-semibold text-xs sm:text-sm">Especialidad</TableHead>
              <TableHead className="font-semibold text-xs sm:text-sm">Estado</TableHead>
              <TableHead className="text-right font-semibold text-xs sm:text-sm">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <p className="text-muted-foreground">No se encontraron pacientes</p>
                </TableCell>
              </TableRow>
            ) : (
              filteredPatients.map((patient) => (
                <TableRow key={patient.id} className="border-b border-border hover:bg-muted/30">
                  <TableCell className="font-medium text-xs sm:text-sm">{patient.name}</TableCell>
                  <TableCell className="text-xs sm:text-sm hidden md:table-cell">{patient.dni}</TableCell>
                  <TableCell className="text-xs sm:text-sm text-muted-foreground hidden lg:table-cell">
                    {patient.email}
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm hidden xl:table-cell">{patient.phone}</TableCell>
                  <TableCell className="text-xs sm:text-sm">{patient.specialty}</TableCell>
                  <TableCell>
                    <Badge
                      variant={patient.status === 'active' ? 'default' : 'secondary'}
                      className={
                        patient.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }
                    >
                      {patient.status === 'active' ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2 cursor-pointer">
                          <Eye className="w-4 h-4" />
                          Ver
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 cursor-pointer">
                          <Edit className="w-4 h-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="gap-2 cursor-pointer text-red-600"
                          onClick={() => handleDeletePatient(patient.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border text-sm text-muted-foreground">
        Mostrando {filteredPatients.length} de {patients.length} pacientes
      </div>
    </Card>
  )
}

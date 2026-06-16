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
import { Doctor } from '@/lib/data-store'

const specialties = ['Todas', 'Cardiología', 'Dermatología', 'Traumatología', 'Oftalmología', 'Neurología', 'Neumología']

interface DoctorsTableProps {
  doctors: Doctor[]
  onDeleteDoctor: (id: string) => void
}

export function DoctorsTable({ doctors, onDeleteDoctor }: DoctorsTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('Todas')

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesSearch =
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.license.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesSpecialty = selectedSpecialty === 'Todas' || doctor.specialty === selectedSpecialty
      return matchesSearch && matchesSpecialty
    })
  }, [searchTerm, selectedSpecialty, doctors])

  const getAvailabilityColor = (availability: Doctor['availability']) => {
    switch (availability) {
      case 'available':
        return 'bg-green-100 text-green-800'
      case 'busy':
        return 'bg-yellow-100 text-yellow-800'
      case 'off':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getAvailabilityLabel = (availability: Doctor['availability']) => {
    switch (availability) {
      case 'available':
        return 'Disponible'
      case 'busy':
        return 'Ocupado'
      case 'off':
        return 'Fuera'
      default:
        return availability
    }
  }

  return (
    <Card className="bg-white border-border">
      <div className="p-4 sm:p-6 border-b border-border space-y-4">
        {/* Search and Filters */}
        <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, licencia o correo..."
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
              <TableHead className="font-semibold text-xs sm:text-sm hidden md:table-cell">Licencia #</TableHead>
              <TableHead className="font-semibold text-xs sm:text-sm">Especialidad</TableHead>
              <TableHead className="font-semibold text-xs sm:text-sm hidden lg:table-cell">Correo</TableHead>
              <TableHead className="font-semibold text-xs sm:text-sm">Disponibilidad</TableHead>
              <TableHead className="font-semibold text-xs sm:text-sm">Estado</TableHead>
              <TableHead className="text-right font-semibold text-xs sm:text-sm">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDoctors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <p className="text-muted-foreground">No se encontraron médicos</p>
                </TableCell>
              </TableRow>
            ) : (
              filteredDoctors.map((doctor) => (
                <TableRow key={doctor.id} className="border-b border-border hover:bg-muted/30">
                  <TableCell className="font-medium text-xs sm:text-sm">{doctor.name}</TableCell>
                  <TableCell className="text-xs sm:text-sm hidden md:table-cell">{doctor.license}</TableCell>
                  <TableCell className="text-xs sm:text-sm">{doctor.specialty}</TableCell>
                  <TableCell className="text-xs sm:text-sm text-muted-foreground hidden lg:table-cell">
                    {doctor.email}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="default"
                      className={getAvailabilityColor(doctor.availability)}
                    >
                      {getAvailabilityLabel(doctor.availability)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={doctor.status === 'active' ? 'default' : 'secondary'}
                      className={
                        doctor.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }
                    >
                      {doctor.status === 'active' ? 'Activo' : 'Inactivo'}
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
                          onClick={() => onDeleteDoctor(doctor.id)}
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
        Mostrando {filteredDoctors.length} de {doctors.length} médicos
      </div>
    </Card>
  )
}

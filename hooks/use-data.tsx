'use client'

import * as React from 'react'
import { useEffect, useMemo, useCallback } from 'react'
import { useLocalStorage } from '@/hooks/use-local-storage'
import {
  STORAGE_KEYS,
  initialPatients,
  initialDoctors,
  initialMedications,
  initialAppointments,
  initialConsultations,
  Patient,
  Doctor,
  Medication,
  Appointment,
  Consultation
} from '@/lib/data-store'

type DataContextValue = {
  patients: Patient[]
  doctors: Doctor[]
  medications: Medication[]
  appointments: Appointment[]
  consultations: Consultation[]
  addPatient: (patient: Patient) => void
  updatePatient: (patient: Patient) => void
  deletePatient: (id: string) => void
  addDoctor: (doctor: Doctor) => void
  updateDoctor: (doctor: Doctor) => void
  deleteDoctor: (id: string) => void
  addMedication: (medication: Medication) => void
  deleteMedication: (id: string) => void
  addAppointment: (appointment: Appointment) => void
  addConsultation: (consultation: Consultation) => void
}

const DataContext = React.createContext<DataContextValue | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [patients, setPatients] = useLocalStorage<Patient[]>(STORAGE_KEYS.patients, initialPatients)
  const [doctors, setDoctors] = useLocalStorage<Doctor[]>(STORAGE_KEYS.doctors, initialDoctors)
  const [medications, setMedications] = useLocalStorage<Medication[]>(STORAGE_KEYS.medications, initialMedications)
  const [appointments, setAppointments] = useLocalStorage<Appointment[]>(STORAGE_KEYS.appointments, initialAppointments)
  const [consultations, setConsultations] = useLocalStorage<Consultation[]>(STORAGE_KEYS.consultations, initialConsultations)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const handleStorage = (event: StorageEvent) => {
      if (!event.key) {
        return
      }

      try {
        if (event.key === STORAGE_KEYS.patients && event.newValue) {
          setPatients(JSON.parse(event.newValue) as Patient[])
        }
        if (event.key === STORAGE_KEYS.doctors && event.newValue) {
          setDoctors(JSON.parse(event.newValue) as Doctor[])
        }
        if (event.key === STORAGE_KEYS.medications && event.newValue) {
          setMedications(JSON.parse(event.newValue) as Medication[])
        }
        if (event.key === STORAGE_KEYS.appointments && event.newValue) {
          setAppointments(JSON.parse(event.newValue) as Appointment[])
        }
        if (event.key === STORAGE_KEYS.consultations && event.newValue) {
          setConsultations(JSON.parse(event.newValue) as Consultation[])
        }
      } catch {
        // Ignore malformed storage events
      }
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [setPatients, setDoctors, setMedications, setAppointments, setConsultations])

  const addPatient = useCallback((patient: Patient) => {
    setPatients(prev => [...prev, patient])
  }, [setPatients])

  const updatePatient = useCallback((patient: Patient) => {
    setPatients(prev => prev.map((item) => (item.id === patient.id ? patient : item)))
  }, [setPatients])

  const deletePatient = useCallback((id: string) => {
    setPatients(prev => prev.filter((patient) => patient.id !== id))
  }, [setPatients])

  const addDoctor = useCallback((doctor: Doctor) => {
    setDoctors(prev => [...prev, doctor])
  }, [setDoctors])

  const updateDoctor = useCallback((doctor: Doctor) => {
    setDoctors(prev => prev.map((item) => (item.id === doctor.id ? doctor : item)))
  }, [setDoctors])

  const deleteDoctor = useCallback((id: string) => {
    setDoctors(prev => prev.filter((doctor) => doctor.id !== id))
  }, [setDoctors])

  const addMedication = useCallback((medication: Medication) => {
    setMedications(prev => [...prev, medication])
  }, [setMedications])

  const deleteMedication = useCallback((id: string) => {
    setMedications(prev => prev.filter((med) => med.id !== id))
  }, [setMedications])

  const addAppointment = useCallback((appointment: Appointment) => {
    setAppointments(prev => [...prev, appointment])
  }, [setAppointments])

  const addConsultation = useCallback((consultation: Consultation) => {
    setConsultations(prev => [...prev, consultation])
  }, [setConsultations])

  const value = useMemo(
    () => ({
      patients,
      doctors,
      medications,
      appointments,
      consultations,
      addPatient,
      updatePatient,
      deletePatient,
      addDoctor,
      updateDoctor,
      deleteDoctor,
      addMedication,
      deleteMedication,
      addAppointment,
      addConsultation,
    }),
    [patients, doctors, medications, appointments, consultations, addPatient, updatePatient, deletePatient, addDoctor, updateDoctor, deleteDoctor, addMedication, deleteMedication, addAppointment, addConsultation],
  )

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const context = React.useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within DataProvider')
  }
  return context
}

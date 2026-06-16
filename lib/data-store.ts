'use client'

import {
  mockPatients,
  mockDoctors,
  mockMedications,
  mockAppointments,
  mockConsultations,
  Patient,
  Doctor,
  Medication,
  Appointment,
  Consultation
} from './mock-data'

export type { Patient, Doctor, Medication, Appointment, Consultation }

export const STORAGE_KEYS = {
  patients: 'hospital_patients',
  doctors: 'hospital_doctors',
  medications: 'hospital_medications',
  appointments: 'hospital_appointments',
  consultations: 'hospital_consultations'
} as const

export const initialPatients: Patient[] = mockPatients
export const initialDoctors: Doctor[] = mockDoctors
export const initialMedications: Medication[] = mockMedications
export const initialAppointments: Appointment[] = mockAppointments
export const initialConsultations: Consultation[] = mockConsultations

export function generateId(prefix: string) {
  return `${prefix}${Math.random().toString(36).slice(2, 10).toUpperCase()}`
}

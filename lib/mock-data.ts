'use client'

export interface Patient {
  id: string
  name: string
  dni: string
  email: string
  phone: string
  specialty: string
  status: 'active' | 'inactive'
  dateOfBirth: string
  address: string
  medicalHistory: string[]
}

export interface Doctor {
  id: string
  name: string
  license: string
  specialty: string
  availability: 'available' | 'busy' | 'off'
  status: 'active' | 'inactive'
  email: string
  phone: string
}

export interface Appointment {
  id: string
  patientId: string
  doctorId: string
  date: string
  time: string
  reason: string
  status: 'scheduled' | 'completed' | 'cancelled'
  notes?: string
}

export interface Medication {
  id: string
  name: string
  dosage: string
  quantity: number
  expiryDate: string
  supplier: string
  alertLevel: number
}

export interface Prescription {
  id: string
  appointmentId: string
  medication: Medication
  dosage: string
  frequency: string
  duration: string
  instructions: string
}

export interface Consultation {
  id: string
  appointmentId: string
  patientId: string
  doctorId: string
  diagnosis: string
  notes: string
  prescriptions: Prescription[]
  followUpDate?: string
  date: string
}

// Mock Patients
export const mockPatients: Patient[] = [
  {
    id: 'P001',
    name: 'Juan García López',
    dni: '12345678A',
    email: 'juan.garcia@email.com',
    phone: '+34 912 34 56 78',
    specialty: 'Cardiología',
    status: 'active',
    dateOfBirth: '1975-03-15',
    address: 'Calle Mayor 123, Madrid',
    medicalHistory: ['Hipertensión', 'Diabetes tipo 2']
  },
  {
    id: 'P002',
    name: 'María Rodríguez Pérez',
    dni: '87654321B',
    email: 'maria.rodriguez@email.com',
    phone: '+34 934 56 78 90',
    specialty: 'Dermatología',
    status: 'active',
    dateOfBirth: '1982-07-22',
    address: 'Paseo de Gracia 456, Barcelona',
    medicalHistory: ['Alergias estacionales']
  },
  {
    id: 'P003',
    name: 'Carlos Martínez Díaz',
    dni: '11223344C',
    email: 'carlos.martinez@email.com',
    phone: '+34 956 12 34 56',
    specialty: 'Traumatología',
    status: 'active',
    dateOfBirth: '1988-11-08',
    address: 'Avenida de la Constitución 789, Sevilla',
    medicalHistory: ['Fractura previa tibia']
  },
  {
    id: 'P004',
    name: 'Ana Fernández López',
    dni: '55667788D',
    email: 'ana.fernandez@email.com',
    phone: '+34 917 89 01 23',
    specialty: 'Oftalmología',
    status: 'active',
    dateOfBirth: '1992-05-30',
    address: 'Calle de Alcalá 321, Madrid',
    medicalHistory: ['Miopía', 'Astigmatismo']
  },
  {
    id: 'P005',
    name: 'Roberto Sánchez Torres',
    dni: '99887766E',
    email: 'roberto.sanchez@email.com',
    phone: '+34 923 45 67 89',
    specialty: 'Neurología',
    status: 'active',
    dateOfBirth: '1970-09-14',
    address: 'Calle Santa Isabel 654, Salamanca',
    medicalHistory: ['Migrañas crónicas']
  },
  {
    id: 'P006',
    name: 'Lucia Gómez Ruiz',
    dni: '44332211F',
    email: 'lucia.gomez@email.com',
    phone: '+34 954 32 10 98',
    specialty: 'Cardiología',
    status: 'inactive',
    dateOfBirth: '1965-12-25',
    address: 'Avenida Blas Infante 987, Sevilla',
    medicalHistory: ['Insuficiencia cardíaca']
  },
  {
    id: 'P007',
    name: 'Miguel Ángel Blanco',
    dni: '33221144G',
    email: 'miguel.blanco@email.com',
    phone: '+34 911 22 33 44',
    specialty: 'Neumología',
    status: 'active',
    dateOfBirth: '1985-01-17',
    address: 'Calle Velázquez 147, Madrid',
    medicalHistory: ['Asma ocupacional']
  },
  {
    id: 'P008',
    name: 'Sofía Jiménez García',
    dni: '66554433H',
    email: 'sofia.jimenez@email.com',
    phone: '+34 936 77 88 99',
    specialty: 'Endocrinología',
    status: 'active',
    dateOfBirth: '1990-04-09',
    address: 'Paseo de Sant Joan 258, Barcelona',
    medicalHistory: ['Hipotiroidismo', 'Diabetes gestacional anterior']
  },
  {
    id: 'P009',
    name: 'David Moreno Estrada',
    dni: '22114455I',
    email: 'david.moreno@email.com',
    phone: '+34 958 23 45 67',
    specialty: 'Gastroenterología',
    status: 'active',
    dateOfBirth: '1978-08-20',
    address: 'Calle de los Mártires 369, Granada',
    medicalHistory: ['GERD', 'Úlcera péptica anterior']
  },
  {
    id: 'P010',
    name: 'Patricia López Navarro',
    dni: '77889900J',
    email: 'patricia.lopez@email.com',
    phone: '+34 971 45 67 89',
    specialty: 'Reumatología',
    status: 'active',
    dateOfBirth: '1980-06-12',
    address: 'Paseo Marítimo 480, Palma',
    medicalHistory: ['Artritis reumatoide']
  }
]

// Mock Doctors
export const mockDoctors: Doctor[] = [
  {
    id: 'D001',
    name: 'Dr. Francisco Ruiz Álvarez',
    license: 'LIC-2001-001',
    specialty: 'Cardiología',
    availability: 'available',
    status: 'active',
    email: 'francisco.ruiz@clinic.com',
    phone: '+34 912 34 56 78'
  },
  {
    id: 'D002',
    name: 'Dra. Elena García Fernández',
    license: 'LIC-2002-045',
    specialty: 'Dermatología',
    availability: 'busy',
    status: 'active',
    email: 'elena.garcia@clinic.com',
    phone: '+34 912 34 56 79'
  },
  {
    id: 'D003',
    name: 'Dr. Javier Pérez Martínez',
    license: 'LIC-2003-078',
    specialty: 'Traumatología',
    availability: 'available',
    status: 'active',
    email: 'javier.perez@clinic.com',
    phone: '+34 912 34 56 80'
  },
  {
    id: 'D004',
    name: 'Dra. Isabel Rodríguez López',
    license: 'LIC-2004-092',
    specialty: 'Oftalmología',
    availability: 'off',
    status: 'active',
    email: 'isabel.rodriguez@clinic.com',
    phone: '+34 912 34 56 81'
  },
  {
    id: 'D005',
    name: 'Dr. Antonio Sánchez Gómez',
    license: 'LIC-2005-156',
    specialty: 'Neurología',
    availability: 'available',
    status: 'active',
    email: 'antonio.sanchez@clinic.com',
    phone: '+34 912 34 56 82'
  },
  {
    id: 'D006',
    name: 'Dra. Beatriz López Morales',
    license: 'LIC-2006-203',
    specialty: 'Neumología',
    availability: 'available',
    status: 'active',
    email: 'beatriz.lopez@clinic.com',
    phone: '+34 912 34 56 83'
  }
]

// Mock Medications
export const mockMedications: Medication[] = [
  {
    id: 'MED001',
    name: 'Aspirina',
    dosage: '500mg',
    quantity: 450,
    expiryDate: '2025-12-31',
    supplier: 'Farmalogic S.A.',
    alertLevel: 50
  },
  {
    id: 'MED002',
    name: 'Ibuprofeno',
    dosage: '400mg',
    quantity: 25,
    expiryDate: '2025-08-15',
    supplier: 'PharmaCorp',
    alertLevel: 100
  },
  {
    id: 'MED003',
    name: 'Metformina',
    dosage: '850mg',
    quantity: 180,
    expiryDate: '2026-03-20',
    supplier: 'MediSupply Inc',
    alertLevel: 50
  },
  {
    id: 'MED004',
    name: 'Lisinopril',
    dosage: '10mg',
    quantity: 120,
    expiryDate: '2025-11-10',
    supplier: 'Pharma Global',
    alertLevel: 40
  },
  {
    id: 'MED005',
    name: 'Amoxicilina',
    dosage: '500mg',
    quantity: 200,
    expiryDate: '2025-07-22',
    supplier: 'BioMed Labs',
    alertLevel: 60
  },
  {
    id: 'MED006',
    name: 'Omeprazol',
    dosage: '20mg',
    quantity: 95,
    expiryDate: '2025-09-30',
    supplier: 'Gastro Pharma',
    alertLevel: 100
  },
  {
    id: 'MED007',
    name: 'Atorvastatina',
    dosage: '20mg',
    quantity: 150,
    expiryDate: '2026-01-15',
    supplier: 'Cardio Labs',
    alertLevel: 50
  },
  {
    id: 'MED008',
    name: 'Losartán',
    dosage: '50mg',
    quantity: 140,
    expiryDate: '2025-10-05',
    supplier: 'Blood Pressure Med Co',
    alertLevel: 50
  }
]

// Mock Appointments
export const mockAppointments: Appointment[] = [
  {
    id: 'APT001',
    patientId: 'P001',
    doctorId: 'D001',
    date: '2025-04-15',
    time: '10:30',
    reason: 'Control de presión arterial',
    status: 'scheduled',
    notes: 'Traer últimos análisis'
  },
  {
    id: 'APT002',
    patientId: 'P002',
    doctorId: 'D002',
    date: '2025-04-16',
    time: '14:00',
    reason: 'Consulta por eczema',
    status: 'scheduled'
  },
  {
    id: 'APT003',
    patientId: 'P003',
    doctorId: 'D003',
    date: '2025-04-14',
    time: '09:15',
    reason: 'Seguimiento post-operatorio',
    status: 'scheduled'
  },
  {
    id: 'APT004',
    patientId: 'P004',
    doctorId: 'D004',
    date: '2025-04-17',
    time: '11:00',
    reason: 'Revisión anual de vista',
    status: 'completed'
  },
  {
    id: 'APT005',
    patientId: 'P005',
    doctorId: 'D005',
    date: '2025-04-13',
    time: '15:30',
    reason: 'Evaluación de migrañas',
    status: 'completed'
  },
  {
    id: 'APT006',
    patientId: 'P007',
    doctorId: 'D006',
    date: '2025-04-18',
    time: '10:00',
    reason: 'Control de asma',
    status: 'scheduled'
  },
  {
    id: 'APT007',
    patientId: 'P008',
    doctorId: 'D001',
    date: '2025-04-19',
    time: '16:00',
    reason: 'Análisis de función tiroidea',
    status: 'scheduled'
  }
]

// Mock Consultations
export const mockConsultations: Consultation[] = [
  {
    id: 'CONS001',
    appointmentId: 'APT004',
    patientId: 'P004',
    doctorId: 'D004',
    diagnosis: 'Miopía progresiva moderada',
    notes: 'Paciente requiere nueva graduación. Síntomas de fatiga visual por pantallas.',
    prescriptions: [
      {
        id: 'RX001',
        appointmentId: 'APT004',
        medication: mockMedications[0],
        dosage: 'Según prescripción',
        frequency: 'Una vez al día',
        duration: '30 días',
        instructions: 'Usar gafas nuevas según prescripción'
      }
    ],
    followUpDate: '2025-07-17',
    date: '2025-04-17'
  },
  {
    id: 'CONS002',
    appointmentId: 'APT005',
    patientId: 'P005',
    doctorId: 'D005',
    diagnosis: 'Migraña con aura',
    notes: 'Patrón regular de migrañas. Se sugiere tratamiento preventivo.',
    prescriptions: [],
    followUpDate: '2025-05-13',
    date: '2025-04-13'
  }
]

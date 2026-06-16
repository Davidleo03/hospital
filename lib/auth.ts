export interface User {
  id: string
  name: string
  email: string
  password: string
  role: 'admin' | 'user'
}

export const AUTH_STORAGE_KEYS = {
  users: 'hospital_users',
  currentUser: 'hospital_current_user'
} as const

export const initialUsers: User[] = [
  {
    id: 'U001',
    name: 'Administrador Hospital',
    email: 'admin@hospital.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    id: 'U002',
    name: 'Enfermera Ruiz',
    email: 'nurse@hospital.com',
    password: 'nurse123',
    role: 'user'
  }
]

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

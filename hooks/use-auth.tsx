'use client'

import * as React from 'react'
import { useEffect, useMemo, useState } from 'react'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { AUTH_STORAGE_KEYS, initialUsers, normalizeEmail, type User } from '@/lib/auth'

type AuthContextValue = {
  ready: boolean
  users: User[]
  currentUser: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => boolean
  logout: () => void
  updateUser: (user: User) => void
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useLocalStorage<User[]>(AUTH_STORAGE_KEYS.users, initialUsers)
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>(AUTH_STORAGE_KEYS.currentUser, null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  const login = (email: string, password: string) => {
    const normalizedEmail = normalizeEmail(email)
    const user = users.find(
      (storedUser) =>
        normalizeEmail(storedUser.email) === normalizedEmail &&
        storedUser.password === password,
    )

    if (!user) {
      return false
    }

    setCurrentUser(user)
    return true
  }

  const logout = () => {
    setCurrentUser(null)
  }

  const updateUser = React.useCallback(
    (user: User) => {
      setCurrentUser(user)
      setUsers((prev) => prev.map((existingUser) => (existingUser.id === user.id ? user : existingUser)))
    },
    [setCurrentUser, setUsers],
  )

  const value = useMemo(
    () => ({
      ready,
      users,
      currentUser,
      isAuthenticated: ready && currentUser !== null,
      login,
      logout,
      updateUser
    }),
    [ready, users, currentUser, login, logout, updateUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

'use client'

import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const storedValue = window.localStorage.getItem(key)
      if (storedValue !== null) {
        return JSON.parse(storedValue) as T
      }
    } catch {
      // Ignore storage read failures
    }

    return initialValue
  })

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Ignore storage write failures
    }
  }, [key, value])

  return [value, setValue]
}

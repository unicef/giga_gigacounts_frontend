import { useState, useEffect } from 'react'

export const useDebounce = <T>(value: T, milliSeconds: number = 1000) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, milliSeconds)

    return () => {
      clearTimeout(timer)
    }
  }, [value, milliSeconds])

  return debouncedValue
}

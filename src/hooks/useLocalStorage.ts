import { useState, useEffect } from 'react'
import localStorageAvailable from 'src/utils/localStorageAvailable'

export default function useLocalStorage<ValueType extends {}>(
  key: string,
  defaultValue: ValueType
) {
  const storageAvailable = localStorageAvailable()

  const [value, setValue] = useState(() => {
    const storedValue = storageAvailable ? localStorage.getItem(key) : null
    if (!storedValue) return defaultValue
    const parsedValue = JSON.parse(storedValue)
    if (typeof parsedValue !== 'object' || parsedValue instanceof Array) return parsedValue

    const finalValue = Object.fromEntries(
      Object.entries(defaultValue).map(([k, v]) => {
        if (k in parsedValue) return [k, parsedValue[k]]
        return [k, v]
      })
    )

    return finalValue
  })

  useEffect(() => {
    const listener = (e: StorageEvent) => {
      if (e.storageArea === localStorage && e.key === key) {
        setValue(e.newValue ? JSON.parse(e.newValue) : e.newValue)
      }
    }
    window.addEventListener('storage', listener)

    return () => {
      window.removeEventListener('storage', listener)
    }
  }, [key, defaultValue])

  const setValueInLocalStorage = (newValue: ValueType) => {
    setValue((currentValue: ValueType) => {
      const result = typeof newValue === 'function' ? newValue(currentValue) : newValue

      if (storageAvailable) {
        localStorage.setItem(key, JSON.stringify(result))
      }

      return result
    })
  }

  return [value, setValueInLocalStorage] as [ValueType, (value: ValueType) => void]
}

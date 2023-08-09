import { useCallback } from 'react'
import { useAuthContext } from 'src/auth/useAuthContext'
import { UserSettings } from 'src/constants'

export function useSettings() {
  const { user } = useAuthContext()

  const hasAllSettings = useCallback(
    (userSettingsToHas: [{ name: UserSettings; value: any }] | []): boolean => {
      if (!user || userSettingsToHas.length === 0) return false

      return userSettingsToHas.every((setting) => {
        if (Object.prototype.hasOwnProperty.call(user, setting.name)) {
          const currentValue = user[setting.name]
          return currentValue === setting.value
        }
        return false
      })
    },
    [user]
  )

  return { hasAllSettings }
}

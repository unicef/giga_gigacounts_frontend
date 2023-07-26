import { createContext, useContext, useMemo, useCallback } from 'react'
import useLocalStorage from 'src/hooks/useLocalStorage'
import { defaultSettings } from 'src/constants/default-settings'
import { SettingsContextProps } from './types'

const initialState: SettingsContextProps = {
  ...defaultSettings,
  onToggleTours: () => {},
  onResetSetting: () => {}
}

export const SettingsContext = createContext(initialState)

export const useSettingsContext = () => {
  const context = useContext(SettingsContext)

  if (!context) throw new Error('useSettingsContext must be use inside SettingsProvider')

  return context
}

type SettingsProviderProps = {
  children: React.ReactNode
}

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [settings, setSettings] = useLocalStorage('settings', defaultSettings)
  const onResetSetting = useCallback(() => {
    setSettings(defaultSettings)
  }, [setSettings])

  const onToggleTours = useCallback(() => {
    const toursEnabled = !settings.toursEnabled
    setSettings({ ...settings, toursEnabled })
  }, [setSettings, settings])

  const memoizedValue = useMemo(
    () => ({
      ...settings,
      onToggleTours,
      onResetSetting
    }),
    [settings, onToggleTours, onResetSetting]
  )

  return <SettingsContext.Provider value={memoizedValue}>{children}</SettingsContext.Provider>
}

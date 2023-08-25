import { createContext, useCallback, useContext, useMemo } from 'react'
import { SettingsContextProps, TourName } from 'src/@types'
import { defaultSettings } from 'src/constants'
import useLocalStorage from 'src/hooks/useLocalStorage'

const initialState: SettingsContextProps = {
  ...defaultSettings,
  completeTour: () => {},
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

  const completeTour = useCallback(
    (name: Exclude<TourName, 'home'> | 'home_en' | 'home_es' | 'home_fr' | 'home_br') =>
      setSettings({
        ...settings,
        tours: { ...settings.tours, [name]: false }
      }),
    [settings, setSettings]
  )

  const memoizedValue = useMemo<SettingsContextProps>(
    () => ({
      ...settings,
      completeTour,
      onResetSetting
    }),
    [settings, completeTour, onResetSetting]
  )

  return <SettingsContext.Provider value={memoizedValue}>{children}</SettingsContext.Provider>
}

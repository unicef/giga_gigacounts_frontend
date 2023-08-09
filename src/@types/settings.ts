export type TourName = 'home' | 'contracts'

export type Settings = {
  tours: Record<TourName, boolean>
}

export type SettingsContextProps = Settings & {
  completeTour: (name: TourName) => void
  onResetSetting: () => void
}

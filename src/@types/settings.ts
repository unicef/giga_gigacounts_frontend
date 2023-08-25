export type TourName = 'home' | 'contracts' | 'profile' | 'contract_detail'

export type Settings = {
  tours: Record<Exclude<TourName, 'home'> | 'home_en' | 'home_es' | 'home_fr' | 'home_br', boolean>
}

export type SettingsContextProps = Settings & {
  completeTour: (
    name: Exclude<TourName, 'home'> | 'home_en' | 'home_es' | 'home_fr' | 'home_br'
  ) => void
  onResetSetting: () => void
}

import { allLangs } from '../locales/config-lang'

export type TourName = 'home' | 'contracts' | 'profile' | 'contract_detail'
type HomeTour = `home_${(typeof allLangs)[number]['value']}`
export type Settings = {
  tours: Record<Exclude<TourName, 'home'> | HomeTour, boolean>
}

export type SettingsContextProps = Settings & {
  completeTour: (name: Exclude<TourName, 'home'> | HomeTour) => void
  onResetSetting: () => void
}

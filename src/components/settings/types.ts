export type ToursEnabledValue = boolean
export type IndividualTourValue = {
  name: 'payments' | 'contracts' | 'notifications'
  enabled: boolean
}

export type SettingsValueProps = {
  toursEnabled: ToursEnabledValue
  individualTourEnabled: Array<IndividualTourValue>
}

export type SettingsContextProps = SettingsValueProps & {
  onToggleTours: VoidFunction
  onResetSetting: VoidFunction
}

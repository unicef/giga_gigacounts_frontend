import { SettingsValueProps } from 'src/components/settings/types'

export const defaultSettings: SettingsValueProps = {
  toursEnabled: true,
  individualTourEnabled: [
    {
      name: 'contracts',
      enabled: false
    }
  ]
}

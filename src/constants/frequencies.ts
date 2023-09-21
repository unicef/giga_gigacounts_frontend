import { IFrequency } from 'src/@types'

export const FREQUENCIES_MINIMUM_LENGTH: { [K in IFrequency['name']]: number } = {
  Biweekly: 14,
  Weekly: 7,
  Daily: 1,
  Monthly: 29
}

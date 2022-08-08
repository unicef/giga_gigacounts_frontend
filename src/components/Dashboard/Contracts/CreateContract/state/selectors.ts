import { CreateContractState } from './types'

export const selectCountryCode = (countryId?: string) => (state: CreateContractState) =>
  countryId === undefined ? '' : state.countries.find((country) => country.id === countryId)?.code

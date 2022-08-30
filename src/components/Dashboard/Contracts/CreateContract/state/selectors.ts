import { CreateContractState } from './types'

export const selectCountryCode = (countryId?: string) => (state: CreateContractState) =>
  countryId === undefined ? state.countries[0]?.code : state.countries.find((country) => country.id === countryId)?.code

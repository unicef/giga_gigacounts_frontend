import { useContext } from 'react'
import { CreateContractContext } from './CreateContractContext'
import { selectCountryCode } from './selectors'

export const useCountryCode = (countryId?: string) =>
  selectCountryCode(countryId)(useContext(CreateContractContext).state)

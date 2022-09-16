import { useContext } from 'react'
import { CreateContractContext } from './CreateContractContext'
import { selectCountryCode, selectSelectedSchoolIds } from './selectors'

export const useCountryCode = (countryId?: string) =>
  selectCountryCode(countryId)(useContext(CreateContractContext).state)

export const useSelectedSchoolIds = () => selectSelectedSchoolIds()(useContext(CreateContractContext).state)

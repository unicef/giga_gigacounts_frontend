import { useContext } from 'react'
import { GeneralContext } from './GeneralContext'
import { selectUser } from './selectors'

export const useUser = () => selectUser(useContext(GeneralContext).state)

export const useContractCounts = () => useContext(GeneralContext).state.contractCounts

export const useRoleCheck = (role: string) => {
  const userRole = selectUser(useContext(GeneralContext).state).data.role
  return userRole === role
}

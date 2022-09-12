import { useContext } from 'react'
import { UserRole } from 'src/types/general'
import { GeneralContext } from './GeneralContext'
import { selectUser } from './selectors'

export const useUser = () => selectUser(useContext(GeneralContext).state)

export const useContractCounts = () => useContext(GeneralContext).state.contractCounts

export const useRoleCheck = (role: UserRole) => {
  const userRole = selectUser(useContext(GeneralContext).state).data?.role
  return userRole === role
}

export const useSelectedContract = () => localStorage.getItem('selectedContract') || ''

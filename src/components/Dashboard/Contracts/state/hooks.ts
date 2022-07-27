import { useContext } from 'react'
import { ContractsContext } from './ContractsContext'
import { selectContract, selectLtaContracts, selectOtherContracts } from './selectors'

export const useLtaContracts = (id?: string) => selectLtaContracts(id)(useContext(ContractsContext).state)

export const useOtherContracts = () => selectOtherContracts(useContext(ContractsContext).state)

export const useContract = (id?: string) => selectContract(id)(useContext(ContractsContext).state)

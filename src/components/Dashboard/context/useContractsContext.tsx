import { useContext } from 'react'
import { ContractsContext, IContractContext } from './ContractsContext'

export const useContractsContext = (): IContractContext => useContext<IContractContext>(ContractsContext)

import { useContext } from 'react'
import { ContractsContext, IContractsContext } from './ContractsContext'

export const useContractsContext = (): IContractsContext => useContext<IContractsContext>(ContractsContext)

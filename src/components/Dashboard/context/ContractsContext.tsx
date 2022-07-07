import React, { useState, createContext, FC } from 'react'

interface ContractsProviderProps {
  children: React.ReactNode
}

export interface IContractContext {
  loadContracts: boolean
  setLoadContracts?: (val: boolean) => void
}

const defaultState = {
  loadContracts: false,
}

export const ContractsContext = createContext<IContractContext>(defaultState)

export const ContractsProvider: FC<ContractsProviderProps> = ({ children }: ContractsProviderProps) => {
  const [loadContracts, setLoadContracts] = useState<boolean>(false)

  return <ContractsContext.Provider value={{ loadContracts, setLoadContracts }}>{children}</ContractsContext.Provider>
}

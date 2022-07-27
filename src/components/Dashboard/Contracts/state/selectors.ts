import { ContractsState } from './types'

export const selectLtaContracts = (id?: string) => (state: ContractsState) =>
  id === undefined ? [] : state.contracts?.filter((contract) => contract.ltaId === id)

export const selectOtherContracts = (state: ContractsState) =>
  state.contracts?.filter((contract) => contract.ltaId === undefined || contract.ltaId === null)

export const selectContract = (id?: string) => (state: ContractsState) =>
  id === undefined ? undefined : state.contracts?.find((contract) => contract.id === id)

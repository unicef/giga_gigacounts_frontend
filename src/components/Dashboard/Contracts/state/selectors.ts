import { ContractStatus } from 'src/types/general'
import { ContractsState } from './types'

export const selectAllLtaContracts = (id?: string) => (state: ContractsState) =>
  id === undefined ? [] : state.contracts?.filter((contract) => contract.ltaId === id)

export const selectAllOtherContracts = (state: ContractsState) =>
  state.contracts?.filter((contract) => contract.ltaId === undefined || contract.ltaId === null)

export const selectFilteredContracts = (state: ContractsState) => {
  return state.activeNavItem === undefined
    ? state.contracts
    : state.contracts?.filter((contract) => contract.status.toLowerCase() === state.activeNavItem)
}

export const selectFilteredLtaContracts = (id?: string) => (state: ContractsState) =>
  id === undefined ? [] : selectFilteredContracts(state)?.filter((contract) => contract.ltaId === id)

export const selectFilteredLtas = (state: ContractsState) => {
  return state.ltas?.filter((lta) => {
    const contracts = selectFilteredLtaContracts(lta.id)(state)

    return contracts && contracts.length > 0
  })
}

export const selectFilteredOtherContracts = (state: ContractsState) =>
  selectFilteredContracts(state)?.filter((contract) => contract.ltaId === undefined || contract.ltaId === null)

export const selectContract = (id?: string) => (state: ContractsState) =>
  id === undefined
    ? undefined
    : state.contracts
        ?.filter((contract) => contract.status !== ContractStatus.Draft)
        .find((contract) => contract.id === id && contract.status !== ContractStatus.Draft)

export const selectDraft = (id?: string) => (state: ContractsState) =>
  id === undefined
    ? undefined
    : state.contracts
        ?.filter((contract) => contract.status === ContractStatus.Draft)
        .find((contract) => contract.id === id)

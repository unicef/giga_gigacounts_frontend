import { ContractsState } from './types'
import { IContract } from '../@types/ContractType'

export const INITIAL_CONTRACTS_STATE: ContractsState = {
  contracts: undefined,
  ltasIds: undefined,
  error: undefined,
  loading: false,
}

export const NEW_CONTRACT: IContract = {
  name: 'New Contract',
  status: 'Draft',
  added: true,
  details: {
    data: undefined,
    loading: false,
    error: undefined,
  },
}

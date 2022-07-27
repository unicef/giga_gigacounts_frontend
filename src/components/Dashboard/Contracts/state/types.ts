import { IContract } from '../@types/ContractType'

export enum ContractsActionType {
  RESPONSE = 'RESPONSE',
  CREATE_CONTRACT = 'CREATE_CONTRACT',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
  SET_CONTRACT_DETAILS_SCHOOLS = 'SET_CONTRACT_DETAILS_SCHOOLS',
  SET_CONTRACT_DETAILS_LOADING = 'SET_CONTRACT_DETAILS_LOADING',
  SET_CONTRACT_DETAILS_ERROR = 'SET_CONTRACT_DETAILS_ERROR',
  SET_ACTIVE_NAV_ITEM = 'SET_ACTIVE_NAV_ITEM',
}

export interface ContractsAction {
  type: ContractsActionType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any
}

export interface ContractsState {
  contracts?: IContract[]
  ltasIds?: string[]
  activeNavItem?: string
  error?: Error
  loading?: boolean
}

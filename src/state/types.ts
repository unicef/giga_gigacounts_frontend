import { IUser } from 'src/types/general'
import { ActionType } from './action-types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface DataState<T extends Record<string, any>> {
  data: T
  error?: Error
  loading: boolean
}

export interface ICounts {
  status: string
  count: string
}

export interface ContractCounts {
  draft: number
  sent: number
  confirmed: number
  ongoing: number
  expired: number
  completed: number
  total: number
}

export type UserState = DataState<IUser>

export type ContractCountsState = DataState<ContractCounts>

export interface GeneralState {
  user: UserState
  contractCounts: ContractCountsState
}

export interface Action {
  type: ActionType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any
}

import { IUser } from 'src/types/general'
import { ActionType } from './action-types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface DataState<T extends Record<string, any>, ALLOW_UNDEFINED extends boolean = false> {
  data: ALLOW_UNDEFINED extends true ? T | undefined : T
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

export type UserState = DataState<IUser, true>

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

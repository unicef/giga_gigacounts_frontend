import { ContractCountsResponse } from 'src/api/dashboard'
import { IUser } from 'src/types/general'
import { ActionType, UPDATE_USER, UPDATE_CONTRACT_COUNTS } from './action-types'

export const updateUser = (user?: IUser, error?: Error, loading?: boolean) => ({
  type: UPDATE_USER as ActionType,
  payload: { user, error, loading: loading ?? false },
})

export const updateContractCounts = (contractCounts?: ContractCountsResponse, error?: Error, loading?: boolean) => ({
  type: UPDATE_CONTRACT_COUNTS as ActionType,
  payload: { contractCounts: contractCounts?.counts, error, loading: loading ?? false },
})

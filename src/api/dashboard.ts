import { IUser } from 'src/types/general'
import instance from './init'

export interface ICounts {
  status: string
  count: string
}

export interface ContractCountsResponse {
  counts: ICounts[]
  totalCount: number
}

export const getUserProfile = async (): Promise<IUser> => {
  const response = await instance.get('/user/profile')

  if (response.status === 200) {
    return response.data
  }

  throw new Error('Failed to get the contracts')
}

export const getContractsCounts = async (): Promise<ContractCountsResponse> => {
  const response = await instance.get('/contract/count/status')

  if (response.status === 200) {
    return response.data
  }

  throw new Error('Failed to get the contracts')
}

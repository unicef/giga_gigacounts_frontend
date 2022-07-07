import instance from './init'

export interface ICounts {
  status: string
  count: string
}

export interface IContractCounts {
  counts: ICounts[]
  totalCount: number
}

export interface ICountryUser {
  name: string
  code: string
  flagUrl: string
}

export interface IUser {
  name: string
  lastName: string
  email: string
  role: string
  country?: ICountryUser
}

export const getUserProfile = async (): Promise<IUser> => {
  try {
    const response = await instance.get('/user/profile')
    if (response.status === 200) {
      return response.data
    }
    throw new Error('Failed to get the contracts')
  } catch (error: unknown) {
    throw error
  }
}

export const getContractsCounts = async (): Promise<IContractCounts> => {
  try {
    const response = await instance.get('/contract/count/status')
    if (response.status === 200) {
      return response.data
    }
    throw new Error('Failed to get the contracts')
  } catch (error: unknown) {
    throw error
  }
}

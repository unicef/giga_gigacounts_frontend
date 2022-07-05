import instance from './init'
import { IContractDraft, IContractsData } from '../components/Dashboard/Contracts/@types/ContractType'

export const getContracts = async (): Promise<IContractsData | Error> => {
  try {
    const response = await instance.get('/contract')
    if (response.status === 200) {
      return response.data
    }
    throw new Error('Failed to get the contracts')
  } catch (error: unknown) {
    return error as Error
  }
}

export const createContract = async (name: string): Promise<unknown> => {
  try {
    return await instance.post<IContractDraft>('/contract/draft', {
      name,
    })
  } catch (error) {
    return error
  }
}

export const updateContract = async (body: Record<string, unknown>): Promise<unknown> => {
  try {
    return await instance.put('/contract/draft', {
      body,
    })
  } catch (error) {
    return error
  }
}

export const getContractByStatus = async (): Promise<unknown> => {
  try {
    return await instance.get('/contract/count/status')
  } catch (error) {
    return error
  }
}

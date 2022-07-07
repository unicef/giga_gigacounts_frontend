import instance from './init'
import { IContractDraft, IContractsData } from '../components/Dashboard/Contracts/@types/ContractType'
import axios from 'axios'

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

export const createContractDraft = async (name: string): Promise<IContractDraft | Error> => {
  try {
    const response = await instance.post('/contract/draft', {
      name,
    })
    if (response.status === 200) return response.data
    throw new Error('Failed to save the contract draft')
  } catch (error) {
    return error as Error
  }
}

export const updateContractDraft = async (contract: Record<string, unknown>) => {
  try {
    const response = await instance.put('/contract/draft', {
      ...contract,
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error && error.response) {
        return error.response.data
      }
    } else {
      throw new Error('Failed to update the contract draft')
    }
  }
}

export const getContractByStatus = async (): Promise<unknown> => {
  try {
    return await instance.get('/contract/count/status')
  } catch (error) {
    return error
  }
}

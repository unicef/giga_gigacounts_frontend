import instance from './init'
import { IContractDraft, IContractsData } from '../components/Dashboard/Contracts/@types/ContractType'
import { GeneralTabForm } from 'src/components/Dashboard/CreateContract/store/redux'

export const getContracts = async (): Promise<IContractsData | Error> => {
  const response = await instance.get('/contract')
  if (response.status === 200) return response.data
  throw new Error('Failed to get the contracts')
}

export const createContractDraft = async (name: string): Promise<IContractDraft | Error> => {
  const response = await instance.post('/contract/draft', {
    name,
  })
  if (response.status === 200) return response.data
  throw new Error('Failed to save the contract draft')
}

export const updateContractDraft = async (contract: GeneralTabForm) => {
  const response = await instance.put('/contract/draft', {
    ...contract,
  })
  if (response.status === 200) return response.data
  throw new Error('Failed to update the contract draft')
}

export const getContractByStatus = async (): Promise<unknown> => {
  const response = await instance.get('/contract/count/status')
  if (response.status === 200) return response.data
  throw new Error('Failed to update the contract draft')
}

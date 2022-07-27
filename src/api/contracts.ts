import instance from './init'
import {
  IContractDraft,
  IContractsData,
  IContractDetails,
  IContractSchools,
} from '../components/Dashboard/Contracts/@types/ContractType'
import { ContractForm } from 'src/components/Dashboard/Contracts/CreateContract/store/redux'
import { contractStatusToId } from 'src/utils/contractStatusToId'

export const getContracts = async (status?: string | (string | null)[] | null): Promise<IContractsData | Error> => {
  const response = await instance.get('/contract', {
    params: {
      status: contractStatusToId(status),
    },
  })
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

export const updateContractDraft = async (contract: ContractForm) => {
  const response = await instance.put('/contract/draft', {
    ...contract,
  })
  if (response.status === 200) return response.data
  throw new Error('Failed to update the contract draft')
}

export const getContractByStatus = async () => {
  const response = await instance.get('/contract/count/status')
  if (response.status === 200) return response.data
  throw new Error('Failed to get the contract by status')
}

export const getContractDetails = async (contractId: string): Promise<IContractDetails> => {
  const response = await instance.get(`/contract/details/${contractId}`)
  if (response.status === 200) return response.data
  throw new Error('Failed to get the contract details')
}

export const getContractSchools = async (contractId: string): Promise<IContractSchools[]> => {
  const response = await instance.get(`/contract/schools/${contractId}`)
  if (response.status === 200) return response.data
  throw new Error('Failed to get the contract schools')
}

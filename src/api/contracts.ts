import instance from './init'
import {
  IContractDraft,
  IContractsData,
  IContractDetails,
  IContractSchools,
  IPendingContractDetails,
} from 'src/types/general'
import { ContractForm } from 'src/components/Dashboard/Contracts/CreateContract/state/types'

export const getContracts = async (status?: string | (string | null)[] | null): Promise<IContractsData | Error> => {
  const response = await instance.get('/contract')
  if (response.status === 200) return response.data
  throw new Error('Failed to get the contracts')
}

export const createContractDraft = async (contract: ContractForm): Promise<IContractDraft | Error> => {
  const response = await instance.post('/contract/draft', {
    ...contract,
  })
  if (response.status === 200) return response.data
  throw new Error('Failed to save the contract draft')
}

export const updateContractDraft = async (contract: ContractForm) => {
  try {
    const response = await instance.put('/contract/draft', {
      ...contract,
    })
    if (response.status === 200) return response.data
  } catch (error: any) {
    if (error.response.status === 422) {
      throw new Error('Validation failed')
    }
    throw new Error('Failed to update the contract draft')
  }
}

export const publishContractDraft = async (contract: ContractForm, draftId?: string) => {
  const { id, ...contractForm } = contract
  const body = {
    draftId,
    ...contractForm,
  }
  const response = await instance.post(`/contract`, {
    ...body,
  })
  if (response.status === 200) return response.data
  throw new Error('Failed to publish the contract draft')
}

export const deleteContractDraft = async (draft_id: string) => {
  const response = await instance.delete(`/contract/draft/${draft_id}`)
  if (response.status === 200) return response.data
  throw new Error('Failed to delete the contract draft')
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

export const getContract = async (contractId: string): Promise<IPendingContractDetails> => {
  const response = await instance.get(`/contract/${contractId}`)
  if (response.status === 200) return response.data
  throw new Error('Failed to get the contract')
}

export const publishContractToCompleted = async (contractId: string) => {
  const response = await instance.post('/contract/change-status', {
    contract_id: contractId,
    status: 5,
  })
  if (response.status === 200) return response.data
  throw new Error('Failed to change the contract status')
}

export const getContractAvailablePayments = async <T>(contractId: string): Promise<T> => {
  const response = await instance.get<T>(`/contract/available-payments/${contractId}`)
  if (response.status === 200) return response.data
  throw new Error('Failed to get available payments')
}

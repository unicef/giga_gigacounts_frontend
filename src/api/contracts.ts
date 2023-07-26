import {
  Contract,
  ContractCreationError,
  ContractTeamMemberForm,
  IContractDetails,
  IContractDraft,
  IContractSchools,
  IContractsData,
  IPendingContractDetails
} from 'src/@types'
import { Translation } from 'src/locales'
import instance from './init'

export const getContracts = async (
  status?: string | (string | null)[] | null
): Promise<IContractsData | Error> => {
  const response = await instance.get('/contract')
  if (response.status === 200) return response.data
  throw new Error('Failed to get the contracts')
}

export const createContractDraft = async (contract: Contract): Promise<IContractDraft> => {
  try {
    const response = await instance.post('/contract/draft', {
      ...contract
    })
    return response.data
  } catch (err) {
    if (err && err.errors && err.errors.some((error: any) => error.field && error.rule)) {
      throw err.errors.map(
        (error: any) =>
          new ContractCreationError(
            `field_errors.${error.rule}` as Translation,
            error.field,
            error.rule
          )
      )
    } else throw err
  }
}

export const updateContractDraft = async (contract: Contract) => {
  const response = await instance.put('/contract/draft', {
    ...contract
  })
  return response.data
}

export const publishContractDraft = async (contract: Contract, draftId?: string) => {
  const { ...contractForm } = contract
  const body = {
    draftId,
    ...contractForm
  }
  const response = await instance.post(`/contract`, {
    ...body
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

export const publishContract = async (contractId: string) => {
  const response = await instance.post('/contract/publish', {
    contract_id: contractId
  })
  if (response.status === 200) return response.data
  throw new Error('Failed to change the contract status')
}

export const approveContract = async (contractId: string) => {
  const response = await instance.post('/contract/approve', {
    contract_id: contractId
  })
  if (response.status === 200) return response.data
  throw new Error('Failed to change the contract status')
}

export const getContractAvailablePayments = async <T>(contractId: string): Promise<T> => {
  const response = await instance.get<T>(`/contract/available-payments/${contractId}`)
  if (response.status === 200) return response.data
  throw new Error('Failed to get available payments')
}

export const duplicateContract = async (contractId: string) => {
  const response = await instance.post(`/contract/duplicate/${contractId}`)
  return response.data
}

export const generateSignContractRandomString = async (contractId: string) => {
  const response = await instance.post(`/contract/generate-sign-random-string`, {
    contract_id: contractId
  })
  if (response.status === 200) return response.data
  throw new Error(`Could not generate random string to sign contract`)
}

export const signContractWithWallet = async <T>(
  contractId: string,
  address: string,
  signatureHash: string
): Promise<T> => {
  try {
    const response = await instance.post(`/contract/sign-with-wallet`, {
      contract_id: contractId,
      address,
      signatureHash
    })
    if (response.status === 200) return response.data
    throw new Error(`Could not sign contract with wallet`)
  } catch (ex) {
    throw new Error(ex.mesage)
  }
}

export const addNewTeamMember = (
  teamMemberForm: ContractTeamMemberForm,
  contractId: string
): Promise<ContractTeamMemberForm> => {
  console.log(teamMemberForm, contractId)
  return new Promise(() => {})
}

export const deleteTeamMember = (
  email: string,
  contractId: string
): Promise<ContractTeamMemberForm> => {
  console.log(email, contractId)
  return new Promise(() => {})
}

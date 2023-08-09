import {
  Contract,
  ContractCreationError,
  ContractStatus,
  IContract,
  IContractDetails,
  IContractDraft,
  IContractSchools,
  ICountry,
  ICurrency,
  IDraft,
  ILta,
  IPendingContractDetails,
  Translation
} from 'src/@types'
import { parseContractStatus } from 'src/utils/status'
import { DRAFT_ID_OFFSET } from 'src/constants'
import instance from './init'

export const getContracts = async (
  status?: string | (string | null)[] | null
): Promise<IContract[]> => {
  const response = await instance.get('/contract')
  if (response.status === 200)
    return response.data.contracts.map((c: IContract) =>
      parseContractStatus(c.status) === ContractStatus.Draft
        ? { ...c, id: String(DRAFT_ID_OFFSET + Number(c.id)) }
        : c
    )
  throw new Error('Failed to get the contracts')
}

export const createContractDraft = async (contract: Contract): Promise<IContractDraft> => {
  try {
    const response = await instance.post('/contract/draft', {
      ...contract
    })
    return { ...response.data, id: String(DRAFT_ID_OFFSET + Number(response.data.id)) }
  } catch (err) {
    if (
      err &&
      err.errors &&
      err.errors.some((error: { field: keyof IDraft; rule: string }) => error.field && error.rule)
    ) {
      throw err.errors.map(
        (error: { field: keyof IDraft; rule: string }) =>
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
    ...contract,
    id: String(Number(contract.id) - DRAFT_ID_OFFSET)
  })
  return { ...response.data, id: String(DRAFT_ID_OFFSET + Number(response.data.id)) }
}

export const publishContractDraft = async (contract: Contract, draftId?: string) => {
  const { ...contractForm } = contract
  const body = {
    draftId: String(Number(draftId) - DRAFT_ID_OFFSET),
    ...contractForm
  }
  const response = await instance.post(`/contract`, {
    ...body
  })
  if (response.status === 200) return response.data
  throw new Error('Failed to publish the contract draft')
}

export const deleteContractDraft = async (draftId: string) => {
  const response = await instance.delete(
    `/contract/draft/${String(Number(draftId) - DRAFT_ID_OFFSET)}`
  )
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
  return { ...response.data, id: String(Number(response.data.id) + DRAFT_ID_OFFSET) }
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

export const getCountries = async (): Promise<ICountry[] | Error> => {
  const response = await instance.get('/country')

  if (response.status === 200) {
    return response.data
  }

  throw new Error('Failed to get the contracts')
}

export const getCurrencies = async (
  countryId?: string,
  type?: string,
  networkId?: number
): Promise<ICurrency[] | Error> => {
  const response = await instance.get('/currency', {
    params: {
      type,
      networkId,
      countryId
    }
  })
  if (response.status === 200) {
    return response.data
  }

  throw new Error('Failed to get the currencies')
}

export const getLtas = async (countryId?: string): Promise<ILta[]> => {
  const response = await instance.get('/lta', {
    params: {
      countryId
    }
  })

  if (response.status === 200) {
    return response.data
  }

  throw new Error('Failed to get the currencies')
}

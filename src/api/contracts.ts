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
  IPendingContractDetails,
  IPeriod,
  Translation
} from 'src/@types'
import { DRAFT_ID_OFFSET } from 'src/constants'
import { parseContractStatus } from 'src/utils/status'
import instance from './init'

export const getContracts = async (): Promise<IContract[]> => {
  const response = await instance.get('/contract')
  if (response.status === 200 && !response.data) return []
  return response.data.contracts.map((c: IContract) =>
    parseContractStatus(c.status) === ContractStatus.Draft
      ? { ...c, id: String(DRAFT_ID_OFFSET + Number(c.id)) }
      : c
  )
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
      err.response &&
      err.response.data &&
      err.response.data.errors &&
      err.response.data.errors.some(
        (error: { field: keyof IDraft; rule: string }) => error.field && error.rule
      )
    ) {
      throw err.response.data.errors.map(
        (error: { field: keyof IDraft; rule: string }) =>
          new ContractCreationError(
            `field_errors.${error.rule}` as Translation,
            error.field,
            error.rule
          )
      )
    }
    throw err
  }
}

export const updateContractDraft = async (contract: Contract) => {
  try {
    const response = await instance.put('/contract/draft', {
      ...contract,
      id: String(Number(contract.id) - DRAFT_ID_OFFSET)
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

export const publishContractDraft = async (
  contract: Contract,
  draftId: string,
  confirmation: boolean
) => {
  const body = {
    draftId: String(Number(draftId) - DRAFT_ID_OFFSET),
    ...contract
  }

  const response = await instance.post(
    `/contract`,
    {
      ...body
    },
    {
      params: {
        confirmation: confirmation ? 1 : 0
      }
    }
  )
  return response.data
}

export const deleteContractDraft = async (draftId: string) => {
  const response = await instance.delete(
    `/contract/draft/${String(Number(draftId) - DRAFT_ID_OFFSET)}`
  )
  return response.data
}

export const getContractByStatus = async () => {
  const response = await instance.get('/contract/count/status')
  return response.data
}

export const getContractDetails = async (contractId: string): Promise<IContractDetails> => {
  const response = await instance.get(`/contract/details/${contractId}`)
  return response.data
}

export const getContractSchools = async (contractId: string): Promise<IContractSchools[]> => {
  const response = await instance.get(`/contract/schools/${contractId}`)
  return response.data
}

export const getContract = async (contractId: string): Promise<IPendingContractDetails> => {
  const response = await instance.get(`/contract/${contractId}`)
  return response.data
}

export const publishContract = async (contractId: string) => {
  const response = await instance.post('/contract/publish', {
    contract_id: contractId
  })
  return response.data
}

export const approveContract = async (contractId: string) => {
  const response = await instance.post('/contract/approve', {
    contract_id: contractId
  })
  return response.data
}

export const getContractAvailablePayments = async (
  contractId: string
): Promise<{ amount: number; periods: IPeriod[] }> => {
  const response = await instance.get(`/contract/available-payments/${contractId}`)
  return response.data
}

export const duplicateContract = async (contractId: string) => {
  const response = await instance.post(`/contract/duplicate/${contractId}`)
  return { ...response.data, id: String(Number(response.data.id) + DRAFT_ID_OFFSET) }
}

export const generateSignContractRandomString = async (contractId: string) => {
  const response = await instance.post(`/contract/generate-sign-random-string`, {
    contract_id: contractId
  })
  return response.data
}

export const signContractWithWallet = async (
  contractId: string,
  address: string,
  signatureHash: string
): Promise<any> => {
  const response = await instance.post(`/contract/sign-with-wallet`, {
    contract_id: contractId,
    address,
    signatureHash
  })
  return response.data
}

export const getCountries = async (): Promise<ICountry[]> => {
  const response = await instance.get('/country')
  return response.data
}

export const getCurrencies = async (
  countryId?: string,
  type?: string,
  networkId?: number
): Promise<ICurrency[]> => {
  const response = await instance.get('/currency', {
    params: {
      type,
      networkId,
      countryId
    }
  })
  return response.data
}

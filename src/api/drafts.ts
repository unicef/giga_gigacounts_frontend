import { IDraft } from 'src/@types'
import instance from './init'

export const getDraft = async (id: string): Promise<IDraft> => {
  const response = await instance.get(`/contract/draft/${id}`)
  if (response.status === 200) return response.data
  throw new Error(`Draft with id=${id} not found`)
}

export const duplicateDraft = async (contractId: string) => {
  const response = await instance.post(`/contract/draft/duplicate/${contractId}`)
  return response.data
}

import { IUser } from 'src/@types'
import { DRAFT_ID_OFFSET } from 'src/constants'
import instance from './init'

const ENDPOINT_URL = '/contact'

export const addNewContact = async (userId: string, draftId: string): Promise<IUser> => {
  const response = await instance.post(`${ENDPOINT_URL}/isp`, {
    draftId: String(Number(draftId) - DRAFT_ID_OFFSET),
    userId
  })
  return response.data
}

export const deleteContact = async (userId: string, draftId: string): Promise<IUser> => {
  const response = await instance.delete(`${ENDPOINT_URL}/isp`, {
    params: {
      userId,
      draftId: String(Number(draftId) - DRAFT_ID_OFFSET)
    }
  })
  return response.data
}

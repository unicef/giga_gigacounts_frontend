import { IUser } from 'src/@types'
import instance from './init'

const ENDPOINT_URL = '/contact'

export const addNewContact = async (userId: string, draftId: string): Promise<IUser> => {
  const response = await instance.post(`${ENDPOINT_URL}/isp`, {
    draftId,
    userId
  })
  return response.data
}

export const deleteContact = async (userId: string, draftId: string): Promise<IUser> => {
  const response = await instance.delete(`${ENDPOINT_URL}/isp`, {
    params: {
      userId,
      draftId
    }
  })
  return response.data
}

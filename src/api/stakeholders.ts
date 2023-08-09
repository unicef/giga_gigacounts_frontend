import { IUser } from 'src/@types'
import instance from './init'

const ENDPOINT_URL = '/stakeholder'

export const addNewTeamMember = async (userId: string, draftId: string): Promise<IUser> => {
  const response = await instance.post(`${ENDPOINT_URL}`, {
    draftId,
    userId
  })
  return response.data
}

export const deleteTeamMember = async (userId: string, draftId: string): Promise<IUser> => {
  const response = await instance.delete(`${ENDPOINT_URL}`, {
    params: {
      userId,
      draftId
    }
  })
  return response.data
}

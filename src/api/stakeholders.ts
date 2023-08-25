import { IUser } from 'src/@types'
import { DRAFT_ID_OFFSET } from '../constants/config-global'
import instance from './init'

const ENDPOINT_URL = '/stakeholder'

export const addNewTeamMember = async (userId: string, draftId: string): Promise<IUser> => {
  const response = await instance.post(`${ENDPOINT_URL}`, {
    draftId: String(Number(draftId) - DRAFT_ID_OFFSET),
    userId
  })
  return response.data
}

export const deleteTeamMember = async (userId: string, draftId: string): Promise<IUser> => {
  const response = await instance.delete(`${ENDPOINT_URL}`, {
    params: {
      userId,
      draftId: String(Number(draftId) - DRAFT_ID_OFFSET)
    }
  })
  return response.data
}

import { IExternalUser, IUser } from 'src/@types'
import { DRAFT_ID_OFFSET } from 'src/constants'
import instance from './init'

const ENDPOINT_URL = '/contact'

export const addNewContact = async (
  contact: IExternalUser | IUser,
  draftId: string,
  external = false
): Promise<void> => {
  const response = await instance.post(
    `${ENDPOINT_URL}/isp`,
    {
      draftId: String(Number(draftId) - DRAFT_ID_OFFSET),
      ...contact,
      userId: Number('id' in contact ? contact.id : null)
    },
    { params: { externalUser: external ? 1 : 0 } }
  )
  return response.data
}

export const deleteContact = async (
  contact: IExternalUser | IUser,
  draftId: string,
  external = false
): Promise<void> => {
  const response = await instance.delete(`${ENDPOINT_URL}/isp`, {
    params: {
      externalUser: external ? 1 : 0
    },
    data: {
      draftId: String(Number(draftId) - DRAFT_ID_OFFSET),
      email: contact.email,
      userId: Number('id' in contact ? contact.id : null)
    }
  })
  return response.data
}

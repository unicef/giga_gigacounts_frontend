import { IFileUpload } from 'src/@types'
import { DRAFT_ID_OFFSET } from 'src/constants'
import instance from './init'

export const uploadAttachment = async (
  file: IFileUpload
): Promise<IFileUpload & { id: string }> => {
  const response = await instance.post('/attachments/upload', {
    ...file,
    typeId: String(Number(file.typeId) - DRAFT_ID_OFFSET)
  })
  return response.data
}

export const getAttachment = async (attachmentId: string) => {
  const response = await instance.get(`/attachments/${attachmentId}`)
  return response.data
}

export const deleteAttachment = async (attachmentId: string) => {
  const response = await instance.delete(`/attachments/${attachmentId}`)
  return response.data
}

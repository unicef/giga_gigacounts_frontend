import { IFileUpload } from 'src/@types'
import instance from './init'

export const uploadAttachment = async (file: IFileUpload) => {
  const response = await instance.post('/attachments/upload', {
    ...file
  })
  if (response.status === 200) return response.data
  throw new Error('Failed to upload attachment file')
}

export const getAttachment = async (attachmentId: string) => {
  const response = await instance.get(`/attachments/${attachmentId}`)
  if (response.status === 200) return response.data
  throw new Error('Attachment not found')
}

export const deleteAttachment = async (attachmentId: string) => {
  const response = await instance.delete(`/attachments/${attachmentId}`)
  if (response.status === 200) return response.data
  throw new Error('Failed to delete attachment file')
}

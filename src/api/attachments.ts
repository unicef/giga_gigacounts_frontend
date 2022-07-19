import { FileUpload } from 'src/components/Dashboard/Contracts/CreateContract/store/redux'
import instance from './init'

export const uploadContractFile = async (file: FileUpload) => {
  const response = await instance.post('/attachments/upload', {
    ...file,
  })
  if (response.status === 200) return response.data
  throw new Error('Failed to update the contract draft')
}

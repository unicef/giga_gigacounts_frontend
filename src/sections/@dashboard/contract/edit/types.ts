import { IUser, IFileUpload } from 'src/@types'

export type ContractSchoolsAndAttachments = {
  attachments: (IFileUpload & {status: 'edit' | 'uploading' | 'complete'})[]
  schools: { id: string; budget: string }[]
  contacts: IUser[]
  stakeholders: IUser[]
}

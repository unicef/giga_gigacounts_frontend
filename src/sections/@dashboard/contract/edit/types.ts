import { IUser, IFileUpload } from 'src/@types'

export type ContractSchoolsAndAttachments = {
  attachments: IFileUpload[]
  schools: { id: string; budget: string }[]
  contacts: IUser[]
  stakeholders: IUser[]
}

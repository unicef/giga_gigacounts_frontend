import { IExternalUser, IFileUpload, IUser } from 'src/@types'

export type ContractSchoolsAndAttachments = {
  attachments: (IFileUpload & { status: 'edit' | 'uploading' | 'complete'; id?: string })[]
  schools: { id: string; budget: string }[]
  contacts: (IExternalUser | IUser)[]
  stakeholders: IUser[]
}

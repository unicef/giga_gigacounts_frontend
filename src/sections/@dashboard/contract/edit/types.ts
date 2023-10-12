import { IExternalUser, IFileUpload, ISchool, IUser } from 'src/@types'

export type ContractSchoolsAndAttachments = {
  attachments: (IFileUpload & { status: 'edit' | 'uploading' | 'complete'; id?: string })[]
  schools: (ISchool & { budget: string })[]
  contacts: (IExternalUser | IUser)[]
  stakeholders: IUser[]
}

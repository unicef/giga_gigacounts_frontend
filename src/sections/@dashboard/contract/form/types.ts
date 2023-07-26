import { ContactPersonForm, ContractTeamMemberForm, IFileUpload } from 'src/@types'

export type ContractSchoolsAndAttachments = {
  attachments: IFileUpload[]
  schools: { id: string; budget: string }[]
  contacts: ContactPersonForm[]
  contractTeam: ContractTeamMemberForm[]
}

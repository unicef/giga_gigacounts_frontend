import { PaymentStatus } from './status'

export type HelpRequestForm = {
  code: string
  type: string
  functionality: string
  description: string
}

export type FeedbackForm = {
  rate: number
  comment: string
}

export type ContractTeamMemberForm = {
  name: string
  email: string
  phoneNumber: string
  description: string
}

export type ContactPersonForm = {
  name: string
  email: string
  phoneNumber: string
  description: string
}

export type ContractForm = {
  id: string
  ltaId: string
  name: string
  country: string
  isp: string
  startDate: Date | null
  endDate: Date | null
  launchDate: Date | null
  uptime: number
  downloadSpeed: number
  latency: number
  uploadSpeed: number
  contractTeam: ContractTeamMemberForm[]
  currency: string
  budget: number
  notes: string
  automatic: boolean
  bypass: boolean
  frequencyId: string
  addLaunchDate: boolean
}

export type PaymentForm = {
  status: PaymentStatus
  description: string
  amount: number
  payment: string
}

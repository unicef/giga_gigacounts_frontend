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
  currency: string
  budget: number
  notes: string
  automatic: boolean
  bypass: boolean
  frequencyId: string
  addLaunchDate: boolean
  breakingRules: string
  paymentReceiverId: string
}

export type PaymentForm = {
  status: PaymentStatus
  description: string
  amount: number
  payment: { month: number; day?: number; year: number }
}

export type ContractFundForm = {
  currency: string
  balance: number
  budget: number
  amount: number
}

export type WalletFundForm = {
  name: string
  currency: string
  amount: number
  walletFrom: string
  balanceFrom: number
  walletTo: string
  balanceTo: number
}

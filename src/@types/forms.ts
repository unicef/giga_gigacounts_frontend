import { IPeriod } from './general'
import { MetricCamel } from './metrics'
import { PaymentStatus } from './status'

export type HelpRequestForm = {
  type: string
  description: string
}

export type FeedbackForm = {
  rate: number
  comment: string
}

export type ContractForm = {
  id: string
  name: string
  country: string
  isp: string
  startDate: Date | null
  endDate: Date | null
  launchDate: Date | null
  currency: string
  budget: number
  notes: string
  automatic: boolean
  bypass: boolean
  frequencyId: string
  breakingRules: string
  paymentReceiverId: string
} & { [K in MetricCamel]: number }

export type PaymentForm = {
  status: PaymentStatus
  description: string
  amount: number
  payment: IPeriod | null
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

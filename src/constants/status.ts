import { ContractStatus, NotificationStatus, PaymentStatus, TagColor } from 'src/@types'

export const CONTRACT_STATUS_COLORS: { [Key in ContractStatus]: TagColor } = {
  [ContractStatus.Draft]: 'warm-gray',
  [ContractStatus.Sent]: 'cyan',
  [ContractStatus.Confirmed]: 'cool-gray',
  [ContractStatus.Ongoing]: 'purple',
  [ContractStatus.Expired]: 'cool-gray',
  [ContractStatus.Completed]: 'green'
} as const

export const PAYMENT_STATUS_COLORS: { [Key in PaymentStatus]: TagColor } = {
  [PaymentStatus.OnHold]: 'warm-gray',
  [PaymentStatus.Paid]: 'teal',
  [PaymentStatus.Verified]: 'magenta',
  [PaymentStatus.Unpaid]: 'red'
} as const

export const NOTIFICATION_STATUS_COLORS: { [Key in NotificationStatus]: TagColor } = {
  [NotificationStatus.READ]: 'blue',
  [NotificationStatus.SENT]: 'cool-gray'
}

export const SCHOOL_RELIABILITY_COLOR = (isReliable: boolean): TagColor =>
  isReliable ? 'green' : 'red'

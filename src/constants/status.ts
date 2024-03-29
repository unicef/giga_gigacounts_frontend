import {
  ConnectivityStatus,
  ContractStatus,
  NotificationStatus,
  PaymentStatus,
  TagColor,
  Web3TransactionStatus
} from 'src/@types'

export const CONTRACT_STATUS_COLORS: { [Key in ContractStatus]: TagColor } = {
  [ContractStatus.Draft]: 'warm-gray',
  [ContractStatus.Sent]: 'cyan',
  [ContractStatus.Confirmed]: 'cool-gray',
  [ContractStatus.Ongoing]: 'purple',
  [ContractStatus.Expired]: 'red',
  [ContractStatus.Completed]: 'green'
} as const

export const PAYMENT_STATUS_COLORS: { [Key in PaymentStatus]: TagColor } = {
  [PaymentStatus.Draft]: 'warm-gray',
  [PaymentStatus.Paid]: 'teal',
  [PaymentStatus.Unpaid]: 'red'
} as const

export const NOTIFICATION_STATUS_COLORS: { [Key in NotificationStatus]: TagColor } = {
  [NotificationStatus.READ]: 'blue',
  [NotificationStatus.SENT]: 'cool-gray'
}

export const SCHOOL_RELIABILITY_COLOR = (isReliable: boolean): TagColor =>
  isReliable ? 'green' : 'red'

export const WEB3_TRANSACTION_STATUS_COLORS: { [Key in Web3TransactionStatus]: TagColor } = {
  [Web3TransactionStatus.OK]: 'green',
  [Web3TransactionStatus.ERROR]: 'red'
}

export const CONNECTIVITY_STATUS_COLORS: { [Key in ConnectivityStatus]: TagColor } = {
  [ConnectivityStatus.Connected]: 'green',
  [ConnectivityStatus.PoorlyConnected]: 'magenta',
  [ConnectivityStatus.Disconnected]: 'red',
  [ConnectivityStatus.Unknown]: 'cool-gray'
}

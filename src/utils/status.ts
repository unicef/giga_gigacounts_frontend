import { ConnectivityStatus, ContractStatus, NotificationStatus, PaymentStatus } from 'src/@types'

const isString = (value: unknown): value is string => {
  if (typeof value === 'string' || value instanceof String) return true
  return false
}

const isContractStatus = (value: unknown): value is ContractStatus => {
  if (isString(value) && Object.keys(ContractStatus).includes(value)) return true
  return false
}

const isPaymentStatus = (value: unknown): value is PaymentStatus => {
  if (isString(value) && Object.keys(PaymentStatus).includes(value)) return true
  return false
}
const isConnectivityStatus = (value: unknown): value is ConnectivityStatus => {
  if (isString(value) && Object.keys(ConnectivityStatus).includes(value)) return true
  return false
}

const isNotificationStatus = (value: unknown): value is NotificationStatus => {
  if (isString(value) && Object.keys(NotificationStatus).includes(value)) return true
  return false
}

const parseContractStatus = (value: unknown) => {
  if (isContractStatus(value)) return value
  throw new Error(`${value} is not a valid contract status`)
}
const parsePaymentStatus = (value: unknown) => {
  if (isPaymentStatus(value)) return value
  throw new Error(`${value} is not a valid payment status`)
}

const parseConnectivityStatus = (value: unknown) => {
  if (isConnectivityStatus(value)) return value
  throw new Error(`${value} is not a valid connectivity status`)
}

const parseNotificationStatus = (value: unknown) => {
  if (isNotificationStatus(value)) return value
  throw new Error(`${value} is not a valid notification status`)
}

export { parseConnectivityStatus, parseContractStatus, parseNotificationStatus, parsePaymentStatus }

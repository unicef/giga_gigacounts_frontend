import { DataState } from 'src/state/types'
import { ExpectedMetric } from '../components/Dashboard/Contracts/CreateContract/state/types'
export interface ICountry {
  name: string
  code: string
  flagUrl: string
}

export interface IUser {
  name: string
  lastName: string
  email: string
  role: string
  country?: ICountry
}

export interface IContractCounts {
  counts: ICounts[]
  totalCount: number
}

export interface ICounts {
  status: string
  count: string
}

export interface IFileUpload {
  name: string
  typeId: string | null
  type: string
  file: string | ArrayBuffer | null
}

export interface IAttachment {
  id: string
  ipfs_url: string | null
  name: string
  url: string
}

export interface IDraft {
  id: string
  name: string
  country: ICountry | null
  currency: string | null
  budget: string | null
  attachments: IAttachment[]
  createdBy: IUser | null
  startDate: string | null
  endDate: string | null
  expectedMetrics: []
  frequency: string | null
  governmentBehalf: false
  isp: string | null
  lta: string | null
  schools: []
}

export interface IBudget {
  budget: string
  totalSpend: null
}

export interface ISchoolsConnections {
  allEqualOrAboveAvg: number
  atLeastOneBellowAvg: number
  withoutConnection: number
}

export interface ILtas {
  [key: string]: []
}

export interface IContractsData {
  ltas: ILtas
  contracts: IContract
}
export interface IContractDraft {
  id: string
  name: string
  country_id: number
  created_at: string
  currency_id: number
  end_date: string
  government_behalf: boolean
  lta_id: number
  start_date: string
  updated_at: string
}

export interface IConnectionMedian {
  contract_id: string
  metric_id: number
  metric_name: string
  unit: string
  median_value: number
}

export interface IContractDetails {
  id: string
  name: string
  isp: string
  lta: string
  attachments: IAttachment[]
  startDate: string
  endDate: string
  numberOfSchools: string
  numberOfPayments: string
  budget: string
  currency: ICurrency
  schoolsConnection: ISchoolsConnections
  connectionsMedian: IConnectionMedian[]
  schools: IContractSchools[]
  payments: IContractPayment[]
  totalSpent: IContractTotalSpent
}

export interface IPendingContractDetails {
  id: string
  name: string
  isp: string
  lta: string
  budget?: string
  currency?: ICurrency
  attachments: IAttachment[]
  startDate: string
  endDate: string
  numberOfSchools: string
  schoolsConnection: ISchoolsConnections
  expectedMetrics: ExpectedMetric[]
  schools: IContractSchools[]
}

type DetailsTypeByStatus<Status extends ContractStatus = ContractStatus> = Status extends
  | ContractStatus.Sent
  | ContractStatus.Confirmed
  ? IPendingContractDetails
  : IContractDetails

export interface ILta {
  id: string
  name: string
}

export interface IContract<Status extends ContractStatus = ContractStatus> {
  added?: boolean
  country?: ICountry
  id?: string
  isp?: string
  ltaId: string | null
  lta?: ILta
  name?: string
  governmentBehalf?: boolean
  numberOfSchools?: string
  schoolsConnection?: ISchoolsConnections
  status: Status
  totalSpent?: number
  details: DataState<DetailsTypeByStatus<Status>, true>
  listId?: string
}

export interface IContractSchoolsConnection {
  value: number
  downloadSpeed: number
  uploadSpeed: number
  uptime: number
  latency: number
}

export interface IContractSchools {
  id: string
  name: string
  externalId: string
  locations: string
  connection: IContractSchoolsConnection
}

export interface ISchoolMeasures {
  date: string
  metric_name: string
  uint: string
  median_value: number
}

export interface IContractTotalSpent {
  amount: string
  percentage: number
}

export interface IInvoice {
  file: string
  name: string
}

export interface IPaymentForm {
  month: number
  year: number
  contractId: string
  description: string
  currencyId: string
  amount: number
  invoice: IInvoice
}

export interface IContractPayment {
  id: string
  paidDate: string
  description: string
  currency: ICurrency
  amount: 10000
  status: string
  metrics: ISchoolsConnections
  invoice: IInvoice
}

export interface IPaymentMeasure {
  month: number
  year: number
  contractId: string
}

export interface ICurrency {
  id: string
  code?: string
  name: string
}

export enum ContractStatus {
  Draft = 'Draft',
  Sent = 'Sent',
  Confirmed = 'Confirmed',
  Ongoing = 'Ongoing',
  Expired = 'Expired',
  Completed = 'Completed',
}

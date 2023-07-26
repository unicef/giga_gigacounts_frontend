import { ActionType } from './action-types'
import { ContactPersonForm, ContractTeamMemberForm } from './forms'
import { ContractStatus, PaymentStatus } from './status'

export interface ICountry {
  id: string
  name: string
  code: string
  flagUrl: string
}

export interface ISafe {
  id: string
  name: string
  address: string
}

export interface IRole {
  code: string
  name: string
  permissions: string[]
}

export interface IUser {
  id: string
  name: string
  lastName: string
  displayName: string
  email: string
  about: string
  zipCode: string
  address: string
  phoneNumber: string
  photoUrl: string
  role: IRole
  country?: ICountry
  safe?: ISafe
  walletAddress: string | null
  isp?: IISP
  automaticContractsEnabled?: boolean | false
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
  viewOnly?: boolean
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
  currency: ICurrency | null
  budget: string | null
  attachments: IAttachment[]
  createdBy: IUser | null
  startDate: string | null
  endDate: string | null
  launchDate: string | null
  expectedMetrics: { name: string; metricId: string; value: string }[]
  frequency: IFrequency | null
  governmentBehalf: boolean
  automatic: boolean
  isp: IISP | null
  lta?: ILta
  schools: any[]
  notes: string
  contactPeople?: ContactPersonForm[]
  contractTeam?: ContractTeamMemberForm[]
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

export interface IContractsData {
  ltas: ILtas
  contracts: IContract[]
}
export interface IContractDraft {
  listId: string
  id: string
  name: string
  country_id: number
  created_at: string
  currency_id: number
  end_date: string
  government_behalf: boolean
  lta: ILtas
  start_date: string
  updated_at: string
  schools?: IContractSchools[]
  startDate?: string
  endDate?: string
  budget: string
  currency: ICurrency
  expectedMetrics?: {
    id: string
    value: string
    name: 'Uptime' | 'Download speed' | 'Upload speed' | 'Latency'
  }[]
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
  status: ContractStatus
  country: ICountry
  expectedMetrics: {
    metricId: string
    value: string
    metricName: 'Uptime' | 'Download speed' | 'Upload speed' | 'Latency'
    metricUnit: 'Mb/s' | 'ms' | '%'
  }[]
  name: string
  isp: string
  lta: ILta
  attachments: IAttachment[]
  startDate: string
  endDate: string
  launchDate: string
  numberOfSchools: string
  numberOfPayments: string
  budget: string
  currency: ICurrency
  schoolsConnection: ISchoolsConnections
  connectionsMedian: IConnectionMedian[]
  schools: IContractSchools[]
  payments: DataState<IContractPayment[]>
  totalSpent: IContractTotalSpent
  notes: string
  frequency: IFrequency
  automatic: boolean
}

export interface IPendingContractDetails {
  id: string
  name: string
  isp: string
  lta: ILta
  budget?: string
  currency?: ICurrency
  attachments: IAttachment[]
  startDate: string
  endDate: string
  numberOfSchools: string
  schoolsConnection: ISchoolsConnections
  // expectedMetrics: ExpectedMetric[]
  schools: IContractSchools[]
}

type DetailsTypeByStatus<Status extends ContractStatus = ContractStatus> = Status extends
  | ContractStatus.Sent
  | ContractStatus.Confirmed
  ? IPendingContractDetails
  : IContractDetails

export interface ILtas {
  [key: string]: []
}

export interface ILta {
  id: string
  name: string
  country_id: string
}

export interface IContract<Status extends ContractStatus = ContractStatus> {
  added?: boolean
  country?: ICountry
  id: string
  isp?: string
  lta?: ILta
  name: string
  governmentBehalf?: boolean
  numberOfSchools: string
  budget: string
  schoolsConnection?: ISchoolsConnections
  status: Status
  totalSpent?: number
  details: DataState<DetailsTypeByStatus<Status>, true>
  listId?: string
  currencyCode: string
  automatic: boolean
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
  budget: string
}

export interface ISchoolMeasures {
  date: string
  metric_name: string
  unit: string
  median_value: number
}

export interface IContractTotalSpent {
  amount: string
  percentage: number
}

export interface IPaymentAttachment {
  id: string
  ipfs_url: string | null
  name: string
  url: string
}

export interface IPaymentForm {
  month: number
  year: number
  day?: number
  contractId: string
  description: string
  amount: number
  invoice?: IFileUpload
  receipt?: IFileUpload
}

export interface IContractPayment {
  id: string
  contractId: string
  contractStatus: ContractStatus
  contractFrequency: IFrequency['name']
  contractAutomatic?: boolean | false
  paidDate: {
    month: number
    year: number
    day?: number
  }
  dateFrom: string
  dateTo: string
  description: string
  currency: ICurrency
  amount: number
  status: PaymentStatus
  metrics: IPaymentMetrics
  invoice?: IPaymentAttachment
  receipt?: IPaymentAttachment
  createdBy: {
    name: string
    role?: string
  }
}

export interface IPaymentMeasure {
  month: number
  year: number
  contractId: string
}

export interface IPaymentDate {
  month: number
  year: number
}

export interface IPaymentMetrics {
  connectionsMedian?: IConnectionMedian[]
  allEqualOrAboveAvg: number
  atLeastOneBellowAvg: number
  withoutConnection: number
}

export interface ICurrency {
  id: string
  code: string
  name: string
  type: string
  contractAddress: string
  networkId: number
}

export enum UploadType {
  invoice = 'invoice',
  receipt = 'receipt',
  draft = 'draft',
  contract = 'contract'
}

export interface IISP {
  id: string
  name: string
}

export enum ICurrencyTypes {
  fiat = 'fiat',
  crypto = 'crypto'
}

export interface DataState<
  T extends Record<string, any>,
  ALLOW_UNDEFINED extends boolean = false,
  Meta extends Record<string, string | number | null | undefined | boolean> | undefined = undefined
> {
  data: ALLOW_UNDEFINED extends true ? T | undefined : T
  error?: Error
  loading: boolean
  meta?: Meta extends undefined
    ? undefined
    : Record<string, string | number | null | undefined | boolean>
}

export interface ContractCounts {
  draft: number
  sent: number
  confirmed: number
  ongoing: number
  expired: number
  completed: number
  total: number
}

export type UserState = DataState<IUser, true>

export type ContractCountsState = DataState<ContractCounts>

export interface GeneralState {
  user: UserState
  contractCounts: ContractCountsState
}

export interface Action {
  type: ActionType
  payload?: any
}

export type Contract = {
  id?: string
  name: string
  ispId?: string
  countryId?: string
  expectedMetrics: {
    metrics: ({ metricId: string; value: string } | null)[]
  }
  ltaId?: string
  budget: string
  startDate: string
  endDate: string
  launchDate: string
  schools: {
    schools: any[]
  }
  currencyId?: string
  currencyType?: string
  notes: string
  automatic: boolean
  frequencyId?: string
  contactPeople?: ContactPersonForm[]
}

export interface INotification {
  id: string
  email: string | null
  config_id: string
  user_id: string | null
  status: string
  title: string
  message: string
  sub_message: string | null
  created_at: string
  sent_at: string
  viewed_at: string | null
  type: string | null
  avatar: string | null
}

export interface ISchool {
  id: string
  external_id: string
  name: string
  address: string
  location1: string
  location2: string
  location3: string
  location4: string
  education_level: string
  geopoint: string
  email: string
  phone_number: string
  contact_person: string
  country_id: string
}
export type SchoolCell = ISchool & { budget: string }

export interface IFrequency {
  id: string
  name: 'Weekly' | 'Biweekly' | 'Monthly'
}

export type MetricName =
  | 'uptime'
  | 'download_speed'
  | 'upload_speed'
  | 'latency'
  | 'Uptime'
  | 'Download speed'
  | 'Latency'
  | 'Upload speed'

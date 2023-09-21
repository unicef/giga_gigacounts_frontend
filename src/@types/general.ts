import { ActionType } from './action-types'
import { Metric, MetricCamel } from './metrics'
import { ContractStatus, PaymentStatus } from './status'
import { UserRoles } from './user'

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
  code: UserRoles | ''
  name: string
  permissions: string[]
}

export interface IUser {
  id: string
  name: string
  lastName: string
  email: string
  about: string
  zipCode: string
  address: string
  phoneNumber: string
  photoUrl: string
  role: IRole
  country: ICountry
  safe?: ISafe
  countryName: string
  completeName: string
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
  schools: (ISchool & { budget: string })[]
  notes: string
  ispContacts: IExternalUser[]
  stakeholders: IUser[]
  breakingRules: string
  paymentReceiver?: {
    id: number
    name: string
    email: string
    lastName: string
  }
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
    name: Metric
  }[]
}

export interface IConnectionMedian {
  contract_id: string
  metric_id: number
  metric_name: Metric
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
    metricName: Metric
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
  breakingRules: string
  cashback?: number
  ispContacts: IUser[]
  stakeholders: IUser[]
  paymentReceiver?: {
    id: number
    name: string
    email: string
    lastName: string
  }
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
  start_date: string | null
  end_date: string | null
}

export type ContractSchoolsConnection = {
  value: number
} & { [K in MetricCamel]: number }

export interface ISchoolContact {
  contactPerson: string
  email: string
  phoneNumber: string
}
export interface IContractSchools {
  id: string
  educationLevel: EducationLevel
  name: string
  externalId: string
  locations: string
  connection: ContractSchoolsConnection
  budget: string
  contactInformation: ISchoolContact
}

export interface ISchoolMeasures {
  measure_id: string
  date: string
  metric_name: string
  unit: string
  median_value: number
}
export interface ISchoolMeasuresExtended extends ISchoolMeasures {
  contract_name: string
  school_name: string
  school_education_level: EducationLevel
  school_external_id: string
  school_location1: string
  connection: { value: number }
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

export interface IPaymentForm extends IPeriod {
  contractId: string
  description: string
  amount: number
  invoice?: IFileUpload
  receipt?: IFileUpload
}

export interface IContractPayment {
  id: string
  contractId: string
  contractName?: string
  contractStatus: ContractStatus
  contractFrequency: IFrequency['name']
  contractAutomatic?: boolean
  paidDate: IPeriod
  dateFrom: string
  dateTo: string
  description: string
  currency: ICurrency
  amount: number
  discount?: number
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
    schools: (ISchool & { budget: string })[]
  }
  currencyId?: string
  currencyType?: string
  notes: string
  automatic: boolean
  frequencyId?: string
  ispContacts?: IUser[]
  breakingRules: string
  paymentReceiverId?: string
  cashback?: number
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
  education_level: EducationLevel
  geopoint: string
  email: string
  phone_number: string
  contact_person: string
  country_id: string
  reliable_measures: boolean
}
export type SchoolCell = ISchool & { budget: string }

export interface IFrequency {
  id: string
  name: 'Weekly' | 'Biweekly' | 'Monthly' | 'Daily'
}

export type EducationLevel = 'High school' | 'Primary' | 'Secondary'
export interface IExternalUser {
  name: string
  role: IRole
  email: string
  phoneNumber: string
  ispId: string
  countryId: string
}
export interface IExternalUserWithId extends IExternalUser {
  id: string
  ispName: string
}

export interface IPeriod {
  day?: number
  month: number
  year: number
}

export interface IPaymentConnection {
  schoolsConnected: {
    goodConnection: number
    badConnection: number
    noConnection: number
    unknownConnection: number
  }
  daysConnected: {
    goodConnection: number
    badConnection: number
    noConnection: number
    unknownConnection: number
  }
}

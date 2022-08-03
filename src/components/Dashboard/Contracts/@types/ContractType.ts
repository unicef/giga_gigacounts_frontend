import { ICurrency } from 'src/api/createContract'
import { DataState } from 'src/state/types'
import { ExpectedMetric } from '../CreateContract/state/types'

export interface IBudget {
  budget: string
  totalSpend: null
}

export interface ICountry {
  code: string
  flagUrl: string
  name: string
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

export interface IAttachment {
  id: string
  url: string
  name: string
  ipfsUrl: string
  createdAt: string
  updatedAt: string
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
  schoolsConnection: ISchoolsConnections
  connectionsMedian: IConnectionMedian[]
  schools: IContractSchools[]
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

export interface IContract<Status extends ContractStatus = ContractStatus> {
  added?: boolean
  country?: ICountry
  id?: string
  isp?: string
  ltaId: string | null
  name?: string
  governmentBehalf?: boolean
  numberOfSchools?: string
  schoolsConnection?: ISchoolsConnections
  status: Status
  totalSpent?: number
  details: DataState<DetailsTypeByStatus<Status>, true>
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

export enum ContractStatus {
  Draft = 'Draft',
  Sent = 'Sent',
  Confirmed = 'Confirmed',
  Ongoing = 'Ongoing',
  Expired = 'Expired',
  Completed = 'Completed',
}

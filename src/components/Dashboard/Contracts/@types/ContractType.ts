import { DataState } from 'src/state/types'

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
  id: number
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

export interface IContract {
  added?: boolean
  budget?: IBudget
  country?: ICountry
  id?: string
  isp?: string
  ltaId?: string
  name?: string
  governmentBehalf?: boolean
  numberOfSchools?: string
  schoolsConnection?: ISchoolsConnections
  status: string
  totalSpent?: number
  details: DataState<IContractDetails, true>
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

export enum ContractStatus {
  Draft = 'Draft',
  Sent = 'Sent',
  Confirmed = 'Confirmed',
  Ongoing = 'Ongoing',
  Expired = 'Expired',
  Completed = 'Completed',
}

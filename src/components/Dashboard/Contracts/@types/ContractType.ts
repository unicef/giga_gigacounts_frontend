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

export interface IContracts {
  added?: boolean
  budget?: IBudget
  country?: ICountry
  id?: string
  isp?: string
  ltaId?: null
  name?: string
  numberOfSchools?: string
  schoolsConnection?: ISchoolsConnections
  status: string
  totalSpent?: number
}

export interface ILtas {
  [key: string]: []
}

export interface IContractsData {
  ltas: ILtas
  contracts: IContracts
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
  attachments: []
  startDate: string
  endDate: string
  numberOfSchools: string
  schoolsConnection: ISchoolsConnections
  connectionsMedian: IConnectionMedian[]
}

export enum ContractStatus {
  Draft = 'Draft',
  Sent = 'Sent',
  Confirmed = 'Confirmed',
  Ongoing = 'Ongoing',
  Expired = 'Expired',
  Completed = 'Completed',
}

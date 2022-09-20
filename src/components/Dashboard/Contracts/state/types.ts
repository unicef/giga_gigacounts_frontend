import { DataState } from 'src/state/types'
import { IContract, ILta } from 'src/types/general'

export enum ContractsActionType {
  SET_NEW_CONTRACT = 'SET_NEW_CONTRACT',
  RESPONSE = 'RESPONSE',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
  SET_CONTRACT_DETAILS_SCHOOLS_PAYMENTS = 'SET_CONTRACT_DETAILS_SCHOOLS_PAYMENTS',
  SET_CONTRACT_PAYMENTS_LOADING = 'SET_CONTRACT_PAYMENTS_LOADING',
  SET_CONTRACT_PAYMENTS_ERROR = 'SET_CONTRACT_PAYMENTS_ERROR',
  SET_CONTRACT_PAYMENTS = 'SET_CONTRACT_PAYMENTS',
  SET_CONTRACT_DETAILS_LOADING = 'SET_CONTRACT_DETAILS_LOADING',
  SET_CONTRACT_DETAILS_ERROR = 'SET_CONTRACT_DETAILS_ERROR',
  SET_ACTIVE_NAV_ITEM = 'SET_ACTIVE_NAV_ITEM',
  SET_SCHOOL_MEASURES_LOADING = 'SET_SCHOOL_MEASURES_LOADING',
  SET_SCHOOL_MEASURES_ERROR = 'SET_SCHOOL_MEASURES_ERROR',
  SET_SCHOOL_MEASURES = 'SET_SCHOOL_MEASURES',
  SET_SELECTED_SCHOOL = 'SET_SELECTED_SCHOOL',
  SET_ACTIVE_TAB = 'SET_ACTIVE_TAB',
  SET_EXPANDED_LTA = 'SET_EXPANDED_LTA',
}

export interface ContractsAction {
  type: ContractsActionType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any
}

export interface ContractsState {
  contracts?: IContract[]
  ltas?: ILta[]
  selectedSchool?: {
    schoolId?: string
    contractId?: string
  }
  schoolsQos: Record<string, DataState<SchoolsQos[], true>>
  activeNavItem?: NavItemType
  error?: Error
  loading?: boolean
  newContract?: {
    ltaId?: string
  }
  activeTab: ContractStagedActiveTab
  contractPayments: Array<{}>
  expandedLtaId: string | null
}

export interface ContractStagedTabItems {
  id: string
  name: string
}

export enum ContractStagedActiveTab {
  schools = 'schools',
  payments = 'payments',
}

export interface SchoolsQos {
  year: number
  month: number
  metrics: {
    uptime: SchoolQosMetric
    latency: SchoolQosMetric
    upload: SchoolQosMetric
    download: SchoolQosMetric
  }
}

export interface SchoolQosMetric {
  value: number
  unit: string
}

export interface SchoolQosResponse {
  date: string
  metric_name: string
  unit: string
  median_value: number
}

export enum MetricPropertyType {
  latency = 'latency',
  uptime = 'uptime',
  'download speed' = 'download',
  'upload speed' = 'upload',
}

export enum NavItemType {
  all = 'all',
  draft = 'draft',
  sent = 'sent',
  confirmed = 'confirmed',
  ongoing = 'ongoing',
  expired = 'expired',
  completed = 'completed',
}

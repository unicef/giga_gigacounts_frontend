import { IContract, ILta, IPaymentForm } from 'src/types/general'

export enum ContractsActionType {
  SET_NEW_CONTRACT = 'SET_NEW_CONTRACT',
  RESPONSE = 'RESPONSE',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
  SET_CONTRACT_DETAILS_SCHOOLS_PAYMENTS = 'SET_CONTRACT_DETAILS_SCHOOLS_PAYMENTS',
  SET_CONTRACT_DETAILS_LOADING = 'SET_CONTRACT_DETAILS_LOADING',
  SET_CONTRACT_DETAILS_ERROR = 'SET_CONTRACT_DETAILS_ERROR',
  SET_ACTIVE_NAV_ITEM = 'SET_ACTIVE_NAV_ITEM',
  SET_SCHOOL_MEASURES = 'SET_SCHOOL_MEASURES',
  SET_SELECTED_SCHOOL = 'SET_SELECTED_SCHOOL',
  SET_ACTIVE_TAB = 'SET_ACTIVE_TAB',
  SET_SELECTED_PAYMENT = 'SET_SELECTED_PAYMENT',
  SHOW_PAYMENT_DETAILS = 'SHOW_PAYMENT_DETAILS',
  SET_PAYMENT_DESCRIPTION = 'SET_PAYMENT_DESCRIPTION',
  SET_PAYMENT_DATE = 'SET_PAYMENT_DATE',
  SET_PAYMENT_AMOUNT = 'SET_PAYMENT_AMOUNT',
  PAYMENT_CREATED = 'PAYMENT_CREATED',
  SET_PAYMENT_FORM = 'SET_PAYMENT_FORM',
  GET_CONTRACT_PAYMENTS = 'GET_CONTRACT_PAYMENTS',
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
  selectedPayment?: {
    paymentId?: string
    contractId?: string
  }
  noSchoolMetricData: boolean
  schoolsQos: SchoolsQos[]
  activeNavItem?: NavItemType
  error?: Error
  loading?: boolean
  newContract?: {
    ltaId?: string
  }
  activeTab: ContractStagedActiveTab
  paymentDetails: boolean
  paymentActiveNewRow: boolean
  paymentForm: IPaymentForm
  contractPayments: Array<{}>
}

export interface ContractStagedTabItems {
  id: string
  name: string
}

export enum ContractStagedActiveTab {
  SchoolsTab = 'schoolTab',
  PaymentsTab = 'paymentsTab',
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
  draft = 'draft',
  sent = 'sent',
  confirmed = 'confirmed',
  ongoing = 'ongoing',
  expired = 'expired',
  completed = 'completed',
}

export interface PaymentForm {
  description: string
  dateId: string | null
  amount: number
}

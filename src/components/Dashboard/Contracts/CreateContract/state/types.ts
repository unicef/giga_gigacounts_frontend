import { DataState } from 'src/state/types'
import { ICountries, ILtas } from 'src/api/createContract'
import { IIsp } from 'src/api/isp'
import { IMetric } from 'src/api/metrics'
import { ISchool } from 'src/api/school'
import { ICurrency, ICurrencyTypes, IDraft } from 'src/types/general'

export enum CreateContractActiveTab {
  GeneralTab = 'generalTab',
  ConnectionTab = 'connectionTab',
  SchoolsTab = 'schoolsTab',
}

export enum CreateContractTabState {
  Default = 'Default',
  DefaultCompleted = 'DefaultCompleted',
  DefaultError = 'DefaultError',
  Selected = 'Selected',
  SelectedCompleted = 'SelectedCompleted',
  SelectedError = 'SelectedError',
}

export interface CreateContractTab {
  id: string
  name: string
}

export enum CreateContractActionType {
  DRAFT_LOADING = 'DRAFT_LOADING',
  DRAFT_LOADED = 'DRAFT_LOADED',
  SET_LOADING_DRAFT_ERROR = 'SET_LOADING_DRAFT_ERROR',
  GET_FORM_DATA = 'GET_FORM_DATA',
  SET_COUNTRIES = 'SET_COUNTRIES',
  SET_CONTRACT_NAME = 'SET_CONTRACT_NAME',
  SET_ACTIVE_TAB = 'SET_ACTIVE_TAB',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
  SET_EXPECTED_METRIC = 'SET_EXPECTED_METRIC',
  SET_METRICS_ISPS = 'SET_METRICS_ISPS',
  SET_COUNTRY_CODE = 'SET_COUNTRY_CODE',
  SET_BEHALF_GOVERNMENT = 'SET_BEHALF_GOVERNMENT',
  SET_SCHOOLS_LOADING = 'SET_SCHOOLS_LOADING',
  SET_SCHOOLS_ERROR = 'SET_SCHOOLS_ERROR',
  RESPONSE_SCHOOLS = 'RESPONSE_SCHOOLS',
  SELECT_SCHOOL = 'SELECT_SCHOOL',
  SELECT_SCHOOL_BULK = 'SELECT_SCHOOL_BULK',
  SET_START_DATE = 'SET_START_DATE',
  SET_END_DATE = 'SET_END_DATE',
  SET_CURRENCY_CODE = 'SET_CURRENCY_CODE',
  SET_LTA = 'SET_LTA',
  SET_BUDGET = 'SET_BUDGET',
  SET_SERVICE_PROVIDER = 'SET_SERVICE_PROVIDER',
  SET_QUALITY_OF_SERVICE = 'SET_QUALITY_OF_SERVICE',
  SET_SHOW_DIALOG = 'SET_SHOW_DIALOG',
  RESET = 'RESET',
  GET_LTS_BY_COUNTRY_ID = 'GET_LTS_BY_COUNTRY_ID',
  SET_CURRENCY_TYPE = 'SET_CURRENCY_TYPE',
}

export interface CreateContractAction {
  type: CreateContractActionType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any
}

export enum MetricId {
  uptime = 1,
  latency = 2,
  downloadSpeed = 3,
  uploadSpeed = 4,
}

export interface IQualityService {
  selectedValue: string
  metricId: number
}

export interface ExpectedMetric {
  metricId: string
  value: number
}

export interface ContractPreset {
  ltaId?: string
  countryId?: string
}

export interface ContractForm {
  id: string | null
  name?: string
  countryId?: string
  currencyId?: string
  ltaId: string | undefined
  ispId: number | undefined
  expectedMetrics: { metrics: ExpectedMetric[] }
  governmentBehalf: boolean
  budget: string
  startDate: string
  endDate: string
  schools: { schools: { id: string }[] }
  currencyType: ICurrencyTypes
}

export interface CreateContractState {
  draft: DataState<IDraft, true>
  activeTab: CreateContractActiveTab
  error?: Error
  loading?: boolean
  missingData: boolean
  invalidData: boolean
  tabGeneralStatus: string
  tabConnectionStatus: string
  tabSchoolStatus: string
  expectedMetrics: {
    metrics: ExpectedMetric[]
  }
  metrics: IMetric[]
  isps: IIsp[]
  countries: ICountries[]
  currencies: ICurrency[]
  ltas: Record<string, ILtas[]>
  contractForm: ContractForm
  schools: DataState<
    ISchool[],
    true,
    {
      contract_id?: number
    }
  >
  showDialog: boolean
}

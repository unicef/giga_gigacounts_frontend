import { DataState } from 'src/state/types'
import { ICountries, ICurrency, ILtas } from 'src/api/createContract'
import { IIsp } from 'src/api/isp'
import { IMetric } from 'src/api/metrics'
import { ISchool } from 'src/api/school'
import { IDraft } from 'src/types/general'

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
  LOAD_DRAFT = 'LOAD_DRAFT',
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
  RESPONSE_SCHOOLS = 'RESPONSE_SCHOOLS',
  SELECT_SCHOOL = 'SELECT_SCHOOL',
  SELECT_SCHOOL_BULK = 'SELECT_SCHOOL_BULK',
  SET_START_DATE = 'SET_START_DATE',
  SET_END_DATE = 'SET_END_DATE',
  CREATE_CONTRACT_DRAFT = 'CREATE_CONTRACT_DRAFT',
  UPDATE_CONTRACT_DRAFT = 'UPDATE_CONTRACT_DRAFT',
  SET_CURRENCY_CODE = 'SET_CURRENCY_CODE',
  SET_LTA = 'SET_LTA',
  SET_BUDGET = 'SET_BUDGET',
  SET_SERVICE_PROVIDER = 'SET_SERVICE_PROVIDER',
  SET_QUALITY_OF_SERVICE = 'SET_QUALITY_OF_SERVICE',
}

export interface CreateContractAction {
  type: CreateContractActionType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any
}

export interface IQualityService {
  selectedValue: string
  metricId: number
}

export interface ExpectedMetric {
  metricId: number
  value: number
}

export interface ContractForm {
  id: string | null
  name?: string
  countryId: number | undefined
  currencyId: number | undefined
  ltaId: number | undefined
  ispId: number | undefined
  expectedMetrics: { metrics: ExpectedMetric[] }
  governmentBehalf: boolean
  budget: string
  startDate: string
  endDate: string
  schools: { schools: { id: number }[] }
}

export interface CreateContractState {
  draft: DataState<IDraft, true>
  activeTab: CreateContractActiveTab
  error: string
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
  ltas: ILtas[]
  contractForm: ContractForm
  flag: string
  schools: ISchool[]
}
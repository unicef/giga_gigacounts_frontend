import { IContract, ILta } from 'src/types/general'

export enum ContractsActionType {
  SET_NEW_CONTRACT = 'SET_NEW_CONTRACT',
  RESPONSE = 'RESPONSE',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
  SET_CONTRACT_DETAILS_SCHOOLS = 'SET_CONTRACT_DETAILS_SCHOOLS',
  SET_CONTRACT_DETAILS_LOADING = 'SET_CONTRACT_DETAILS_LOADING',
  SET_CONTRACT_DETAILS_ERROR = 'SET_CONTRACT_DETAILS_ERROR',
  SET_ACTIVE_NAV_ITEM = 'SET_ACTIVE_NAV_ITEM',
  SET_SCHOOL_MEASURES = 'SET_SCHOOL_MEASURES',
  SET_SELECTED_SCHOOL = 'SET_SELECTED_SCHOOL',
  SET_SELECTED_CONTRACT_LIST_ID = 'SET_SELECTED_CONTRACT_LIST_ID',
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
  schoolQosDate?: string[]
  schoolQosMetricName?: string[]
  schoolQosMedianValue?: string[][]
  noSchoolMetricData: boolean
  activeNavItem?: string
  error?: Error
  loading?: boolean
  newContract?: {
    ltaId?: string
  }
  selectedContractListId?: string
}

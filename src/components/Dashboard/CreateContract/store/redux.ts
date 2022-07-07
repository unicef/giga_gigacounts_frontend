import { IMetric } from 'src/api/metrics'
import { IIsp } from 'src/api/isp'
import { ISchool } from 'src/api/school'
import { ICountries, ICurrency, ILtas } from 'src/api/createContract'

export enum ActiveTab {
  GeneralTab = 'generalTab',
  ConnectionTab = 'connectionTab',
  SchoolsTab = 'schoolsTab',
}

export enum TabState {
  Default = 'Default',
  DefaultCompleted = 'DefaultCompleted',
  DefaultError = 'DefaultError',
  Selected = 'Selected',
  SelectedCompleted = 'SelectedCompleted',
  SelectedError = 'SelectedError',
}

export interface ITabItems {
  id: string
  name: string
  tabStatus?: string
}

export enum ActionType {
  GET_FORM_DATA = 'GET_FORM_DATA',
  SET_COUNTRIES = 'SET_COUNTRIES',
  SET_CONTRACT_NAME = 'SET_CONTRACT_NAME',
  SET_ACTIVE_TAB = 'SET_ACTIVE_TAB',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
  SET_EXPECTED_METRIC = 'SET_EXPECTED_METRIC',
  RESPONSE_METRICS = 'RESPONSE_METRICS',
  RESPONSE_ISPS = 'RESPONSE_ISPS',
  SET_COUNTRY_CODE = 'SET_COUNTRY_CODE',
  SET_BEHALF_GOVERNMENT = 'SET_BEHALF_GOVERNMENT',
  RESPONSE_SCHOOLS = 'RESPONSE_SCHOOLS',
  SELECT_SCHOOL = 'SELECT_SCHOOL',
  SELECT_SCHOOL_BULK = 'SELECT_SCHOOL_BULK',
}

export interface Action {
  type: ActionType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any
}

export interface ExpectedMetric {
  metricId: number
  value: number
}

export interface State {
  activeTab: ActiveTab
  error?: Error
  loading?: boolean
  missingData: boolean
  invalidData: boolean
  tabGeneralStatus: string
  tabConnectionStatus: string
  tabSchoolStatus: string
  expectedMetrics: { metrics: ExpectedMetric[] }
  metrics: IMetric[]
  isps: IIsp[]
  countries: ICountries[]
  currencies: ICurrency[]
  ltas: ILtas[]
  generalTabForm: {
    contractNumber: string
    countryCode: string
    behalfOfGovernment: boolean
  }
  flag: string
  schools: ISchool[]
  selectedSchools: { id: number }[]
}

export const reducer = (state: State, action: Action): State => {
  const { type, payload } = action
  switch (type) {
    case ActionType.SET_ACTIVE_TAB: {
      let missing = false
      let invalid = false

      if (payload.activeTab === ActiveTab.ConnectionTab) {
        // TODO - to be removed - just test message
        missing = true
      }
      if (payload.activeTab === ActiveTab.SchoolsTab) {
        // TODO - to be removed - just test message
        invalid = true
      }

      return {
        ...state,
        activeTab: payload.activeTab,
        tabGeneralStatus: payload.tabGeneralStatus,
        tabConnectionStatus: payload.tabConnectionStatus,
        tabSchoolStatus: payload.tabSchoolStatus,
        missingData: missing,
        invalidData: invalid,
      }
    }

    case ActionType.GET_FORM_DATA: {
      const { countries, currencies, ltas } = payload
      return {
        ...state,
        countries,
        currencies,
        ltas,
        loading: false,
      }
    }

    case ActionType.SET_COUNTRY_CODE:
      return {
        ...state,
        generalTabForm: {
          ...state.generalTabForm,
          countryCode: payload,
        },
        flag: payload,
      }

    case ActionType.SET_CONTRACT_NAME:
      return {
        ...state,
        generalTabForm: {
          ...state.generalTabForm,
          contractNumber: payload,
        },
      }

    case ActionType.SET_BEHALF_GOVERNMENT: {
      return {
        ...state,
        generalTabForm: {
          ...state.generalTabForm,
          behalfOfGovernment: !state.generalTabForm.behalfOfGovernment,
        },
      }
    }

    case ActionType.SET_ERROR:
      return {
        ...state,
        error: payload,
      }

    case ActionType.SET_LOADING:
      return {
        ...state,
        loading: !state.loading,
      }

    case ActionType.SET_EXPECTED_METRIC: {
      const metricIndex = state.expectedMetrics.metrics.findIndex((m) => m.metricId === payload.metricId)

      const newExpectedMetrics =
        metricIndex >= 0
          ? [
              ...state.expectedMetrics.metrics.slice(0, metricIndex),
              { ...state.expectedMetrics.metrics[metricIndex], value: payload.value, metricId: payload.metricId },
              ...state.expectedMetrics.metrics.slice(metricIndex + 1),
            ]
          : [{ value: payload.value, metricId: payload.metricId }, ...state.expectedMetrics.metrics]

      return {
        ...state,
        expectedMetrics: { metrics: newExpectedMetrics },
      }
    }

    case ActionType.RESPONSE_METRICS: {
      return {
        ...state,
        metrics: payload,
      }
    }

    case ActionType.RESPONSE_ISPS: {
      return {
        ...state,
        isps: payload,
      }
    }

    case ActionType.RESPONSE_SCHOOLS: {
      return {
        ...state,
        schools: payload,
      }
    }

    case ActionType.SELECT_SCHOOL: {
      const index = state.selectedSchools.findIndex((s) => s.id === payload.id)

      const newSchools =
        index >= 0
          ? [...state.selectedSchools.slice(0, index), ...state.selectedSchools.slice(index + 1)]
          : [{ id: payload.id }, ...state.selectedSchools]

      return {
        ...state,
        selectedSchools: newSchools,
      }
    }

    case ActionType.SELECT_SCHOOL_BULK: {
      return {
        ...state,
        selectedSchools: [...payload, ...state.selectedSchools],
      }
    }

    default:
      return {
        ...state,
      }
  }
}

export const state: State = {
  activeTab: ActiveTab.GeneralTab,
  error: undefined,
  loading: true,
  missingData: false,
  invalidData: false,
  tabGeneralStatus: TabState.Selected,
  tabConnectionStatus: TabState.Default,
  tabSchoolStatus: TabState.Default,
  expectedMetrics: { metrics: [] },
  metrics: [],
  isps: [],
  countries: [],
  currencies: [],
  ltas: [],
  generalTabForm: {
    contractNumber: '',
    countryCode: '',
    behalfOfGovernment: false,
  },
  flag: 'BW',
  schools: [],
  selectedSchools: [],
}

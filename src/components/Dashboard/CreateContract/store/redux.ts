import { IMetric } from 'src/api/metrics'
import { IIsp } from 'src/api/isp'
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
  SET_START_DATE = 'SET_START_DATE',
  SET_END_DATE = 'SET_END_DATE',
  CREATE_CONTRACT_DRAFT = 'CREATE_CONTRACT_DRAFT',
  UPDATE_CONTRACT_DRAFT = 'UPDATE_CONTRACT_DRAFT',
  SET_CURRENCY_CODE = 'SET_CURRENCY_CODE',
  SET_LTA = 'SET_LTA',
  SET_BUDGET = 'SET_BUDGET',
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

export interface GeneralTabForm {
  id: number | null
  name?: string
  countryId: number | undefined
  currencyId: number | undefined
  ltaId: number | undefined
  governmentBehalf: boolean
  budget: string
  startDate: string
  endDate: string
}

export interface State {
  activeTab: ActiveTab
  error: string
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
  generalTabForm: GeneralTabForm
  flag: string
}

export const reducer = (state: State, action: Action): State => {
  const { type, payload } = action
  // console.log(type, payload)

  switch (type) {
    case ActionType.SET_ACTIVE_TAB: {
      return {
        ...state,
        activeTab: payload.activeTab,
        tabGeneralStatus: payload.tabGeneralStatus,
        tabConnectionStatus: payload.tabConnectionStatus,
        tabSchoolStatus: payload.tabSchoolStatus,
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

    case ActionType.SET_COUNTRY_CODE: {
      let flag = state.countries.find((country) => country.id === payload)?.code ?? 'BW'

      return {
        ...state,
        generalTabForm: {
          ...state.generalTabForm,
          countryId: payload,
        },
        flag,
      }
    }

    case ActionType.SET_CONTRACT_NAME:
      return {
        ...state,
        generalTabForm: {
          ...state.generalTabForm,
          name: payload,
        },
        error: '',
      }

    case ActionType.SET_BUDGET:
      return {
        ...state,
        generalTabForm: {
          ...state.generalTabForm,
          budget: payload,
        },
      }

    case ActionType.SET_BEHALF_GOVERNMENT: {
      return {
        ...state,
        generalTabForm: {
          ...state.generalTabForm,
          governmentBehalf: !state.generalTabForm.governmentBehalf,
        },
      }
    }

    case ActionType.CREATE_CONTRACT_DRAFT: {
      return {
        ...state,
        generalTabForm: {
          ...state.generalTabForm,
          id: +payload.id,
          name: payload.name,
        },
      }
    }

    case ActionType.UPDATE_CONTRACT_DRAFT: {
      return {
        ...state,
        generalTabForm: {
          ...state.generalTabForm,
          ...payload,
        },
      }
    }

    case ActionType.SET_CURRENCY_CODE: {
      return {
        ...state,
        generalTabForm: {
          ...state.generalTabForm,
          currencyId: payload,
        },
      }
    }

    case ActionType.SET_LTA: {
      return {
        ...state,
        generalTabForm: {
          ...state.generalTabForm,
          ltaId: payload,
        },
      }
    }

    case ActionType.SET_START_DATE: {
      return {
        ...state,
        generalTabForm: {
          ...state.generalTabForm,
          startDate: payload,
        },
      }
    }

    case ActionType.SET_END_DATE: {
      return {
        ...state,
        generalTabForm: {
          ...state.generalTabForm,
          endDate: payload,
        },
      }
    }

    case ActionType.SET_ERROR: {
      return {
        ...state,
        error: payload?.response?.data?.errors[0]?.message,
      }
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

    default:
      return {
        ...state,
      }
  }
}

export const state: State = {
  activeTab: ActiveTab.GeneralTab,
  error: '',
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
    id: null,
    name: '',
    countryId: undefined,
    currencyId: undefined,
    ltaId: undefined,
    governmentBehalf: false,
    budget: '',
    startDate: '',
    endDate: '',
  },
  flag: 'BW',
}

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

export interface Action {
  type: ActionType
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

export interface FileUpload {
  name: string
  typeId: number | null
  type: string
  file: string | ArrayBuffer | null
}

export interface ContractForm {
  id: number | null
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

export interface State {
  activeTab: ActiveTab
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
        contractForm: {
          ...state.contractForm,
          countryId: payload,
        },
        flag,
      }
    }

    case ActionType.SET_CONTRACT_NAME:
      return {
        ...state,
        contractForm: {
          ...state.contractForm,
          name: payload,
        },
        error: '',
      }

    case ActionType.SET_BUDGET:
      return {
        ...state,
        contractForm: {
          ...state.contractForm,
          budget: payload,
        },
      }

    case ActionType.SET_BEHALF_GOVERNMENT: {
      return {
        ...state,
        contractForm: {
          ...state.contractForm,
          governmentBehalf: !state.contractForm.governmentBehalf,
        },
      }
    }

    case ActionType.CREATE_CONTRACT_DRAFT: {
      return {
        ...state,
        contractForm: {
          ...state.contractForm,
          id: +payload.id,
          name: payload.name,
        },
      }
    }

    case ActionType.UPDATE_CONTRACT_DRAFT: {
      return {
        ...state,
        contractForm: {
          ...state.contractForm,
          ...payload,
        },
      }
    }

    case ActionType.SET_CURRENCY_CODE: {
      return {
        ...state,
        contractForm: {
          ...state.contractForm,
          currencyId: payload,
        },
      }
    }

    case ActionType.SET_LTA: {
      return {
        ...state,
        contractForm: {
          ...state.contractForm,
          ltaId: payload,
        },
      }
    }

    case ActionType.SET_START_DATE: {
      return {
        ...state,
        contractForm: {
          ...state.contractForm,
          startDate: payload,
        },
      }
    }

    case ActionType.SET_END_DATE: {
      return {
        ...state,
        contractForm: {
          ...state.contractForm,
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
              ...state.contractForm.expectedMetrics.metrics.slice(0, metricIndex),
              {
                ...state.contractForm.expectedMetrics.metrics[metricIndex],
                value: payload.value,
                metricId: payload.metricId,
              },
              ...state.contractForm.expectedMetrics.metrics.slice(metricIndex + 1),
            ]
          : [{ value: payload.value, metricId: payload.metricId }, ...state.contractForm.expectedMetrics.metrics]

      return {
        ...state,
        contractForm: {
          ...state.contractForm,
          expectedMetrics: {
            ...state.contractForm.expectedMetrics,
            metrics: newExpectedMetrics,
          },
        },
      }
    }

    case ActionType.SET_METRICS_ISPS: {
      const { metrics, isps } = payload

      return {
        ...state,
        metrics,
        isps,
      }
    }

    case ActionType.SET_SERVICE_PROVIDER: {
      return {
        ...state,
        contractForm: {
          ...state.contractForm,
          ispId: +payload,
        },
      }
    }

    case ActionType.RESPONSE_SCHOOLS: {
      return {
        ...state,
        schools: payload,
      }
    }

    case ActionType.SELECT_SCHOOL: {
      const index = state.contractForm.schools.schools.findIndex((s) => s.id === payload.id)

      const newSchools =
        index >= 0
          ? [
              ...state.contractForm.schools.schools.slice(0, index),
              ...state.contractForm.schools.schools.slice(index + 1),
            ]
          : [{ id: payload.id }, ...state.contractForm.schools.schools]

      return {
        ...state,
        contractForm: {
          ...state.contractForm,
          schools: {
            ...state.contractForm.schools,
            schools: newSchools,
          },
        },
      }
    }

    case ActionType.SELECT_SCHOOL_BULK: {
      return {
        ...state,
        contractForm: {
          ...state.contractForm,
          schools: {
            ...state.contractForm.schools,
            schools: [...payload, ...state.contractForm.schools.schools],
          },
        },
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
  contractForm: {
    id: null,
    name: '',
    countryId: undefined,
    currencyId: undefined,
    ltaId: undefined,
    ispId: undefined,
    expectedMetrics: { metrics: [] },
    governmentBehalf: false,
    budget: '',
    startDate: '',
    endDate: '',
    schools: {
      schools: [],
    },
  },
  flag: 'BW',
  schools: [],
}

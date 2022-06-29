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
  SET_COUNTRY_CODE = 'SET_COUNTRY_CODE',
  SET_BEHALF_GOVERNMENT = 'SET_BEHALF_GOVERNMENT',
}

export interface Action {
  type: ActionType
  payload?: any
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

  countries: ICountries[]
  currencies: ICurrency[]
  ltas: ILtas[]

  generalTabForm: {
    contractNumber: string
    countryCode: string
    behalfOfGovernment: boolean
  }
  flag: string
}

export const reducer = (state: State, action: Action): State => {
  const { type, payload } = action

  console.log(type, payload)

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
      console.log(payload)
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
  countries: [],
  currencies: [],
  ltas: [],

  generalTabForm: {
    contractNumber: '',
    countryCode: '',
    behalfOfGovernment: false,
  },
  flag: 'BW',
}

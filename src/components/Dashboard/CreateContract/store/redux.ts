import { IMetric } from 'src/api/metrics'
import { IIsp } from 'src/api/isp'
import _ from 'lodash'

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
  SET_CONTRACT_NAME = 'SET_CONTRACT_NAME',
  SET_ACTIVE_TAB = 'SET_ACTIVE_TAB',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
  SET_EXPECTED_METRIC = 'SET_EXPECTED_METRIC',
  RESPONSE_METRICS = 'RESPONSE_METRICS',
  RESPONSE_ISPS = 'RESPONSE_ISPS',
}

export interface Action {
  type: ActionType
  payload?: any
}

export interface ExpectedMetric {
  metricId: number
  value: number
}

export interface State {
  contractNumber: string
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
}

export const reducer = (state: State, action: Action): State => {
  const { type, payload } = action

  // console.log(type, payload)

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

    case ActionType.SET_CONTRACT_NAME:
      return {
        ...state,
        contractNumber: payload,
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
      const newExpectedMetrics = _.cloneDeep(state.expectedMetrics)
      const index = newExpectedMetrics.metrics.findIndex((m) => m.metricId === payload.metricId)

      if (index >= 0) {
        newExpectedMetrics.metrics[index].value = payload.value
      } else {
        newExpectedMetrics.metrics.unshift(payload)
      }

      return {
        ...state,
        expectedMetrics: newExpectedMetrics,
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
  contractNumber: '',
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
}

import _ from 'lodash'
import { IContracts, ILtas } from '../@types/ContractType'

export enum ActionType {
  RESPONSE = 'RESPONSE',
  CREATE_CONTRACT = 'CREATE_CONTRACT',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
}

export interface Action {
  type: ActionType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any
}

export interface State {
  contract?: IContracts
  contracts?: IContracts[]
  ltas?: ILtas
  error?: Error
  loading?: boolean
  controller?: AbortController
  isSelected?: boolean
}

export const reducer = (state: State, action: Action): State => {
  const { type, payload } = action

  switch (type) {
    case ActionType.RESPONSE:
      return {
        ...state,
        contracts: payload.contracts,
        ltas: payload.ltas,
        loading: false,
      }

    case ActionType.CREATE_CONTRACT: {
      const newContracts = _.cloneDeep(state.contracts)
      newContracts?.unshift(payload)

      return {
        ...state,
        contracts: newContracts,
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
  contracts: [],
  ltas: {},
  error: undefined,
  loading: true,
  controller: undefined,

  contract: {
    added: false,
    budget: {
      budget: '',
      totalSpend: null,
    },
    country: {
      code: '',
      flagUrl: '',
      name: '',
    },
    id: '',
    isp: '',
    ltaId: null,
    name: '',
    numberOfSchools: '',
    schoolsConnection: {
      allEqualOrAboveAvg: 0,
      atLeastOneBellowAvg: 0,
      withoutConnection: 0,
    },
    status: '',
    totalSpent: 0,
  },
}

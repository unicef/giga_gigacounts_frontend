import { IContracts, ILtas } from '../@types/ContractType'

export enum ActionType {
  RESPONSE = 'RESPONSE',
  CREATE_CONTRACT = 'CREATE_CONTRACT',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
  SET_LTA_NUMBERS = 'SET_LTA_NUMBER',
  SET_SELECTED_CONTRACT = 'SET_SELECTED_CONTRACT',
}

export interface Action {
  type: ActionType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any
}

export interface State {
  selectedContract?: IContracts
  contracts?: IContracts[]
  ltas?: ILtas
  error?: Error
  loading?: boolean
  ltaNumbers: string[]
  isSelected?: boolean
}

export const reducer = (state: State, action: Action): State => {
  const { type, payload } = action
  // console.log(type, payload)

  switch (type) {
    case ActionType.RESPONSE:
      return {
        ...state,
        contracts: payload.contracts,
        ltas: payload.ltas,
        loading: false,
      }

    case ActionType.CREATE_CONTRACT: {
      return {
        ...state,
        contracts: [payload, ...(state.contracts || [])],
      }
    }

    case ActionType.SET_SELECTED_CONTRACT: {
      return {
        ...state,
        selectedContract: payload,
        isSelected: true,
      }
    }

    case ActionType.SET_LTA_NUMBERS: {
      return {
        ...state,
        ltaNumbers: payload,
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
  ltaNumbers: [],
  isSelected: false,

  selectedContract: {
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

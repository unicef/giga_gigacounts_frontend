import { IContractCounts, IUser } from 'src/api/dashboard'

export enum ActionType {
  GET_ADMIN_PROFILE = 'GET_ADMIN_PROFILE',
  GET_USER_PROFILE = 'GET_USER_PROFILE',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
  DISPLAY_CONTRACT_FORM = 'DISPLAY_CONTRACT_FORM',
}

export interface Action {
  type: ActionType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any
}

export interface State {
  user: IUser
  displayContractForm: boolean
  contractCounts: IContractCounts
  error?: Error
  loading?: boolean
}

export const reducer = (state: State, action: Action): State => {
  const { type, payload } = action

  switch (type) {
    case ActionType.GET_ADMIN_PROFILE: {
      const { user, contractCounts } = payload
      return {
        ...state,
        user: user,
        contractCounts: {
          ...state.contractCounts,
          counts: contractCounts.counts,
          totalCount: contractCounts.totalCount,
        },
        loading: false,
      }
    }

    case ActionType.GET_USER_PROFILE: {
      const { user, contractCounts } = payload
      return {
        ...state,
        user: {
          ...state.user,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          country: {
            ...state.user.country,
            name: user.country.name,
            code: user.country.code,
            flagUrl: user.country.flagUrl,
          },
        },
        contractCounts: {
          ...state.contractCounts,
          counts: contractCounts.counts,
          totalCount: contractCounts.totalCount,
        },
        loading: false,
      }
    }

    case ActionType.DISPLAY_CONTRACT_FORM: {
      return {
        ...state,
        displayContractForm: !state.displayContractForm,
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
  user: {
    name: '',
    lastName: '',
    email: '',
    role: '',
    country: {
      name: '',
      code: '',
      flagUrl: '',
    },
  },
  displayContractForm: false,
  contractCounts: {
    counts: [],
    totalCount: 0,
  },
  error: undefined,
  loading: true,
}

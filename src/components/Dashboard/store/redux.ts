import { ContractCountsResponse, IUser } from 'src/api/dashboard'

export enum ActionType {
  GET_ADMIN_PROFILE = 'GET_ADMIN_PROFILE',
  GET_USER_PROFILE = 'GET_USER_PROFILE',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
}

export interface Action {
  type: ActionType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any
}

export interface State {
  user: IUser
  contractCounts: ContractCountsResponse
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

  contractCounts: {
    counts: [],
    totalCount: 0,
  },
  error: undefined,
  loading: true,
}

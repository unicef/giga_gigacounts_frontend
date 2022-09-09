import { ContractCountsState, GeneralState, UserState } from './types'

export const INITIAL_USER_STATE: UserState = {
  data: {
    name: '',
    lastName: '',
    email: '',
    role: '',
    country: {
      name: '',
      code: '',
      flagUrl: '',
    },
    walletAddress: null,
    safe: {
      id: '',
      name: '',
      address: '',
    },
  },
  error: undefined,
  loading: true,
}

export const INITIAL_CONTRACT_COUNTS_STATE: ContractCountsState = {
  data: {
    draft: 0,
    sent: 0,
    confirmed: 0,
    ongoing: 0,
    expired: 0,
    completed: 0,
    total: 0,
  },
  error: undefined,
  loading: true,
}

export const INITIAL_STATE: GeneralState = {
  user: INITIAL_USER_STATE,
  contractCounts: INITIAL_CONTRACT_COUNTS_STATE,
}

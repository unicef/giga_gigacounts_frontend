import { UPDATE_USER, UPDATE_CONTRACT_COUNTS } from './action-types'
import { INITIAL_USER_STATE, INITIAL_CONTRACT_COUNTS_STATE } from './initial-state'
import { Action, GeneralState, ContractCounts, ICounts } from './types'

export const reducer = (state: GeneralState, action: Action): GeneralState => {
  const { type, payload } = action

  switch (type) {
    case UPDATE_USER: {
      const { user, error } = payload

      return {
        ...state,
        user: {
          data: user ?? INITIAL_USER_STATE,
          error,
          loading: false,
        },
      }
    }

    case UPDATE_CONTRACT_COUNTS: {
      const { contractCounts, error } = payload

      const counts =
        contractCounts === undefined
          ? INITIAL_CONTRACT_COUNTS_STATE
          : contractCounts?.reduce(
              (acc: ContractCounts, { status, count }: ICounts) => ({
                ...acc,
                [status.toLowerCase()]: parseInt(count),
              }),
              {
                draft: 0,
                sent: 0,
                confirmed: 0,
                ongoing: 0,
                expired: 0,
                completed: 0,
                total: 0,
              } as ContractCounts,
            ) ?? state.contractCounts.data

      return {
        ...state,
        contractCounts: {
          data: counts,
          error,
          loading: false,
        },
      }
    }

    default:
      return state
  }
}

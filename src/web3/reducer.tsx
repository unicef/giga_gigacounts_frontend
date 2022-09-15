import { Web3Action, Web3ActionType, Web3State } from './types'

export const reducer = (state: Web3State, action: Web3Action): Web3State => {
  const { type, payload } = action

  switch (type) {
    case Web3ActionType.SET_INITIATED:
      return {
        initiated: true,
        verifying: false,
      }
    case Web3ActionType.SET_VERIFYING:
      return {
        initiated: true,
        verifying: payload,
        error: undefined,
      }
    case Web3ActionType.SET_ERROR:
      if (payload?.code === 'ACTION_REJECTED') {
        return {
          initiated: true,
          verifying: false,
          error: new Error(payload.reason),
        }
      }

      if (payload?.response?.status >= 400 && payload?.response?.status <= 500) {
        return {
          initiated: true,
          verifying: false,
          error: new Error(payload.response?.data),
        }
      }
      return {
        initiated: true,
        verifying: false,
        error: payload,
      }
    default:
      return state
  }
}

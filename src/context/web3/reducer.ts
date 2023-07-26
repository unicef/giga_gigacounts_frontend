import { Web3Action, Web3ActionType, Web3State } from 'src/@types'

export const reducer = (state: Web3State, action: Web3Action): Web3State => {
  const { type, payload } = action

  switch (type) {
    case Web3ActionType.SET_INITIATED:
      return {
        initiated: true,
        verifying: false,
        verified: false,
        signing: false,
        signed: false
      }
    case Web3ActionType.SET_VERIFYING:
      return {
        initiated: true,
        verifying: payload,
        verified: false,
        signing: false,
        signed: false,
        error: undefined
      }
    case Web3ActionType.SET_VERIFIED:
      return {
        initiated: true,
        verifying: false,
        verified: payload,
        signing: false,
        signed: false,
        error: undefined
      }
    case Web3ActionType.SET_SIGNING:
      return {
        initiated: true,
        verifying: false,
        verified: false,
        signing: payload,
        signed: false,
        error: undefined
      }
    case Web3ActionType.SET_SIGNED:
      return {
        initiated: true,
        verifying: false,
        verified: false,
        signing: false,
        signed: payload,
        error: undefined
      }
    case Web3ActionType.RESET_ERROR:
      return {
        initiated: true,
        verifying: false,
        verified: false,
        signing: false,
        signed: false,
        error: undefined
      }
    case Web3ActionType.SET_ERROR:
      return {
        initiated: true,
        verifying: false,
        verified: false,
        signing: false,
        signed: false,
        error: payload
      }
    default:
      return state
  }
}

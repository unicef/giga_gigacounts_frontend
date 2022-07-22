import { createContext, FC, useReducer, useCallback, useEffect, useMemo, Dispatch } from 'react'
import { getContracts } from 'src/api/contracts'
import { ChildrenProps } from 'src/types/utils'
import {
  ContractsActionType,
  reducer,
  ContractsState,
  INITIAL_CONTRACTS_STATE,
  ContractsAction,
} from '../Contracts/store/redux'

export interface IContractContext {
  state: ContractsState
  dispatch: Dispatch<ContractsAction>
}

export const ContractsContext = createContext<IContractContext>({
  state: INITIAL_CONTRACTS_STATE,
  dispatch: () => {
    throw new Error('Not implemented')
  },
})

export const ContractsProvider: FC<ChildrenProps> = ({ children }) => {
  const [localState, dispatch] = useReducer(reducer, INITIAL_CONTRACTS_STATE)

  const fetchContracts = useCallback(() => {
    getContracts()
      .then((response) => dispatch({ type: ContractsActionType.RESPONSE, payload: response }))
      .catch((error) => dispatch({ type: ContractsActionType.SET_ERROR, payload: error }))
  }, [dispatch])

  useEffect(() => {
    fetchContracts()
  }, [fetchContracts])

  const value = useMemo(
    () => ({
      state: localState,
      dispatch,
    }),
    [localState, dispatch],
  )

  return <ContractsContext.Provider value={value}>{children}</ContractsContext.Provider>
}

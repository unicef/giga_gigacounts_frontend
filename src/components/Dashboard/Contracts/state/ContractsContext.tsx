import { createContext, FC, useReducer, useCallback, useMemo, Dispatch, useEffect } from 'react'
import { getContractDetails, getContracts, getContractSchools } from 'src/api/contracts'
import { ChildrenProps } from 'src/types/utils'
import { INITIAL_CONTRACTS_STATE } from './initial-state'
import { reducer } from './reducer'
import { ContractsAction, ContractsActionType, ContractsState } from './types'

export interface IContractsContext {
  state: ContractsState
  dispatch: Dispatch<ContractsAction>
  fetchContract: (id: string) => void
}

export const ContractsContext = createContext<IContractsContext>({
  state: INITIAL_CONTRACTS_STATE,
  dispatch: () => {
    throw new Error('Not implemented')
  },
  fetchContract: () => {
    throw new Error('Not implemented')
  },
})

export const ContractsProvider: FC<ChildrenProps> = ({ children }) => {
  const [localState, dispatch] = useReducer(reducer, INITIAL_CONTRACTS_STATE)

  const fetchContracts = useCallback(() => {
    dispatch({
      type: ContractsActionType.SET_LOADING,
    })
    getContracts()
      .then((response) => dispatch({ type: ContractsActionType.RESPONSE, payload: response }))
      .catch((error) => dispatch({ type: ContractsActionType.SET_ERROR, payload: error }))
  }, [])

  useEffect(() => {
    fetchContracts()
  }, [fetchContracts])

  const fetchContract = useCallback(
    async (id: string) => {
      try {
        dispatch({
          type: ContractsActionType.SET_CONTRACT_DETAILS_LOADING,
          payload: {
            id,
          },
        })

        const [details, schools] = await Promise.all([getContractDetails(id), getContractSchools(id)])

        dispatch({
          type: ContractsActionType.SET_CONTRACT_DETAILS_SCHOOLS,
          payload: {
            details,
            schools,
          },
        })
      } catch (error) {
        dispatch({ type: ContractsActionType.SET_CONTRACT_DETAILS_ERROR, payload: error })
      }
    },
    [dispatch],
  )

  const value = useMemo(
    () => ({
      state: localState,
      dispatch,
      fetchContract,
    }),
    [localState, fetchContract],
  )

  return <ContractsContext.Provider value={value}>{children}</ContractsContext.Provider>
}

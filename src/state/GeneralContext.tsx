import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react'
import { ChildrenProps } from 'src/types/utils'
import { INITIAL_STATE } from './initial-state'
import { reducer } from './reducer'
import { GeneralState } from './types'
import { updateContractCounts, updateUser } from './action-creators'
import { getContractsCounts, getUserProfile } from 'src/api/dashboard'

export interface GeneralContextValue {
  state: GeneralState
  actions: {
    reload: () => Promise<void>
    reset: () => void
  }
}

export const INITIAL_GENERAL_CONTEXT_VALUE: GeneralContextValue = {
  state: INITIAL_STATE,
  actions: {
    reload: () => Promise.resolve(),
    reset: () => {
      throw new Error('Not implemented')
    },
  },
}

export const GeneralContext = createContext<GeneralContextValue>(INITIAL_GENERAL_CONTEXT_VALUE)

export const GeneralContextProvider = ({ children }: ChildrenProps) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  const fetchData = useCallback(async () => {
    await Promise.all([
      getUserProfile()
        .then((user) => dispatch(updateUser(user)))
        .catch((error) => dispatch(updateUser(undefined, error))),
      getContractsCounts()
        .then((contractCounts) => dispatch(updateContractCounts(contractCounts)))
        .catch((error) => dispatch(updateContractCounts(undefined, error))),
    ])
  }, [])

  useEffect(() => {
    const AUTH_TOKEN = localStorage.getItem('session')

    if (AUTH_TOKEN) {
      fetchData()
    } else {
      dispatch(updateUser(undefined))
    }
  }, [fetchData])

  const actions = useMemo(
    () => ({
      reload: fetchData,
      reset: () => {
        dispatch(updateUser(undefined, undefined))
        dispatch(updateContractCounts(undefined, undefined))
      },
    }),
    [fetchData],
  )

  const value = useMemo(
    () => ({
      state,
      actions,
    }),
    [state, actions],
  )

  return <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>
}

export const useGeneralContext = () => {
  const context = useContext(GeneralContext)

  if (!context) {
    throw new Error('useGeneralContext must be used within a GeneralContextProvider')
  }

  return context
}

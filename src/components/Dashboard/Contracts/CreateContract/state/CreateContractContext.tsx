import axios from 'axios'
import { createContext, FC, useReducer, useMemo, Dispatch, useCallback, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getCountries, getCurrency, getLtas } from 'src/api/createContract'
import { getDraft } from 'src/api/drafts'
import { ChildrenProps } from 'src/types/utils'
import { CREATE_CONTRACT_INITIAL_STATE } from './initial-state'
import { reducer } from './reducer'
import { CreateContractAction, CreateContractActionType, CreateContractState } from './types'

export interface ICreateContractContext {
  state: CreateContractState
  dispatch: Dispatch<CreateContractAction>
  actions: {
    reload: () => void
  }
}

export const CreateContractContext = createContext<ICreateContractContext>({
  state: CREATE_CONTRACT_INITIAL_STATE,
  actions: {
    reload: () => {
      throw new Error('Not implemented')
    },
  },
  dispatch: () => {
    throw new Error('Not implemented')
  },
})

export const CreateContractContextProvider: FC<ChildrenProps> = ({ children }) => {
  const [localState, dispatch] = useReducer(reducer, CREATE_CONTRACT_INITIAL_STATE)
  const [searchParams, setSearchParams] = useSearchParams()

  const draftId = useMemo(() => searchParams.get('draft') || '', [searchParams])

  const fetchDraft = useCallback(async (id: string) => {
    try {
      const draft = await getDraft(id)
      dispatch({
        type: CreateContractActionType.LOAD_DRAFT,
        payload: {
          draft,
        },
      })
    } catch (error) {
      dispatch({
        type: CreateContractActionType.SET_ERROR,
        payload: {
          error,
        },
      })
    }
  }, [])

  const fetchData = useCallback(async () => {
    try {
      axios
        .all([getCountries(), getCurrency(), getLtas()])
        .then(
          axios.spread((...responses) => {
            const countries = responses[0]
            const currencies = responses[1]
            const ltas = responses[2]

            dispatch({
              type: CreateContractActionType.GET_FORM_DATA,
              payload: {
                countries,
                currencies,
                ltas,
              },
            })
          }),
        )
        .catch((errors) => {
          throw new Error(errors)
        })
    } catch (error) {
      dispatch({ type: CreateContractActionType.SET_ERROR, payload: { error } })
    }
  }, [])

  const reload = useCallback(async () => {
    if (draftId) {
      await fetchDraft(draftId)
    }
  }, [draftId, fetchDraft])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    if (draftId && draftId !== localState.contractForm.id) {
      fetchDraft(draftId)
    } else if (!draftId && localState.contractForm.id !== null) {
      setSearchParams({ draft: localState.contractForm.id })
    }
  }, [fetchDraft, draftId, localState.contractForm.id, setSearchParams])

  const value = useMemo(
    () => ({
      state: localState,
      actions: {
        reload,
      },
      dispatch,
    }),
    [localState, reload],
  )

  return <CreateContractContext.Provider value={value}>{children}</CreateContractContext.Provider>
}

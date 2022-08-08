import axios from 'axios'
import { createContext, FC, useReducer, useMemo, Dispatch, useCallback, useEffect } from 'react'
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom'
import { createContractDraft, updateContractDraft } from 'src/api/contracts'
import { getCountries, getCurrency, getLtas } from 'src/api/createContract'
import { getDraft } from 'src/api/drafts'
import { ChildrenProps } from 'src/types/utils'
import { clean } from 'src/utils/clean'
import { useContractsContext } from 'src/components/Dashboard/Contracts/state/useContractsContext'
import { CREATE_CONTRACT_INITIAL_STATE } from './initial-state'
import { reducer } from './reducer'
import { ContractForm, CreateContractAction, CreateContractActionType, CreateContractState } from './types'

export interface ICreateContractContext {
  state: CreateContractState
  dispatch: Dispatch<CreateContractAction>
  actions: {
    reload: () => void
    saveDraft: () => void
  }
}

export const CreateContractContext = createContext<ICreateContractContext>({
  state: CREATE_CONTRACT_INITIAL_STATE,
  actions: {
    reload: () => {
      throw new Error('Not implemented')
    },
    saveDraft: () => {
      throw new Error('Not implemented')
    },
  },
  dispatch: () => {
    throw new Error('Not implemented')
  },
})

export const CreateContractContextProvider: FC<ChildrenProps> = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const {
    state: { newContract },
    actions: { setNewContract, reloadContracts },
  } = useContractsContext()
  const [localState, dispatch] = useReducer(
    reducer,
    useMemo(
      () => ({
        ...CREATE_CONTRACT_INITIAL_STATE,
        contractForm: { ...CREATE_CONTRACT_INITIAL_STATE.contractForm, ...(location.state as ContractForm) },
      }),
      [location.state],
    ),
  )

  const [searchParams, setSearchParams] = useSearchParams()

  const draftId = useMemo(() => searchParams.get('draft') || '', [searchParams])

  const fetchDraft = useCallback(async (id: string) => {
    dispatch({
      type: CreateContractActionType.DRAFT_LOADING,
    })
    try {
      const draft = await getDraft(id)
      dispatch({
        type: CreateContractActionType.DRAFT_LOADED,
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
    if (localState.contractForm.id) {
      await fetchDraft(localState.contractForm.id)
    }
    reloadContracts()
  }, [fetchDraft, localState.contractForm.id, reloadContracts])

  const saveDraft = useCallback(async () => {
    if (localState.contractForm.name && localState.contractForm.name.length > 0) {
      try {
        const draft = await (localState.contractForm.id
          ? updateContractDraft(localState.contractForm)
          : createContractDraft(clean(localState.contractForm)))

        dispatch({ type: CreateContractActionType.DRAFT_LOADED, payload: { draft } })
      } catch (error) {
        dispatch({ type: CreateContractActionType.SET_ERROR, payload: { error } })
      }

      reloadContracts()
    } else {
      dispatch({ type: CreateContractActionType.SET_ERROR, payload: { error: new Error('Please enter a name') } })
    }
  }, [localState.contractForm, reloadContracts])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    if (draftId && draftId !== localState.contractForm.id && !localState.draft.loading) {
      fetchDraft(draftId)
    } else if (!draftId && localState.contractForm.id !== null) {
      setSearchParams({ draft: localState.contractForm.id })
    }
  }, [fetchDraft, draftId, localState.contractForm.id, setSearchParams, localState.draft.loading, setNewContract])

  useEffect(() => {
    const { reset, preset } = (location.state ?? {}) as { reset?: boolean; preset?: ContractForm }

    if (reset) {
      navigate(location.pathname, { replace: true })
      dispatch({
        type: CreateContractActionType.RESET,
        payload: { preset },
      })
    }
  }, [location.pathname, location.state, navigate])

  useEffect(() => {
    if (localState.contractForm.id === null && !localState.draft.loading) {
      if (newContract === undefined || newContract?.ltaId !== localState.contractForm.ltaId) {
        setNewContract({
          ltaId: localState.contractForm.ltaId,
        })
      }
    } else if (newContract !== undefined) {
      setNewContract()
    }
  }, [localState.contractForm.id, localState.contractForm.ltaId, localState.draft, newContract, setNewContract])

  const value = useMemo(
    () => ({
      state: localState,
      actions: {
        reload,
        saveDraft,
      },
      dispatch,
    }),
    [localState, reload, saveDraft],
  )

  return <CreateContractContext.Provider value={value}>{children}</CreateContractContext.Provider>
}

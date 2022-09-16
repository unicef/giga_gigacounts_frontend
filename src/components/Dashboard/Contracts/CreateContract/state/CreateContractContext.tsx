import axios from 'axios'
import { createContext, FC, useReducer, useMemo, Dispatch, useCallback, useEffect } from 'react'
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom'
import { createContractDraft, updateContractDraft } from 'src/api/contracts'
import { getCountries, getCurrencies, getLtas } from 'src/api/createContract'
import { getDraft } from 'src/api/drafts'
import { ChildrenProps } from 'src/types/utils'
import { clean } from 'src/utils/clean'
import { useContractsContext } from 'src/components/Dashboard/Contracts/state/useContractsContext'
import { CREATE_CONTRACT_INITIAL_STATE } from './initial-state'
import { reducer } from './reducer'
import { ContractPreset, CreateContractAction, CreateContractActionType, CreateContractState } from './types'
import { createAction } from 'src/utils/createAction'
import { getSchools } from 'src/api/school'

export interface ICreateContractContext {
  state: CreateContractState
  dispatch: Dispatch<CreateContractAction>
  actions: {
    reload: () => void
    saveDraft: () => void
    getLtsByCountryId: (countryId: string) => void
    fetchSchools: () => void
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
    getLtsByCountryId: () => {
      throw new Error('Not implemented')
    },
    fetchSchools: () => {
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
    state: { newContract, ...state },
    actions: { setNewContract, reloadContracts, toggleExpandedLta },
  } = useContractsContext()

  const [localState, dispatch] = useReducer(reducer, CREATE_CONTRACT_INITIAL_STATE)

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
        .all([getCountries(), getCurrencies(localState.contractForm.currencyType)])
        .then(
          axios.spread((...responses) => {
            const countries = responses[0]
            const currencies = responses[1]

            dispatch({
              type: CreateContractActionType.GET_FORM_DATA,
              payload: {
                countries,
                currencies,
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
  }, [localState.contractForm.currencyType])

  const fetchSchools = useCallback(async () => {
    dispatch({ type: CreateContractActionType.SET_SCHOOLS_LOADING })

    try {
      const response = await getSchools(localState.contractForm.countryId)
      dispatch({
        type: CreateContractActionType.RESPONSE_SCHOOLS,
        payload: { schools: response, country_id: localState.contractForm.countryId },
      })
    } catch (error) {
      dispatch({ type: CreateContractActionType.SET_SCHOOLS_ERROR, payload: error })
    }
  }, [localState.contractForm.countryId])

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

  const getLtsByCountryId = useCallback(async (countryId: string) => {
    dispatch(createAction(CreateContractActionType.GET_LTS_BY_COUNTRY_ID, { countryId, ltas: [] }))
    try {
      const response = await getLtas(countryId)

      dispatch(createAction(CreateContractActionType.GET_LTS_BY_COUNTRY_ID, { countryId, ltas: response }))
    } catch (error) {
      dispatch(createAction(CreateContractActionType.SET_ERROR, error))
    }
  }, [])

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
    const { reset } = (location.state ?? {}) as { reset?: boolean }

    if (reset && !localState.loading) {
      const { ltaId, countryId } = (location.state as { preset?: ContractPreset })?.preset ?? {}

      if (
        ltaId &&
        countryId &&
        (ltaId !== localState.contractForm.ltaId || countryId !== localState.contractForm.countryId)
      ) {
        navigate(location.pathname, { replace: true })

        dispatch({
          type: CreateContractActionType.RESET,
          payload: { preset: { ltaId, countryId } },
        })

        if (ltaId !== state.expandedLtaId) {
          toggleExpandedLta(ltaId)
        }
      } else {
        setSearchParams({})
        dispatch({
          type: CreateContractActionType.RESET,
        })
      }
    }
  }, [
    localState,
    localState.countries,
    location,
    location.pathname,
    location.state,
    navigate,
    setSearchParams,
    state,
    toggleExpandedLta,
  ])

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
        getLtsByCountryId,
        fetchSchools,
      },
      dispatch,
    }),
    [localState, reload, saveDraft, getLtsByCountryId, fetchSchools],
  )

  return <CreateContractContext.Provider value={value}>{children}</CreateContractContext.Provider>
}

import { createContext, FC, useReducer, useCallback, useMemo, Dispatch, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { ContractStatus } from 'src/types/general'
import { getSchoolMeasures } from 'src/api/school'
import { getContract, getContractDetails, getContracts, getContractSchools } from 'src/api/contracts'
import { ChildrenProps } from 'src/types/utils'
import { createAction } from 'src/utils/createAction'
import { getLtas } from 'src/api/createContract'
import { getContractPayments } from 'src/api/payments'
import { INITIAL_CONTRACTS_STATE } from './initial-state'
import { reducer } from './reducer'
import { ContractsAction, ContractsActionType, ContractsState, NavItemType } from './types'
import { selectContract, selectDraft } from './selectors'

export interface IContractsContext {
  state: ContractsState
  dispatch: Dispatch<ContractsAction>
  actions: {
    fetchContract: (id: string) => Promise<void>
    setActiveNavItem: (item?: NavItemType) => void
    setSelectedSchool: (schoolId: string, contractId: string) => void
    fetchSchoolMeasures: (schoolId: string, id: string, month: string) => void
    reloadContracts: () => void
    reloadContractPayments: (id?: string) => Promise<void>
    setNewContract: (newContract?: { ltaId?: string }) => void
    setSelectedTab: (tabId: string) => void
    toggleExpandedLta: (ltaId: string | null) => void
  }
}

export const ContractsContext = createContext<IContractsContext>({
  state: INITIAL_CONTRACTS_STATE,
  dispatch: () => {
    throw new Error('Not implemented')
  },
  actions: {
    fetchContract: () => {
      throw new Error('Not implemented')
    },
    fetchSchoolMeasures: () => {
      throw new Error('Not implemented')
    },
    setActiveNavItem: () => {
      throw new Error('Not implemented')
    },
    setSelectedSchool: () => {
      throw new Error('Not implemented')
    },
    reloadContracts: () => {
      throw new Error('Not implemented')
    },
    reloadContractPayments: () => {
      throw new Error('Not implemented')
    },
    setNewContract: () => {
      throw new Error('Not implemented')
    },
    setSelectedTab: () => {
      throw new Error('Not implemented')
    },
    toggleExpandedLta: () => {
      throw new Error('Not implemented')
    },
  },
})

export const ContractsProvider: FC<ChildrenProps> = ({ children }) => {
  const [localState, dispatch] = useReducer(reducer, INITIAL_CONTRACTS_STATE)

  const { contractId } = useParams()
  const [searchParams] = useSearchParams()

  const draftId = useMemo(() => searchParams.get('draft') || '', [searchParams])

  const selector = useMemo(() => (draftId ? selectDraft(draftId) : selectContract(contractId)), [draftId, contractId])

  const selectedContract = useMemo(() => selector(localState), [selector, localState])

  const fetchContracts = useCallback(() => {
    dispatch({
      type: ContractsActionType.SET_LOADING,
    })
    Promise.all([getLtas(), getContracts()])
      .then(([ltas, contracts]) => dispatch({ type: ContractsActionType.RESPONSE, payload: { contracts, ltas } }))
      .catch((error) => dispatch({ type: ContractsActionType.SET_ERROR, payload: error }))
  }, [dispatch])

  const fetchContract = useCallback(
    async (id: string) => {
      const contract = localState.contracts?.find((contract) => contract.id === id)

      if (contract === undefined) {
        return
      }

      try {
        dispatch({
          type: ContractsActionType.SET_CONTRACT_DETAILS_LOADING,
          payload: {
            id,
          },
        })

        const [details, schools, payments] = [ContractStatus.Sent, ContractStatus.Confirmed].includes(contract.status)
          ? await getContract(id).then(async (details) => [details, details.schools])
          : await Promise.all([getContractDetails(id), getContractSchools(id), getContractPayments(id)])

        dispatch({
          type: ContractsActionType.SET_CONTRACT_DETAILS_SCHOOLS_PAYMENTS,
          payload: {
            details,
            schools,
            payments,
          },
        })
      } catch (error) {
        dispatch({ type: ContractsActionType.SET_CONTRACT_DETAILS_ERROR, payload: error })
      }
    },
    [localState, dispatch],
  )

  const fetchSchoolMeasures = useCallback(
    async (schoolId: string, id: string, month: string) => {
      dispatch({
        type: ContractsActionType.SET_LOADING,
      })
      try {
        const response = await getSchoolMeasures(schoolId, id, month)
        dispatch({ type: ContractsActionType.SET_SCHOOL_MEASURES, payload: response })
      } catch (error) {
        dispatch({ type: ContractsActionType.SET_CONTRACT_DETAILS_ERROR, payload: error })
      }
    },
    [dispatch],
  )

  const fetchContractPayments = useCallback(
    async (id = contractId) => {
      const contract = localState.contracts?.find((contract) => contract.id === id)

      if (!id || contract === undefined || [ContractStatus.Sent, ContractStatus.Confirmed].includes(contract.status)) {
        return
      }

      dispatch({
        type: ContractsActionType.SET_CONTRACT_PAYMENTS_LOADING,
        payload: { contractId: id },
      })

      try {
        const payments = await getContractPayments(id)

        dispatch({
          type: ContractsActionType.SET_CONTRACT_PAYMENTS,
          payload: {
            payments,
            contractId: id,
          },
        })
      } catch (error) {
        dispatch({ type: ContractsActionType.SET_CONTRACT_PAYMENTS_ERROR, payload: error })
      }
    },
    [contractId, localState.contracts],
  )

  const setSelectedSchool = useCallback(
    (schoolId: string, contractId: string) => {
      dispatch({
        type: ContractsActionType.SET_SELECTED_SCHOOL,
        payload: {
          schoolId,
          contractId,
        },
      })
    },
    [dispatch],
  )

  const setNewContract = useCallback(
    (newContract?: { ltaId?: string }) => {
      dispatch({ type: ContractsActionType.SET_NEW_CONTRACT, payload: { newContract } })
    },
    [dispatch],
  )

  const setSelectedTab = useCallback(
    (tabId: string) => {
      dispatch(createAction(ContractsActionType.SET_ACTIVE_TAB, tabId))
    },
    [dispatch],
  )

  const toggleExpandedLta = useCallback(
    (ltaId: string | null) => {
      dispatch(
        createAction(ContractsActionType.SET_EXPANDED_LTA, {
          ltaId: localState.expandedLtaId === ltaId ? null : ltaId,
        }),
      )
    },
    [localState.expandedLtaId],
  )

  useEffect(() => {
    if (localState.selectedSchool?.schoolId && localState.selectedSchool?.contractId)
      fetchSchoolMeasures(localState.selectedSchool?.schoolId, localState.selectedSchool?.contractId, 'month')
  }, [localState.selectedSchool, fetchSchoolMeasures])

  const setActiveNavItem = useCallback(
    (navItem?: NavItemType) => {
      dispatch({ type: ContractsActionType.SET_ACTIVE_NAV_ITEM, payload: navItem })
    },
    [dispatch],
  )

  useEffect(() => {
    if (localState.newContract && selectedContract) {
      dispatch({ type: ContractsActionType.SET_NEW_CONTRACT, payload: { newContract: undefined } })
    }
  }, [localState.newContract, selectedContract])

  const value = useMemo(
    () => ({
      state: localState,
      dispatch,
      actions: {
        fetchContract,
        setActiveNavItem,
        setSelectedSchool,
        fetchSchoolMeasures,
        reloadContracts: fetchContracts,
        reloadContractPayments: fetchContractPayments,
        setNewContract,
        setSelectedTab,
        toggleExpandedLta,
      },
    }),
    [
      localState,
      fetchContract,
      fetchContracts,
      setActiveNavItem,
      setSelectedSchool,
      fetchSchoolMeasures,
      fetchContractPayments,
      setNewContract,
      setSelectedTab,
      toggleExpandedLta,
    ],
  )
  useEffect(() => {
    if (localState.contracts === undefined && localState.loading === false) {
      fetchContracts()
    }
  }, [fetchContracts, localState.contracts, localState.loading])

  return <ContractsContext.Provider value={value}>{children}</ContractsContext.Provider>
}

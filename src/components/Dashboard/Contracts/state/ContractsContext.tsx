import { createContext, FC, useReducer, useCallback, useMemo, Dispatch, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { ContractStatus } from 'src/types/general'
import { getSchoolMeasures } from 'src/api/school'
import { getContract, getContractDetails, getContracts, getContractSchools } from 'src/api/contracts'
import { ChildrenProps } from 'src/types/utils'
import { createAction } from 'src/utils/createAction'
import { getLtas } from 'src/api/createContract'
import { getContractPayments } from 'src/api/payments'
import { useGeneralContext } from 'src/state/GeneralContext'
import { INITIAL_CONTRACTS_STATE } from './initial-state'
import { reducer } from './reducer'
import { ContractsAction, ContractsActionType, ContractsState, ContractStagedActiveTab, NavItemType } from './types'
import { selectContract, selectDraft } from './selectors'

export interface IContractsContext {
  state: ContractsState
  dispatch: Dispatch<ContractsAction>
  actions: {
    fetchContract: (id: string) => Promise<void>
    setActiveNavItem: (item?: NavItemType) => void
    setSelectedSchool: (schoolId: string) => void
    fetchSchoolMeasures: (schoolId: string, id: string, month: string) => void
    reloadContracts: () => void
    reloadContractPayments: (id?: string) => Promise<void>
    setNewContract: (newContract?: { ltaId?: string }) => void
    setSelectedTab: (tabId: ContractStagedActiveTab) => void
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

  const {
    actions: { reloadContractCounts },
  } = useGeneralContext()

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
      dispatch({ type: ContractsActionType.SET_SCHOOL_MEASURES_LOADING, payload: { schoolId } })
      try {
        const response = await getSchoolMeasures(schoolId, id, month)
        dispatch({ type: ContractsActionType.SET_SCHOOL_MEASURES, payload: { qos: response, schoolId } })
      } catch (error) {
        dispatch({ type: ContractsActionType.SET_SCHOOL_MEASURES_ERROR, payload: { error, schoolId } })
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

  const reloadContracts = useCallback(() => {
    fetchContracts()
    reloadContractCounts()
  }, [fetchContracts, reloadContractCounts])

  const setSelectedSchool = useCallback(
    (schoolId?: string) => {
      const school =
        schoolId === undefined ? undefined : selectedContract?.details.data?.schools.find(({ id }) => id === schoolId)
      dispatch({
        type: ContractsActionType.SET_SELECTED_SCHOOL,
        payload: {
          schoolId: school?.id,
          contractId: selectedContract?.id,
        },
      })

      if (selectedContract?.id && school?.id && !localState.schoolsQos[school.id]) {
        fetchSchoolMeasures(school.id, selectedContract.id, 'month')
      }
    },
    [fetchSchoolMeasures, localState, selectedContract],
  )

  const setNewContract = useCallback(
    (newContract?: { ltaId?: string }) => {
      dispatch({ type: ContractsActionType.SET_NEW_CONTRACT, payload: { newContract } })
    },
    [dispatch],
  )

  const setSelectedTab = useCallback(
    (tabId: ContractStagedActiveTab) => {
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
    if (
      localState.selectedSchool?.schoolId &&
      localState.selectedSchool?.contractId &&
      selectedContract?.id !== localState.selectedSchool?.contractId
    )
      setSelectedSchool()
  }, [
    localState.selectedSchool?.contractId,
    localState.selectedSchool?.schoolId,
    selectedContract?.id,
    setSelectedSchool,
  ])

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
        reloadContracts,
        reloadContractPayments: fetchContractPayments,
        setNewContract,
        setSelectedTab,
        toggleExpandedLta,
      },
    }),
    [
      localState,
      fetchContract,
      reloadContracts,
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

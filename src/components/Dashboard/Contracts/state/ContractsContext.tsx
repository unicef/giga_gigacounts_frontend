import { createContext, FC, useReducer, useCallback, useMemo, Dispatch, useEffect } from 'react'
import { ContractStatus } from 'src/types/general'
import { getSchoolMeasures } from 'src/api/school'
import { getContract, getContractDetails, getContracts, getContractSchools } from 'src/api/contracts'
import { ChildrenProps } from 'src/types/utils'
import { INITIAL_CONTRACTS_STATE } from './initial-state'
import { reducer } from './reducer'
import { ContractsAction, ContractsActionType, ContractsState, NavItemType } from './types'
import { createAction } from 'src/utils/createAction'

export interface IContractsContext {
  state: ContractsState
  dispatch: Dispatch<ContractsAction>
  actions: {
    fetchContract: (id: string) => void
    setActiveNavItem: (item?: NavItemType) => void
    setSelectedSchool: (schoolId: string, contractId: string) => void
    fetchSchoolMeasures: (schoolId: string, id: string, month: string) => void
    reloadContracts: () => void
    setNewContract: (newContract?: { ltaId?: string }) => void
    setSelectedTab: (tabId: string) => void
    setSelectedPayment: (paymentId: string, contractId: string) => void
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
    setNewContract: () => {
      throw new Error('Not implemented')
    },
    setSelectedTab: () => {
      throw new Error('Not implemented')
    },
    setSelectedPayment: () => {
      throw new Error('Not implemented')
    },
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

        const [details, schools] = [ContractStatus.Sent, ContractStatus.Confirmed].includes(contract.status)
          ? await getContract(id).then(async (details) => [details, details.schools])
          : await Promise.all([getContractDetails(id), getContractSchools(id)])

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
    [localState, dispatch],
  )

  const fetchSchoolMeasures = useCallback(
    async (schoolId: string, id: string, month: string) => {
      try {
        dispatch({
          type: ContractsActionType.SET_LOADING,
        })
        const response = await getSchoolMeasures(schoolId, id, month)
        dispatch({ type: ContractsActionType.SET_SCHOOL_MEASURES, payload: response })
      } catch (error) {
        dispatch({ type: ContractsActionType.SET_CONTRACT_DETAILS_ERROR, payload: error })
      }
    },
    [dispatch],
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
  const setSelectedPayment = useCallback(
    (paymentId: string, contractId: string) => {
      dispatch(
        createAction(ContractsActionType.SET_SELECTED_PAYMENT, {
          paymentId,
          contractId,
        }),
      )
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
        setNewContract,
        setSelectedTab,
        setSelectedPayment,
      },
    }),
    [
      localState,
      fetchContract,
      fetchContracts,
      setActiveNavItem,
      setSelectedSchool,
      fetchSchoolMeasures,
      setNewContract,
      setSelectedTab,
      setSelectedPayment,
    ],
  )
  useEffect(() => {
    if (localState.contracts === undefined && localState.loading === false) {
      fetchContracts()
    }
  }, [fetchContracts, localState.contracts, localState.loading])

  return <ContractsContext.Provider value={value}>{children}</ContractsContext.Provider>
}

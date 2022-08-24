import { createContext, FC, useReducer, useCallback, useMemo, Dispatch, useEffect } from 'react'
import { ContractStatus, IContractPayment } from 'src/types/general'
import { getSchoolMeasures } from 'src/api/school'
import { getContract, getContractDetails, getContracts, getContractSchools } from 'src/api/contracts'
import { ChildrenProps } from 'src/types/utils'
import { INITIAL_CONTRACTS_STATE } from './initial-state'
import { reducer } from './reducer'
import { ContractsAction, ContractsActionType, ContractsState, NavItemType } from './types'
import { createAction } from 'src/utils/createAction'
import { createPayment, getContractPayments, getPayment } from 'src/api/payments'
import { getLtas } from 'src/api/createContract'
import { useParams, useSearchParams } from 'react-router-dom'
import { selectContract, selectDraft } from './selectors'

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
    createNewPayment: (showPaymentDetails: boolean, contractId: string) => void
    savePayment: () => void
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
    savePayment: () => {
      throw new Error('Not implemented')
    },
    createNewPayment: () => {
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

  const fetchPayment = useCallback(async (paymentId: string) => {
    try {
      const response = await getPayment<IContractPayment>(paymentId)
      dispatch(createAction(ContractsActionType.SET_PAYMENT_FORM, response))
    } catch (error) {
      dispatch(createAction(ContractsActionType.SET_ERROR, error))
    }
  }, [])

  useEffect(() => {
    if (localState.selectedPayment?.paymentId && localState.selectedPayment.contractId) {
      fetchPayment(localState.selectedPayment.paymentId)
    }
  }, [localState.selectedPayment, fetchPayment])

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

  const createNewPayment = useCallback(
    async (showPaymentDetails: boolean, contractId: string) => {
      try {
        dispatch(createAction(ContractsActionType.SHOW_PAYMENT_DETAILS, showPaymentDetails))
        // const getAvailablePayments = await getContractAvailablePayments(contractId)

        // const getMetrics = await getNewPaymentMetrics<ISchoolsConnections>({
        //   month: 1,
        //   year: 2022,
        //   contractId,
        // })
      } catch (error) {
        dispatch(createAction(ContractsActionType.SET_ERROR, error))
      }
      // fetch payment details - API available payments - month - year - dropdown
      // fetch data new row - API calculate measures
      // set details active
    },
    [dispatch],
  )

  const savePayment = useCallback(async () => {
    dispatch(createAction(ContractsActionType.SET_LOADING))
    try {
      const payment = await createPayment(localState.paymentForm)
      dispatch(createAction(ContractsActionType.PAYMENT_CREATED, payment))
    } catch (error) {
      dispatch(createAction(ContractsActionType.SET_ERROR, error))
    }
  }, [localState.paymentForm, dispatch])

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
        savePayment,
        createNewPayment,
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
      savePayment,
      createNewPayment,
    ],
  )
  useEffect(() => {
    if (localState.contracts === undefined && localState.loading === false) {
      fetchContracts()
    }
  }, [fetchContracts, localState.contracts, localState.loading])

  return <ContractsContext.Provider value={value}>{children}</ContractsContext.Provider>
}

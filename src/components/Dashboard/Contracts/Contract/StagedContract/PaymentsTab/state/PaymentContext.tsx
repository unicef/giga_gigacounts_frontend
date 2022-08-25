import { createContext, FC, useReducer, useCallback, useMemo, Dispatch, useEffect } from 'react'
import { ChildrenProps } from 'src/types/utils'
import { createAction } from 'src/utils/createAction'
import { createPayment, getPayment } from 'src/api/payments'
import { IPaymentDate, IContractPayment, IPaymentMetrics } from 'src/types/general'
import { INITIAL_PAYMENTS_STATE } from './initial-state'
import { reducer } from './reducer'
import { PaymentsAction, PaymentsActionType, PaymentsState } from './types'
import { usePayment } from './hooks'
import { getContractAvailablePayments } from 'src/api/contracts'
import { getNewPaymentMetrics } from 'src/api/measure'
import { useContractsContext } from 'src/components/Dashboard/Contracts/state/useContractsContext'
import { useSelectedContract } from 'src/components/Dashboard/Contracts/state/hooks'

export interface IPaymentsContext {
  state: PaymentsState
  dispatch: Dispatch<PaymentsAction>
  actions: {
    setSelectedPayment: (paymentId: string) => void
    createNewPayment: () => void
    savePayment: () => void
    cancelPayment: () => void
    onPaymentFormDateChange: ({ year, month }: { year: number; month: number }) => void
    reload: () => void
  }
}

export const PaymentsContext = createContext<IPaymentsContext>({
  state: INITIAL_PAYMENTS_STATE,
  dispatch: () => {
    throw new Error('Not implemented')
  },
  actions: {
    setSelectedPayment: () => {
      throw new Error('Not implemented')
    },
    savePayment: () => {
      throw new Error('Not implemented')
    },
    createNewPayment: () => {
      throw new Error('Not implemented')
    },
    cancelPayment: () => {
      throw new Error('Not implemented')
    },
    onPaymentFormDateChange: () => {
      throw new Error('Not implemented')
    },
    reload: () => {
      throw new Error('Not implemented')
    },
  },
})

export const PaymentsProvider: FC<ChildrenProps> = ({ children }) => {
  const [localState, dispatch] = useReducer(reducer, INITIAL_PAYMENTS_STATE)

  const selectedPayment = usePayment(localState.selectedPaymentId)

  const {
    actions: { reloadContracts },
  } = useContractsContext()

  const selectedContract = useSelectedContract()

  const contractAvailablePayments = useCallback(async () => {
    if (selectedContract?.id) {
      dispatch(createAction(PaymentsActionType.SET_LOADING))
      try {
        const availablePayments = await getContractAvailablePayments<IPaymentDate[]>(selectedContract.id)

        if (availablePayments.length) {
          dispatch(
            createAction(PaymentsActionType.SET_AVAILABLE_PAYMENTS, {
              availablePayments,
              selectedContract,
            }),
          )
        }
      } catch (error) {
        dispatch(createAction(PaymentsActionType.SET_ERROR, error))
      }
    }
  }, [selectedContract])

  const fetchPaymentMetrics = useCallback(
    async ({ month, year }: { month: number; year: number }) => {
      if (selectedContract?.id) {
        dispatch(createAction(PaymentsActionType.SET_LOADING))
        try {
          const paymentMetrics = await getNewPaymentMetrics<IPaymentMetrics>({
            month,
            year,
            contractId: selectedContract?.id,
          })
          dispatch(
            createAction(PaymentsActionType.SET_PAYMENT_METRICS, {
              paymentMetrics,
            }),
          )
        } catch (error) {
          dispatch(createAction(PaymentsActionType.SET_ERROR, error))
        }
      }
    },
    [selectedContract],
  )

  const setSelectedPayment = useCallback(
    (paymentId: string) => {
      if (selectedContract?.id) {
        dispatch(
          createAction(PaymentsActionType.SET_SELECTED_PAYMENT, {
            paymentId,
          }),
        )
      }
    },
    [selectedContract?.id],
  )

  const fetchPayment = useCallback(async (paymentId: string) => {
    try {
      const response = await getPayment<IContractPayment>(paymentId)
      dispatch(createAction(PaymentsActionType.SET_PAYMENT_FORM, response))
    } catch (error) {
      dispatch(createAction(PaymentsActionType.SET_ERROR, error))
    }
  }, [])

  const reload = useCallback(async () => {
    if (localState.selectedPaymentId) {
      fetchPayment(localState.selectedPaymentId)
    }
  }, [fetchPayment, localState.selectedPaymentId])

  const createNewPayment = useCallback(async () => {
    if (selectedContract?.id) {
      dispatch(createAction(PaymentsActionType.SET_LOADING))
      try {
        const availablePayments = await getContractAvailablePayments<IPaymentDate[]>(selectedContract.id)

        if (availablePayments.length) {
          const paymentMetrics = await getNewPaymentMetrics<IPaymentMetrics>({
            ...availablePayments[0],
            contractId: selectedContract.id,
          })
          dispatch(
            createAction(PaymentsActionType.CREATE_NEW_PAYMENT, {
              availablePayments,
              paymentMetrics,
              selectedContract,
            }),
          )
        } else {
          throw new Error('No available payment dates')
        }
      } catch (error) {
        dispatch(createAction(PaymentsActionType.SET_ERROR, error))
      }
    }
  }, [selectedContract, dispatch])

  const savePayment = useCallback(async () => {
    if (localState.paymentForm) {
      dispatch(createAction(PaymentsActionType.SET_LOADING))
      try {
        const payment = await createPayment(localState.paymentForm)
        dispatch(createAction(PaymentsActionType.PAYMENT_CREATED, payment))
        reloadContracts()
      } catch (error) {
        dispatch(createAction(PaymentsActionType.SET_ERROR, error))
      }
    }
  }, [localState.paymentForm, dispatch, reloadContracts])

  const cancelPayment = () => {
    dispatch(createAction(PaymentsActionType.CANCEL_PAYMENT))
  }

  const onPaymentFormDateChange = useCallback(
    ({ year, month }: { year: number; month: number }) => {
      if (localState.paymentForm.month !== month || localState.paymentForm.year !== year) {
        dispatch(createAction(PaymentsActionType.SET_PAYMENT_DATE, { year, month }))
        fetchPaymentMetrics({ year, month })
      }
    },
    [fetchPaymentMetrics, localState],
  )

  useEffect(() => {
    if (selectedPayment) {
      fetchPayment(selectedPayment.id)
    } else if (localState.selectedPaymentId !== undefined) {
      dispatch(createAction(PaymentsActionType.SET_SELECTED_PAYMENT))
    }
  }, [fetchPayment, localState.selectedPaymentId, selectedPayment])

  useEffect(() => {
    if (
      !localState.loading &&
      localState.paymentForm?.contractId &&
      localState.layout !== 'view' &&
      selectedContract?.id !== localState.paymentForm.contractId
    ) {
      cancelPayment()
    }
  }, [localState.layout, localState.loading, localState.paymentForm.contractId, selectedContract?.id])

  useEffect(() => {
    if (!localState.loading && localState.contractId !== selectedContract?.id) {
      contractAvailablePayments()
    }
  }, [contractAvailablePayments, localState.contractId, localState.loading, selectedContract?.id])

  const value = useMemo(
    () => ({
      state: localState,
      dispatch,
      actions: {
        setSelectedPayment,
        savePayment,
        createNewPayment,
        cancelPayment,
        onPaymentFormDateChange,
        reload,
      },
    }),
    [localState, setSelectedPayment, savePayment, createNewPayment, onPaymentFormDateChange, reload],
  )

  return <PaymentsContext.Provider value={value}>{children}</PaymentsContext.Provider>
}
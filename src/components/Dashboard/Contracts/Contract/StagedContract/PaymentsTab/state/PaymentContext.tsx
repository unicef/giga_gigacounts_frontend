import { createContext, FC, useReducer, useCallback, useMemo, Dispatch, useEffect } from 'react'
import { ChildrenProps } from 'src/types/utils'
import { createAction } from 'src/utils/createAction'
import { changePaymentStatus, createPayment, updatePayment } from 'src/api/payments'
import { IPaymentDate, IContractPayment, IPaymentMetrics, IContractDetails, ContractStatus } from 'src/types/general'
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
    verifyPayment: () => void
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
    verifyPayment: () => {
      throw new Error('Not implemented')
    },
  },
})

export const PaymentsProvider: FC<ChildrenProps> = ({ children }) => {
  const [localState, dispatch] = useReducer(reducer, INITIAL_PAYMENTS_STATE)

  const selectedPayment = usePayment(localState.selectedPaymentId)

  const {
    actions: { reloadContractPayments, fetchContract },
  } = useContractsContext()

  const selectedContract = useSelectedContract()

  const fetchAvailablePayments = useCallback(async () => {
    if (selectedContract?.id) {
      try {
        const availablePayments = await getContractAvailablePayments<IPaymentDate[]>(selectedContract.id)

        dispatch(
          createAction(PaymentsActionType.SET_AVAILABLE_PAYMENTS, {
            availablePayments,
          }),
        )
      } catch (error) {
        dispatch(createAction(PaymentsActionType.SET_ERROR, error))
      }
    }
  }, [selectedContract])

  const fetchPaymentMetrics = useCallback(
    async ({ month, year }: { month: number; year: number }) => {
      if (selectedContract?.id) {
        try {
          const metrics = await getNewPaymentMetrics<IPaymentMetrics>({
            month,
            year,
            contractId: selectedContract?.id,
          })
          dispatch(
            createAction(PaymentsActionType.SET_PAYMENT_METRICS, {
              metrics,
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
    (paymentId?: string) => {
      if (selectedContract?.id) {
        const payment = (selectedContract.details.data as IContractDetails)?.payments.data?.find(
          ({ id }) => id === paymentId,
        )

        dispatch(
          createAction(PaymentsActionType.SET_SELECTED_PAYMENT, {
            payment,
            contract: selectedContract,
          }),
        )
      }
    },
    [selectedContract],
  )

  const createNewPayment = useCallback(async () => {
    if (selectedContract?.id) {
      dispatch(createAction(PaymentsActionType.SET_LOADING))
      try {
        const availablePayments = await getContractAvailablePayments<IPaymentDate[]>(selectedContract.id)

        if (availablePayments.length) {
          const metrics = await getNewPaymentMetrics<IPaymentMetrics>({
            ...availablePayments[0],
            contractId: selectedContract.id,
          })
          dispatch(
            createAction(PaymentsActionType.CREATE_NEW_PAYMENT, {
              availablePayments,
              metrics,
              selectedContract,
            }),
          )
        } else {
          dispatch(createAction(PaymentsActionType.SET_ERROR, new Error('No available payment dates')))
        }
      } catch (error) {
        dispatch(createAction(PaymentsActionType.SET_ERROR, error))
      }
    }
  }, [selectedContract, dispatch])

  const savePayment = useCallback(async () => {
    if (selectedContract?.id && localState.paymentForm) {
      dispatch(createAction(PaymentsActionType.SET_LOADING))
      let { year, month, ...updateData } = localState.paymentForm

      let payment

      if (selectedPayment) {
        if (selectedPayment.paidDate.year !== year || selectedPayment.paidDate.month !== month) {
          updateData = localState.paymentForm
        }

        try {
          payment = (await updatePayment(selectedPayment.id, updateData)) as IContractPayment
        } catch (error) {
          dispatch(createAction(PaymentsActionType.SET_ERROR, error))
        }
      } else {
        try {
          payment = (await createPayment(localState.paymentForm)) as IContractPayment

          dispatch(
            createAction(PaymentsActionType.SET_SELECTED_PAYMENT, {
              payment,
              contract: selectedContract,
            }),
          )
        } catch (error) {
          dispatch(createAction(PaymentsActionType.SET_ERROR, error))
        }
      }

      if (payment) {
        await fetchContract(selectedContract.id)
        await fetchAvailablePayments()
      }
    }
  }, [fetchAvailablePayments, fetchContract, localState.paymentForm, selectedContract, selectedPayment])

  const cancelPayment = useCallback(() => setSelectedPayment(), [setSelectedPayment])

  const reset = useCallback(() => dispatch(createAction(PaymentsActionType.RESET)), [])

  const verifyPayment = useCallback(async () => {
    if (localState.selectedPaymentId) {
      try {
        const response = await changePaymentStatus(localState.selectedPaymentId, 1)
        dispatch(createAction(PaymentsActionType.CHANGE_PAYMENT_STATUS, response))
        // TODO - update state in reducer - maybe status as string
      } catch (error) {
        dispatch(createAction(PaymentsActionType.SET_ERROR, error))
      }
    }
  }, [localState.selectedPaymentId])

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
    if (selectedContract?.id && selectedContract.status !== ContractStatus.Completed) {
      fetchAvailablePayments()
    }
  }, [fetchAvailablePayments, selectedContract?.id, selectedContract?.status])

  useEffect(() => {
    if (selectedContract?.id !== localState.paymentForm.contractId) {
      reset()
    }
  }, [localState.paymentForm.contractId, reset, selectedContract?.id])

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
        reload: reloadContractPayments,
        verifyPayment,
      },
    }),
    [
      localState,
      setSelectedPayment,
      savePayment,
      createNewPayment,
      cancelPayment,
      onPaymentFormDateChange,
      reloadContractPayments,
      verifyPayment,
    ],
  )

  return <PaymentsContext.Provider value={value}>{children}</PaymentsContext.Provider>
}

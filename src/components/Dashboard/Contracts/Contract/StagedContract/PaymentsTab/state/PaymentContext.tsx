import { createContext, FC, useReducer, useCallback, useMemo, Dispatch, useEffect } from 'react'
import { ChildrenProps } from 'src/types/utils'
import { createAction } from 'src/utils/createAction'
import { createPayment, getPayment } from 'src/api/payments'
import { IContractPayment } from 'src/types/general'
import { INITIAL_PAYMENTS_STATE } from './initial-state'
import { reducer } from './reducer'
import { PaymentsAction, PaymentsActionType, PaymentsState } from './types'
import { usePayment } from './hooks'

export interface IPaymentsContext {
  state: PaymentsState
  dispatch: Dispatch<PaymentsAction>
  actions: {
    setSelectedPayment: (paymentId: string) => void
    createNewPayment: (showPaymentDetails: boolean, contractId: string) => void
    savePayment: () => void
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
  },
})

export const PaymentsProvider: FC<ChildrenProps> = ({ children }) => {
  const [localState, dispatch] = useReducer(reducer, INITIAL_PAYMENTS_STATE)

  const selectedPayment = usePayment(localState.selectedPaymentId)

  const setSelectedPayment = useCallback(
    (paymentId: string) => {
      dispatch(
        createAction(PaymentsActionType.SET_SELECTED_PAYMENT, {
          paymentId,
        }),
      )
    },
    [dispatch],
  )

  const fetchPayment = useCallback(async (paymentId: string) => {
    try {
      const response = await getPayment<IContractPayment>(paymentId)
      dispatch(createAction(PaymentsActionType.SET_PAYMENT_FORM, response))
    } catch (error) {
      dispatch(createAction(PaymentsActionType.SET_ERROR, error))
    }
  }, [])

  const createNewPayment = useCallback(
    async (showPaymentDetails: boolean, contractId: string) => {
      try {
        dispatch(createAction(PaymentsActionType.SHOW_PAYMENT_DETAILS, showPaymentDetails))
        // const getAvailablePayments = await getContractAvailablePayments(contractId)

        // const getMetrics = await getNewPaymentMetrics<ISchoolsConnections>({
        //   month: 1,
        //   year: 2022,
        //   contractId,
        // })
      } catch (error) {
        dispatch(createAction(PaymentsActionType.SET_ERROR, error))
      }
      // fetch payment details - API available payments - month - year - dropdown
      // fetch data new row - API calculate measures
      // set details active
    },
    [dispatch],
  )

  const savePayment = useCallback(async () => {
    dispatch(createAction(PaymentsActionType.SET_LOADING))
    try {
      const payment = await createPayment(localState.paymentForm)
      dispatch(createAction(PaymentsActionType.PAYMENT_CREATED, payment))
    } catch (error) {
      dispatch(createAction(PaymentsActionType.SET_ERROR, error))
    }
  }, [localState.paymentForm, dispatch])

  useEffect(() => {
    if (selectedPayment) {
      fetchPayment(selectedPayment.id)
    } else if (localState.selectedPaymentId !== undefined) {
      dispatch(createAction(PaymentsActionType.SET_SELECTED_PAYMENT))
    }
  }, [fetchPayment, localState.selectedPaymentId, selectedPayment])

  const value = useMemo(
    () => ({
      state: localState,
      dispatch,
      actions: {
        setSelectedPayment,
        savePayment,
        createNewPayment,
      },
    }),
    [localState, setSelectedPayment, savePayment, createNewPayment],
  )

  return <PaymentsContext.Provider value={value}>{children}</PaymentsContext.Provider>
}

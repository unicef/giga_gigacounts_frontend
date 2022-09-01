import { PAYMENT_FORM_INITIAL_STATE } from './initial-state'
import { PaymentsAction, PaymentsActionType, PaymentsState } from './types'

export const reducer = (state: PaymentsState, action: PaymentsAction): PaymentsState => {
  const { type, payload } = action

  switch (type) {
    case PaymentsActionType.SET_LOADING: {
      return {
        ...state,
        loading: true,
      }
    }

    case PaymentsActionType.SET_AVAILABLE_PAYMENTS: {
      const { availablePayments } = payload

      return {
        ...state,
        paymentDates: availablePayments,
        loading: false,
      }
    }

    case PaymentsActionType.SET_PAYMENT_METRICS: {
      const { metrics } = payload

      return {
        ...state,
        paymentForm: {
          ...state.paymentForm,
          metrics,
        },
        loading: false,
      }
    }

    case PaymentsActionType.SET_SELECTED_PAYMENT: {
      const { payment, contract } = payload ?? {}

      if (payment && contract) {
        return {
          ...state,
          selectedPaymentId: payment.id,
          layout: 'edit',
          paymentForm: {
            ...PAYMENT_FORM_INITIAL_STATE,
            month: payment.paidDate.month,
            year: payment.paidDate.year,
            contractId: contract.id,
            currencyId: contract.details.data.currency.id,
            amount: +payment.amount,
            description: payment.description,
            metrics: payment.metrics,
          },
          amountNotValid: false,
        }
      }

      return {
        ...state,
        selectedPaymentId: undefined,
        layout: 'view',
        amountNotValid: false,
        paymentForm: {
          ...PAYMENT_FORM_INITIAL_STATE,
        },
      }
    }

    case PaymentsActionType.RESET: {
      return {
        ...state,
        selectedPaymentId: undefined,
        layout: 'view',
        amountNotValid: false,
        paymentForm: {
          ...PAYMENT_FORM_INITIAL_STATE,
        },
        paymentDates: [],
        error: undefined,
        loading: false,
      }
    }

    case PaymentsActionType.SET_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      }

    case PaymentsActionType.SET_PAYMENT_DESCRIPTION: {
      return {
        ...state,
        paymentForm: {
          ...state.paymentForm,
          description: payload,
        },
      }
    }
    case PaymentsActionType.SET_PAYMENT_DATE: {
      const { month, year } = payload
      return {
        ...state,
        paymentForm: {
          ...state.paymentForm,
          month,
          year,
        },
      }
    }
    case PaymentsActionType.SET_PAYMENT_AMOUNT: {
      return {
        ...state,
        paymentForm: {
          ...state.paymentForm,
          amount: payload,
        },
      }
    }

    case PaymentsActionType.CREATE_NEW_PAYMENT: {
      const { availablePayments, metrics, selectedContract } = payload

      const firstAvailablePayment = availablePayments[0]

      return {
        ...state,
        paymentForm: {
          ...PAYMENT_FORM_INITIAL_STATE,
          month: firstAvailablePayment?.month ?? PAYMENT_FORM_INITIAL_STATE.month,
          year: firstAvailablePayment?.year ?? PAYMENT_FORM_INITIAL_STATE.year,
          contractId: selectedContract.id,
          currencyId: selectedContract.details.data.currency.id,
          metrics,
        },
        paymentDates: availablePayments,
        layout: 'create',
        loading: false,
        selectedPaymentId: undefined,
      }
    }

    case PaymentsActionType.SET_IS_AMOUNT_VALID: {
      return {
        ...state,
        amountNotValid: payload,
      }
    }

    case PaymentsActionType.SET_INVOICE: {
      return {
        ...state,
        paymentForm: {
          ...state.paymentForm,
          invoice: payload.invoice,
        },
      }
    }
    case PaymentsActionType.SET_RECEIPT: {
      return {
        ...state,
        paymentForm: {
          ...state.paymentForm,
          receipt: payload.receipt,
        },
      }
    }

    default:
      return {
        ...state,
      }
  }
}

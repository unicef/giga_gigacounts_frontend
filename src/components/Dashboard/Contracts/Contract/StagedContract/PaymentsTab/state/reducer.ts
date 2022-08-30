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
      const { availablePayments, selectedContract } = payload

      const firstAvailablePayment = availablePayments[0]

      return {
        ...state,
        paymentForm: {
          ...PAYMENT_FORM_INITIAL_STATE,
          month: firstAvailablePayment?.month ?? PAYMENT_FORM_INITIAL_STATE.month,
          year: firstAvailablePayment?.year ?? PAYMENT_FORM_INITIAL_STATE.year,
          contractId: selectedContract.id,
          currencyId: selectedContract.details.data.currency.id,
        },
        paymentDates: availablePayments,
        contractId: selectedContract.id,
        loading: false,
      }
    }

    case PaymentsActionType.SET_PAYMENT_METRICS: {
      const { paymentMetrics } = payload

      return {
        ...state,
        paymentMetrics,
        loading: false,
      }
    }

    case PaymentsActionType.SET_SELECTED_PAYMENT: {
      const { paymentId } = payload ?? {}

      return {
        ...state,
        selectedPaymentId: paymentId,
        paymentActiveNewRow: false,
        layout: 'edit',
      }
    }

    case PaymentsActionType.SET_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      }

    case PaymentsActionType.SHOW_PAYMENT_DETAILS: {
      return {
        ...state,
        layout: payload,
        paymentActiveNewRow: payload,
      }
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

    case PaymentsActionType.SET_PAYMENT_FORM: {
      const { description, paidDate, amount } = payload
      return {
        ...state,
        layout: 'edit',
        paymentForm: {
          ...state.paymentForm,
          description,
          month: paidDate.month,
          year: paidDate.year,
          amount,
        },
      }
    }

    case PaymentsActionType.PAYMENT_CREATED:
    case PaymentsActionType.PAYMENT_UPDATED: {
      const { payment } = payload
      return {
        ...state,
        layout: 'edit',

        paymentForm: {
          ...state.paymentForm,
          description: payment.description,
          month: payment.dateTo.month,
          year: payment.dateTo.year,
        },
        paymentActiveNewRow: false,
        selectedPaymentId: payment.id,
        loading: false,
        error: undefined,
      }
    }

    case PaymentsActionType.CREATE_NEW_PAYMENT: {
      const { availablePayments, paymentMetrics, selectedContract } = payload

      const firstAvailablePayment = availablePayments[0]

      return {
        ...state,
        paymentForm: {
          ...PAYMENT_FORM_INITIAL_STATE,
          month: firstAvailablePayment?.month ?? PAYMENT_FORM_INITIAL_STATE.month,
          year: firstAvailablePayment?.year ?? PAYMENT_FORM_INITIAL_STATE.year,
          contractId: selectedContract.id,
          currencyId: selectedContract.details.data.currency.id,
        },
        paymentDates: availablePayments,
        contractId: selectedContract.id,
        paymentMetrics,
        layout: 'create',
        paymentActiveNewRow: true,
        loading: false,
        selectedPaymentId: undefined,
      }
    }

    case PaymentsActionType.CANCEL_PAYMENT: {
      return {
        ...state,
        paymentForm: {
          ...PAYMENT_FORM_INITIAL_STATE,
        },
        layout: 'view',
        paymentActiveNewRow: false,
        selectedPaymentId: undefined,
        amountNotValid: false,
      }
    }

    case PaymentsActionType.SET_IS_AMOUNT_VALID: {
      return {
        ...state,
        amountNotValid: payload > 0 ? false : true,
      }
    }

    case PaymentsActionType.SHOW_ERROR_MESSAGE: {
      return {
        ...state,
        showErrorMessage: payload,
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

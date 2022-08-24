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

    case PaymentsActionType.SET_SELECTED_PAYMENT: {
      const { paymentId } = payload ?? {}

      return {
        ...state,
        selectedPaymentId: paymentId,
        paymentActiveNewRow: false,
      }
    }

    case PaymentsActionType.SET_ERROR:
      return {
        ...state,
        error: payload,
      }

    case PaymentsActionType.SHOW_PAYMENT_DETAILS: {
      return {
        ...state,
        paymentDetails: payload,
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
      return {
        ...state,
        paymentForm: {
          ...state.paymentForm,
          ...payload,
        },
      }
    }

    case PaymentsActionType.PAYMENT_CREATED: {
      return {
        ...state,
        loading: false,
      }
    }

    default:
      return {
        ...state,
      }
  }
}

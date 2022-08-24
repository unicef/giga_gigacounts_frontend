import { IPaymentForm } from 'src/types/general'

export enum PaymentsActionType {
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
  SET_SELECTED_PAYMENT = 'SET_SELECTED_PAYMENT',
  SHOW_PAYMENT_DETAILS = 'SHOW_PAYMENT_DETAILS',
  SET_PAYMENT_DESCRIPTION = 'SET_PAYMENT_DESCRIPTION',
  SET_PAYMENT_DATE = 'SET_PAYMENT_DATE',
  SET_PAYMENT_AMOUNT = 'SET_PAYMENT_AMOUNT',
  PAYMENT_CREATED = 'PAYMENT_CREATED',
  SET_PAYMENT_FORM = 'SET_PAYMENT_FORM',
}

export interface PaymentsAction {
  type: PaymentsActionType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any
}

export interface PaymentsState {
  error?: Error
  loading?: boolean
  selectedPaymentId?: string
  paymentDetails: boolean
  paymentActiveNewRow: boolean
  paymentForm: IPaymentForm
}

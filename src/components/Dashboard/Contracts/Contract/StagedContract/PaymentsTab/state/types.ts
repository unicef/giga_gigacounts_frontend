import { IPaymentDate, IPaymentForm, IPaymentMetrics } from 'src/types/general'

export enum PaymentsActionType {
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
  SET_AVAILABLE_PAYMENTS = 'SET_AVAILABLE_PAYMENTS',
  SET_PAYMENT_METRICS = 'SET_PAYMENT_METRICS',
  SET_SELECTED_PAYMENT = 'SET_SELECTED_PAYMENT',
  SHOW_PAYMENT_DETAILS = 'SHOW_PAYMENT_DETAILS',
  SET_PAYMENT_DESCRIPTION = 'SET_PAYMENT_DESCRIPTION',
  SET_PAYMENT_DATE = 'SET_PAYMENT_DATE',
  SET_PAYMENT_AMOUNT = 'SET_PAYMENT_AMOUNT',
  PAYMENT_CREATED = 'PAYMENT_CREATED',
  SET_PAYMENT_FORM = 'SET_PAYMENT_FORM',
  CREATE_NEW_PAYMENT = 'CREATE_NEW_PAYMENT',
  CANCEL_PAYMENT = 'CANCEL_PAYMENT',
  SET_IS_AMOUNT_VALID = 'SET_IS_AMOUNT_VALID',
  SHOW_ERROR_MESSAGE = 'SHOW_ERROR_MESSAGE',
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
  layout: 'create' | 'edit' | 'view'
  paymentActiveNewRow: boolean
  paymentForm: IPaymentForm
  paymentMetrics: IPaymentMetrics
  paymentDates: IPaymentDate[]
  contractId?: string
  isAmountValid: boolean
  showErrorMessage: boolean
}

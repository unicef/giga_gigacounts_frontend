import { IPaymentDate, IPaymentForm } from 'src/types/general'

export enum PaymentsActionType {
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
  RESET = 'RESET',
  SET_AVAILABLE_PAYMENTS = 'SET_AVAILABLE_PAYMENTS',
  SET_PAYMENT_METRICS = 'SET_PAYMENT_METRICS',
  SET_SELECTED_PAYMENT = 'SET_SELECTED_PAYMENT',
  SET_PAYMENT_DESCRIPTION = 'SET_PAYMENT_DESCRIPTION',
  SET_PAYMENT_DATE = 'SET_PAYMENT_DATE',
  SET_PAYMENT_AMOUNT = 'SET_PAYMENT_AMOUNT',
  CREATE_NEW_PAYMENT = 'CREATE_NEW_PAYMENT',
  SET_IS_AMOUNT_VALID = 'SET_IS_AMOUNT_VALID',
  SET_INVOICE = 'SET_INVOICE',
  SET_RECEIPT = 'SET_RECEIPT',
  CHANGE_PAYMENT_STATUS = 'CHANGE_PAYMENT_STATUS',
}

export interface PaymentsAction {
  type: PaymentsActionType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any
}

export interface PaymentsState {
  error?: Error
  loading: boolean
  selectedPaymentId?: string
  layout: 'create' | 'edit' | 'view'
  paymentForm: IPaymentForm
  paymentDates: IPaymentDate[]
  amountNotValid: boolean
}

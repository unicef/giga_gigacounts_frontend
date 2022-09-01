import { IPaymentForm } from 'src/types/general'
import { PaymentsState } from './types'

export const PAYMENT_FORM_INITIAL_STATE: IPaymentForm = {
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
  contractId: '1',
  description: '',
  currencyId: '1',
  amount: 0,
  invoice: undefined,
  receipt: undefined,
  metrics: {
    connectionsMedian: [],
    allEqualOrAboveAvg: 0,
    atLeastOneBellowAvg: 0,
    withoutConnection: 0,
  },
}

export const INITIAL_PAYMENTS_STATE: PaymentsState = {
  error: undefined,
  loading: false,
  selectedPaymentId: undefined,
  layout: 'view',
  paymentForm: PAYMENT_FORM_INITIAL_STATE,
  paymentDates: [],
  amountNotValid: false,
}

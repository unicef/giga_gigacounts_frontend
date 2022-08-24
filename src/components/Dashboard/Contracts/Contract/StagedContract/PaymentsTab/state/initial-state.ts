import { IPaymentForm } from 'src/types/general'
import { PaymentsState } from './types'

export const PAYMENT_FORM_INITIAL_STATE: IPaymentForm = {
  month: 2,
  year: 2022,
  contractId: '10',
  description: '',
  currencyId: '1',
  amount: 0,
  invoice: {
    file: 'data:image/png;base64,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',
    name: 'Invoice name',
  },
}

export const INITIAL_PAYMENTS_STATE: PaymentsState = {
  error: undefined,
  loading: false,
  selectedPaymentId: undefined,
  paymentDetails: false,
  paymentActiveNewRow: false,
  paymentForm: PAYMENT_FORM_INITIAL_STATE,
}

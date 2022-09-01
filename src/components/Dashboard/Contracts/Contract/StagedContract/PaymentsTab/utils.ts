import { IConnectionMedian, IContractPayment, IPaymentForm } from 'src/types/general'
import { compare } from 'src/utils/compare'
import { CONNECTIONS_MEDIAN_DEFAULT } from './state/consts'

export const fillMissingConnectionsMedian = (existingMeasurements?: IConnectionMedian[]) =>
  new Array(4).fill(null).map((_, index) => {
    const existing = existingMeasurements?.find(
      (measurement) => measurement.metric_id === CONNECTIONS_MEDIAN_DEFAULT[index].metric_id,
    )
    return { ...CONNECTIONS_MEDIAN_DEFAULT[index], ...existing }
  })

export const getPaymentFormData = (payment: IContractPayment): Partial<IPaymentForm> => {
  const { month, year } = payment.paidDate

  return {
    description: payment.description,
    month,
    year,
    amount: payment.amount,
  }
}

export const checkPaymentChanges = (payment: IContractPayment, formData: IPaymentForm) => {
  const paymentData = getPaymentFormData(payment)

  return !compare(paymentData, formData, ['description', 'amount', 'month', 'year'])
}

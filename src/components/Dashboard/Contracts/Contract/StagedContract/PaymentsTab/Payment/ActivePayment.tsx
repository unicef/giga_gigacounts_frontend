import { useMemo } from 'react'
import { useSelectedContract } from 'src/components/Dashboard/Contracts/state/hooks'
import PaymentSkeleton from './PaymentSkeleton'
import { usePaymentsContext } from '../state/usePaymentsContext'
import { usePayment, useIsPaymentDirty } from '../state/hooks'

const ActivePayment: React.FC = () => {
  const {
    state: { paymentForm, selectedPaymentId },
  } = usePaymentsContext()

  const selectedContract = useSelectedContract()

  const selectedPayment = usePayment(selectedPaymentId)

  const paidDate = useMemo(
    () => ({
      year: paymentForm.year,
      month: paymentForm.month,
    }),
    [paymentForm.month, paymentForm.year],
  )

  const isDirty = useIsPaymentDirty()

  return (
    <PaymentSkeleton
      description={paymentForm.description ?? 'New payment'}
      amount={paymentForm.amount}
      currency={selectedContract?.details.data?.currency!}
      metrics={paymentForm.metrics}
      status={selectedPayment?.status}
      paidDate={paidDate}
      dirty={isDirty}
      active
    />
  )
}

export default ActivePayment

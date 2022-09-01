import { useCallback } from 'react'
import { IContractPayment } from 'src/types/general'
import { usePaymentsContext } from '../state/usePaymentsContext'
import ActivePayment from './ActivePayment'
import PaymentSkeleton from './PaymentSkeleton'

interface PaymentProps {
  payment: IContractPayment
}

const Payment: React.FC<PaymentProps> = ({ payment }: PaymentProps): JSX.Element => {
  const {
    state: { selectedPaymentId },
    actions: { setSelectedPayment },
  } = usePaymentsContext()

  const handleClick = useCallback(() => setSelectedPayment?.(payment.id), [setSelectedPayment, payment.id])

  if (selectedPaymentId === payment.id) {
    return <ActivePayment />
  }

  return (
    <PaymentSkeleton
      amount={payment.amount}
      currency={payment.currency}
      description={payment.description}
      metrics={payment.metrics}
      paidDate={payment.paidDate}
      status={payment.status}
      onClick={handleClick}
    />
  )
}

export default Payment

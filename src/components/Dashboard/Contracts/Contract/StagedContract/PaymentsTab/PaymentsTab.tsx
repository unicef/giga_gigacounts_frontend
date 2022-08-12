import { useParams } from 'react-router-dom'
import Payment from 'src/components/common/Payment/Payment'
import { useContractsContext } from '../../../state/useContractsContext'
import PaymentDetails from './PaymentDetails/PaymentDetails'
import { PaymentsTabContainer, PaymentsRow } from './styles'

const PaymentsTab: React.FC = (): JSX.Element => {
  let { id } = useParams()
  const {
    state: { selectedPayment },
    actions: { setSelectedPayment },
  } = useContractsContext()

  const onPaymentSelected = (paymentId: string) => {
    if (id) setSelectedPayment(paymentId, id)
  }

  const payments = [
    {
      id: '1',
    },
    {
      id: '2',
    },
    {
      id: '3',
    },
  ]

  return (
    <PaymentsTabContainer>
      <div>
        {payments &&
          payments.map((payment) => (
            <PaymentsRow key={payment.id} active={selectedPayment?.paymentId === payment.id}>
              <Payment
                paymentId={payment.id}
                active={selectedPayment?.paymentId === payment.id}
                onPaymentSelected={onPaymentSelected}
              />
            </PaymentsRow>
          ))}
      </div>
      {selectedPayment?.paymentId && <PaymentDetails />}
    </PaymentsTabContainer>
  )
}

export default PaymentsTab

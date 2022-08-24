import { useParams } from 'react-router-dom'
import NewPayment from 'src/components/common/NewPayment/NewPayment'
import Payment from 'src/components/common/Payment/Payment'
import { IContractPayment } from 'src/types/general'
import { useContractsContext } from '../../../state/useContractsContext'
import PaymentDetails from './PaymentDetails/PaymentDetails'
import { PaymentsTabContainer, PaymentsRow, PaymentRowWrapper } from './styles'

interface IContractPaymentProps {
  contractPayments: IContractPayment[]
}

type PaymentRouteParams = {
  id: string
}

const PaymentsTab: React.FC<IContractPaymentProps> = ({ contractPayments }: IContractPaymentProps): JSX.Element => {
  let { id } = useParams<keyof PaymentRouteParams>() as PaymentRouteParams
  const {
    state: { selectedPayment, paymentDetails, paymentActiveNewRow },
    actions: { setSelectedPayment, createNewPayment },
  } = useContractsContext()

  const onPaymentSelected = (paymentId: string) => {
    if (id) setSelectedPayment(paymentId, id)
  }

  return (
    <PaymentsTabContainer>
      <PaymentRowWrapper>
        <PaymentsRow>
          <NewPayment onCreateNewPayment={() => createNewPayment(true, id)} />
        </PaymentsRow>
        {paymentDetails && (
          <PaymentsRow active={paymentActiveNewRow}>
            <NewPayment placeholderRow />
          </PaymentsRow>
        )}
        {contractPayments &&
          contractPayments.map((payment) => (
            <PaymentsRow key={payment.id} active={selectedPayment?.paymentId === payment.id}>
              <Payment
                payment={payment}
                active={selectedPayment?.paymentId === payment.id}
                onPaymentSelected={onPaymentSelected}
              />
            </PaymentsRow>
          ))}
      </PaymentRowWrapper>
      {(selectedPayment?.paymentId || paymentDetails) && <PaymentDetails contractId={id} />}
    </PaymentsTabContainer>
  )
}

export default PaymentsTab

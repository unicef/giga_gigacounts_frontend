import Payment from 'src/components/Dashboard/Contracts/Contract/StagedContract/PaymentsTab/Payment/Payment'
import { withContextProviders } from 'src/utils/withContextProvider'
import Loader from 'src/components/common/Loader'
import PaymentForm from './PaymentForm'
import { usePaymentsContext } from './state/usePaymentsContext'
import { PaymentsProvider } from './state/PaymentContext'
import { PaymentsTabContainer, PaymentRowWrapper } from './styles'
import { usePayments } from './state/hooks'
import CreatePaymentRow from './Payment/CreatePaymentRow'
import ActivePayment from './Payment/ActivePayment'

const PaymentsTab: React.FC = (): JSX.Element => {
  const {
    state: { selectedPaymentId, layout, loading },
  } = usePaymentsContext()

  const contractPayments = usePayments()

  return (
    <PaymentsTabContainer>
      <PaymentRowWrapper>
        {layout === 'create' ? <ActivePayment /> : <CreatePaymentRow />}
        {contractPayments.data?.map((payment) => (
          <Payment key={payment.id} payment={payment} />
        ))}
        {(loading || contractPayments.loading) && <Loader />}
      </PaymentRowWrapper>

      {(selectedPaymentId || layout !== 'view') && <PaymentForm />}
    </PaymentsTabContainer>
  )
}

export default withContextProviders(PaymentsProvider)(PaymentsTab)

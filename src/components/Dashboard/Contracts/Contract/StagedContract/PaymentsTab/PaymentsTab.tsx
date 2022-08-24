import { useCallback } from 'react'
import NewPayment from 'src/components/Dashboard/Contracts/Contract/StagedContract/PaymentsTab/Payment/NewPayment/NewPayment'
import Payment from 'src/components/Dashboard/Contracts/Contract/StagedContract/PaymentsTab/Payment/Payment'
import { IContractPayment } from 'src/types/general'
import { withContextProviders } from 'src/utils/withContextProvider'
import { useSelectedContract } from 'src/components/Dashboard/Contracts/state/hooks'
import PaymentDetails from './PaymentDetails/PaymentDetails'
import { usePaymentsContext } from './state/usePaymentsContext'
import { PaymentsProvider } from './state/PaymentContext'
import { PaymentsTabContainer, PaymentsRow, PaymentRowWrapper } from './styles'

interface IContractPaymentProps {
  contractPayments: IContractPayment[]
}

const PaymentsTab: React.FC<IContractPaymentProps> = ({ contractPayments }: IContractPaymentProps): JSX.Element => {
  const {
    state: { selectedPaymentId, paymentDetails, paymentActiveNewRow },
    actions: { setSelectedPayment, createNewPayment },
  } = usePaymentsContext()

  const selectedContract = useSelectedContract()

  const onPaymentSelected = useCallback(
    (paymentId: string) => {
      setSelectedPayment(paymentId)
    },
    [setSelectedPayment],
  )

  const onCreateNewPayment = useCallback(() => {
    if (selectedContract?.id !== undefined) {
      createNewPayment(true, selectedContract.id)
    }
  }, [createNewPayment, selectedContract?.id])

  return (
    <PaymentsTabContainer>
      <PaymentRowWrapper>
        <PaymentsRow>
          <NewPayment onCreateNewPayment={onCreateNewPayment} />
        </PaymentsRow>
        {paymentDetails && (
          <PaymentsRow active={paymentActiveNewRow}>
            <NewPayment placeholderRow />
          </PaymentsRow>
        )}
        {contractPayments &&
          contractPayments.map((payment) => (
            <PaymentsRow key={payment.id} active={selectedPaymentId === payment.id}>
              <Payment
                payment={payment}
                active={selectedPaymentId === payment.id}
                onPaymentSelected={onPaymentSelected}
              />
            </PaymentsRow>
          ))}
      </PaymentRowWrapper>
      {(selectedPaymentId || paymentDetails) && (
        <PaymentDetails contractId={selectedContract?.id} paymentId={selectedPaymentId} />
      )}
    </PaymentsTabContainer>
  )
}

export default withContextProviders<IContractPaymentProps>(PaymentsProvider)(PaymentsTab)

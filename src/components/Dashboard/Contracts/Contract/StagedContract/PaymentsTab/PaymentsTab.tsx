import { useCallback, useMemo } from 'react'
import NewPayment from 'src/components/Dashboard/Contracts/Contract/StagedContract/PaymentsTab/NewPayment/NewPayment'
import Payment from 'src/components/Dashboard/Contracts/Contract/StagedContract/PaymentsTab/Payment/Payment'
import { withContextProviders } from 'src/utils/withContextProvider'
import { useSelectedContract } from 'src/components/Dashboard/Contracts/state/hooks'
import PaymentForm from './PaymentForm'
import { usePaymentsContext } from './state/usePaymentsContext'
import { PaymentsProvider } from './state/PaymentContext'
import { PaymentsTabContainer, PaymentsRow, PaymentRowWrapper } from './styles'
import { usePayments } from './state/hooks'
import { ContractStatus } from 'src/types/general'
import Loader from 'src/components/common/Loader'

const PaymentsTab: React.FC = (): JSX.Element => {
  const {
    state: { selectedPaymentId, layout, paymentActiveNewRow, loading, paymentDates },
    actions: { setSelectedPayment, createNewPayment },
  } = usePaymentsContext()

  const selectedContract = useSelectedContract()

  const contractPayments = usePayments()

  const disableCreate = useMemo(
    () =>
      paymentDates.length === 0 ||
      (selectedContract?.details.data &&
        new Date(selectedContract?.details.data?.startDate).getTime() > new Date().getTime()),
    [paymentDates.length, selectedContract?.details.data],
  )

  const onPaymentSelected = useCallback(
    (paymentId: string) => {
      setSelectedPayment(paymentId)
    },
    [setSelectedPayment],
  )

  return (
    <PaymentsTabContainer>
      <PaymentRowWrapper>
        {layout === 'create' ? (
          <PaymentsRow active={paymentActiveNewRow}>
            <NewPayment placeholderRow />
          </PaymentsRow>
        ) : (
          selectedContract?.status !== ContractStatus.Completed && (
            <PaymentsRow selectable={false}>
              <NewPayment onCreateNewPayment={createNewPayment} disabled={disableCreate} />
            </PaymentsRow>
          )
        )}
        {contractPayments.data?.map((payment) => (
          <PaymentsRow key={payment.id} active={selectedPaymentId === payment.id}>
            <Payment
              payment={payment}
              active={selectedPaymentId === payment.id}
              onPaymentSelected={onPaymentSelected}
            />
          </PaymentsRow>
        ))}
        {loading || (contractPayments.loading && <Loader />)}
      </PaymentRowWrapper>

      {(selectedPaymentId || layout !== 'view') && (
        <PaymentForm contractId={selectedContract?.id} paymentId={selectedPaymentId} />
      )}
    </PaymentsTabContainer>
  )
}

export default withContextProviders(PaymentsProvider)(PaymentsTab)

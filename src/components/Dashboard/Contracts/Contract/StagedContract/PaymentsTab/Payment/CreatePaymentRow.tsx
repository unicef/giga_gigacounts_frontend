import { useMemo } from 'react'
import { useSelectedContract } from 'src/components/Dashboard/Contracts/state/hooks'
import { ContractStatus } from 'src/types/general'
import PaymentDate from '../PaymentDate/PaymentDate'
import { usePaymentsContext } from '../state/usePaymentsContext'
import { PaymentsRow, CreatePaymentButton, PaymentContainer, PaymentsRowContainer } from './styles'

const CreatePaymentRow: React.FC = () => {
  const {
    state: { loading, paymentDates, layout },
    actions: { createNewPayment },
  } = usePaymentsContext()

  const selectedContract = useSelectedContract()

  const showCreate = useMemo(
    () =>
      layout !== 'create' &&
      selectedContract?.status !== ContractStatus.Completed &&
      (paymentDates.length !== 0 ||
        (selectedContract?.details.data &&
          new Date(selectedContract?.details.data?.endDate).getTime() >= new Date().getTime())),
    [layout, paymentDates.length, selectedContract?.details.data, selectedContract?.status],
  )

  const disableCreate = useMemo(
    () =>
      paymentDates.length === 0 ||
      (selectedContract?.details.data &&
        new Date(selectedContract?.details.data?.startDate).getTime() > new Date().getTime()),
    [paymentDates.length, selectedContract?.details.data],
  )

  const paidDate = useMemo(() => {
    const { month, year } = paymentDates?.[0] ?? {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
    }

    return new Date(year, month, 0).toUTCString().slice(0, 19).replace('T', ' ')
  }, [paymentDates])

  if (!showCreate) {
    return null
  }

  return (
    <PaymentsRow selectable={false}>
      <PaymentContainer>
        <PaymentDate date={paidDate} />
        <PaymentsRowContainer>
          <CreatePaymentButton onClick={createNewPayment} isDisabled={loading || disableCreate}>
            Create New Payment
          </CreatePaymentButton>
        </PaymentsRowContainer>
      </PaymentContainer>
    </PaymentsRow>
  )
}

export default CreatePaymentRow

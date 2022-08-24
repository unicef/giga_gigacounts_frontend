import { Button } from 'src/components/common/Button/Button'
import { usePaymentsContext } from '../../state/usePaymentsContext'
import { PaymentContainer, PaymentsRowContainer, PaymentDateContainer, PaymentsRowDetails } from './styles'

type NewPaymentProps = {
  placeholderRow?: boolean
  onCreateNewPayment?: () => void
}

const NewPayment: React.FC<NewPaymentProps> = ({ onCreateNewPayment, placeholderRow }: NewPaymentProps) => {
  const {
    state: { paymentForm },
  } = usePaymentsContext()

  const today = new Date()
  const day = today.getDate()
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(today)
  const year = today.getFullYear()

  return (
    <PaymentContainer>
      <PaymentDateContainer>
        <h4>{day}</h4>
        <small>
          <b>{month}</b>
        </small>
        <span className="super-small">{year}</span>
      </PaymentDateContainer>
      <PaymentsRowContainer>
        {placeholderRow ? (
          <PaymentsRowDetails>
            <p>
              <b>BWP {paymentForm.amount}</b>
            </p>
            <small>{paymentForm.description ? paymentForm.description : 'New payment'}</small>
          </PaymentsRowDetails>
        ) : (
          <Button className="addNewPayment" onClick={onCreateNewPayment}>
            Create New Payment
          </Button>
        )}
      </PaymentsRowContainer>
    </PaymentContainer>
  )
}

export default NewPayment

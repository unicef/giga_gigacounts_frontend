import { PaymentDateContainer } from './styles'

interface PaymentDateProps {
  date?: string
  active?: boolean
}

const PaymentDate: React.FC<PaymentDateProps> = ({
  date = 'August 12, 2022',
  active,
}: PaymentDateProps): JSX.Element => {
  const dateObject = new Date(date)
  const day = dateObject.getDate()
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(dateObject)
  const year = dateObject.getFullYear()

  return (
    <PaymentDateContainer active={active}>
      <h4>{day}</h4>
      <small>
        <b>{month}</b>
      </small>
      <span className="super-small">{year}</span>
    </PaymentDateContainer>
  )
}

export default PaymentDate

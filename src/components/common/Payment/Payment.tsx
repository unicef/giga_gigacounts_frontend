import PaymentChart from 'src/components/common/PaymentChart/PaymentChart'
import PaymentDate from 'src/components/common/PaymentDate/PaymentDate'
import { IContractPayment } from 'src/types/general'
import {
  PaymentContainer,
  PaymentsRowContainer,
  PaymentsRowDetails,
  PaymentsRowMetrics,
  PaymentVerified,
  WidgetMetric,
} from './styles'

interface PaymentProps {
  active?: boolean
  payment: IContractPayment
  onPaymentSelected?: (paymentId: string) => void
}

const getIcon = (status: string) =>
  ({
    Pending: <span className="icon icon-20 icon-expired icon-light-blue"></span>,
    Verified: <span className="icon icon-20 icon-completed icon-green"></span>,
    Rejected: <span className="icon icon-20 icon-error icon-red"></span>,
  }[status])

const Payment: React.FC<PaymentProps> = ({ active, payment, onPaymentSelected }: PaymentProps): JSX.Element => {
  const onPaymentSelectedById = () => onPaymentSelected?.(payment.id)
  const icon = getIcon(payment.status)

  return (
    <PaymentContainer onClick={onPaymentSelectedById}>
      <PaymentDate date={payment.paidDate} active={active} />
      <PaymentsRowContainer>
        <PaymentsRowDetails active={active}>
          <p>
            <b>
              {payment.currency.code} {payment.amount}
            </b>
          </p>
          <small>{payment.description}</small>
          <PaymentVerified>
            {icon}
            <p>{payment.status}</p>
          </PaymentVerified>
        </PaymentsRowDetails>
        <PaymentsRowMetrics>
          <WidgetMetric active={active}>
            <span className={`icon icon-20 ${active ? 'icon-light-blue' : 'icon-light-grey'}  icon-plug`}></span>
            <small>
              <b style={{ textTransform: 'none' }}>90%</b>
            </small>
            <span className={`icon icon-20 ${active ? 'icon-light-blue' : 'icon-light-grey'} icon-meter`}></span>
            <small>
              <b style={{ textTransform: 'none' }}>2ms</b>
            </small>
            <span className={`icon icon-20 ${active ? 'icon-light-blue' : 'icon-light-grey'} icon-down-speed`}></span>
            <small>
              <b style={{ textTransform: 'none' }}>10Mb/s</b>
            </small>
            <span className={`icon icon-20 ${active ? 'icon-light-blue' : 'icon-light-grey'} icon-up-speed`}></span>
            <small>
              <b style={{ textTransform: 'none' }}>20Mb/s</b>
            </small>
          </WidgetMetric>
          <PaymentChart
            low={payment.metrics.withoutConnection}
            average={payment.metrics.atLeastOneBellowAvg}
            good={payment.metrics.allEqualOrAboveAvg}
          />
        </PaymentsRowMetrics>
      </PaymentsRowContainer>
    </PaymentContainer>
  )
}

export default Payment

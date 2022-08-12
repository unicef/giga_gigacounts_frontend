import PaymentChart from 'src/components/Dashboard/Contracts/Contract/StagedContract/PaymentsTab/PaymentChart/PaymentChart'
import PaymentDate from 'src/components/common/PaymentDate/PaymentDate'
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
  paymentId: string
  onPaymentSelected?: (paymentId: string) => void
}

const Payment: React.FC<PaymentProps> = ({ active, paymentId = '', onPaymentSelected }: PaymentProps): JSX.Element => {
  const onPaymentSelectedById = () => onPaymentSelected?.(paymentId)

  return (
    <PaymentContainer onClick={onPaymentSelectedById}>
      <PaymentDate date="Thu Nov 10 2022" active={active} />
      <PaymentsRowContainer>
        <PaymentsRowDetails active={active}>
          <p>
            <b>BWP 3 000 000</b>
          </p>
          <small>Description</small>
          <PaymentVerified>
            <span className="icon icon-20 icon-completed icon-green"></span>
            <p>Verified</p>
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
          <PaymentChart low={31} average={35} good={34} />
        </PaymentsRowMetrics>
      </PaymentsRowContainer>
    </PaymentContainer>
  )
}

export default Payment

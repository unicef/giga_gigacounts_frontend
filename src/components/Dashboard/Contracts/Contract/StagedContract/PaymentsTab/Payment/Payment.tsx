import { useMemo } from 'react'
import PaymentChart from 'src/components/Dashboard/Contracts/Contract/StagedContract/PaymentsTab/PaymentChart/PaymentChart'
import PaymentDate from 'src/components/Dashboard/Contracts/Contract/StagedContract/PaymentsTab/PaymentDate/PaymentDate'
import { IContractPayment } from 'src/types/general'
import { getMetricIconClassName } from 'src/utils/getMetricIcon'
import { fillMissingConnectionsMedian } from '../state/utils'
import {
  MetricMidgetContainer,
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

  const connectionsMedian = useMemo(
    () => fillMissingConnectionsMedian(payment.metrics.connectionsMedian),
    [payment.metrics.connectionsMedian],
  )

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
          <MetricMidgetContainer>
            {connectionsMedian?.map(({ metric_id, unit, median_value }: any) => {
              return (
                <WidgetMetric key={metric_id} active={active}>
                  <span
                    className={`icon icon-20 ${getMetricIconClassName(metric_id)} ${
                      active ? 'icon-light-blue' : 'icon-light-grey'
                    }`}
                  ></span>
                  <small>
                    <b style={{ textTransform: 'none' }}>
                      {median_value}
                      {unit}
                    </b>
                  </small>
                </WidgetMetric>
              )
            })}
          </MetricMidgetContainer>
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

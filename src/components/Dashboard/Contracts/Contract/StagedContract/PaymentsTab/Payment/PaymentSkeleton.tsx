import { useCallback, useMemo } from 'react'
import PaymentChart from 'src/components/Dashboard/Contracts/Contract/StagedContract/PaymentsTab/PaymentChart/PaymentChart'
import PaymentDate from 'src/components/Dashboard/Contracts/Contract/StagedContract/PaymentsTab/PaymentDate/PaymentDate'
import { IContractPayment, IPaymentStatus } from 'src/types/general'
import { getMetricIconClassName } from 'src/utils/getMetricIcon'
import { fillMissingConnectionsMedian } from '../utils'
import {
  MetricMidgetContainer,
  PaymentContainer,
  PaymentsRow,
  PaymentsRowContainer,
  PaymentsRowDetails,
  PaymentsRowMetrics,
  PaymentStatus,
  WidgetMetric,
} from './styles'

interface PaymentSkeletonProps
  extends Pick<IContractPayment, 'description' | 'metrics' | 'paidDate' | 'currency' | 'amount'> {
  active?: boolean
  dirty?: boolean
  onClick?: () => void
  status?: IPaymentStatus
}

const ICON_COLOR_CLASS_MAP = {
  Pending: 'icon-light-blue',
  Verified: 'icon-green',
  Rejected: 'icon-red',
}

const ICON_CLASS_MAP = {
  Pending: 'icon-expired',
  Verified: 'icon-completed',
  Rejected: 'icon-error',
}

const PaymentSkeleton: React.FC<PaymentSkeletonProps> = ({
  active = false,
  dirty = false,
  description,
  status,
  metrics,
  paidDate,
  currency,
  amount,
  onClick,
}: PaymentSkeletonProps): JSX.Element => {
  const iconColorClass = useMemo(() => (status ? ICON_COLOR_CLASS_MAP[status] : null), [status])
  const iconClass = useMemo(() => (status ? ICON_CLASS_MAP[status] : null), [status])

  const connectionsMedian = useMemo(
    () => fillMissingConnectionsMedian(metrics.connectionsMedian),
    [metrics.connectionsMedian],
  )

  const handleClick = useCallback(() => onClick?.(), [onClick])

  const date = useMemo(() => new Date(paidDate.year, paidDate.month, 0).toString(), [paidDate.month, paidDate.year])

  return (
    <PaymentsRow active={active} dirty={dirty}>
      <PaymentContainer onClick={handleClick}>
        <PaymentDate date={date} active={active} />
        <PaymentsRowContainer>
          <PaymentsRowDetails active={active}>
            <p>
              <b>
                {currency.code} {amount}
              </b>
            </p>
            <small>{description}</small>
            {status && (
              <PaymentStatus>
                <span className={`icon icon-20 ${iconClass} ${iconColorClass}`} />
                <p>{status}</p>
              </PaymentStatus>
            )}
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
              low={metrics.withoutConnection}
              average={metrics.atLeastOneBellowAvg}
              good={metrics.allEqualOrAboveAvg}
            />
          </PaymentsRowMetrics>
        </PaymentsRowContainer>
      </PaymentContainer>
    </PaymentsRow>
  )
}

export default PaymentSkeleton

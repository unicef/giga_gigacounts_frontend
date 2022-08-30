import { useMemo } from 'react'
import { Button } from 'src/components/common/Button/Button'
import { useSelectedContract } from 'src/components/Dashboard/Contracts/state/hooks'
import { MONTHS } from 'src/consts/months'
import { getMetricIconClassName } from 'src/utils/getMetricIcon'
import PaymentChart from '../PaymentChart/PaymentChart'
import { usePaymentsContext } from '../state/usePaymentsContext'
import { fillMissingConnectionsMedian } from '../state/utils'

import {
  PaymentContainer,
  PaymentsRowContainer,
  PaymentDateContainer,
  PaymentsRowDetails,
  PaymentsRowMetrics,
  WidgetMetric,
  MetricMidgetContainer,
} from './styles'

type NewPaymentProps = {
  disabled?: boolean
  placeholderRow?: boolean
  onCreateNewPayment?: () => void
}

const NewPayment: React.FC<NewPaymentProps> = ({ onCreateNewPayment, placeholderRow, disabled }: NewPaymentProps) => {
  const {
    state: { loading, layout, paymentForm, paymentDates, paymentMetrics, paymentActiveNewRow },
  } = usePaymentsContext()

  const paymentDate = useMemo(() => {
    if (layout === 'create') {
      return {
        month: paymentForm.month,
        year: paymentForm.year,
      }
    }

    return (
      paymentDates?.[0] ?? {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
      }
    )
  }, [layout, paymentDates, paymentForm.month, paymentForm.year])

  const day = useMemo(() => {
    return new Date(paymentDate.year, paymentDate.month, 0).getUTCDate()
  }, [paymentDate.month, paymentDate.year])

  const selectedContract = useSelectedContract()

  const connectionsMedian = useMemo(
    () => fillMissingConnectionsMedian(paymentMetrics.connectionsMedian),
    [paymentMetrics.connectionsMedian],
  )

  return (
    <PaymentContainer>
      <PaymentDateContainer>
        <h4>{day}</h4>
        <small>
          <b>{MONTHS[paymentDate.month]}</b>
        </small>
        <span className="super-small">{paymentDate.year}</span>
      </PaymentDateContainer>
      <PaymentsRowContainer>
        {placeholderRow ? (
          <>
            <PaymentsRowDetails>
              <p>
                <b>
                  {selectedContract?.details.data?.currency?.code} {paymentForm.amount}
                </b>
              </p>
              <small>{paymentForm.description ? paymentForm.description : 'New payment'}</small>
            </PaymentsRowDetails>
            <PaymentsRowMetrics>
              <MetricMidgetContainer>
                {connectionsMedian?.map(({ metric_id, unit, median_value }: any) => {
                  return (
                    <WidgetMetric key={metric_id} active={paymentActiveNewRow}>
                      <span
                        className={`icon icon-20 ${getMetricIconClassName(metric_id)} ${
                          paymentActiveNewRow ? 'icon-light-blue' : 'icon-light-grey'
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
                low={paymentMetrics.withoutConnection}
                average={paymentMetrics.atLeastOneBellowAvg}
                good={paymentMetrics.allEqualOrAboveAvg}
              />
            </PaymentsRowMetrics>
          </>
        ) : (
          <Button className="addNewPayment" onClick={onCreateNewPayment} isDisabled={loading || disabled}>
            Create New Payment
          </Button>
        )}
      </PaymentsRowContainer>
    </PaymentContainer>
  )
}

export default NewPayment

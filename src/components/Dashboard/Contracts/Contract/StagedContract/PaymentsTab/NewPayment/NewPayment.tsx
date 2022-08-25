import { useMemo } from 'react'
import { Button } from 'src/components/common/Button/Button'
import { useSelectedContract } from 'src/components/Dashboard/Contracts/state/hooks'
import { MONTHS } from 'src/consts/months'
import PaymentChart from '../PaymentChart/PaymentChart'
import { usePaymentsContext } from '../state/usePaymentsContext'

import {
  PaymentContainer,
  PaymentsRowContainer,
  PaymentDateContainer,
  PaymentsRowDetails,
  PaymentsRowMetrics,
  WidgetMetric,
} from './styles'

type NewPaymentProps = {
  placeholderRow?: boolean
  onCreateNewPayment?: () => void
  disabled?: boolean
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
    return new Date(paymentDate.year, paymentDate.month, 0).getDate()
  }, [paymentDate.month, paymentDate.year])

  const selectedContract = useSelectedContract()

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
              <WidgetMetric active={paymentActiveNewRow}>
                <span
                  className={`icon icon-20 ${paymentActiveNewRow ? 'icon-light-blue' : 'icon-light-grey'}  icon-plug`}
                ></span>
                <small>
                  <b style={{ textTransform: 'none' }}>90%</b>
                </small>
                <span
                  className={`icon icon-20 ${paymentActiveNewRow ? 'icon-light-blue' : 'icon-light-grey'} icon-meter`}
                ></span>
                <small>
                  <b style={{ textTransform: 'none' }}>2ms</b>
                </small>
                <span
                  className={`icon icon-20 ${
                    paymentActiveNewRow ? 'icon-light-blue' : 'icon-light-grey'
                  } icon-down-speed`}
                ></span>
                <small>
                  <b style={{ textTransform: 'none' }}>10Mb/s</b>
                </small>
                <span
                  className={`icon icon-20 ${
                    paymentActiveNewRow ? 'icon-light-blue' : 'icon-light-grey'
                  } icon-up-speed`}
                ></span>
                <small>
                  <b style={{ textTransform: 'none' }}>20Mb/s</b>
                </small>
              </WidgetMetric>
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

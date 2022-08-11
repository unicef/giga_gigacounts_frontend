import { WidgetMetric } from '../TabButton/styles'
import PaymentChart from './PaymentChart/PaymentChart'
import PaymentDate from './PaymentDate/PaymentDate'
import { PaymentsTabContainer, PaymentsRow, PaymentsRowContainer, PaymentsRowDetails, PaymentsRowMetrics } from './styles'

const PaymentsTab: React.FC = (): JSX.Element => {
  return (
    <PaymentsTabContainer>
      <PaymentsRow>
        <PaymentDate date = 'Thu Nov 10 2022'/>
        <PaymentsRowContainer>
          <PaymentsRowDetails>
            <p><b>currency</b></p>
            <small>description</small>
            <span className='icon icon-20 icon-completed icon-green'></span>
            <div>Verified</div>
          </PaymentsRowDetails>
          <PaymentsRowMetrics>
            <WidgetMetric>
              <span className={`icon icon-20 icon-light-blue icon-plug`}></span>
              <small>
                <b style={{ textTransform: 'none' }}>value</b>
              </small>
              <span className={`icon icon-20 icon-light-blue icon-plug`}></span>
              <small>
                <b style={{ textTransform: 'none' }}>value</b>
              </small>
              <span className={`icon icon-20 icon-light-blue icon-plug`}></span>
              <small>
                <b style={{ textTransform: 'none' }}>value</b>
              </small>
              <span className={`icon icon-20 icon-light-blue icon-plug`}></span>
              <small>
                <b style={{ textTransform: 'none' }}>value</b>
              </small>
            </WidgetMetric>
            <PaymentChart
              low = {30}
              average = {50}
              good = {20}
            />
          </PaymentsRowMetrics>
        </PaymentsRowContainer>
      </PaymentsRow>
    </PaymentsTabContainer>
  )
}

export default PaymentsTab

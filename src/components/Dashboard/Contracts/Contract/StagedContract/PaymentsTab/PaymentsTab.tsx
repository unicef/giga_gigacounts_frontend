import { WidgetMetric } from '../TabButton/styles'
import PaymentChart from './PaymentChart/PaymentChart'
import PaymentDate from './PaymentDate/PaymentDate'
import {
  PaymentsTabContainer,
  PaymentsRow,
  PaymentsRowContainer,
  PaymentsRowDetails,
  PaymentsRowMetrics,
  PaymentVerified,
} from './styles'

const PaymentsTab: React.FC = (): JSX.Element => {
  return (
    <PaymentsTabContainer>
      <PaymentsRow>
        <PaymentDate date="Thu Nov 10 2022" />
        <PaymentsRowContainer>
          <PaymentsRowDetails>
            <p>
              <b>BWP 3 000 000</b>
            </p>
            <small>Description</small>
            <PaymentVerified>
              <span className="icon icon-20 icon-completed icon-green"></span>
              <div>Verified</div>
            </PaymentVerified>
          </PaymentsRowDetails>
          <PaymentsRowMetrics>
            <WidgetMetric>
              <span className={`icon icon-20 icon-light-grey icon-plug`}></span>
              <small>
                <b style={{ textTransform: 'none' }}>90%</b>
              </small>
              <span className={`icon icon-20 icon-light-grey icon-meter`}></span>
              <small>
                <b style={{ textTransform: 'none' }}>2ms</b>
              </small>
              <span className={`icon icon-20 icon-light-grey icon-down-speed`}></span>
              <small>
                <b style={{ textTransform: 'none' }}>10Mb/s</b>
              </small>
              <span className={`icon icon-20 icon-light-grey icon-up-speed`}></span>
              <small>
                <b style={{ textTransform: 'none' }}>20Mb/s</b>
              </small>
            </WidgetMetric>
            <PaymentChart low={30} average={50} good={20} />
          </PaymentsRowMetrics>
        </PaymentsRowContainer>
      </PaymentsRow>
    </PaymentsTabContainer>
  )
}

export default PaymentsTab

import { useContractsContext } from '../../../state/useContractsContext'
import { WidgetMetric } from '../TabButton/styles'
import { PaymentsTabContainer } from './styles'

const PaymentsTab: React.FC = (): JSX.Element => {
  return (
    <PaymentsTabContainer>
      <div className="row">
        <div className="date-grid">
          <div>date</div>
          <div>month</div>
          <div>year</div>
        </div>
        <div className="metrics flex-col">
          <div className="first-row">
            <p>currency</p>
            <p>description</p>
            <p>status</p>
          </div>
          <div className="metrics">
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
            <div className="vlad"></div>
          </div>
        </div>
      </div>
    </PaymentsTabContainer>
  )
}

export default PaymentsTab

import ContractStatusWidget from 'src/components/common/ContractStatusWidget'
import { ContractStatus, IContract } from 'src/types/general'
import { WidgetTitle, WidgetInfo, WidgetMetric, WidgetChart, TabContainer } from './styles'

interface PaymentsTabButtonProps {
  contract: IContract<ContractStatus.Ongoing | ContractStatus.Expired>
  selected: boolean
  onClick: () => void
}

export const PaymentsTabButton: React.FC<PaymentsTabButtonProps> = ({
  contract,
  selected,
  onClick,
}: PaymentsTabButtonProps): JSX.Element => {
  return (
    <TabContainer selected={selected}>
      <button onClick={onClick}>
        <WidgetTitle selected={selected}>
          <h5>Payments</h5>
          <small className="icon-light-blue">
            <b>{contract?.details.data?.numberOfPayments}</b>
          </small>
        </WidgetTitle>
        <WidgetInfo>
          <WidgetMetric selected={selected}>
            <span className={`icon icon-20 icon-coins  ${selected ? 'icon-dark-blue' : 'icon-mid-grey'}`}></span>
            <small>
              <b>
                {contract?.details.data?.currency.code}: {contract?.details.data?.budget}
              </b>
            </small>
            <small>
              <b>/</b>
            </small>
            <small className={selected ? 'icon-blue' : 'icon-light-blue'}>
              <b>{contract?.details.data?.totalSpent.amount ?? 0}</b>
            </small>
          </WidgetMetric>
        </WidgetInfo>
        <WidgetChart>
          <ContractStatusWidget
            showOnly="payments"
            payments={Math.min(contract?.details.data?.totalSpent.percentage ?? 0, 100)}
          />
          <small>
            <b>{Math.min(Math.round(contract?.details.data?.totalSpent.percentage ?? 0), 100)}%</b>
          </small>
        </WidgetChart>
      </button>
    </TabContainer>
  )
}

export default PaymentsTabButton

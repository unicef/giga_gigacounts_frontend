import ContractStatusWidget from 'src/components/common/ContractStatusWidget'
import { ContractStagedActiveTab, ContractStagedTabItems } from 'src/components/Dashboard/Contracts/state/types'
import { ContractStatus, IContract } from 'src/types/general'
import { getMetricIconClassName } from 'src/utils/getMetricIcon'
import { WidgetTitle, WidgetInfo, WidgetMetric, WidgetChart, TabContainer } from './styles'

interface IContractDetailsProps {
  contract: IContract<ContractStatus.Ongoing | ContractStatus.Expired>
  tab: ContractStagedTabItems
  selected: boolean
  onSwitchTab: (tab: ContractStagedTabItems) => void
}

export const TabButtons: React.FC<IContractDetailsProps> = ({
  contract,
  tab,
  selected,
  onSwitchTab,
}: IContractDetailsProps): JSX.Element => {
  const onTabHandler = () => onSwitchTab(tab)

  return (
    <TabContainer selected={selected}>
      <button onClick={onTabHandler}>
        <WidgetTitle selected={selected}>
          <h5>{tab.name}</h5>
          {tab.id === ContractStagedActiveTab.SchoolsTab ? (
            <small>
              <b>{contract?.details.data?.numberOfSchools}</b>
            </small>
          ) : (
            <small>
              <b>{contract?.details.data?.numberOfPayments}</b>
            </small>
          )}
        </WidgetTitle>
        <WidgetInfo>
          {tab.id === ContractStagedActiveTab.SchoolsTab ? (
            contract?.details.data?.connectionsMedian &&
            contract?.details.data?.connectionsMedian.map((item) => (
              <WidgetMetric key={item.metric_id} selected={selected}>
                <span
                  className={`icon icon-20 ${getMetricIconClassName(item.metric_id)} ${
                    selected ? 'icon-light-blue' : 'icon-mid-grey'
                  }`}
                ></span>
                <small>
                  <b style={{ textTransform: 'none' }}>{item.median_value + item.unit}</b>
                </small>
              </WidgetMetric>
            ))
          ) : (
            <WidgetMetric selected={selected}>
              <span className={`icon icon-20 icon-coins  ${selected ? 'icon-light-blue' : 'icon-mid-grey'}`}></span>
              <small>
                <b>
                  {contract?.details.data?.currency.code}: {contract?.details.data?.budget}
                </b>
              </small>
              <small>
                <b>/</b>
              </small>
              <small className="icon-light-blue">
                <b>{contract?.details.data?.totalSpent.amount}</b>
              </small>
            </WidgetMetric>
          )}
        </WidgetInfo>
        {tab.id === ContractStagedActiveTab.SchoolsTab ? (
          <WidgetChart>
            <ContractStatusWidget
              showOnly={tab.name.toLowerCase()}
              average={contract?.details.data?.schoolsConnection.atLeastOneBellowAvg}
              good={contract?.details.data?.schoolsConnection.allEqualOrAboveAvg}
            />
          </WidgetChart>
        ) : (
          <WidgetChart>
            <ContractStatusWidget
              showOnly={tab.name.toLowerCase()}
              payments={Math.min(contract?.details.data?.totalSpent.percentage ?? 0, 100)}
            />
            <small>
              <b>{Math.min(Math.round(contract?.details.data?.totalSpent.percentage ?? 0), 100)}%</b>
            </small>
          </WidgetChart>
        )}
      </button>
    </TabContainer>
  )
}

export default TabButtons

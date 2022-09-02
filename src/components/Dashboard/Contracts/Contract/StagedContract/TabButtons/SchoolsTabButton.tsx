import ContractStatusWidget from 'src/components/common/ContractStatusWidget'
import { ContractStatus, IContract } from 'src/types/general'
import { CONNECTION_MEDIANS } from '../consts'
import { WidgetTitle, WidgetInfo, WidgetMetric, WidgetChart, TabContainer } from './styles'

interface SchoolsTabButtonProps {
  contract: IContract<ContractStatus.Ongoing | ContractStatus.Expired>
  selected: boolean
  onClick: () => void
}

export const SchoolsTabButton: React.FC<SchoolsTabButtonProps> = ({
  contract,
  selected,
  onClick,
}: SchoolsTabButtonProps): JSX.Element => {
  return (
    <TabContainer selected={selected}>
      <button onClick={onClick}>
        <WidgetTitle selected={selected}>
          <h5>Schools</h5>
          <small>
            <b>{contract?.details.data?.numberOfSchools}</b>
          </small>
        </WidgetTitle>
        <WidgetInfo>
          {CONNECTION_MEDIANS.map((median) => {
            const value =
              contract?.details.data?.connectionsMedian?.find(({ metric_id }) => metric_id === median.metric_id)
                ?.median_value ?? 0
            return (
              <WidgetMetric
                key={median.metric_id}
                selected={selected}
                title={`${median.metric_name}: ${value}${median.unit}`}
              >
                <span className={`icon icon-20 ${median.icon} ${selected ? 'icon-dark-blue' : 'icon-mid-grey'}`}></span>
                <small>
                  <b style={{ textTransform: 'none' }}>
                    {value}
                    {median.unit}
                  </b>
                </small>
              </WidgetMetric>
            )
          })}
        </WidgetInfo>
        <WidgetChart>
          <ContractStatusWidget
            showOnly="schools"
            average={contract?.details.data?.schoolsConnection.atLeastOneBellowAvg}
            good={contract?.details.data?.schoolsConnection.allEqualOrAboveAvg}
          />
        </WidgetChart>
      </button>
    </TabContainer>
  )
}

export default SchoolsTabButton

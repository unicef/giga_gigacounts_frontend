import { useEffect, useCallback, ChangeEvent } from 'react'
import {
  ConnectionContainer,
  ISPContainer,
  ISPIcon,
  ISPHeader,
  ISPHeaderTitle,
  ISPHeaderTextContainer,
  ISPHeaderText,
  ISPDropdownContainer,
  ISPDropdown,
  QualityContainer,
  QualityHeader,
  QualityHeaderTitle,
  OptionsContainer,
} from './styles'
import icons from 'src/assets/icons'
import ToggleButtonGroup from 'src/components/common/ToggleButton'
import { getSuggestedMetrics } from 'src/api/metrics'
import { getIsp } from 'src/api/isp'
import { useCreateContractContext } from '../state/useCreateContractContext'
import { CreateContractActionType } from '../state/types'

const ConnectionTab: React.FC = (): JSX.Element => {
  const { state, dispatch } = useCreateContractContext()
  const { contractForm } = state

  const fetchData = useCallback(async () => {
    try {
      const metrics = await getSuggestedMetrics()
      const isps = await getIsp()

      dispatch({
        type: CreateContractActionType.SET_METRICS_ISPS,
        payload: {
          metrics,
          isps,
        },
      })
    } catch (error) {
      dispatch({ type: CreateContractActionType.SET_ERROR, payload: {error} })
    }
  }, [dispatch])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const onMetricValueChange = useCallback(
    (metricId: number) => (value: string) => {
      dispatch({ type: CreateContractActionType.SET_EXPECTED_METRIC, payload: { metricId: +metricId, value: +value } })
    },
    [dispatch],
  )

  const onServiceProviderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: CreateContractActionType.SET_SERVICE_PROVIDER, payload: e.target.value })
  }

  return (
    <ConnectionContainer>
      <ISPContainer>
        <ISPHeader>
          <ISPIcon>
            <img src={icons.internetService} alt="ISP" />
          </ISPIcon>
          <ISPHeaderTextContainer>
            <ISPHeaderTitle>Internet Service Provider</ISPHeaderTitle>
            <ISPHeaderText>
              Complete the provider that is going to be connecting schools and the terms agreed for the contract
            </ISPHeaderText>
          </ISPHeaderTextContainer>
        </ISPHeader>
        <ISPDropdownContainer>
          <ISPDropdown className="input-container dropdown">
            <select onChange={onServiceProviderChange} value={contractForm.ispId}>
              <option value="" hidden>
                Service Provider
              </option>
              {(state.isps || []).map((isp) => (
                <option key={isp.id} value={isp.id}>
                  {isp.name}
                </option>
              ))}
            </select>
          </ISPDropdown>
        </ISPDropdownContainer>
      </ISPContainer>
      <QualityContainer>
        <QualityHeader>
          <QualityHeaderTitle>Quality of service</QualityHeaderTitle>
        </QualityHeader>
        <OptionsContainer>
          {(state.metrics || []).map((metric) => (
            <ToggleButtonGroup
              key={metric.id}
              options={metric.suggestedMetrics.map((suggested) => {
                return {
                  label: `${suggested.value}${suggested.unit}`,
                  value: suggested.value,
                  id: suggested.metric_id,
                }
              })}
              label={`${metric.name}:`}
              unit={metric.suggestedMetrics.length ? metric.suggestedMetrics[0].unit : ''}
              onChange={onMetricValueChange(metric.id)}
              value={contractForm.expectedMetrics.metrics.find((item) => item.metricId === metric.id)?.value.toString()}
            />
          ))}
        </OptionsContainer>
      </QualityContainer>
    </ConnectionContainer>
  )
}

export default ConnectionTab

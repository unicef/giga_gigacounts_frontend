import { Dispatch, useEffect, useCallback, ChangeEvent } from 'react'
import { Action, State, ActionType } from '../store/redux'
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

interface IConnectionProps {
  state: State
  dispatch: Dispatch<Action>
}

const ConnectionTab: React.FC<IConnectionProps> = ({ state, dispatch }): JSX.Element => {
  const { contractForm } = state

  const fetchData = useCallback(async () => {
    try {
      const metrics = await getSuggestedMetrics()
      const isps = await getIsp()

      dispatch({
        type: ActionType.SET_METRICS_ISPS,
        payload: {
          metrics,
          isps,
        },
      })
    } catch (error) {
      dispatch({ type: ActionType.SET_ERROR, payload: error })
    }
  }, [dispatch])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const onMetricValueChange = (value: string, metricId: string) => {
    dispatch({ type: ActionType.SET_EXPECTED_METRIC, payload: { metricId: +metricId, value: +value } })
  }

  const onServiceProviderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: ActionType.SET_SERVICE_PROVIDER, payload: e.target.value })
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
                  metricId: suggested.metric_id,
                }
              })}
              label={`${metric.name}:`}
              measure={metric.suggestedMetrics.length ? metric.suggestedMetrics[0].unit : ''}
              onSelect={onMetricValueChange}
              state={state}
              metricId={metric.id.toString()}
            />
          ))}
        </OptionsContainer>
      </QualityContainer>
    </ConnectionContainer>
  )
}

export default ConnectionTab

import { Dispatch, useEffect, useCallback } from 'react'
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
  const fetchSuggestedMetrics = useCallback(async () => {
    try {
      const response = await getSuggestedMetrics()
      dispatch({ type: ActionType.RESPONSE_METRICS, payload: response })
    } catch (error) {
      dispatch({ type: ActionType.SET_ERROR, payload: error })
    }
  }, [dispatch])

  const fetchIsps = useCallback(async () => {
    try {
      const response = await getIsp()
      dispatch({ type: ActionType.RESPONSE_ISPS, payload: response })
    } catch (error) {
      dispatch({ type: ActionType.SET_ERROR, payload: error })
    }
  }, [dispatch])

  useEffect(() => {
    fetchSuggestedMetrics()
    fetchIsps()
  }, [fetchSuggestedMetrics, fetchIsps])

  const handleMetricValue = (value: number, metricId: number) => {
    dispatch({ type: ActionType.SET_EXPECTED_METRIC, payload: { metricId, value } })
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
            <select defaultValue="Service Provider">
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
              onSelect={handleMetricValue}
            />
          ))}
        </OptionsContainer>
      </QualityContainer>
    </ConnectionContainer>
  )
}

export default ConnectionTab

import { useCallback, useRef, useMemo } from 'react'
import ToggleButton from './ToggleButton'
import { MainContainer, LabelContainer, Label, InputContainer, ToggleGroupContainer, ButtonsGroup } from './styles'
import { ToggleButtonOption } from './@types/ToggleTypes'
import { State } from 'src/components/Dashboard/CreateContract/store/redux'

const ToggleButtonGroup = ({
  options,
  label,
  measure,
  state,
  metricId,

  onSelect,
}: {
  options: ToggleButtonOption[]
  label: string
  measure: string
  metricId: string
  state: State
  onSelect: (value: string, metricId: string) => void
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const onButtonSelect = useCallback(
    (index: number, value: string, metricId: string) => {
      onSelect(value, metricId)
    },
    [onSelect],
  )

  const bindSelectListener = useCallback(
    (index: number) => (value: string, metricId: string) => onButtonSelect(index, value, metricId),
    [onButtonSelect],
  )

  const inputListener = useCallback(
    (metricId: string) => (e: React.ChangeEvent<HTMLInputElement>) => onButtonSelect(-1, e.target.value, metricId),
    [onButtonSelect],
  )

  const correspondingMetric = useMemo(
    () =>
      state.contractForm.expectedMetrics.metrics.find((metric) => {
        return metric.metricId.toString() === metricId
      }),
    [state.contractForm.expectedMetrics, metricId],
  )

  const activeIndex = useMemo(
    () =>
      options.findIndex((item) => {
        return item.value === correspondingMetric?.value.toString()
      }),
    [options, correspondingMetric],
  )

  return (
    <MainContainer>
      <LabelContainer>
        <Label>{label}</Label>
      </LabelContainer>
      <ToggleGroupContainer>
        <ButtonsGroup>
          {options.map((option, index: number) => (
            <ToggleButton
              key={`${option.label}-${index}`}
              selected={activeIndex === index}
              option={option}
              onSelect={bindSelectListener(index)}
            />
          ))}
        </ButtonsGroup>
        <InputContainer>
          <input
            type="number"
            name="selectedValue"
            placeholder="0"
            min="0"
            step="1"
            onChange={inputListener(options[0].metricId)}
            ref={inputRef}
            value={correspondingMetric?.value || ''}
          />
          <span>{measure}</span>
        </InputContainer>
      </ToggleGroupContainer>
    </MainContainer>
  )
}

export default ToggleButtonGroup

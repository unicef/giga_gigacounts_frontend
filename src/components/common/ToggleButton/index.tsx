import { useCallback, useState, useRef } from 'react'
import ToggleButton from './ToggleButton'
import { MainContainer, LabelContainer, Label, InputContainer, ToggleGroupContainer, ButtonsGroup } from './styles'
import { ToggleButtonOption } from './@types/ToggleTypes'

const ToggleButtonGroup = ({
  options,
  selectedValue,
  label,
  measure,
  onSelect,
}: {
  options: ToggleButtonOption[]
  selectedValue: number
  label: string
  measure: string
  onSelect: (value: number, metricId: number) => void
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [activeIndex, setActiveIndex] = useState<number>(() => {
    const index = options.findIndex(({ value }) => value === selectedValue)
    return index
  })

  const onButtonSelect = useCallback(
    (index: number, value: number, metricId: number) => {
      setActiveIndex(index)
      onSelect(value, metricId)
      if (inputRef.current) inputRef.current.value = value.toString()
    },
    [onSelect],
  )

  const bindSelectListener = useCallback(
    (index: number) => (value: number, metricId: number) => onButtonSelect(index, value, metricId),
    [onSelect],
  )

  const inputListener = useCallback(
    (metricId: number) => (e: React.ChangeEvent<HTMLInputElement>) =>
      onButtonSelect(-1, parseInt(e.target.value), metricId),
    [onSelect],
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
          />
          <span>{measure}</span>
        </InputContainer>
      </ToggleGroupContainer>
    </MainContainer>
  )
}

export default ToggleButtonGroup

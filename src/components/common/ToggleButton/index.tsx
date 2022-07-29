import { useCallback, useRef, useMemo } from 'react'
import ToggleButton from './ToggleButton'
import { MainContainer, LabelContainer, Label, InputContainer, ToggleGroupContainer, ButtonsGroup } from './styles'
import { ToggleButtonOption } from './@types/ToggleTypes'

interface ToggleButtonProps {
  label: string
  options: ToggleButtonOption[]
  onChange: (value: string) => void
  value?: string
  unit?: string
}

const ToggleButtonGroup = ({ options, label, onChange, value, unit }: ToggleButtonProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const onButtonClick = useCallback(
    (value: string) => {
      onChange(value)
    },
    [onChange],
  )

  const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value), [onChange])

  const activeIndex = useMemo(
    () =>
      options.findIndex((item) => {
        return item.value === value
      }),
    [options, value],
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
              onSelect={onButtonClick}
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
            onChange={onInputChange}
            ref={inputRef}
            value={value || ''}
          />
          <span>{unit}</span>
        </InputContainer>
      </ToggleGroupContainer>
    </MainContainer>
  )
}

export default ToggleButtonGroup

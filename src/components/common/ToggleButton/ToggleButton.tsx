import { useCallback } from 'react'
import styled from 'styled-components/macro'
import { SelectedProps, ToggleButtonOption } from './@types/ToggleTypes'

const Button = styled.div<SelectedProps>`
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 10px;
  gap: 10px;
  height: 26px;
  border: 1px solid var(--color-green);
  border-radius: 8px;
  background-color: ${({ selected }) => (selected ? 'var(--color-green)' : 'var(--color-white)')};
  cursor: pointer;
`

const Label = styled.span<SelectedProps>`
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 148%;
  text-align: right;
  letter-spacing: 0.018em;
  color: ${({ selected }) => (selected ? 'var(--color-white)' : 'var(--color-green)')};
`

const ToggleButton = ({
  selected,
  option,
  onSelect,
}: {
  selected: boolean
  option: ToggleButtonOption
  onSelect: (value: string, optionId: string) => void
}) => {
  const select = useCallback(() => {
    const newValue = option.value

    if (newValue !== null) {
      onSelect(newValue, option.id)
    }
  }, [onSelect, option])

  return (
    <Button selected={selected} onClick={select}>
      <Label selected={selected}>{option.label}</Label>
    </Button>
  )
}

export default ToggleButton

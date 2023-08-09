import { Button, RadioButtonGroup, TextInput } from '@carbon/react'
import { CSSProperties } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useTheme } from 'src/theme'
import { Stack } from 'src/components/stack'

type Props<T extends string | number> = {
  name: string
  options: T[]
  optionToString: (opt: T) => string
  label?: string
  spacing?: number
  helperText?: React.ReactNode
  direction?: 'horizontal' | 'vertical'
  onBlur: () => void
  onClick: (value: T) => void
  style?: CSSProperties
  labelText: string
  id: string
  type?: string
}

export default function RHFRadioGroupButtons<T extends string | number>({
  name,
  options,
  spacing,
  helperText,
  direction,
  onClick,
  style,
  optionToString,
  type,
  labelText,
  id
}: Props<T>) {
  const { control, watch, setValue, clearErrors } = useFormContext()

  const { spacing: space } = useTheme()

  const labelledby = labelText ? `${name}-${labelText}` : ''

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Stack style={style} orientation="vertical">
          <TextInput
            {...field}
            value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
            invalid={Boolean(error)}
            invalidText={error ? error.message : ''}
            helperText={error ? error?.message : helperText}
            type={type}
            id={id}
            labelText={labelText}
          />
          <RadioButtonGroup {...field} aria-labelledby={labelledby}>
            <Stack orientation={direction} gap={spacing}>
              {options.map((option) => (
                <Button
                  onClick={(e) => {
                    e.preventDefault()
                    if (onClick) onClick(option)
                    setValue(name, option)
                    clearErrors(name)
                  }}
                  kind={Number(watch()[name]) === Number(option) ? 'primary' : 'tertiary'}
                  size="sm"
                  style={{
                    marginBlock: space.xs,
                    width: '50px',
                    padding: space.xxs,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  key={option}
                >
                  {optionToString(option)}
                </Button>
              ))}
            </Stack>
          </RadioButtonGroup>
        </Stack>
      )}
    />
  )
}

import { useFormContext, Controller } from 'react-hook-form'
// @ts-ignore
import { TextInput, RadioButtonGroup, Button } from '@carbon/react'
import { TextInputProps } from '@carbon/react/lib/components/TextInput/TextInput'
import { CSSProperties } from 'react'
import { useTheme } from 'src/theme'
import { Stack } from '../stack'

type Props = TextInputProps & {
  name: string
  options: { label: string; value: string | number }[]
  label?: string
  spacing?: number
  helperText?: React.ReactNode
  direction?: 'horizontal' | 'vertical'
  onBlur: () => void
  onClick: (value: any) => void
  style?: CSSProperties
}

export default function RHFRadioGroupButtons({
  name,
  options,
  spacing,
  helperText,
  direction,
  onClick,
  style,
  ...other
}: Props) {
  const { control, watch, setValue, clearErrors } = useFormContext()

  const { spacing: space } = useTheme()

  const labelledby = other.labelText ? `${name}-${other.labelText}` : ''

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
            {...other}
          />
          <RadioButtonGroup {...field} aria-labelledby={labelledby}>
            <Stack orientation={direction} gap={spacing}>
              {options.map((option) => (
                <Button
                  onClick={(e: any) => {
                    e.preventDefault()
                    if (onClick) onClick(option.value)
                    setValue(name, option.value)
                    clearErrors(name)
                  }}
                  kind={Number(watch()[name]) === Number(option.value) ? 'primary' : 'tertiary'}
                  size="sm"
                  style={{
                    marginBlock: space.xs,
                    width: '50px',
                    padding: space.xxs,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  key={option.value}
                >
                  {option.label}
                </Button>
              ))}
            </Stack>
          </RadioButtonGroup>
        </Stack>
      )}
    />
  )
}

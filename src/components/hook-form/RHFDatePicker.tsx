import { useFormContext, Controller } from 'react-hook-form'
// @ts-ignore
import { DatePicker, DatePickerInput } from '@carbon/react'

type Props = {
  helperText?: string
  name: string
  id: string
  onBlur?: () => void
  placeholder?: string
  size: 'sm' | 'md' | 'lg'
  labelText?: string
}

export default function RHFDatePicker({
  name,
  helperText,
  onBlur,
  id,
  placeholder,
  size,
  labelText
}: Props) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker onChange={(value) => field.onChange(value[0])} datePickerType="single">
          <DatePickerInput
            helperText={helperText}
            invalid={!!error}
            invalidText={error ? error.message : helperText}
            style={{ width: '328px' }}
            id={id}
            onBlur={onBlur || null}
            placeholder={placeholder || 'mm/dd/yyyy'}
            labelText={labelText || ''}
            size={size || 'md'}
            datePickerType="single"
          />
        </DatePicker>
      )}
    />
  )
}

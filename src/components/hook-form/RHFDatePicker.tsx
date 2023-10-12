import { DatePicker, DatePickerInput } from '@carbon/react'
import { Controller, useFormContext } from 'react-hook-form'

type Props = {
  helperText?: string
  name: string
  id: string
  onBlur?: () => void
  onChange?: (date: Date[]) => void
  placeholder?: string
  size: 'sm' | 'md' | 'lg'
  labelText?: string
  minDate?: string
  maxDate?: string
}

export default function RHFDatePicker({
  name,
  helperText,
  onBlur,
  id,
  placeholder,
  size,
  labelText,
  onChange,
  maxDate,
  minDate
}: Props) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          maxDate={maxDate}
          minDate={minDate}
          onFocus={(e) => e.target.blur()}
          allowInput={false}
          value={field.value}
          onChange={(value) => {
            field.onChange(value[0])
            if (onChange) onChange(value)
          }}
          datePickerType="single"
        >
          <DatePickerInput
            helperText={helperText}
            invalid={!!error}
            invalidText={error ? error.message : helperText}
            style={{ width: '328px' }}
            id={id}
            onBlur={onBlur}
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

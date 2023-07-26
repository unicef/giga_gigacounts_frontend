import { Controller, useFormContext } from 'react-hook-form'
// @ts-ignore
import { Select, SelectItem } from '@carbon/react'

type RHFSelectProps = {
  id: string
  name: string
  native?: boolean
  maxHeight?: boolean | number
  label: string
  options: { value: string; label: string }[]
  onBlur?: () => void
  disabled?: boolean
  onChange?: (e: any) => void
}

export function RHFSelect({ name, native, label, options, id, ...other }: RHFSelectProps) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Select
          {...field}
          id={id}
          labelText={label}
          {...other}
          onChange={(e: any) => {
            field.onChange(e)
            if (other.onChange) other.onChange(e)
          }}
        >
          {options.map((o: { value: string; label: string }) => (
            <SelectItem key={o.value} value={o.value} text={o.label} />
          ))}
        </Select>
      )}
    />
  )
}

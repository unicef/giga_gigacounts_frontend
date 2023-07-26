import { useFormContext, Controller } from 'react-hook-form'
import { Checkbox } from '@carbon/react'

interface RHFCheckboxProps {
  name: string
  id: string
  helperText?: React.ReactNode
  onChange?: (evt: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void
  disabled?: boolean
  checked?: boolean
}

export function RHFCheckbox({
  onChange,
  id,
  name,
  helperText,
  disabled,
  checked
}: RHFCheckboxProps) {
  const { control } = useFormContext()

  if (checked === undefined) {
    checked = false
  }
  if (disabled === undefined) {
    disabled = false
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Checkbox
          disabled={disabled ?? false}
          id={id}
          {...field}
          checked={field.value || checked}
          labelText={helperText ?? ''}
          onChange={(e, data) => {
            field.onChange(e)
            if (onChange) onChange(e, data.checked)
          }}
        />
      )}
    />
  )
}

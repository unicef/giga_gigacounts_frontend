import { Dropdown, OnChangeData } from '@carbon/react'
import { CSSProperties } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

type RHFSelectProps<T> = {
  id: string
  name: string
  native?: boolean
  maxHeight?: boolean | number
  label: string
  options: { value: T; label: string }[]
  onBlur?: () => void
  disabled?: boolean
  selectedItem?: { value: T; label: string }
  onChange?: (
    e: OnChangeData<{
      value: T
      label: string
    }>
  ) => void
  style?: CSSProperties
  direction?: 'top' | 'bottom'
  readOnly?: boolean
}

export default function RHFSelect<T>({
  name,
  native,
  label,
  options,
  id,
  ...other
}: RHFSelectProps<T>) {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Dropdown
          id={id}
          items={options}
          titleText={label}
          label={options.find((o) => o.value === field.value)?.label ?? ''}
          itemToString={(item) => (item ? item.label : '')}
          {...field}
          {...other}
          onChange={(e) => {
            field.onChange(e.selectedItem?.value)
            if (other.onChange) other.onChange(e)
          }}
          invalid={Boolean(error)}
          invalidText={error?.message}
          disabled={!other.readOnly && (other.disabled || options.length <= 1)}
        />
      )}
    />
  )
}

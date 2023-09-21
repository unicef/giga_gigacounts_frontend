import { ComboBox, OnChangeData } from '@carbon/react'
import { CSSProperties } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

type RHFComboBoxProps<T> = {
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
  size?: 'md' | 'lg' | 'sm'
  defaultValue: { value: T; label: string }
}

export default function RHFComboBox<T>({
  name,
  native,
  label,
  options,
  id,
  defaultValue,
  ...other
}: RHFComboBoxProps<T>) {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <ComboBox
          id={id}
          items={options}
          titleText={label}
          itemToString={(item) => (item as { value: T; label: string })?.label ?? ''}
          {...other}
          selectedItem={options.find((f) => f.value === field.value)}
          onChange={(e: { selectedItem: { value: T; label: string } | null }) => {
            if (!e.selectedItem) {
              field.onChange(defaultValue.value)
            } else field.onChange(e.selectedItem?.value)
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

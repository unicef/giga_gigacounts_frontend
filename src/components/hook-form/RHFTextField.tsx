import { useFormContext, Controller } from 'react-hook-form'
import { TextInput } from '@carbon/react'
import { TextInputProps } from '@carbon/react/lib/components/TextInput/TextInput'

type Props = TextInputProps & {
  name: string
}

export default function RHFTextField({ name, helperText, ...other }: Props) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextInput
          helperText={helperText}
          {...field}
          value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
          invalid={!!error}
          invalidText={error ? error?.message : helperText}
          {...other}
        />
      )}
    />
  )
}

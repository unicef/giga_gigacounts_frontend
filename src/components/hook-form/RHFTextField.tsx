import { TextInput } from '@carbon/react'
import { TextInputProps } from '@carbon/react/lib/components/TextInput/TextInput'
import { Controller, useFormContext } from 'react-hook-form'

type Props = TextInputProps & {
  name: string
  helperTextLinkText?: string | undefined
}

export default function RHFTextField({ name, helperText, helperTextLinkText, ...other }: Props) {
  const { control } = useFormContext()

  const renderHelperText = () => {
    if (
      helperText &&
      typeof helperText === 'string' &&
      (helperText.startsWith('http://') || helperText.startsWith('https://'))
    ) {
      return (
        <a href={helperText} target="_blank" rel="noopener noreferrer">
          {helperTextLinkText ?? helperText}
        </a>
      )
    }
    return helperText
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextInput
          helperText={renderHelperText()}
          {...field}
          value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
          invalid={Boolean(error)}
          invalidText={error ? error?.message : helperText}
          {...other}
        />
      )}
    />
  )
}

import { useSnackbar as notistackHook, type OptionsObject } from 'notistack'
import React from 'react'
import { Translation } from 'src/@types'
import { capitalizeFirstLetter } from 'src/utils/strings'
import useLocales from 'src/locales/useLocales'

type Variant = 'success' | 'warning' | 'error' | 'info'

type Options<T extends Variant> = Omit<
  OptionsObject<T> & {
    link?: React.ReactNode
    append?: string
  },
  'variant'
>

export const useSnackbar = () => {
  const { enqueueSnackbar } = notistackHook()
  const { translate } = useLocales()

  const pushSuccess = (message: Translation, options?: Options<'success'>) =>
    enqueueSnackbar(
      capitalizeFirstLetter(
        `${translate(message)} ${options && options.append ? options.append : ''}`
      ),
      {
        variant: 'success',
        ...options
      }
    )
  const pushError = (message: Translation, options?: Options<'error'>) =>
    enqueueSnackbar(
      capitalizeFirstLetter(
        `${translate(message)} ${options && options.append ? options.append : ''}`
      ),
      {
        variant: 'error',
        ...options
      }
    )
  const pushInfo = (message: Translation, options?: Options<'info'>) =>
    enqueueSnackbar(
      capitalizeFirstLetter(
        `${translate(message)} ${options && options.append ? options.append : ''}`
      ),
      {
        variant: 'info',
        ...options
      }
    )
  const pushWarning = (message: Translation, options?: Options<'warning'>) =>
    enqueueSnackbar(
      capitalizeFirstLetter(
        `${translate(message)} ${options && options.append ? options.append : ''}`
      ),
      {
        variant: 'warning',
        ...options
      }
    )

  return { pushError, pushInfo, pushWarning, pushSuccess }
}

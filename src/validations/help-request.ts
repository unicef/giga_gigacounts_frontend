import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { HelpRequestForm } from 'src/@types'
import { useLocales } from 'src/locales'
import * as Yup from 'yup'

export const useHelpRequestSchema = () => {
  const { replaceTranslated } = useLocales()

  const defaultValues: HelpRequestForm = {
    type: 'display',
    description: ''
  }

  const resolver = yupResolver(
    Yup.object().shape({
      type: Yup.string()
        .trim()
        .required(replaceTranslated('field_errors.required', '{{field}}', 'description')),
      description: Yup.string().trim()
    })
  )

  return useForm({ resolver, defaultValues })
}

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { HelpRequestForm } from 'src/@types'
import { useLocales } from 'src/locales'
import * as Yup from 'yup'

export const useHelpRequestSchema = () => {
  const { replaceTranslated } = useLocales()

  const defaultValues: HelpRequestForm = {
    code: 'bug',
    type: 'display',
    functionality: 'other',
    description: ''
  }

  const resolver = yupResolver(
    Yup.object().shape({
      code: Yup.string()
        .trim()
        .required(replaceTranslated('field_errors.required', '{{field}}', 'description')),
      type: Yup.string()
        .trim()
        .required(replaceTranslated('field_errors.required', '{{field}}', 'description')),
      functionlaity: Yup.string().trim(),
      description: Yup.string().trim()
    })
  )

  return useForm({ resolver, defaultValues })
}

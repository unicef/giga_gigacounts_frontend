import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { FeedbackForm } from 'src/@types'
import { useLocales } from 'src/locales'

export const useFeedbackSchema = () => {
  const { replaceTranslated } = useLocales()

  const defaultValues: FeedbackForm = {
    rate: 5,
    comment: ''
  }

  const resolver = yupResolver(
    Yup.object().shape({
      rate: Yup.number()
        .oneOf([1, 2, 3, 4, 5])
        .required(replaceTranslated('field_errors.required', '{{field}}', 'description')),
      comment: Yup.string().trim()
    })
  )

  return useForm({ resolver, defaultValues })
}

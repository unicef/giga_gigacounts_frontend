import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useLocales } from 'src/locales'
import * as Yup from 'yup'

export const useContactSchema = () => {
  const { replaceTranslated } = useLocales()

  const defaultValues = {
    contactName: '',
    email: '',
    phoneNumber: ''
  } as const

  const resolver = yupResolver(
    Yup.object().shape({
      contactName: Yup.string().required(
        replaceTranslated('field_errors.required', '{{field}}', 'name')
      ),
      email: Yup.string()
        .email(replaceTranslated('field_errors.is_invalid', '{{field}}', 'email'))
        .required(replaceTranslated('field_errors.required', '{{field}}', 'email')),
      phoneNumber: Yup.string().required(
        replaceTranslated('field_errors.required', '{{field}}', 'phone_number')
      )
    })
  )

  return useForm({ resolver, defaultValues })
}

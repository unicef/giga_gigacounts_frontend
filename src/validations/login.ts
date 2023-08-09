import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { useLocales } from 'src/locales'

export const useLoginSchema = () => {
  const { translate } = useLocales()

  const defaultValues = {
    email: 'admin@giga.com',
    password: '123456'
  }

  const resolver = yupResolver(
    Yup.object().shape({
      email: Yup.string().required(translate('email_required')).email(translate('email_valid')),
      password: Yup.string().required(translate('password_required'))
    })
  )

  return useForm({ resolver, defaultValues })
}

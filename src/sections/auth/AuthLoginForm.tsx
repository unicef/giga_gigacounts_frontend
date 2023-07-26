import React, { useState } from 'react'
import { Button } from '@carbon/react'
import { Link } from 'react-router-dom'
import { useAuthContext } from 'src/auth/useAuthContext'
import FormProvider, { RHFTextField } from 'src/components/hook-form'
import Stack from 'src/components/stack/Stack'
import { useLocales } from 'src/locales'
import { ROUTES } from 'src/routes/paths'
import { useTheme } from 'src/theme'
import { useLoginSchema } from 'src/validations/login'

type FormValuesProps = {
  email: string
  password: string
  afterSubmit?: string
}

export default function AuthLoginForm() {
  const { login } = useAuthContext()
  const { translate } = useLocales()

  const methods = useLoginSchema()
  const { reset, setError, handleSubmit } = methods
  const [errorState, setErrorState] = useState<string>('')

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await login(data.email, data.password)
    } catch (error) {
      reset()
      setError('root', {
        ...error,
        message: translate('login.auth_error')
      })
      setErrorState(translate('login.auth_error'))
    }
  }

  const { spacing } = useTheme()

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={spacing.xxs}>
        <RHFTextField id="email" name="email" labelText={translate('email_address')} />

        <RHFTextField
          name="password"
          id="password"
          labelText={translate('password')}
          type="password"
        />
      </Stack>

      <Stack alignItems="flex-end" style={{ marginBlock: spacing.md }}>
        <Link to={ROUTES.auth.resetPassword.route}>
          {translate('authLoginForm.forgot_password')}
        </Link>
      </Stack>
      {errorState && <div style={{ color: 'red', marginBottom: spacing.sm }}>{errorState}</div>}
      <Button type="submit">{translate('authLoginForm.login')}</Button>
    </FormProvider>
  )
}

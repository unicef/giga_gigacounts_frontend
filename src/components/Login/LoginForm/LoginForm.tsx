import React, { useState } from 'react'
import web3 from 'web3'
import instance from 'src/api/init'

import {
  LoginFormContainer,
  Logo,
  Form,
  InputContainer,
  InputFrame,
  Input,
  EmailErrorMessage,
  ErrorContainer,
  ErrorMessage,
  ErrorTitle,
  ErrorDescription,
} from './LoginForm.css'
import { useGeneralContext } from 'src/state/GeneralContext'

const EMPTY_EMAIL_MESSAGE = 'The field can not be empty'
const WRONG_CREDENTIALS_TITLE = 'Invalid Credentials'
const WRONG_CREDENTIALS_DESCRIPTION = 'Please contact giga administrator for assistance'

export const LoginForm: React.FC = (): JSX.Element => {
  const {
    actions: { reload },
  } = useGeneralContext()

  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [wrongCredentialsError, setWrongCredentialsError] = useState(false)

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      email: { value: string }
      password: { value: string }
    }

    const email = target.email.value
    const password = target.password.value

    if (email === '') setEmailError(true)
    if (password === '') setPasswordError(true)
    else {
      try {
        const encryptedPassword = await web3.utils.sha3(password)

        const res = await instance.post('/login', {
          email,
          password: encryptedPassword,
        })

        localStorage.setItem('session', res.data.token)

        await reload()
      } catch (err) {
        setWrongCredentialsError(true)
      }
    }
  }

  const handleEmailInput = () => {
    setEmailError(false)
    setWrongCredentialsError(false)
  }
  const handlePasswordInput = () => {
    setPasswordError(false)
    setWrongCredentialsError(false)
  }

  return (
    <LoginFormContainer>
      <Logo alt="logo" src="./logos/giga-logo-color.svg"></Logo>
      <Form error={wrongCredentialsError} onSubmit={(e) => handleSubmit(e)}>
        <InputContainer order="0" error={wrongCredentialsError}>
          <InputFrame order="0">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              className={emailError ? 'input-error' : ''}
              onChange={handleEmailInput}
            />
            {emailError && <EmailErrorMessage>{EMPTY_EMAIL_MESSAGE}</EmailErrorMessage>}
          </InputFrame>
          <InputFrame order="1">
            <Input
              type="password"
              name="password"
              placeholder="Password"
              className={passwordError ? 'input-error' : ''}
              onChange={handlePasswordInput}
            />
            {passwordError && <EmailErrorMessage>{EMPTY_EMAIL_MESSAGE}</EmailErrorMessage>}
          </InputFrame>
          {wrongCredentialsError && (
            <InputFrame order="2">
              <ErrorContainer>
                <ErrorMessage>
                  <ErrorTitle>
                    <b>{WRONG_CREDENTIALS_TITLE}</b>
                  </ErrorTitle>
                  <ErrorDescription>{WRONG_CREDENTIALS_DESCRIPTION}</ErrorDescription>
                </ErrorMessage>
              </ErrorContainer>
            </InputFrame>
          )}
        </InputContainer>
        <button type="submit" className="btn-blue">
          Sign In
        </button>
      </Form>
    </LoginFormContainer>
  )
}

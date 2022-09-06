import React, { useState } from 'react'
import { ethers } from 'ethers'
import instance from 'src/api/init'

import { LoginFormContainer, Logo, Form, InputContainer, InputFrame, Input, EmailErrorMessage } from './styles'
import { useGeneralContext } from 'src/state/GeneralContext'
import logos from 'src/assets/logos'
import Message, { MessageType } from 'src/components/common/Message/Message'

const EMPTY_EMAIL_MESSAGE = 'The field can not be empty'

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
        const encryptedPassword = await ethers.utils.id(password)

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
      <Logo alt="logo" src={logos.gigaLogoColor}></Logo>
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
              <Message
                type={MessageType.ERROR}
                title="Invalid Credentials"
                description="Please contact giga administrator for assistance"
                onClose={() => setWrongCredentialsError(false)}
              />
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

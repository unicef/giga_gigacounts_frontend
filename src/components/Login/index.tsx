import React from 'react'
import { ImageContainer, LoginContainer } from './index.css'
import { LoginForm } from './LoginForm/LoginForm'

const Login: React.FC = (): JSX.Element => {
  return (
    <LoginContainer>
      <LoginForm />
      <ImageContainer />
    </LoginContainer>
  )
}

export default Login

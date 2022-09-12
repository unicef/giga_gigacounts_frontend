import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUser } from 'src/state/hooks'
import images from 'src/assets/images'
import { LoginContainer } from './styles'
import { LoginForm } from './LoginForm/LoginForm'

const Login: React.FC = (): JSX.Element => {
  const user = useUser()

  if (user.loading) {
    return (
      <LoginContainer>
        <img src={images.loginImage} alt="login-pattern" />
      </LoginContainer>
    )
  }

  if (user.data !== undefined) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <LoginContainer>
      <LoginForm />
      <img src={images.loginImage} alt="login-pattern" />
    </LoginContainer>
  )
}

export default Login

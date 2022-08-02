import React from 'react'
import { useUser } from 'src/state/hooks'
import { LoginContainer } from './styles'
import { LoginForm } from './LoginForm/LoginForm'
import { Navigate } from 'react-router-dom'
import images from 'src/assets/images'

const Login: React.FC = (): JSX.Element => {
  const user = useUser()

  if (!user.loading && user.data.name) {
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

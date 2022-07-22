import React from 'react'
import { useUser } from 'src/state/hooks'
import { ImageContainer, LoginContainer } from './index.css'
import { LoginForm } from './LoginForm/LoginForm'
import { Navigate } from 'react-router-dom'

const Login: React.FC = (): JSX.Element => {
  const user = useUser()

  if (!user.loading && user.data.name) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <LoginContainer>
      <LoginForm />
      <ImageContainer />
    </LoginContainer>
  )
}

export default Login

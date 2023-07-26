import { Helmet } from 'react-helmet-async'
import Login from 'src/sections/auth/Login'

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Login | Gigacounts</title>
      </Helmet>

      <Login />
    </>
  )
}

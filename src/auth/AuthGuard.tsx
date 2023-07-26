import { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import LoadingScreen from 'src/components/loading-screen'
import Login from 'src/pages/auth/LoginPage'
import { useAuthContext } from './useAuthContext'

type AuthGuardProps = {
  children: React.ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isInitialized } = useAuthContext()

  const { pathname } = useLocation()

  const [requestedLocation, setRequestedLocation] = useState<string | null>(null)

  if (!isInitialized) {
    return <LoadingScreen />
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname)
    }
    return <Login />
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null)
    return <Navigate to={requestedLocation} />
  }

  return <> {children} </>
}

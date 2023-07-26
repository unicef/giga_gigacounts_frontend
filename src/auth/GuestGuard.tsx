import { Navigate } from 'react-router-dom'

import { ROUTES } from 'src/routes/paths'

import LoadingScreen from 'src/components/loading-screen'
import { useAuthContext } from './useAuthContext'

type GuestGuardProps = {
  children: React.ReactNode
}

export default function GuestGuard({ children }: GuestGuardProps) {
  const { isAuthenticated, isInitialized } = useAuthContext()

  if (isAuthenticated) {
    return <Navigate to={ROUTES.dashboard.app.route} />
  }

  if (!isInitialized) {
    return <LoadingScreen />
  }

  return <> {children} </>
}

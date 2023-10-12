import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Error403 } from 'src/@types'
import LoadingScreen from 'src/components/loading-screen/LoadingScreen'
import { useAuthorization } from 'src/hooks/useAuthorization'
import { useAuthContext } from './useAuthContext'

type PermissionBasedGuardProp = {
  permissions?: readonly string[]
  children: React.ReactNode
}

export default function PermissionBasedGuard({ permissions, children }: PermissionBasedGuardProp) {
  const { user } = useAuthContext()
  const { hasAllPermissions } = useAuthorization()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) return

    if (permissions && permissions.length > 0 && !hasAllPermissions(permissions))
      Error403.redirect(navigate)
  }, [permissions, navigate, hasAllPermissions, user])

  if (!user) return <LoadingScreen />

  return <> {children} </>
}

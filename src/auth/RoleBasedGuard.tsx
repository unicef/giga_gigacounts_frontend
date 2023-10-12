import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router'
import { Error403, UserRoles } from 'src/@types'
import LoadingScreen from 'src/components/loading-screen/LoadingScreen'
import { useAuthContext } from './useAuthContext'

type RoleBasedGuardProp = {
  roles?: readonly UserRoles[]
  children: React.ReactNode
}

export default function RoleBasedGuard({ roles, children }: RoleBasedGuardProp) {
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const currentRole = useMemo(() => user?.role || { code: '' }, [user])

  useEffect(() => {
    if (!user) return

    if (roles && roles.length > 0 && currentRole && !roles.includes(currentRole.code))
      Error403.redirect(navigate)
  }, [roles, currentRole, navigate, user])

  if (!user) return <LoadingScreen />

  return <> {children} </>
}

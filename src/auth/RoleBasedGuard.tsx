import { useLocales } from 'src/locales'
import { Typography } from 'src/components/typography'
import { UserRoles } from 'src/@types'
import LoadingScreen from 'src/components/loading-screen/LoadingScreen'
import { useAuthContext } from './useAuthContext'

type RoleBasedGuardProp = {
  roles?: readonly UserRoles[]
  children: React.ReactNode
}

export default function RoleBasedGuard({ roles, children }: RoleBasedGuardProp) {
  const { user } = useAuthContext()
  const { translate } = useLocales()
  const currentRole = user?.role || { code: '' }

  if (!user) return <LoadingScreen />
  if (roles && roles.length > 0 && currentRole && !roles.includes(currentRole.code)) {
    return (
      <>
        <Typography as="h3">{translate('role_base_guard.permission_denied')}</Typography>
        <Typography variant="textSecondary">
          {translate('role_base_guard.without_permission')}
        </Typography>
      </>
    )
  }

  return <> {children} </>
}

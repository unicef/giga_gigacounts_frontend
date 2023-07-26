import { useLocales } from 'src/locales'
import { Typography } from 'src/components/typography'
import { useAuthContext } from './useAuthContext'

type RoleBasedGuardProp = {
  hasContent?: boolean
  roles?: string[]
  children: React.ReactNode
}

export default function RoleBasedGuard({ hasContent, roles, children }: RoleBasedGuardProp) {
  const { translate } = useLocales()
  const { user } = useAuthContext()
  const currentRole = user?.role

  if (typeof roles !== 'undefined' && currentRole && !roles.includes(currentRole.code)) {
    return hasContent ? (
      <>
        {/* <m.div>
        <m.div variants={varBounce().in}> */}
        <Typography as="h3">{translate('role_base_guard.permission_denied')}</Typography>
        {/* </m.div> */}
        {/*
        <m.div variants={varBounce().in}> */}
        <Typography variant="textSecondary">
          {translate('role_base_guard.without_permission')}
        </Typography>
        {/* </m.div> */}
        {/* <m.div variants={varBounce().in}> */}
        {/* <ForbiddenIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} /> */}
        {/* </m.div> */}
        {/* </m.div> */}
      </>
    ) : null
  }

  return <> {children} </>
}

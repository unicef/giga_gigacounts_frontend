import { Button, SkeletonText } from '@carbon/react'
import { useNavigate } from 'react-router'
import { useAuthContext } from 'src/auth/useAuthContext'
import { Stack } from 'src/components/stack'
import { Typography } from 'src/components/typography'
import { UserInitials } from 'src/components/user'
import { ICONS } from 'src/constants'
import { useLocales } from 'src/locales'
import { ROUTES } from 'src/routes/paths'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter, threeDots } from 'src/utils/strings'

export default function NavAccount() {
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const { spacing } = useTheme()
  const { translate } = useLocales()
  return (
    <Stack
      justifyContent="space-evenly"
      orientation="horizontal"
      gap={spacing.sm}
      alignItems="center"
    >
      {user ? (
        <>
          <UserInitials name={user?.name ?? ''} lastName={user?.lastName ?? ''} />
          <Stack style={{ width: '50%' }} orientation="vertical">
            <Typography as="h5">{threeDots(`${user?.name} ${user?.lastName}`, 18)}</Typography>
            <Typography as="span" style={{ fontSize: '12px' }}>
              {threeDots(user?.role?.name || 'user', 23)}
            </Typography>
          </Stack>
          <Button
            kind="ghost"
            hasIconOnly
            size="sm"
            tabIndex={0}
            id="account-nav-information"
            iconDescription={capitalizeFirstLetter(translate('settings'))}
            renderIcon={ICONS.Settings}
            onClick={() => navigate(ROUTES.dashboard.user.account.route)}
          />
        </>
      ) : (
        <div style={{ alignSelf: 'center', width: '75%' }}>
          <SkeletonText lineCount={2} paragraph />
        </div>
      )}
    </Stack>
  )
}

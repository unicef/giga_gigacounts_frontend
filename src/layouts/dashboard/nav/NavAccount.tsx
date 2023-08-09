import { useNavigate } from 'react-router'
import { Button } from '@carbon/react'
import { capitalizeFirstLetter, threeDots } from 'src/utils/strings'
import { Stack } from 'src/components/stack'
import { Typography } from 'src/components/typography'
import { useTheme } from 'src/theme'
import { useAuthContext } from 'src/auth/useAuthContext'
import { ROUTES } from 'src/routes/paths'
import { useLocales } from 'src/locales'
import { ICONS } from 'src/constants'
import { UserInitials } from 'src/components/user'

export default function NavAccount() {
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const { spacing } = useTheme()
  const { translate } = useLocales()
  return (
    <Stack justifyContent="center" orientation="horizontal" gap={spacing.sm} alignItems="center">
      <UserInitials name={user?.name} lastName={user?.lastName} />
      <Stack orientation="vertical">
        <Typography as="h5">
          {user?.name} {user?.lastName}
        </Typography>
        <Typography>{threeDots(user?.role?.name || 'user', 25)}</Typography>
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
    </Stack>
  )
}

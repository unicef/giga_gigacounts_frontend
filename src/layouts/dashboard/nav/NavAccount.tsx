import { useNavigate } from 'react-router'
import { threeDots } from 'src/utils/strings'
import { Stack } from 'src/components/stack'
import { Typography } from 'src/components/typography'
import { useTheme } from 'src/theme'
import { useAuthContext } from 'src/auth/useAuthContext'
import { ROUTES } from 'src/routes/paths'

export default function NavAccount() {
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const { spacing } = useTheme()
  return (
    <button
      type="button"
      tabIndex={0}
      style={{
        all: 'unset',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.xs
      }}
      onClick={() => navigate(ROUTES.dashboard.user.account.route)}
    >
      <Stack orientation="horizontal">
        <img
          src={user?.photoUrl}
          style={{ marginRight: spacing.xs, borderRadius: '50%', width: 50, height: 50 }}
          alt={user?.displayName}
        />
        <Stack orientation="vertical">
          <Typography as="h5">{user?.displayName}</Typography>
          <Typography>{threeDots(user?.role?.name || 'user', 25)}</Typography>
        </Stack>
      </Stack>
    </button>
  )
}

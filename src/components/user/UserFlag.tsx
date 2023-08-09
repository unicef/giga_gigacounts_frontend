import { useAuthContext } from 'src/auth/useAuthContext'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'

export default function UserFlag() {
  const { user } = useAuthContext()
  const { translate } = useLocales()
  const { spacing } = useTheme()

  return (
    <>
      {user && (
        <img
          style={{
            borderRadius: spacing.xxs,
            width: '47px',
            height: '33px',
            marginBottom: spacing.lg
          }}
          src={user.country.flagUrl}
          alt={`${user.country.name} ${translate('flag')}`}
        />
      )}
    </>
  )
}

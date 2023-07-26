import { TextInput } from '@carbon/react'
import { Helmet } from 'react-helmet-async'
import { useAuthContext } from 'src/auth/useAuthContext'
import Banner from 'src/components/banner/Banner'
import { Stack } from 'src/components/stack'
import { Typography } from 'src/components/typography'
import { Views } from 'src/constants/authorization'
import { useAuthorization } from 'src/hooks/useAuthorization'
import { useLocales } from 'src/locales'
import { AccountCrypto } from 'src/sections/@dashboard/user/account'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'

export default function UserAccountPage() {
  const { user } = useAuthContext()
  const { canView } = useAuthorization()
  const { translate } = useLocales()
  const { palette, spacing } = useTheme()

  return (
    <>
      <Helmet>
        <title> User: Account Settings | Gigacounts</title>
      </Helmet>
      {user && (
        <>
          <Banner title={`${translate('loginLayout.welcome')} ${user?.displayName || ''}`} />
          <Stack orientation="horizontal" gap={spacing.xl}>
            <Stack
              gap={spacing.md}
              orientation="vertical"
              style={{
                width: '100%',
                backgroundColor: palette.background.neutral,
                paddingInline: spacing.xl,
                paddingBlock: spacing.lg
              }}
            >
              <Typography as="h3">{capitalizeFirstLetter(translate('personal_info'))}</Typography>
              <img
                src={user?.photoUrl}
                alt="user profile"
                style={{ alignSelf: 'center', borderRadius: '50%', width: 230, height: 230 }}
              />
              <TextInput
                id="user name"
                labelText={capitalizeFirstLetter(translate('name'))}
                disabled
                value={user?.name}
              />
              <TextInput
                id="user lastname"
                labelText={capitalizeFirstLetter(translate('last_name'))}
                disabled
                value={user?.lastName}
              />
              <TextInput
                id="user role"
                labelText={capitalizeFirstLetter(translate('role'))}
                disabled
                value={user?.role?.name}
              />
              <TextInput
                id="user email"
                labelText={capitalizeFirstLetter(translate('email'))}
                disabled
                value={user?.email}
              />
              <TextInput
                id="user phoneNumber"
                labelText={capitalizeFirstLetter(translate('phone_number'))}
                disabled
                value={user?.phoneNumber}
              />
              <TextInput
                id="user country name"
                labelText={capitalizeFirstLetter(translate('country_name'))}
                disabled
                value={user?.country.name}
              />
              <TextInput
                id="user address"
                labelText={capitalizeFirstLetter(translate('address'))}
                disabled
                value={user?.address}
              />
            </Stack>
            {canView(Views.wallet) && <AccountCrypto />}
          </Stack>
        </>
      )}
    </>
  )
}

import { TextInput } from '@carbon/react'
import { Helmet } from 'react-helmet-async'
import { useAuthContext } from 'src/auth/useAuthContext'
import Banner from 'src/components/banner/Banner'
import CustomJoyride from 'src/components/custom-joyride/CustomJoyride'
import { Stack } from 'src/components/stack'
import { Typography } from 'src/components/typography'
import { Views } from 'src/constants'
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
          <CustomJoyride name="profile" />
          <Banner title={`${translate('loginLayout.welcome')} ${user?.name} ${user?.lastName}`} />
          <Stack
            style={{ height: '84dvh', backgroundColor: palette.background.neutral }}
            orientation="horizontal"
            gap={spacing.xl}
          >
            <Stack
              orientation="vertical"
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: palette.background.default,
                paddingInline: spacing.xl,
                paddingBlock: spacing.lg
              }}
            >
              <Typography as="h3">{capitalizeFirstLetter(translate('personal_info'))}</Typography>
              <TextInput
                size="sm"
                id="user name"
                labelText={capitalizeFirstLetter(translate('name'))}
                readOnly
                value={user?.name}
              />
              <TextInput
                size="sm"
                id="user lastname"
                labelText={capitalizeFirstLetter(translate('last_name'))}
                readOnly
                value={user?.lastName}
              />
              <TextInput
                size="sm"
                id="user role"
                labelText={capitalizeFirstLetter(translate('role'))}
                readOnly
                value={user?.role?.name}
              />
              <TextInput
                size="sm"
                id="user email"
                labelText={capitalizeFirstLetter(translate('email'))}
                readOnly
                value={user?.email}
              />
              <TextInput
                size="sm"
                id="user phoneNumber"
                labelText={capitalizeFirstLetter(translate('phone_number'))}
                readOnly
                value={user?.phoneNumber}
              />
              <TextInput
                size="sm"
                id="user country name"
                labelText={capitalizeFirstLetter(translate('country_name'))}
                readOnly
                value={user?.country.name}
              />
              <TextInput
                size="sm"
                id="user address"
                labelText={capitalizeFirstLetter(translate('address'))}
                readOnly
                value={user?.address}
              />
            </Stack>
            {canView(Views.contract) && <AccountCrypto />}
          </Stack>
        </>
      )}
    </>
  )
}

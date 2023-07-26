import { Helmet } from 'react-helmet-async'
import { Banner } from 'src/components/banner'
import { Stack } from 'src/components/stack'
import { Typography } from 'src/components/typography'
import { useLocales } from 'src/locales'
import { HelpRequestForm } from 'src/sections/@dashboard/contact'
import { useTheme } from 'src/theme'

export default function HelpRequestPage() {
  const { translate } = useLocales()
  const { spacing } = useTheme()
  return (
    <>
      <Helmet>
        <title> Contact: Help Request | Gigacounts</title>
      </Helmet>

      <Banner title={translate('functionalities.help_request')} />
      <div style={{ padding: spacing.lg }}>
        <Typography as="h3"> {translate('functionalities.help_request')}</Typography>
        <Stack orientation="horizontal" gap={spacing.xl}>
          <HelpRequestForm />
          <Stack justifyContent="center" alignItems="center" style={{ width: '100%' }}>
            <img
              src="/assets/images/dashboard/help-request.png"
              alt="user profile"
              style={{ alignSelf: 'center', width: '70%', height: '100%' }}
            />
          </Stack>
        </Stack>
      </div>
    </>
  )
}

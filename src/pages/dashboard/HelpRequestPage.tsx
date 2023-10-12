import { Link } from '@carbon/react'
import { Helmet } from 'react-helmet-async'
import { Banner } from 'src/components/banner'
import { Stack } from 'src/components/stack'
import { Typography } from 'src/components/typography'
import { useLocales } from 'src/locales'
import { HelpRequestForm } from 'src/sections/@dashboard/contact'
import { useTheme } from 'src/theme'
import { redirectToKnowledgeBase } from 'src/utils/kb'

export default function HelpRequestPage() {
  const { translate } = useLocales()
  const { spacing } = useTheme()
  return (
    <>
      <Helmet>
        <title> Contact: Help Request | Gigacounts</title>
      </Helmet>

      <Banner
        title={translate('ask_for_help')}
        subtitle={
          <>
            {translate('help_request_subtitle')}{' '}
            <Link
              style={{ fontSize: 16, cursor: 'pointer' }}
              onClick={() => redirectToKnowledgeBase()}
            >
              {translate('visit_help_page')}.
            </Link>
          </>
        }
      />
      <div style={{ padding: spacing.lg }}>
        <Stack orientation="horizontal" gap={spacing.xl}>
          <Stack style={{ width: '50%' }}>
            <Typography as="h3"> {translate('functionalities.help_request')}</Typography>
            <HelpRequestForm />
          </Stack>
          <Stack style={{ width: '50%' }}>
            <img
              src="/assets/images/dashboard/help-request.png"
              alt="user profile"
              style={{ alignSelf: 'center', maxWidth: '641px', aspectRatio: '1/1' }}
            />
          </Stack>
        </Stack>
      </div>
    </>
  )
}

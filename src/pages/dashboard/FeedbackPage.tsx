import { Helmet } from 'react-helmet-async'
import { Banner } from 'src/components/banner'
import { Stack } from 'src/components/stack'
import { Typography } from 'src/components/typography'
import { useLocales } from 'src/locales'
import { FeedbackForm } from 'src/sections/@dashboard/contact'
import { useTheme } from 'src/theme'

export default function FeedbackPage() {
  const { translate } = useLocales()
  const { spacing } = useTheme()
  return (
    <>
      <Helmet>
        <title> Contact: Feedback | Gigacounts</title>
      </Helmet>

      <Banner title={translate('functionalities.feedback')} />
      <div style={{ padding: spacing.lg }}>
        <Typography as="h3"> {translate('send_us_feedback')}</Typography>
        <Stack orientation="horizontal" gap={spacing.xl}>
          <FeedbackForm />
          <Stack justifyContent="center" alignItems="center" style={{ width: '100%' }}>
            <img
              src="/assets/images/dashboard/feedback.png"
              alt="user profile"
              style={{ alignSelf: 'center', width: '70%', height: '100%' }}
            />
          </Stack>
        </Stack>
      </div>
    </>
  )
}

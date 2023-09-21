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
        <Stack orientation="horizontal" gap={spacing.xl}>
          <Stack style={{ width: '50%' }}>
            <Typography as="h3" style={{ paddingBottom: spacing.xl }}>
              {translate('send_us_feedback')}
            </Typography>
            <FeedbackForm />
          </Stack>
          <Stack style={{ width: '50%' }}>
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

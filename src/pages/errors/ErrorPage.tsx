import { Helmet } from 'react-helmet-async'
import { Translation } from 'src/@types'
import { Stack } from 'src/components/stack'
import { Typography } from 'src/components/typography'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'

type Props = {
  title: Translation
  code: Translation | number
  content?: Translation
  helmet: string
}

export default function ErrorPage({ title, code, content, helmet }: Props) {
  const { translate } = useLocales()
  const { spacing } = useTheme()
  return (
    <>
      <Helmet>
        <title> {helmet} | Gigacounts</title>
      </Helmet>
      <Stack orientation="horizontal">
        <Stack
          orientation="vertical"
          alignItems="center"
          justifyContent="center"
          style={{ width: '100%', textAlign: 'center' }}
        >
          <Typography style={{ fontSize: '156px', fontWeight: '400' }} as="span">
            {typeof code === 'number' ? code : translate(code)}
          </Typography>

          <Typography
            as="h1"
            style={{ fontSize: '32px', fontWeight: '500', marginBottom: spacing.xl }}
          >
            {translate(title)}
          </Typography>

          {content && (
            <Typography style={{ fontSize: '28px', fontWeight: '300' }} variant="textSecondary">
              {translate(content)}
            </Typography>
          )}
        </Stack>
      </Stack>
    </>
  )
}

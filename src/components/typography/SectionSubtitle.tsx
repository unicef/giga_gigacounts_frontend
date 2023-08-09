import { Translation } from 'src/@types'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'
import Typography from './Typography'

export default function SectionSubtitle({ subtitle }: { subtitle: Translation }) {
  const { spacing } = useTheme()
  const { translate } = useLocales()

  return (
    <Typography as="h6" variant="disabled" style={{ paddingBottom: spacing.md }}>
      {capitalizeFirstLetter(translate(subtitle))}
    </Typography>
  )
}

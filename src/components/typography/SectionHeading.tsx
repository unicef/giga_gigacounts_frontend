import { Translation } from 'src/@types'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'
import Typography from './Typography'

export default function SectionHeading({
  heading,
  weight
}: {
  heading: Translation
  weight?: 300 | 400 | 500
}) {
  const { translate } = useLocales()
  const { spacing } = useTheme()
  return (
    <Typography weight={weight} style={{ marginTop: spacing.md, marginBottom: spacing.xs }} as="h5">
      {capitalizeFirstLetter(translate(heading))}
    </Typography>
  )
}

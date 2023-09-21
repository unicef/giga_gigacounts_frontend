import { CSSProperties } from 'react'
import { Translation } from 'src/@types'
import { REQUIRED_MARKER } from 'src/constants'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'
import SectionSubtitle from './SectionSubtitle'
import Typography from './Typography'

export default function SectionTitle({
  label,
  style,
  required,
  subtitle
}: {
  label: Translation | (string & {})
  style?: CSSProperties
  required?: boolean
  subtitle?: Translation
}) {
  const { spacing } = useTheme()
  const { translate } = useLocales()

  return (
    <div style={{ paddingBlock: spacing.md, ...style }}>
      <Typography as="h4" variant="primary">
        {capitalizeFirstLetter(translate(label as Translation))}
        {required && (
          <Typography as="span" variant="error">
            {' '}
            {REQUIRED_MARKER}
          </Typography>
        )}
      </Typography>
      {subtitle && <SectionSubtitle subtitle={subtitle} />}
    </div>
  )
}

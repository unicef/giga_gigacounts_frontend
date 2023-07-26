import { CSSProperties } from 'react'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'
import Typography from './Typography'

export default function SectionTitle({
  label,
  subtitle,
  style
}: {
  label: string
  subtitle?: string
  style?: CSSProperties
}) {
  const { spacing } = useTheme()

  return (
    <div style={{ paddingBlock: spacing.md, ...style }}>
      <Typography as="h4" variant="primary">
        {capitalizeFirstLetter(label)}
      </Typography>
      {subtitle && <Typography>{capitalizeFirstLetter(subtitle)}</Typography>}
    </div>
  )
}

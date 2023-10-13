import { useTheme } from 'src/theme'
import Typography from './Typography'

export default function Footer({ required, text }: { text: string; required?: boolean }) {
  const { spacing } = useTheme()
  return (
    <Typography
      style={{ paddingBlock: spacing.md, paddingInline: spacing.xs }}
      variant="textTertiary"
      size={12}
    >
      {required && <>* </>}
      {text}
    </Typography>
  )
}

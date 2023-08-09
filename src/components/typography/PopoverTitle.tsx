import { Translation } from 'src/@types'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'
import Typography from './Typography'

type Props = {
  title: Translation
}
export default function PopoverTitle({ title }: Props) {
  const { spacing } = useTheme()
  const { translate } = useLocales()
  return (
    <Typography as="h6" style={{ marginBlockStart: spacing.md, marginBlockEnd: spacing.xxs }}>
      {capitalizeFirstLetter(translate(title))}
    </Typography>
  )
}

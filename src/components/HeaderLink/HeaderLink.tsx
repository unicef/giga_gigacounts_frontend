import { Translation } from 'src/@types'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'
import { Typography } from '../typography'

type Props = {
  onClick?: () => void
  label: Translation
}
export default function HeaderLink({ onClick, label }: Props) {
  const { translate } = useLocales()
  const { spacing } = useTheme()
  return (
    <Typography
      size={16}
      id="help-page-link"
      className="header-link"
      onClick={onClick}
      style={{
        alignSelf: 'flex-end',
        paddingBlock: spacing.sm + 0.5,
        paddingInline: spacing.xs,
        whiteSpace: 'nowrap'
      }}
    >
      {capitalizeFirstLetter(translate(label))}
    </Typography>
  )
}

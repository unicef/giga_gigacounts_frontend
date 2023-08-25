import { Link } from '@carbon/react'
import { CSSProperties } from 'react'
import { STRING_DEFAULT } from 'src/constants'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter, threeDots } from 'src/utils/strings'
import { Stack } from 'src/components/stack'
import { Typography } from 'src/components/typography'

type Props = {
  title?: string
  value?: string
  label?: string
  link?: string
  invisible?: boolean
  onClickLink?: () => void
  style?: CSSProperties
  charLimit?: number
}

export default function ContractInfo({
  title = '',
  value,
  label,
  link,
  onClickLink,
  invisible,
  style,
  charLimit
}: Props) {
  const { spacing } = useTheme()
  const getContent = () => {
    if (invisible) return ''
    if (value && label) return `${value}${label}`
    if (value && charLimit) return threeDots(value, charLimit)
    if (value) return value
    return STRING_DEFAULT
  }

  const getTitle = () => {
    if (title && charLimit) capitalizeFirstLetter(threeDots(title, charLimit))
    if (title) return capitalizeFirstLetter(title)
    return ''
  }
  return (
    <Stack orientation="vertical" gap={spacing.md} style={style}>
      <Stack alignItems="flex-start" justifyContent="flex-start" orientation="vertical">
        <Typography as="p" variant="disabled" style={{ wordBreak: 'break-all' }}>
          {getTitle()}
        </Typography>
        <Typography>
          {getContent()}
          {link && (
            <Link style={{ marginLeft: spacing.md }} onClick={onClickLink}>
              {link}
            </Link>
          )}
        </Typography>
      </Stack>
    </Stack>
  )
}

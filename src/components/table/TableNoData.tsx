import { Pictogram } from 'src/@types'
import { Typography } from 'src/components/typography'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'
import { Stack } from '../stack'

type Props = {
  isNotFound: boolean
  title: string
  subtitle: string
  rowsPerPage: number
  Icon: Pictogram
}
const ROW_HEIGHT = 81

export default function TableNoData({ isNotFound, rowsPerPage, title, subtitle, Icon }: Props) {
  const { palette, spacing } = useTheme()
  return (
    <>
      {isNotFound && (
        <Stack
          alignItems="center"
          justifyContent="center"
          style={{
            width: '100%',
            height: `${ROW_HEIGHT * rowsPerPage}px`
          }}
        >
          <Icon
            style={{ marginBottom: spacing.xl }}
            width={96}
            height={96}
            color={palette.grey[380]}
          />
          <Typography as="h4" variant="disabled">
            {capitalizeFirstLetter(title)}
          </Typography>
          <Typography variant="disabled">{capitalizeFirstLetter(subtitle)}</Typography>
        </Stack>
      )}
    </>
  )
}

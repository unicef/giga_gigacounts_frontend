import { TableCell, TableRow } from '@carbon/react'
import { useLocales } from 'src/locales'
import { Translation } from 'src/@types'
import { Typography } from 'src/components/typography'

type Props = {
  isNotFound: boolean
  cols?: number
  text: Translation
}

export default function TableNoData({ isNotFound, cols, text }: Props) {
  const { translate } = useLocales()

  return (
    <>
      {isNotFound && (
        <TableRow>
          <TableCell colSpan={cols}>
            <Typography as="h5">{translate(text)}</Typography>
          </TableCell>
        </TableRow>
      )}
    </>
  )
}

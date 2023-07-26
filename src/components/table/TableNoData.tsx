import { TableCell, TableRow } from '@carbon/react'
import { useLocales } from 'src/locales'
import { Typography } from '../typography'

type Props = {
  isNotFound: boolean
  cols?: number
}

export default function TableNoData({ isNotFound, cols }: Props) {
  const { translate } = useLocales()

  return (
    <>
      {isNotFound && (
        <TableRow>
          <TableCell colSpan={cols}>
            <Typography as="h5">{translate('no_data')}</Typography>
          </TableCell>
        </TableRow>
      )}
    </>
  )
}

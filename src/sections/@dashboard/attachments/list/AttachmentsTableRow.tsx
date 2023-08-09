import { Button, DataTableRow, TableCell, TableRow } from '@carbon/react'
import { TableRowProps } from '@carbon/react/lib/components/DataTable/TableRow'
import { ICONS } from 'src/constants'
import { useLocales } from 'src/locales'
import { capitalizeFirstLetter } from 'src/utils/strings'
import { getOrderedFromCells } from 'src/utils/table'

type Props = {
  row: DataTableRow
  rowProps: TableRowProps
  url: string
}

export default function AttachmentsTableRow({ row, rowProps, url }: Props) {
  const [name] = getOrderedFromCells(['name'], row.cells)

  const { translate } = useLocales()

  return (
    <TableRow {...rowProps}>
      <TableCell>{name}</TableCell>
      <TableCell>
        <Button
          style={{ margin: 0, padding: 0 }}
          kind="ghost"
          onClick={() => window.open(url)}
          iconDescription={capitalizeFirstLetter(translate('download'))}
          renderIcon={ICONS.Download}
          hasIconOnly
        />
      </TableCell>
    </TableRow>
  )
}

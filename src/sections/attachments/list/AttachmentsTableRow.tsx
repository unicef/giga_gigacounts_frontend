import { Download } from '@carbon/icons-react'
import { Button, TableCell, TableRow } from '@carbon/react'
import { TableRowProps } from '@carbon/react/lib/components/DataTable/TableRow'
import { useLocales } from 'src/locales'
import { capitalizeFirstLetter } from 'src/utils/strings'

type Props = {
  row: any
  rowProps: TableRowProps
  url: string
}

export default function AttachmentsTableRow({ row, rowProps, url }: Props) {
  const [name] = row.cells.map((c: { value: any }) => c.value)

  const { translate } = useLocales()

  return (
    <TableRow {...rowProps}>
      <TableCell>{name}</TableCell>
      <TableCell>
        <Button
          kind="ghost"
          onClick={() => window.open(url)}
          iconDescription={capitalizeFirstLetter(translate('download'))}
          renderIcon={Download}
          hasIconOnly
        />
      </TableCell>
    </TableRow>
  )
}

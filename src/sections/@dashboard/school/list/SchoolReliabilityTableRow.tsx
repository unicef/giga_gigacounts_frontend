// @ts-ignore
import { Checkbox, TableCell, TableRow, Tag } from '@carbon/react'
import { TableRowProps } from '@carbon/react/lib/components/DataTable/TableRow'
import { useState } from 'react'
import { setReliability } from 'src/api/school'
import { SCHOOL_RELIABILITY_COLOR } from 'src/constants/status'
import { useSnackbar } from 'src/hooks/useSnackbar'
import { useLocales } from 'src/locales'
import { capitalizeFirstLetter } from 'src/utils/strings'

type Props = {
  row: any
  selected: boolean
  rowProps: TableRowProps
}

export default function SchoolReliabilityTableRow({ row, rowProps }: Props) {
  const [external_id, name, location1, reliable_measures] = row.cells.map(
    (c: { value: any }) => c.value
  )
  const [checked, setChecked] = useState<boolean>(reliable_measures ?? false)
  const { translate } = useLocales()
  const { pushSuccess, pushError } = useSnackbar()

  const handleReliableChange = (newChecked: boolean, id: string) => {
    setReliability(id, newChecked)
      .then(() => pushSuccess('push.changed_reliability', { append: external_id }))
      .catch(() => pushError('push.changed_reliability_error', { append: external_id }))
    setChecked(newChecked)
  }

  return (
    <TableRow {...rowProps}>
      <TableCell>{external_id}</TableCell>

      <TableCell>{name}</TableCell>

      <TableCell>{location1}</TableCell>
      <TableCell>
        <Tag type={SCHOOL_RELIABILITY_COLOR(checked)}>
          {capitalizeFirstLetter(translate(checked ? 'reliable' : 'unreliable'))}
        </Tag>
      </TableCell>
      <TableCell>
        <Checkbox
          id={row.id}
          labelText=""
          checked={checked}
          onChange={(_, data) => handleReliableChange(data.checked, data.id)}
        />
      </TableCell>
    </TableRow>
  )
}

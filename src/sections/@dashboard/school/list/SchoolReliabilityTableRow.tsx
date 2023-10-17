import { DataTableRow, TableCell, TableRow, Tag } from '@carbon/react'
import { TableRowProps } from '@carbon/react/lib/components/DataTable/TableRow'
import { useState } from 'react'
import { ISchool } from 'src/@types'
import { setReliability } from 'src/api/school'
import { ActionLink } from 'src/components/action'
import { SCHOOL_RELIABILITY_COLOR, STRING_DEFAULT } from 'src/constants'
import { useSnackbar } from 'src/hooks/useSnackbar'
import { useLocales } from 'src/locales'
import { capitalizeFirstLetter, threeDots } from 'src/utils/strings'
import { getOrderedFromCells } from 'src/utils/table'

type Props = {
  row: DataTableRow<ISchool[]>
  rowProps: TableRowProps
  setReliabilityInTable: (newValue: boolean) => void
}

export default function SchoolReliabilityTableRow({ row, rowProps, setReliabilityInTable }: Props) {
  const [external_id, name, location1, reliable_measures] = getOrderedFromCells(
    ['external_id', 'name', 'location1', 'reliable_measures'],
    row.cells
  )
  const [checked, setChecked] = useState<boolean>(reliable_measures ?? false)
  const { translate } = useLocales()
  const { pushSuccess, pushError } = useSnackbar()

  const handleReliableChange = (newChecked: boolean, id: string) => {
    setChecked(newChecked)
    setReliabilityInTable(newChecked)
    setReliability(id, newChecked)
      .then(() => pushSuccess('push.changed_reliability', { append: external_id }))
      .catch(() => {
        pushError('push.changed_reliability_error', { append: external_id })
        setChecked(!newChecked)
        setReliabilityInTable(!newChecked)
      })
  }

  return (
    <TableRow {...rowProps}>
      <TableCell style={{ verticalAlign: 'middle', width: '30%' }}>{threeDots(name, 50)}</TableCell>
      <TableCell style={{ verticalAlign: 'middle', width: '15%' }}>
        <Tag type={SCHOOL_RELIABILITY_COLOR(checked)}>
          {capitalizeFirstLetter(translate(checked ? 'reliable' : 'unreliable'))}
        </Tag>
      </TableCell>
      <TableCell style={{ verticalAlign: 'middle', width: '20%' }}>{external_id}</TableCell>

      <TableCell style={{ verticalAlign: 'middle', width: '20%' }}>
        {location1 || STRING_DEFAULT}
      </TableCell>

      <TableCell style={{ verticalAlign: 'middle', width: '15%' }}>
        {checked ? (
          <ActionLink
            icon="Close"
            description="mark_as_unreliable"
            onClick={() => handleReliableChange(false, row.id)}
            variant="error"
          />
        ) : (
          <ActionLink
            icon="Success"
            variant="success"
            description="mark_as_reliable"
            onClick={() => handleReliableChange(true, row.id)}
          />
        )}
      </TableCell>
    </TableRow>
  )
}

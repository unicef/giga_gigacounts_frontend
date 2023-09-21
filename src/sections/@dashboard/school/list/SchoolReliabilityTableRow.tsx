import { DataTableRow, TableCell, TableRow, Tag } from '@carbon/react'
import { TableRowProps } from '@carbon/react/lib/components/DataTable/TableRow'
import { useState } from 'react'
import { ISchool } from 'src/@types'
import { setReliability } from 'src/api/school'
import { ActionButton } from 'src/components/action-button'
import { SCHOOL_RELIABILITY_COLOR, STRING_DEFAULT } from 'src/constants'
import { useSnackbar } from 'src/hooks/useSnackbar'
import { useLocales } from 'src/locales'
import { capitalizeFirstLetter, threeDots } from 'src/utils/strings'
import { getOrderedFromCells } from 'src/utils/table'

type Props = {
  row: DataTableRow<ISchool[]>
  selected: boolean
  rowProps: TableRowProps
}

export default function SchoolReliabilityTableRow({ row, rowProps }: Props) {
  const [external_id, name, location1, reliable_measures] = getOrderedFromCells(
    ['external_id', 'name', 'location1', 'reliable_measures'],
    row.cells
  )
  const [checked, setChecked] = useState<boolean>(reliable_measures ?? false)
  const { translate } = useLocales()
  const { pushSuccess, pushError } = useSnackbar()

  const handleReliableChange = (newChecked: boolean, id: string) => {
    setChecked(newChecked)
    setReliability(id, newChecked)
      .then(() => pushSuccess('push.changed_reliability', { append: external_id }))
      .catch(() => {
        pushError('push.changed_reliability_error', { append: external_id })
        setChecked(!newChecked)
      })
  }

  return (
    <TableRow {...rowProps}>
      <TableCell style={{ width: '30%' }}>{threeDots(name, 50)}</TableCell>
      <TableCell style={{ width: '15%' }}>
        <Tag type={SCHOOL_RELIABILITY_COLOR(checked)}>
          {capitalizeFirstLetter(translate(checked ? 'reliable' : 'unreliable'))}
        </Tag>
      </TableCell>
      <TableCell style={{ width: '20%' }}>{external_id}</TableCell>

      <TableCell style={{ width: '25%' }}>{location1 || STRING_DEFAULT}</TableCell>

      <TableCell style={{ width: '10%' }}>
        {checked ? (
          <ActionButton
            icon="Close"
            description="mark_as_unreliable"
            onClick={() => handleReliableChange(false, row.id)}
          />
        ) : (
          <ActionButton
            icon="Success"
            description="mark_as_reliable"
            onClick={() => handleReliableChange(true, row.id)}
          />
        )}
      </TableCell>
    </TableRow>
  )
}

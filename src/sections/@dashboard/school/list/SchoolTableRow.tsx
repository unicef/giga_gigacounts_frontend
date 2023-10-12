import { DataTableRow, TableCell, TableRow, TextInput } from '@carbon/react'

import { TableRowProps } from '@carbon/react/lib/components/DataTable/TableRow'
import TableSelectRow, {
  TableSelectRowProps
} from '@carbon/react/lib/components/DataTable/TableSelectRow'
import { SchoolCell } from 'src/@types'
import { getOrderedFromCells } from 'src/utils/table'

type Props = {
  row: DataTableRow<(SchoolCell & { region: string })[]>
  rowProps: TableRowProps
  selectionProps: TableSelectRowProps
  setBudget: (external_id: string, newBudget: string) => void
  budget: number
}

export default function SchoolTableRow({
  row,
  rowProps,
  selectionProps,
  setBudget,
  budget
}: Props) {
  const [external_id, name, region] = getOrderedFromCells(
    ['external_id', 'name', 'region'],
    row.cells
  )

  const getBudgetLabel = () => (Number(budget) > 0 ? budget : '')

  return (
    <TableRow {...rowProps}>
      <TableSelectRow {...selectionProps} />
      <TableCell style={{ verticalAlign: 'middle', width: '10%' }}>{external_id}</TableCell>

      <TableCell style={{ verticalAlign: 'middle', width: '30%' }}>{name}</TableCell>
      <TableCell style={{ verticalAlign: 'middle', width: '10%' }}>{region}</TableCell>

      <TableCell style={{ verticalAlign: 'middle', width: '40%' }}>
        {selectionProps.checked ? (
          <TextInput
            id={`budget ${row.id}`}
            labelText=""
            invalid={Number(budget) <= 0 || Number.isNaN(Number(budget))}
            value={budget}
            onChange={(e) => {
              if (!Number.isNaN(Number(e.target.value))) setBudget(external_id, e.target.value)
            }}
          />
        ) : (
          getBudgetLabel()
        )}
      </TableCell>
    </TableRow>
  )
}

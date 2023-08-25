import { useEffect, useState } from 'react'

import { DataTableRow, TableCell, TableRow, TextInput } from '@carbon/react'

import { TableRowProps } from '@carbon/react/lib/components/DataTable/TableRow'
import TableSelectRow, {
  TableSelectRowProps
} from '@carbon/react/lib/components/DataTable/TableSelectRow'
import { getOrderedFromCells } from 'src/utils/table'

type Props = {
  row: DataTableRow
  selected: boolean
  rowProps: TableRowProps
  selectionProps: TableSelectRowProps
  onChangeBudget: (external_id: string, newBudget: string) => void
}

export default function SchoolTableRow({
  row,
  selected,
  rowProps,
  selectionProps,
  onChangeBudget
}: Props) {
  const [external_id, name, region, initialBudget] = getOrderedFromCells(
    ['external_id', 'name', 'region', 'budget'],
    row.cells
  )

  const [budget, setBudget] = useState(initialBudget ?? 0)

  useEffect(() => {
    setBudget(initialBudget)
  }, [initialBudget])

  const getBudgetLabel = () => (Number(budget) > 0 ? budget : '')

  return (
    <TableRow {...rowProps}>
      <TableSelectRow {...selectionProps} />
      <TableCell>{external_id}</TableCell>

      <TableCell>{name}</TableCell>
      <TableCell>{region}</TableCell>

      <TableCell>
        {selected ? (
          <TextInput
            id={`budget ${row.id}`}
            labelText=""
            invalid={Number(budget) <= 0 || Number.isNaN(Number(budget))}
            value={budget}
            onChange={(e) => {
              if (selected) setBudget(e.target.value)

              if (Number(e.target.value) > 0) onChangeBudget(external_id, e.target.value)
            }}
          />
        ) : (
          getBudgetLabel()
        )}
      </TableCell>
    </TableRow>
  )
}

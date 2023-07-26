import { useEffect, useState } from 'react'

import { TableCell, TableRow, TextInput } from '@carbon/react'

import { TableRowProps } from '@carbon/react/lib/components/DataTable/TableRow'
import TableSelectRow, {
  TableSelectRowProps
} from '@carbon/react/lib/components/DataTable/TableSelectRow'

type Props = {
  row: any
  selected: boolean
  rowProps: TableRowProps
  selectionProps: TableSelectRowProps
  onChangeBudget: (external_id: string, newBudget: string) => void
  onSelectRow: (row: any) => void
}

export default function SchoolTableRow({
  row,
  selected,
  rowProps,
  selectionProps,
  onSelectRow,
  onChangeBudget
}: Props) {
  const [external_id, name, initialBudget] = row.cells.map((c: { value: any }) => c.value)
  const [budget, setBudget] = useState(initialBudget)

  useEffect(() => {
    setBudget(initialBudget)
  }, [initialBudget])

  const getBudgetLabel = () => (Number(budget) > 0 ? budget : '')

  return (
    <TableRow {...rowProps}>
      <TableSelectRow
        {...selectionProps}
        checked={selected}
        onSelect={(e) => {
          selectionProps.onSelect(e)
          onSelectRow(row.id)
        }}
      />
      <TableCell>{external_id}</TableCell>

      <TableCell>{name}</TableCell>

      <TableCell>
        {selected ? (
          <TextInput
            id={`budget ${row.id}`}
            labelText=""
            invalid={Number(budget) <= 0 || !Number(budget)}
            type="number"
            value={budget}
            onChange={(e) => {
              if (selected) {
                setBudget(e.target.value)
              }
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

import { TableCell, TableRow } from '@carbon/react'

type Props = {
  cols?: number
  emptyRows: number
}

export default function TableEmptyRows({ emptyRows, cols }: Props) {
  const ret = new Array(emptyRows).fill(null)

  return (
    <>
      {ret.map((_, i) => (
        <TableRow key={i}>
          <TableCell colSpan={cols} />
        </TableRow>
      ))}
    </>
  )
}

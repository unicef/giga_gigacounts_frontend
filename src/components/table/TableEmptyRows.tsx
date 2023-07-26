import { TableCell, TableRow } from '@carbon/react'

type Props = {
  height?: number
  cols?: number
  emptyRows: number
}

export default function TableEmptyRows({ emptyRows, cols, height }: Props) {
  const ret = new Array(emptyRows).fill(null)

  return (
    <>
      {ret.map((_) => (
        <TableRow key={Math.random()}>
          <TableCell colSpan={cols} />
        </TableRow>
      ))}
    </>
  )
}

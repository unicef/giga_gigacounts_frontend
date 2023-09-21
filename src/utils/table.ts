import { DataTableCell } from '@carbon/react'

export function emptyRows(page: number, rowsPerPage: number, arrayLength: number) {
  return Math.max(0, page * rowsPerPage - arrayLength)
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

export function getComparator<Key extends keyof any>(
  order: 'asc' | 'desc',
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

export const getOrderedFromCells = <T>(keys: (keyof T | '_')[], cells: DataTableCell<T>[]) =>
  keys.map((key) => {
    const cell = cells.find((c) => c.info.header === key)
    if (!cell) return null
    return cell.value as any
  })

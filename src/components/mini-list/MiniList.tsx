import { Renew } from '@carbon/pictograms-react'
import {
  DataTableSkeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@carbon/react'
import { capitalizeFirstLetter, threeDots } from 'src/utils/strings'
import { Stack } from '../stack'
import { TableEmptyRows } from '../table'
import { Typography } from '../typography'

type Props<T extends { id: string }> = {
  data?: T[]
  headers: readonly { key: keyof T; label: string }[]
  noDataText: string
  transformData?: { [K in keyof T]?: (data: T[K]) => string }
}

export default function MiniList<T extends { id: string }>({
  data,
  headers,
  noDataText,
  transformData
}: Props<T>) {
  return data ? (
    <>
      {data.length > 0 ? (
        <Table size="xl">
          <TableHead>
            <TableRow style={{ position: 'sticky', top: 0 }}>
              {headers.map((h, index) => (
                <TableHeader key={`${String(h.key) + index}`}>
                  {capitalizeFirstLetter(h.label)}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((d) => (
              <TableRow key={d.id}>
                {headers.map((h) => (
                  <TableCell key={`${String(h.key) + d.id}`}>
                    {transformData && h.key in transformData
                      ? threeDots((transformData[h.key] as Function)(d[h.key]), 40)
                      : threeDots(String(d[h.key]), 40)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {data.length < 5 && (
              <TableEmptyRows emptyRows={5 - data.length} cols={headers.length} />
            )}
          </TableBody>
        </Table>
      ) : (
        <Stack
          alignItems="center"
          justifyContent="center"
          style={{ width: '100%', height: '100%' }}
        >
          <Renew width={32} height={32} />
          <Typography as="h3" variant="textTertiary">
            {capitalizeFirstLetter(noDataText)}
          </Typography>
        </Stack>
      )}
    </>
  ) : (
    <DataTableSkeleton
      className=""
      columnCount={headers.length}
      compact={false}
      headers={headers}
      showHeader={false}
      rowCount={6}
      showToolbar={false}
      zebra={false}
    />
  )
}

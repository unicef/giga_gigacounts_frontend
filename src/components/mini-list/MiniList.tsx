import {
  DataTableSkeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@carbon/react'
import { PICTOGRAMS } from 'src/constants'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter, threeDots } from 'src/utils/strings'
import { Stack } from '../stack'
import { TableEmptyRows } from '../table'
import { Typography } from '../typography'

type Props<T extends { id: string }> = {
  data?: T[]
  headers: readonly { key: keyof T & string; header: string }[]
  noDataText: string
  transformData?: { [K in keyof T]?: (data: T[K]) => string }
  maxChar?: number
}

export default function MiniList<T extends { id: string }>({
  data,
  headers,
  noDataText,
  transformData,
  maxChar = 40
}: Props<T>) {
  const { spacing } = useTheme()
  return data ? (
    <>
      {data.length > 0 ? (
        <Table size="xl">
          <TableHead>
            <TableRow style={{ position: 'sticky', top: 0 }}>
              {headers.map((h) => (
                <TableHeader key={h.key}>{capitalizeFirstLetter(h.header)}</TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((d) => (
              <TableRow key={d.id}>
                {headers.map((h) => (
                  <TableCell
                    style={{ width: `${100 / headers.length}%` }}
                    key={`${String(h.key)}:${d.id}`}
                  >
                    {transformData && h.key in transformData
                      ? threeDots((transformData[h.key] as Function)(d[h.key]), maxChar)
                      : threeDots(String(d[h.key]), maxChar)}
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
          gap={spacing.lg}
        >
          <PICTOGRAMS.Renew width={32} height={32} />
          <Typography weight={300} as="p" size={28} variant="textTertiary">
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
      headers={headers.map((h) => ({ ...h, header: capitalizeFirstLetter(h.header) }))}
      showHeader={false}
      rowCount={6}
      showToolbar={false}
      zebra={false}
    />
  )
}

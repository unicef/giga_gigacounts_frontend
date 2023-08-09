import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListRow,
  StructuredListCell,
  StructuredListBody,
  StructuredListSkeleton
} from '@carbon/react'
import { capitalizeFirstLetter } from 'src/utils/strings'
import { Typography } from '../typography'

type Props<T extends { id: string }> = {
  data?: T[]
  headers: readonly { key: keyof T; label: string }[]
  noDataText: string
}

export default function MiniList<T extends { id: string }>({
  data,
  headers,
  noDataText
}: Props<T>) {
  return data ? (
    <>
      {data.length > 0 ? (
        <StructuredListWrapper isCondensed isFlush>
          <StructuredListHead>
            <StructuredListRow head>
              {headers.map((h, index) => (
                <StructuredListCell index={index} head key={`${String(h.key) + index}`}>
                  {capitalizeFirstLetter(h.label)}
                </StructuredListCell>
              ))}
            </StructuredListRow>
          </StructuredListHead>
          <StructuredListBody>
            {data.map((d) => (
              <StructuredListRow>
                {headers.map((h) => (
                  <StructuredListCell key={`${String(h.key) + d.id}`}>
                    {d[h.key]}
                  </StructuredListCell>
                ))}
              </StructuredListRow>
            ))}
          </StructuredListBody>
        </StructuredListWrapper>
      ) : (
        <Typography>{capitalizeFirstLetter(noDataText)}</Typography>
      )}
    </>
  ) : (
    <StructuredListSkeleton />
  )
}

import { divideIntoChunks } from 'src/utils/arrays'
import { Stack } from '../stack'

type Props<T, U extends JSX.IntrinsicAttributes> = {
  items: T[]
  itemsPerRow: number
  theme?: 'white' | 'g90'
  ItemComponent: (props: U, children?: React.ReactNode) => JSX.Element
  getItemComponentProps: (item: T) => U
  noItemsComponent?: React.ReactNode
  rowGap?: number
  columnGap?: number
}

export default function List<T, U extends JSX.IntrinsicAttributes>({
  items,
  itemsPerRow,
  ItemComponent,
  getItemComponentProps,
  noItemsComponent,
  rowGap = 0,
  columnGap = 0
}: Props<T, U>) {
  const dividedItems = divideIntoChunks(items, itemsPerRow)

  return (
    <>
      {items.length > 0 ? (
        <Stack orientation="vertical" gap={rowGap}>
          {dividedItems.map((array, i) => (
            <Stack key={i} orientation="horizontal" gap={columnGap}>
              {array.map((s, j) => (
                <ItemComponent key={`${i}:${j}`} {...getItemComponentProps(s)} />
              ))}
            </Stack>
          ))}
        </Stack>
      ) : (
        noItemsComponent ?? ''
      )}
    </>
  )
}

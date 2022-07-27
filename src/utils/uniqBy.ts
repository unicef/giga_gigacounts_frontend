import { prop } from './prop'

export type ValueIteratee<T, O> = (element: T, index?: number, collection?: T[]) => O

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function uniqBy<T, Path extends string, IterateeReturnT extends any>(
  collection: T[],
  iteratee: Path | ValueIteratee<T, IterateeReturnT>,
): T[] {
  const dedupe = new Set()

  const extractValue = typeof iteratee === 'string' ? prop(iteratee) : iteratee

  return collection.filter((element, index, col) => {
    const value = extractValue(element, index, col)
    if (dedupe.has(value)) {
      return false
    }
    dedupe.add(value)
    return true
  })
}

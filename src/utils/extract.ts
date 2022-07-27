import { prop } from './prop'

export type ValueIteratee<T, O> = (
  element: T,
  index?: number,
  collection?: T[],
) => O

export type Iteratee<
  In extends unknown = unknown,
  Out extends unknown = unknown
> = string | ValueIteratee<In, Out>

export function createExtractor<
  In extends unknown = unknown,
  Out extends unknown = unknown,
  Path extends string = string
>(iteratee: Path | ValueIteratee<In, Out>) {
  if (typeof iteratee === 'string') {
    return prop<In>(iteratee)
  }

  return iteratee
}

export function extract<
  In extends unknown = unknown,
  Out extends unknown = unknown
>(item: In, iteratee: Iteratee<In, Out>) {
  const extractor = createExtractor(iteratee)

  return extractor(item)
}

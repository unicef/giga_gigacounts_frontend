import { uniqBy } from './uniqBy'

export function uniq<T>(collection: T[]): T[] {
  return uniqBy(collection, (e) => e)
}

import { ValueIteratee } from './extract'
import { GetFieldType } from './get'
import { prop } from './prop'

export function map<T, Path extends string>(collection: T[], iteratee: Path): GetFieldType<T, Path>[]
export function map<T, IterateeReturnT extends any>(
  collection: T[],
  iteratee: ValueIteratee<T, IterateeReturnT>,
): IterateeReturnT[]
export function map<T, Path extends string, IterateeReturnT extends any>(
  collection: T[],
  iteratee: Path | ValueIteratee<T, IterateeReturnT>,
) {
  const extractValue = typeof iteratee === 'string' ? prop<T>(iteratee) : iteratee

  return collection.map((element, index, col) => extractValue(element, index, col))
}

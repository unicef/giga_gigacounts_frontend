export function clean<T, A = Exclude<T, null | undefined>>(collection: T[]): A[]
export function clean<T, A = Partial<T>>(obj: T): A
export function clean<T>(obj: T | (T | null | undefined)[]) {
  if (Array.isArray(obj)) {
    return obj.filter((e) => e !== null && e !== undefined) as T[]
  }

  return Object.fromEntries(Object.entries(obj).filter(([key, value]) => value !== undefined && value !== null))
}

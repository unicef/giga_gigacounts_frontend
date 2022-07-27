import { get } from './get'

export function prop<T>(path: string) {
  return (object: T) => get(object, path)
}

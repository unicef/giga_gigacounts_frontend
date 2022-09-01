import { get } from './get'

export const compare = <T, K extends keyof T & string>(obj1: T, obj2: T, props: K[]) =>
  props.every((prop) => get(obj1, prop) === get(obj2, prop))

import { findBy } from './findBy'

export const find = <T extends { id: string; code?: string }>(array: T[], id: string): T | undefined =>
  findBy(array, 'id', id)

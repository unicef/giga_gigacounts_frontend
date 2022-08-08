import { findBy } from './findBy'

export const find = <T extends { id: string }>(array: T[], id: string): T | undefined => findBy(array, 'id', id)

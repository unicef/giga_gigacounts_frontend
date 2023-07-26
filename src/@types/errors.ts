/* eslint-disable max-classes-per-file */
import { Translation } from 'src/locales'
import { IDraft } from './general'

export class ParseError extends Error {
  row: number

  constructor(message: Translation, row: number) {
    super(message)
    this.row = row
  }
}

export class ContractCreationError extends Error {
  field: keyof IDraft

  rule: string

  constructor(message: Translation, field: keyof IDraft, rule: string) {
    super(message)
    this.field = field
    this.rule = rule
  }
}

/* eslint-disable max-classes-per-file */
import { IDraft } from './general'
import { Translation } from './translations'

export class CsvParseError extends Error {
  row: number

  constructor(message: Translation, row: number) {
    super(message)
    this.row = row
    this.name = 'CsvParseError'
  }
}

export class ContractCreationError extends Error {
  field: keyof IDraft

  rule: string

  constructor(message: Translation, field: keyof IDraft, rule: string) {
    super(message)
    this.field = field
    this.rule = rule
    this.name = 'ContractCreationError'
  }
}

export class Error500 extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'Error500'
  }

  static redirect(redirectFn: (path: string) => void) {
    redirectFn('/500')
  }
}
export class Error404 extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'Error404'
  }

  static redirect(redirectFn: (path: string) => void) {
    redirectFn('/404')
  }
}
export class Error403 extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'Error403'
  }

  static redirect(redirectFn: (path: string) => void) {
    redirectFn('/403')
  }
}

export class GenericServerError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'GenericServerError'
  }

  static redirect(redirectFn: (path: string) => void) {
    redirectFn('/error/generic')
  }
}

export class StatusParseError extends Error {
  value: unknown

  constructor(value: unknown, message?: string) {
    super(`${value} ${message}`)
    this.value = value
    this.name = 'StatusParseError'
  }
}

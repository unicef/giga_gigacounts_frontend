import { Error403, Error404, Error500, GenericServerError } from 'src/@types'

export const redirectOnError = (navigate: (path: string) => void, err: any) => {
  if (err instanceof Error500) Error500.redirect(navigate)
  if (err instanceof Error404) Error404.redirect(navigate)
  if (err instanceof Error403) Error403.redirect(navigate)
  GenericServerError.redirect(navigate)
}

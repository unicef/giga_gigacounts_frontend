import { Error403, Error404, Error500, GenericServerError } from 'src/@types'

export const redirectOnError = (navigate: (path: string) => void, err: any) => {
  if (err instanceof Error500) return Error500.redirect(navigate)
  if (err instanceof Error404) return Error404.redirect(navigate)
  if (err instanceof Error403) return Error403.redirect(navigate)
  return GenericServerError.redirect(navigate)
}

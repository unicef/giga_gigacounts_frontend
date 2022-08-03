export const findBy = <T extends Record<string, any>>(array: T[], prop: string, value: string): T | undefined => {
  return array.find((item) => item[prop] === value)
}

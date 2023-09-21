import { useSearchParams } from 'react-router-dom'

export const useCustomSearchParams = <T extends { [K: string]: string }>(defaults: T) => {
  const [searchParams, setSearchParams] = useSearchParams(defaults)

  const generateParamSetter = (key: keyof T) => (value: string) =>
    setSearchParams(
      (prev) => {
        prev.set(key as string, value)
        return prev
      },
      { replace: true }
    )

  const values = Object.fromEntries(
    Object.entries(defaults).map(([key, defaultValue]) => [
      key,
      searchParams.get(key) ?? defaultValue
    ])
  )

  return [values as { [K in keyof T]: string }, generateParamSetter] as const
}

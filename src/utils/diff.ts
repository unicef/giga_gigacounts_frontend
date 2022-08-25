export const diff = <T, U>(origin: T, other: U) => {
  return Object.entries(origin).reduce((acc, [key, value]) => {
    if (value === other[key as keyof U]) {
      return acc
    }

    return { ...acc, [key]: value }
  }, {} as Partial<T>)
}

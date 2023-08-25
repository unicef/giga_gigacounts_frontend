export const divideIntoChunks = <T extends any[]>(array: T, chunkSize: number) =>
  array.reduce(
    (prev, _, i, arr) => (i % chunkSize ? prev : prev.concat([arr.slice(i, i + chunkSize)])),
    []
  ) as T[]

export const resolvePromises = <T, U>(
  array: T[],
  toPromise: (item: T) => Promise<U>,
  then: (result: U) => void,
  catchErr: (error: any) => void
) => {
  if (array.length === 0) return
  if (array.length > 0) {
    Promise.allSettled(array.map(toPromise)).then((result) =>
      result.forEach((r) => {
        if (r.status === 'fulfilled') then(r.value)
        if (r.status === 'rejected') catchErr(r.reason)
      })
    )
  }
}

export const removeDuplicates = <T extends any[]>(arr: T): T => Array.from(new Set(arr)) as T

export const divideIntoChunks = <T extends any[]>(array: T, chunkSize: number) =>
  array.reduce(
    (prev, _, i, arr) => (i % chunkSize ? prev : prev.concat([arr.slice(i, i + chunkSize)])),
    []
  ) as T[]

export const resolvePromises = <T, U>(
  array: T[],
  toPromise: (item: T) => Promise<U>,
  then: (result: U, value?: T) => void,
  catchErr: (error: any, value?: T) => void
) => {
  if (array.length === 0) return
  if (array.length > 0) {
    Promise.allSettled(array.map(toPromise)).then((result) =>
      result.forEach((r, index) => {
        if (r.status === 'fulfilled') then(r.value, array.at(index))
        if (r.status === 'rejected') catchErr(r.reason, array.at(index))
      })
    )
  }
}

export const removeDuplicates = <T extends any[]>(arr: T): T => Array.from(new Set(arr)) as T

export const generateRange = (start: number, end: number) =>
  Array(end - start + 1)
    .fill(null)
    .map((_, idx) => start + idx)

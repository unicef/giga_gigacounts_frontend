export const divideIntoChunks = <T extends any[]>(array: T, chunkSize: number) =>
  array.reduce(
    (prev, _, i, arr) => (i % chunkSize ? prev : prev.concat([arr.slice(i, i + chunkSize)])),
    []
  ) as T[]

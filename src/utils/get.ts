// eslint-disable-next-line
export type GetFieldType<Obj, Path> = Obj extends { [s: string]: any }
  ? Path extends `${infer Left}.${infer Right}`
    ? Left extends keyof Obj
      ? GetFieldType<Exclude<Obj[Left], undefined>, Right> | Extract<Obj[Left], undefined>
      : undefined
    : Path extends keyof Obj
    ? Obj[Path]
    : undefined
  : unknown

export function get<Data, Path extends string, Default = GetFieldType<Data, Path>>(
  object: Data,
  path: Path,
  defaultValue?: Default,
): GetFieldType<Data, Path> | Default {
  const value = path.split('.').reduce<GetFieldType<Data, Path>>(
    // eslint-disable-next-line
    (val, key) => (val as any)?.[key],
    // eslint-disable-next-line
    object as any,
  )

  return value !== undefined ? value : (defaultValue as Default)
}

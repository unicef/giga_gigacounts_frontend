export interface ChildrenProps {
  children?: React.ReactNode
}

export interface ClassNameProps {
  className?: string
}

export type NonEmptyArray<T> = {
  0: T
} & Array<T>

export type MinMax<T> = { min: T; max: T }

export type SortableKeys<T extends {}> = Exclude<
  {
    [K in keyof T]: T[K] extends string | number ? K : never
  }[keyof T],
  undefined
>

export type Setter<T extends string> = (value: T) => void

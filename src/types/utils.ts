export interface ChildrenProps {
  children?: React.ReactNode
}

export interface ClassNameProps {
  className?: string
}

export type NonEmptyArray<T> = {
  0: T
} & Array<T>

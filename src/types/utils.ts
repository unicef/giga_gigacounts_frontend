export interface ChildrenProps {
  children?: React.ReactNode
}

export type NonEmptyArray<T> = {
  0: T
} & Array<T>

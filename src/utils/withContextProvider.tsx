import { ComponentType, FC } from 'react'

export const withContextProviders =
  <T extends {}>(...providers: ComponentType<any>[]) =>
  (Component: ComponentType<T>): FC<T> =>
  (props: T) =>
    providers.reduceRight((acc, Provider) => <Provider>{acc}</Provider>, <Component {...(props as any)} />)

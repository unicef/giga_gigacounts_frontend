export * from '@carbon/react'

declare module '@carbon/react' {
  declare function InlineLoading(props: any): JSX.Element
  declare function MenuItem(props: any): JSX.Element
  declare function Modal(props: any): JSX.Element
  declare function Pagination(props: any): JSX.Element
  declare function ProgressBar(props: any): JSX.Element
  declare function ProgressIndicator(props: any): JSX.Element
  declare function ProgressStep(props: any): JSX.Element

  export {
    InlineLoading,
    MenuItem,
    Modal,
    Pagination,
    ProgressBar,
    ProgressIndicator,
    ProgressStep
  }
}

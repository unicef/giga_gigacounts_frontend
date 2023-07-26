export type BreadcrumbsLinkProps = {
  name?: string
  href?: string
  icon?: React.ReactElement
}

export interface CustomBreadcrumbsProps {
  moreLink?: string[]
  activeLast?: boolean
  action?: React.ReactNode
}

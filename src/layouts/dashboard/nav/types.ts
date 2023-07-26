import { CarbonIconType } from '@carbon/icons-react'
import { UserRoles } from 'src/constants/authorization'
import { Translation } from 'src/locales'

export type INavItem = {
  item: NavListProps
  depth: number
  open?: boolean
  active?: boolean
  isExternalLink?: boolean
}

export type NavItemProps = INavItem

export type NavListProps = {
  title: Translation
  badge?: JSX.Element
  path: string
  icon: CarbonIconType
  info?: React.ReactElement
  caption?: string
  disabled?: boolean
  roles?: readonly UserRoles[]
  children?: any
  state?: Record<string, any>
}

export interface NavSectionProps {
  data: {
    subheader: string
    items: NavListProps[]
  }[]
}

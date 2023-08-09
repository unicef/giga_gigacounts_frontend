import React from 'react'
import { Icon, Translation, UserRoles } from 'src/@types'

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
  icon: Icon
  info?: React.ReactElement
  caption?: string
  disabled?: boolean
  roles?: readonly UserRoles[]
  children?: React.ReactNode
  state?: Record<string, any>
}

export interface NavSectionProps {
  data: {
    subheader: string
    items: NavListProps[]
  }[]
}

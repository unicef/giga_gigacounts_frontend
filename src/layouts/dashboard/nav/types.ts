import React from 'react'
import { Icon, Translation, UserRoles } from 'src/@types'
import { UserSettings } from 'src/constants'

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
  icon: Icon
  info?: React.ReactElement
  caption?: string
  disabled?: boolean
  permissions?: readonly string[]
  settings?: readonly { name: UserSettings; value: any }[]
  roles?: readonly UserRoles[]
  children?: React.ReactNode
  state?: Record<string, any>
} & ({ path: string } | { onClick: () => void })

export interface NavSectionProps {
  data: {
    subheader: string
    items: NavListProps[]
  }[]
}

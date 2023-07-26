import {
  // @ts-ignore
  BreadcrumbItem
} from '@carbon/react'
import { Link as RouterLink } from 'react-router-dom'
import { useTheme } from 'src/theme'
import { BreadcrumbsLinkProps } from './types'

type Props = {
  link: BreadcrumbsLinkProps
  activeLast?: boolean
  disabled: boolean
}

export default function BreadcrumbsLink({ link, activeLast, disabled }: Props) {
  const { name, href, icon } = link
  const { palette } = useTheme()

  const styles = {
    alignItems: 'center',
    color: palette.primary.main,
    display: 'inline-flex',
    ...(disabled &&
      !activeLast && {
        cursor: 'default',
        color: palette.text.disabled
      })
  }

  if (href) {
    return (
      <BreadcrumbItem>
        <RouterLink style={styles} to={href}>
          {icon} {name}
        </RouterLink>
      </BreadcrumbItem>
    )
  }

  return (
    <div style={styles}>
      {icon} {name}
    </div>
  )
}

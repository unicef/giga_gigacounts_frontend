import { NavListProps } from 'src/layouts/dashboard/nav/types'
// @ts-ignore
import { SideNavLink } from '@carbon/react'
import { useNavigate } from 'react-router'
import { Typography } from 'src/components/typography'
import useActiveLink from 'src/hooks/useActiveLink'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'
import NavIcon from './NavIcon'

type NavListRootProps = {
  data: NavListProps
  tabIndex: number
  isActive?: boolean
}

export default function NavItem({ data, tabIndex, isActive = true }: NavListRootProps) {
  const navigate = useNavigate()
  const { translate } = useLocales()
  const { active } = useActiveLink(data.path)
  const { spacing } = useTheme('g90')

  return (
    <SideNavLink
      tabIndex={tabIndex}
      isActive={isActive && active}
      large
      renderIcon={() => <NavIcon CarbonIcon={data.icon} isActive={isActive && active} />}
      onClick={() => navigate(data.path, { state: data.state })}
    >
      <Typography as="span" variant={isActive && active ? 'primary' : 'textSecondary'}>
        {capitalizeFirstLetter(translate(data.title))}
      </Typography>
      <div
        style={{
          width: 24,
          height: 24,
          position: 'absolute',
          right: spacing.md,
          bottom: '25%'
        }}
      >
        {data.badge}
      </div>
    </SideNavLink>
  )
}

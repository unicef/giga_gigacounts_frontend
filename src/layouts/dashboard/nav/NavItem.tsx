import { SideNavLink } from '@carbon/react'
import { useNavigate } from 'react-router'
import { Typography } from 'src/components/typography'
import useActiveLink from 'src/hooks/useActiveLink'
import { NavListProps } from 'src/layouts/dashboard/nav/types'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'
import NavIcon from './NavIcon'

type NavListRootProps = {
  data: NavListProps
  isActive?: boolean
  id?: string
}

export default function NavItem({ data, isActive = true, id }: NavListRootProps) {
  const navigate = useNavigate()
  const { translate } = useLocales()
  const { active } = useActiveLink('path' in data ? data.path : '')
  const { spacing } = useTheme()

  return (
    <SideNavLink
      id={id}
      isActive={isActive && active}
      large
      renderIcon={() => <NavIcon icon={data.icon} isActive={isActive && active} />}
      onClick={() => ('path' in data ? navigate(data.path, { state: data.state }) : data.onClick)}
    >
      <Typography as="span" variant={isActive && active ? 'default' : 'textTertiary'}>
        {capitalizeFirstLetter(translate(data.title))}
      </Typography>
      {data.badge && (
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
      )}
    </SideNavLink>
  )
}

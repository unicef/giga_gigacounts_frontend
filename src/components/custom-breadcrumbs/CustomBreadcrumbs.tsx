import { Breadcrumb, Link } from '@carbon/react'
import { useParams } from 'react-router'
import { useRoutesCustom } from 'src/hooks/useRoutesCustom'
import { useTheme } from 'src/theme'
import { Stack } from 'src/components/stack'
import LinkItem from './LinkItem'
import { CustomBreadcrumbsProps } from './types'

export default function CustomBreadcrumbs({
  action,
  moreLink,
  activeLast,
  ...other
}: CustomBreadcrumbsProps) {
  const { links } = useRoutesCustom()
  const params = useParams()
  const { spacing } = useTheme()

  const paramsLinks = Object.values(params).map((p) => ({ name: p }))
  const allLinks = [...links, ...paramsLinks]

  return (
    <div style={{ paddingBlock: spacing.md }}>
      <Stack orientation="horizontal">
        <div style={{ flexGrow: 1 }}>
          {allLinks.length && (
            <Breadcrumb noTrailingSlash {...other}>
              {allLinks.map((link) => (
                <LinkItem
                  key={link.name || ''}
                  link={link}
                  activeLast={activeLast}
                  disabled={!('href' in link)}
                />
              ))}
            </Breadcrumb>
          )}
        </div>

        {action && <div style={{ flexShrink: 0 }}> {action} </div>}
      </Stack>

      {moreLink && (
        <div style={{ marginTop: spacing.xxs }}>
          {moreLink.map((href) => (
            <Link key={href} href={href} target="_blank" rel="noopener">
              {href}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

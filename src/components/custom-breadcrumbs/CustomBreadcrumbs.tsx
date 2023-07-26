import {
  // @ts-ignore
  Breadcrumb,
  Link
} from '@carbon/react'
import { useRoutesCustom } from 'src/hooks/useRoutesCustom'
import { useTheme } from 'src/theme'
import { Stack } from '../stack'
import LinkItem from './LinkItem'
import { CustomBreadcrumbsProps } from './types'

export default function CustomBreadcrumbs({
  action,
  moreLink,
  activeLast,
  ...other
}: CustomBreadcrumbsProps) {
  const { links } = useRoutesCustom()
  const lastLink = links[links.length - 1]?.name ?? ''
  const { spacing } = useTheme()

  return (
    <div style={{ paddingBlock: spacing.md }}>
      <Stack orientation="horizontal">
        <div style={{ flexGrow: 1 }}>
          {links.length && (
            <Breadcrumb {...other}>
              {links.map((link) => (
                <LinkItem
                  key={link.name || ''}
                  link={link}
                  activeLast={activeLast}
                  disabled={link.name === lastLink}
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

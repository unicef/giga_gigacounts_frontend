import { Tag, Theme } from '@carbon/react'
import { IconProps, Icon as IconType, TagColor } from 'src/@types'
import { Stack } from 'src/components/stack'
import { Typography } from 'src/components/typography'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'

type Item = { Icon?: IconType; label?: string; iconProps?: IconProps; title?: string }

type BannerProps = {
  title: string
  label?: { text: string; color: TagColor }
  subtitle?: string
  details?: Item[]
  topThreeDetails?: [Item, Item, Item] | [Item, Item] | [Item]
  variant?: 'sm' | 'lg'
}

export default function Banner({
  title,
  details,
  subtitle,
  topThreeDetails,
  label,
  variant = 'lg'
}: BannerProps) {
  const { spacing } = useTheme('g90')
  const isSmall = variant === 'sm'
  return (
    <Theme theme="g90">
      <Stack
        style={{
          padding: spacing.md,
          paddingBottom: isSmall ? spacing.md : spacing.lg
        }}
      >
        <Stack orientation="horizontal" alignItems="center" justifyContent="space-between">
          <Stack orientation="vertical" justifyContent="flex-start" alignItems="flex-start">
            <Stack
              orientation="horizontal"
              alignItems="center"
              justifyContent="center"
              gap={spacing.md}
            >
              <Typography as={isSmall ? 'h4' : 'h2'} variant="default">
                {capitalizeFirstLetter(title)}
              </Typography>
              {label && <Tag type={label.color}>{label.text}</Tag>}
            </Stack>
            {subtitle && (
              <Typography as={isSmall ? 'h6' : 'h5'} variant="default">
                {capitalizeFirstLetter(subtitle)}
              </Typography>
            )}
          </Stack>
          {topThreeDetails && (
            <Stack orientation="horizontal" alignItems="center" justifyContent="flex-start">
              {topThreeDetails.slice(0, 3).map((det, i) => (
                <DetailsItem
                  key={(det.label ?? '') + i}
                  Icon={det.Icon}
                  label={det.label}
                  title={det.title}
                  iconProps={det.iconProps}
                />
              ))}
            </Stack>
          )}
        </Stack>

        {details && (
          <Stack
            orientation="horizontal"
            alignItems="center"
            justifyContent="flex-start"
            style={{
              width: '100%',
              padding: spacing.xxs,
              marginTop: spacing.md
            }}
          >
            {details.map((det, i) => (
              <DetailsItem
                key={(det.label ?? '') + i}
                Icon={det.Icon}
                label={det.label}
                title={det.title}
                iconProps={det.iconProps}
              />
            ))}
          </Stack>
        )}
      </Stack>
    </Theme>
  )
}

function DetailsItem({ label, Icon, title, iconProps }: Item) {
  const { spacing, palette } = useTheme()
  return (
    <Stack
      orientation="vertical"
      alignItems="flex-start"
      justifyContent="flex-start"
      style={{ padding: spacing.xxs, marginRight: spacing.lg }}
    >
      {title && (
        <Typography as="h5" variant="textSecondary">
          {capitalizeFirstLetter(title)}
        </Typography>
      )}
      <Stack orientation="horizontal" justifyContent="center" alignItems="center">
        {Icon && (
          <div
            style={{
              backgroundColor: palette.grey[750],
              height: 40,
              width: 40,
              padding: spacing.xs,
              marginRight: spacing.xs
            }}
          >
            <Icon size={24} {...iconProps} />
          </div>
        )}
        {label && <Typography>{label}</Typography>}
      </Stack>
    </Stack>
  )
}

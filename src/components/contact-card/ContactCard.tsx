import { Theme } from '@carbon/react'
import { CSSProperties } from 'react'
import { useTheme } from 'src/theme'
import { Stack } from 'src/components/stack'
import { Typography } from 'src/components/typography'
import { IRole } from 'src/@types'
import { threeDots } from 'src/utils/strings'

type Props = {
  name: string
  value: IRole
  width?: number
  style?: CSSProperties
  theme?: 'g90' | 'white'
}

export default function ContractCard({
  width,
  name,
  value,
  style,
  theme = 'white'
}: Props & JSX.IntrinsicAttributes) {
  const { spacing } = useTheme(theme)

  return (
    <Theme theme={theme}>
      <Stack style={{ width, padding: spacing.md, ...style }} gap={spacing.md}>
        <Typography as="h4">{name}</Typography>
        <div>
          <Typography as="p" style={{ fontSize: '14px' }}>
            {value && threeDots(value.name, 25)}
          </Typography>
        </div>
      </Stack>
    </Theme>
  )
}

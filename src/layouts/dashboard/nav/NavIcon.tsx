import { CarbonIconType } from '@carbon/icons-react'
import { Stack } from 'src/components/stack'
import { useTheme } from 'src/theme'

export default function NavIcon({
  CarbonIcon,
  isActive
}: {
  CarbonIcon: CarbonIconType
  isActive: boolean
}) {
  const { spacing, palette } = useTheme()

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      style={{
        color: isActive ? palette.primary.main : palette.text.primary,
        width: 28,
        height: 28,
        backgroundColor: palette.grey[300],
        borderRadius: spacing.xxs,
        padding: spacing.xxs
      }}
    >
      <CarbonIcon size={24} />
    </Stack>
  )
}

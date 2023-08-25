import { Icon } from 'src/@types'
import { Stack } from 'src/components/stack'
import { useTheme } from 'src/theme'

export default function NavIcon({ CarbonIcon, isActive }: { CarbonIcon: Icon; isActive: boolean }) {
  const { spacing, palette } = useTheme()

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      style={{
        color: isActive ? palette.text.primary : palette.text.tertiary,
        width: 28,
        height: 28,
        borderRadius: spacing.xxs,
        padding: spacing.xxs
      }}
    >
      <CarbonIcon size={24} />
    </Stack>
  )
}

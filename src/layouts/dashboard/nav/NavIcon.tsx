import { type Icon as IconType } from 'src/@types'
import { Stack } from 'src/components/stack'
import { ICONS } from 'src/constants'
import { useTheme } from 'src/theme'

export default function NavIcon({ icon, isActive }: { icon: IconType; isActive: boolean }) {
  const { spacing, palette } = useTheme()
  const Icon = ICONS[icon]
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
      <Icon size={24} />
    </Stack>
  )
}

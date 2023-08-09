import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'
import { Stack } from '../stack'
import { Typography } from '../typography'

type Props = {
  name: string
  lastName: string
}
export default function UserInitials({ name, lastName }: Props) {
  const { palette, spacing } = useTheme()

  const nameInitial = capitalizeFirstLetter(name[0] ?? '')
  const lastNameInitial = capitalizeFirstLetter(lastName[0] ?? '')

  return (
    <Stack
      style={{
        borderRadius: spacing.xs,
        backgroundColor: palette.background.neutral,
        padding: spacing.xs
      }}
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="textSecondary">
        {nameInitial}
        {lastNameInitial}
      </Typography>
    </Stack>
  )
}

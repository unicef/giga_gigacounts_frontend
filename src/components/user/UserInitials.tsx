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

  const nameInitial = name === '' ? '' : capitalizeFirstLetter(name[0])
  const lastNameInitial = lastName === '' ? '' : capitalizeFirstLetter(lastName[0])

  return (
    <Stack
      style={{
        borderRadius: spacing.xs,
        backgroundColor: palette.grey[525],
        padding: spacing.xs,
        width: spacing.xl + spacing.xs,
        height: spacing.xl + spacing.xs
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

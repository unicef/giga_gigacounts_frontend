import { IExternalUser, IUser } from 'src/@types'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { ContactCard } from '../contact-card'
import { List } from '../list'
import { Typography } from '../typography'

export default function UserList({
  users,
  paymentRecieverId
}: {
  users: (IUser | IExternalUser)[]
  paymentRecieverId?: number | null
}) {
  const { spacing, palette } = useTheme('white')
  const { translate } = useLocales()
  return (
    <List
      columnGap={spacing.sm}
      rowGap={spacing.sm}
      ItemComponent={ContactCard}
      getItemComponentProps={(item) => ({
        width: 210,
        contact: item,
        style: {
          backgroundColor: palette.background.neutral
        },
        paymentReciever:
          'id' in item && Boolean(paymentRecieverId) && item.id === String(paymentRecieverId)
      })}
      items={users}
      itemsPerRow={3}
      noItemsComponent={
        <Typography as="span" variant="disabled">
          {translate('no_collaborators_added')}
        </Typography>
      }
    />
  )
}

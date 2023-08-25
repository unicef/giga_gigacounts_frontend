import { IUser } from 'src/@types'
import { useTheme } from 'src/theme'
import { useLocales } from 'src/locales'
import { ContactCard } from '../contact-card'
import { Typography } from '../typography'
import { List } from '../list'

export default function UserList({ users }: { users: IUser[] }) {
  const { spacing, palette } = useTheme('white')
  const { translate } = useLocales()
  return (
    <List
      columnGap={spacing.sm}
      rowGap={spacing.sm}
      ItemComponent={ContactCard}
      getItemComponentProps={(item) => ({
        width: 200,
        name: item.name,
        value: item.role,
        style: { backgroundColor: palette.background.neutral }
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

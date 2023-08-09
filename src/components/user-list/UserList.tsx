import { Tag } from '@carbon/react'
import { IUser } from 'src/@types'
import { Stack } from 'src/components/stack'

type Props = {
  users: IUser[]
  onDelete: (id: string) => void
}
export default function UserList({ users, onDelete }: Props) {
  return (
    <Stack orientation="horizontal">
      {users.map((u) => (
        <Tag key={u.id} filter type="blue" onClose={() => onDelete(u.id)}>
          {u.name}
        </Tag>
      ))}
    </Stack>
  )
}

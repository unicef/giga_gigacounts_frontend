// @ts-ignore
import { Tag } from '@carbon/react'
import { ContactPersonForm } from 'src/@types'
import { Stack } from '../stack'

type Props = {
  users: ContactPersonForm[]
  onDelete: (email: string) => void
}
export default function UserList({ users, onDelete }: Props) {
  return (
    <Stack orientation="horizontal">
      {users.map((u) => (
        <Tag key={u.email} filter type="blue" onClose={() => onDelete(u.email)}>
          {u.name}
        </Tag>
      ))}
    </Stack>
  )
}

import { Tag } from '@carbon/react'
import { Stack } from 'src/components/stack'

type Props = {
  users: { name: string; email: string }[]
  onDelete: (email: string) => void
}
export default function UserChipList({ users, onDelete }: Props) {
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

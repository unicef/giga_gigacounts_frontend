import { Tag } from '@carbon/react'
import { Stack } from 'src/components/stack'

type Props<T extends { name: string; email: string }> = {
  users: T[]
  onDelete: (u: T) => void
}
export default function UserChipList<T extends { name: string; email: string }>({
  users,
  onDelete
}: Props<T>) {
  return (
    <Stack orientation="horizontal">
      {users.map((u) => (
        <Tag key={u.email} filter type="blue" onClose={() => onDelete(u)}>
          {u.name}
        </Tag>
      ))}
    </Stack>
  )
}

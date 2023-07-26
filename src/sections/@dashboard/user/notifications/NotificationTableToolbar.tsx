import { TableToolbarSearch } from '@carbon/react'
import { Dispatch, SetStateAction } from 'react'

type Props = {
  setFilterSearch: Dispatch<SetStateAction<string>>
  setPage: Dispatch<SetStateAction<number>>
}

export default function NotificationsTableToolbar({ setPage, setFilterSearch }: Props) {
  const handleFilterName = (value: string) => {
    setPage(1)
    setFilterSearch(value)
  }

  return <TableToolbarSearch onChange={(e: any) => handleFilterName(e.target.value)} persistent />
}

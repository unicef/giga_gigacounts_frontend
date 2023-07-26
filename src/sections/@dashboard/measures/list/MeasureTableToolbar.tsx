import { TableToolbarSearch } from '@carbon/react'
import { Dispatch, SetStateAction } from 'react'

type Props = {
  setFilterSearch: Dispatch<SetStateAction<string>>
  setPage: Dispatch<SetStateAction<number>>
}

export default function MeasureTableToolbar({ setPage, setFilterSearch }: Props) {
  const handleFilterSearch = (value: string) => {
    setPage(1)
    setFilterSearch(value)
  }

  /*
  const handleResetFilter = () => {
    setPage(1)
    setFilterSearch('')
  }
  */

  return <TableToolbarSearch onChange={(e: any) => handleFilterSearch(e.target.value)} persistent />
}

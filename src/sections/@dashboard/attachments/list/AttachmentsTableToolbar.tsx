import { TableToolbarSearch } from '@carbon/react'
import { Dispatch, SetStateAction } from 'react'
import { Setter } from 'src/@types'
import { useLocales } from 'src/locales'
import { capitalizeFirstLetter } from 'src/utils/strings'

type Props = {
  setFilterSearch: Setter<string>
  filterSearch: string
  setPage: Dispatch<SetStateAction<number>>
}

export default function AttachmentsTableToolbar({ setPage, setFilterSearch, filterSearch }: Props) {
  const { translate } = useLocales()
  const handleFilterSearch = (value: string) => {
    setPage(1)
    setFilterSearch(value)
  }

  return (
    <TableToolbarSearch
      // @ts-ignore
      value={filterSearch}
      persistent
      placeholder={capitalizeFirstLetter(translate('search'))}
      onChange={(e: any) => handleFilterSearch(e.target.value)}
    />
  )
}

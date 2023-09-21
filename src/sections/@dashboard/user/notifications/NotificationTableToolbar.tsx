import { TableToolbarSearch } from '@carbon/react'
import { Dispatch, SetStateAction } from 'react'
import { useLocales } from 'src/locales'
import { capitalizeFirstLetter } from 'src/utils/strings'

type Props = {
  setFilterSearch: Dispatch<SetStateAction<string>>
  setPage: Dispatch<SetStateAction<number>>
}

export default function NotificationsTableToolbar({ setPage, setFilterSearch }: Props) {
  const { translate } = useLocales()
  const handleFilterName = (value: string) => {
    setPage(1)
    setFilterSearch(value)
  }

  return (
    <TableToolbarSearch
      placeholder={capitalizeFirstLetter(translate('search'))}
      onChange={(e: any) => handleFilterName(e.target.value)}
      persistent
    />
  )
}

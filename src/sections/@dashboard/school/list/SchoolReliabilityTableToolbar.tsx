import { Filter } from '@carbon/icons-react'
import {
  Button,
  Popover,
  PopoverContent,
  // @ts-ignore
  Select,
  // @ts-ignore
  SelectItem,
  TableToolbarSearch
} from '@carbon/react'
import { Dispatch, SetStateAction } from 'react'
import { useModal } from 'src/hooks/useModal'
import { useLocales } from 'src/locales'
import { capitalizeFirstLetter } from 'src/utils/strings'

type Props = {
  countryName: string
  setFilterSearch: Dispatch<SetStateAction<string>>
  setPage: Dispatch<SetStateAction<number>>
  setFilterCountry: (countryName: string) => void
  regionOptions: string[]
}

export default function SchoolReliabilityTableToolbar({
  setPage,
  setFilterSearch,
  setFilterCountry,
  countryName,
  regionOptions
}: Props) {
  const { translate } = useLocales()
  const popover = useModal()

  const handleFilterName = (value: string) => {
    setPage(1)
    setFilterSearch(value)
  }
  const handleFilterCountry = (country: string) => {
    setPage(1)
    setFilterCountry(country)
  }

  return (
    <>
      <TableToolbarSearch onChange={(e: any) => handleFilterName(e.target.value)} persistent />
      <Popover open={popover.value} isTabTip onRequestClose={popover.close} align="bottom-right">
        <Button
          kind="ghost"
          onClick={popover.toggle}
          renderIcon={Filter}
          tooltipPosition="bottom"
          tooltipAlignment="end"
          iconDescription={capitalizeFirstLetter(translate('filter'))}
          hasIconOnly
        />
        <PopoverContent>
          <Select
            defaultValue={countryName}
            id="school-region-select"
            labelText={translate('country')}
            onChange={(e: any) => {
              handleFilterCountry(e.target.value)
              popover.close()
            }}
          >
            {regionOptions.map((r) => (
              <SelectItem key={r} value={r} text={r} />
            ))}
          </Select>
        </PopoverContent>
      </Popover>
    </>
  )
}

import { Button, Dropdown } from '@carbon/react'
import { Dispatch, SetStateAction } from 'react'
import { useAuthContext } from 'src/auth/useAuthContext'
import { Stack } from 'src/components/stack'
import { PopoverTitle } from 'src/components/typography'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'

type Props = {
  closePopover: () => void
  setPage: Dispatch<SetStateAction<number>>
  setFilterCountry: (countryName: string) => void
  setFilterSearch: Dispatch<SetStateAction<string>>
  countryOptions: string[]
  countryName: string
}

export default function UsersTableFilters({
  closePopover,
  setFilterCountry,
  setFilterSearch,
  setPage,
  countryOptions,
  countryName
}: Props) {
  const { spacing } = useTheme()
  const { translate } = useLocales()
  const { user } = useAuthContext()

  const handleFilterCountry = (country: string) => {
    setPage(1)
    setFilterCountry(country)
  }

  const sortedOptions =
    countryOptions.length > 0
      ? countryOptions.filter((r) => r).sort((a, b) => a.localeCompare(b))
      : []

  const handleResetFilter = () => {
    setFilterCountry(user?.country.name ?? '')
    setFilterSearch('')
    setPage(1)
    closePopover()
  }

  return (
    <Stack style={{ padding: spacing.md, width: '400px' }} orientation="vertical">
      <PopoverTitle title="country" />
      <Dropdown
        id="user-country-select"
        label={countryName}
        itemToString={capitalizeFirstLetter}
        items={sortedOptions}
        selectedItem={countryName}
        onChange={(e) => {
          handleFilterCountry(e.selectedItem ?? '')
          closePopover()
        }}
        disabled={sortedOptions.length <= 1}
      />
      <Button
        size="sm"
        className="btn-max-width-limit"
        kind="secondary"
        style={{ marginTop: spacing.md, width: '100%' }}
        onClick={handleResetFilter}
      >
        {capitalizeFirstLetter(translate('clear'))}
      </Button>
    </Stack>
  )
}

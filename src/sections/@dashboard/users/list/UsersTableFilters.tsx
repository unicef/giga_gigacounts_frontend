import { Button, ComboBox } from '@carbon/react'
import { Dispatch, SetStateAction } from 'react'
import { Setter } from 'src/@types'
import { useAuthContext } from 'src/auth/useAuthContext'
import { Stack } from 'src/components/stack'
import { PopoverTitle } from 'src/components/typography'
import { FILTER_ALL_DEFAULT } from 'src/constants'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'

type Props = {
  closePopover: () => void
  setPage: Dispatch<SetStateAction<number>>
  setFilterCountry: Setter<string>
  setFilterSearch: Setter<string>
  countryOptions: string[]
  countryName: string
  setFilterRole: Setter<string>
  roleOptions: string[]
  filterRole: string
  filterIsp: string
  setFilterIsp: Setter<string>
  ispOptions: string[]
}

export default function UsersTableFilters({
  closePopover,
  setFilterCountry,
  setFilterSearch,
  setPage,
  countryOptions,
  countryName,
  filterRole,
  roleOptions,
  setFilterRole,
  filterIsp,
  ispOptions,
  setFilterIsp
}: Props) {
  const { spacing } = useTheme()
  const { translate } = useLocales()
  const { user } = useAuthContext()

  const handleFilterCountry = (country: string) => {
    setPage(1)
    setFilterCountry(country)
  }

  const handleFilterRole = (role: string) => {
    setPage(1)
    setFilterRole(role)
  }
  const handleFilterIsp = (isp: string) => {
    setPage(1)
    setFilterIsp(isp)
  }

  const sortedCountries =
    countryOptions.length > 0
      ? countryOptions.filter((r) => r).sort((a, b) => a.localeCompare(b))
      : []
  const sortedRoles =
    roleOptions.length > 0 ? roleOptions.filter((r) => r).sort((a, b) => a.localeCompare(b)) : []
  const sortedIsps =
    ispOptions.length > 0 ? ispOptions.filter((r) => r).sort((a, b) => a.localeCompare(b)) : []

  const handleResetFilter = () => {
    setFilterCountry(user?.country.name ?? '')
    setFilterRole(FILTER_ALL_DEFAULT)
    setFilterIsp(FILTER_ALL_DEFAULT)
    setFilterSearch('')
    setPage(1)
    closePopover()
  }

  const itemToString = (item: unknown) => {
    if (!item) return ''
    return item === FILTER_ALL_DEFAULT || item === 'none'
      ? capitalizeFirstLetter(translate(item))
      : capitalizeFirstLetter(item as string)
  }

  return (
    <Stack style={{ padding: spacing.md, width: '400px' }} orientation="vertical">
      <PopoverTitle title="country" />
      <ComboBox
        id="user-country-select"
        itemToString={itemToString}
        items={sortedCountries}
        value={itemToString(countryName)}
        selectedItem={countryName}
        onChange={(e: { selectedItem: string }) => {
          handleFilterCountry(e.selectedItem ?? user?.country.name)
          closePopover()
        }}
        disabled={sortedCountries.length <= 1}
      />
      <PopoverTitle title="role" />
      <ComboBox
        id="user-role-select"
        itemToString={itemToString}
        items={sortedRoles}
        selectedItem={sortedRoles.includes(filterRole) ? filterRole : 'none'}
        value={itemToString(sortedRoles.includes(filterRole) ? filterRole : 'none')}
        onChange={(e: { selectedItem: string }) => {
          handleFilterRole(e.selectedItem ?? FILTER_ALL_DEFAULT)
          closePopover()
        }}
        disabled={sortedRoles.length <= 1}
      />
      <PopoverTitle title="isp" />
      <ComboBox
        id="user-isp-select"
        itemToString={itemToString}
        items={sortedIsps}
        selectedItem={sortedIsps.includes(filterIsp) ? filterIsp : 'none'}
        value={itemToString(sortedIsps.includes(filterIsp) ? filterIsp : 'none')}
        onChange={(e: { selectedItem: string }) => {
          handleFilterIsp(e.selectedItem ?? FILTER_ALL_DEFAULT)
          closePopover()
        }}
        disabled={sortedIsps.length <= 1}
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

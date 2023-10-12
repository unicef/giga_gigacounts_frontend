import { Button, ComboBox, Dropdown } from '@carbon/react'
import { Dispatch, SetStateAction } from 'react'
import { EducationLevel, Setter, Translation } from 'src/@types'
import { useAuthContext } from 'src/auth/useAuthContext'
import { Stack } from 'src/components/stack'
import { PopoverTitle } from 'src/components/typography'
import { FILTER_ALL_DEFAULT, FilterAll, TRANSLATION_SEPARATOR } from 'src/constants'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter, uncapitalizeFirstLetter } from 'src/utils/strings'

type Props = {
  closePopover: () => void
  setPage: Dispatch<SetStateAction<number>>
  filterEducationLevel: string
  setFilterEducationLevel: Setter<string>
  setFilterCountry: Setter<string>
  setFilterSearch: Setter<string>
  countryOptions: string[]
  educationLevelOptions: (EducationLevel | FilterAll)[]
  countryName: string
  regionOptions: string[]
  filterRegion: string
  setFilterRegion: Setter<string>
}

export default function SchoolReliabilityTableFilters({
  closePopover,
  setFilterCountry,
  setFilterSearch,
  setPage,
  countryOptions,
  countryName,
  setFilterEducationLevel,
  educationLevelOptions,
  filterEducationLevel,
  regionOptions,
  filterRegion,
  setFilterRegion
}: Props) {
  const { spacing } = useTheme()
  const { translate } = useLocales()
  const { user, isAdmin } = useAuthContext()

  const handleFilterCountry = (country: string) => {
    setPage(1)
    setFilterCountry(country)
  }

  const handleEducationLevelFilter = (value: EducationLevel | FilterAll) => {
    setPage(1)
    setFilterEducationLevel(value)
  }

  const handleRegionFilter = (value: string) => {
    setPage(1)
    setFilterRegion(value)
  }

  const sortedCountryOptions =
    countryOptions.length > 0
      ? countryOptions.filter((r) => r).sort((a, b) => a.localeCompare(b))
      : []

  const sortedRegionOptions =
    regionOptions.length > 0
      ? regionOptions.filter((r) => r).sort((a, b) => a.localeCompare(b))
      : []

  const handleResetFilter = () => {
    setFilterCountry(user?.country.name ?? '')
    setFilterSearch('')
    setFilterEducationLevel(FILTER_ALL_DEFAULT)
    setFilterRegion(FILTER_ALL_DEFAULT)
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
      {isAdmin && (
        <>
          <PopoverTitle title="country" />
          <ComboBox
            id="school-country-select"
            itemToString={itemToString}
            items={sortedCountryOptions}
            selectedItem={countryName}
            onChange={(e) => {
              handleFilterCountry(e.selectedItem ?? user?.country.name)
              closePopover()
            }}
            disabled={sortedCountryOptions.length <= 1}
          />
        </>
      )}
      <PopoverTitle title="region" />
      <Dropdown
        id="school-region-reliability-select"
        label={capitalizeFirstLetter(translate(FILTER_ALL_DEFAULT))}
        items={sortedRegionOptions}
        itemToString={itemToString}
        selectedItem={sortedRegionOptions.includes(filterRegion) ? filterRegion : 'none'}
        onChange={(data: { selectedItem: string }) => {
          handleRegionFilter(data.selectedItem ?? '')
          closePopover()
        }}
        disabled={sortedRegionOptions.length <= 1}
      />
      <PopoverTitle title="education_level" />
      <Dropdown
        id="education-level-filter"
        items={educationLevelOptions}
        itemToString={(item) => {
          if (!item) return ''
          return item === FILTER_ALL_DEFAULT || item === 'none'
            ? capitalizeFirstLetter(translate(item))
            : capitalizeFirstLetter(
                translate(
                  `education_levels.${item
                    .split(' ')
                    .map(uncapitalizeFirstLetter)
                    .join(TRANSLATION_SEPARATOR)}` as Translation
                )
              )
        }}
        selectedItem={
          educationLevelOptions.includes(filterEducationLevel as EducationLevel)
            ? filterEducationLevel
            : 'none'
        }
        onChange={(data: { selectedItem: EducationLevel | FilterAll }) =>
          handleEducationLevelFilter(data.selectedItem ?? FILTER_ALL_DEFAULT)
        }
        label={capitalizeFirstLetter(translate(FILTER_ALL_DEFAULT))}
        disabled={educationLevelOptions.length <= 1}
      />
      <Button
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

import { Button, Dropdown } from '@carbon/react'
import { Dispatch, SetStateAction } from 'react'
import { EducationLevel, Translation } from 'src/@types'
import { useAuthContext } from 'src/auth/useAuthContext'
import { Stack } from 'src/components/stack'
import { PopoverTitle } from 'src/components/typography'
import { FILTER_ALL_DEFAULT, TRANSLATION_SEPARATOR } from 'src/constants'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter, uncapitalizeFirstLetter } from 'src/utils/strings'

type Props = {
  closePopover: () => void
  setPage: Dispatch<SetStateAction<number>>
  filterEducationLevel: EducationLevel | typeof FILTER_ALL_DEFAULT
  setFilterEducationLevel: Dispatch<SetStateAction<EducationLevel | typeof FILTER_ALL_DEFAULT>>
  setFilterCountry: (countryName: string) => void
  setFilterSearch: Dispatch<SetStateAction<string>>
  countryOptions: string[]
  educationLevelOptions: (EducationLevel | typeof FILTER_ALL_DEFAULT)[]
  countryName: string
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
  filterEducationLevel
}: Props) {
  const { spacing } = useTheme()
  const { translate } = useLocales()
  const { user } = useAuthContext()

  const handleFilterCountry = (country: string) => {
    setPage(1)
    setFilterCountry(country)
  }

  const handleEducationLevelFilter = (value: EducationLevel | typeof FILTER_ALL_DEFAULT) => {
    setPage(1)
    setFilterEducationLevel(value)
  }

  const sortedOptions =
    countryOptions.length > 0
      ? countryOptions.filter((r) => r).sort((a, b) => a.localeCompare(b))
      : []

  const handleResetFilter = () => {
    setFilterCountry(user?.country.name)
    setFilterSearch('')
    setFilterEducationLevel(FILTER_ALL_DEFAULT)
    setPage(1)
    closePopover()
  }

  return (
    <Stack style={{ padding: spacing.md, width: '400px' }} orientation="vertical">
      <PopoverTitle title="country" />
      <Dropdown
        id="school-country-select"
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
      <PopoverTitle title="education_level" />
      <Dropdown
        id="education-level-filter"
        items={educationLevelOptions}
        itemToString={(item) =>
          item === FILTER_ALL_DEFAULT
            ? capitalizeFirstLetter(translate(item))
            : capitalizeFirstLetter(
                translate(
                  `education_levels.${item
                    .split(' ')
                    .map(uncapitalizeFirstLetter)
                    .join(TRANSLATION_SEPARATOR)}` as Translation
                )
              )
        }
        selectedItem={filterEducationLevel}
        onChange={(data) => handleEducationLevelFilter(data.selectedItem ?? FILTER_ALL_DEFAULT)}
        label={capitalizeFirstLetter(translate(FILTER_ALL_DEFAULT))}
        disabled={educationLevelOptions.length <= 1}
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

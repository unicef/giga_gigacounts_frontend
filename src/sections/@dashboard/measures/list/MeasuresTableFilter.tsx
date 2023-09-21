import { Button, ComboBox, Dropdown, Tag } from '@carbon/react'
import { Dispatch, SetStateAction } from 'react'
import { ConnectivityStatus, EducationLevel, Setter, Translation } from 'src/@types'
import { useAuthContext } from 'src/auth/useAuthContext'
import { Stack } from 'src/components/stack'
import { PopoverTitle } from 'src/components/typography'
import {
  CONNECTIVITY_STATUS_COLORS,
  FILTER_ALL_DEFAULT,
  FILTER_TAG_BORDER,
  FilterAll,
  TRANSLATION_SEPARATOR
} from 'src/constants'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter, uncapitalizeFirstLetter } from 'src/utils/strings'

type Props = {
  filterEducationLevel: string
  setFilterEducationLevel: Setter<string>
  filterRegion: string
  setFilterRegion: Setter<string>
  regionOptions: string[]
  setPage: Dispatch<SetStateAction<number>>
  closePopover: () => void
  educationLevelOptions: (EducationLevel | FilterAll)[]
  setFilterCountry: Setter<string>
  countryName: string
  countryOptions: string[]
  setFilterStatus: Setter<ConnectivityStatus | FilterAll>
  filterStatus: string
}

export default function MeasuresTableFilter({
  filterEducationLevel,
  setFilterEducationLevel,
  setPage,
  closePopover,
  educationLevelOptions,
  filterRegion,
  regionOptions,
  setFilterRegion,
  setFilterCountry,
  countryName,
  countryOptions,
  setFilterStatus,
  filterStatus
}: Props) {
  const { spacing } = useTheme()
  const { translate } = useLocales()
  const { user } = useAuthContext()

  const handleFilter = (filterChange: () => void) => {
    setPage(1)
    filterChange()
  }
  const handleFilterCountry = (country: string) => handleFilter(() => setFilterCountry(country))

  const handleEducationLevelFilter = (value: EducationLevel | FilterAll) =>
    handleFilter(() => setFilterEducationLevel(value))
  const handleFilterRegion = (value: string) => handleFilter(() => setFilterRegion(value))
  const handleFilterStatus = (value: ConnectivityStatus | FilterAll) =>
    handleFilter(() => setFilterStatus(value))
  const handleResetFilter = () => {
    closePopover()
    setPage(1)
    setFilterCountry(user?.country.name ?? '')
    setFilterEducationLevel(FILTER_ALL_DEFAULT)
    setFilterRegion(FILTER_ALL_DEFAULT)
    setFilterStatus(FILTER_ALL_DEFAULT)
  }
  const sortedRegionOptions =
    regionOptions.length > 0
      ? regionOptions.filter((r) => r).sort((a, b) => a.localeCompare(b))
      : []

  const sortedCountryOptions =
    countryOptions.length > 0
      ? countryOptions.filter((r) => r).sort((a, b) => a.localeCompare(b))
      : []

  const STATUS_OPTIONS = [FILTER_ALL_DEFAULT, ...Object.values(ConnectivityStatus)] as const

  const itemToString = (item: unknown) => {
    if (!item) return ''
    return item === FILTER_ALL_DEFAULT || item === 'none'
      ? capitalizeFirstLetter(translate(item))
      : capitalizeFirstLetter(item as string)
  }
  return (
    <Stack style={{ padding: spacing.md, width: '400px' }} orientation="vertical">
      <PopoverTitle title="status" />

      <Stack orientation="horizontal">
        {STATUS_OPTIONS.slice(0, 3).map((opt) => (
          <Tag
            key={opt}
            style={{ border: opt === filterStatus ? FILTER_TAG_BORDER : 'none' }}
            onClick={() => handleFilterStatus(opt)}
            type={opt === FILTER_ALL_DEFAULT ? 'gray' : CONNECTIVITY_STATUS_COLORS[opt]}
          >
            {opt === FILTER_ALL_DEFAULT
              ? capitalizeFirstLetter(translate(FILTER_ALL_DEFAULT))
              : capitalizeFirstLetter(translate(`constant_status.connectivity.${opt}`))}
          </Tag>
        ))}
      </Stack>
      <Stack orientation="horizontal">
        {STATUS_OPTIONS.slice(3).map((opt) => (
          <Tag
            key={opt}
            style={{ border: opt === filterStatus ? FILTER_TAG_BORDER : 'none' }}
            onClick={() => handleFilterStatus(opt)}
            type={opt === FILTER_ALL_DEFAULT ? 'gray' : CONNECTIVITY_STATUS_COLORS[opt]}
          >
            {opt === FILTER_ALL_DEFAULT
              ? capitalizeFirstLetter(translate(FILTER_ALL_DEFAULT))
              : capitalizeFirstLetter(translate(`constant_status.connectivity.${opt}`))}
          </Tag>
        ))}
      </Stack>

      <PopoverTitle title="country" />

      <ComboBox
        id="school-country-select"
        itemToString={itemToString}
        items={sortedCountryOptions}
        selectedItem={countryName}
        onChange={(e: { selectedItem: string }) => {
          handleFilterCountry(e.selectedItem ?? user?.country.name)
          closePopover()
        }}
        disabled={sortedCountryOptions.length <= 1}
      />
      <PopoverTitle title="region" />
      <Dropdown
        id="region-school-filter"
        items={sortedRegionOptions}
        itemToString={itemToString}
        selectedItem={sortedRegionOptions.includes(filterRegion) ? filterRegion : 'none'}
        onChange={(data: { selectedItem: string }) =>
          handleFilterRegion(data.selectedItem ?? FILTER_ALL_DEFAULT)
        }
        label={capitalizeFirstLetter(translate(FILTER_ALL_DEFAULT))}
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

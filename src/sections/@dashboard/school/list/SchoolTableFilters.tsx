import { Button, Dropdown } from '@carbon/react'
import { Dispatch, SetStateAction } from 'react'
import { EducationLevel, Setter, Translation } from 'src/@types'
import { Stack } from 'src/components/stack'
import { PopoverTitle } from 'src/components/typography'
import { FILTER_ALL_DEFAULT, FilterAll, TRANSLATION_SEPARATOR } from 'src/constants'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter, uncapitalizeFirstLetter } from 'src/utils/strings'

type Props = {
  closePopover: () => void
  setPage: Dispatch<SetStateAction<number>>
  setFilterRegion: Setter<string>
  setFilterSearch: Setter<string>
  regionOptions: string[]
  filterRegion: string
  filterEducationLevel: string
  setFilterEducationLevel: Setter<EducationLevel | FilterAll>
  educationLevelOptions: (EducationLevel | FilterAll)[]
}

export default function SchoolTableFilters({
  closePopover,
  setFilterRegion,
  setFilterSearch,
  setPage,
  regionOptions,
  filterRegion,
  educationLevelOptions,
  filterEducationLevel,
  setFilterEducationLevel
}: Props) {
  const { spacing } = useTheme()
  const { translate } = useLocales()

  const handleFilterRegion = (country: string) => {
    if (!country) setFilterRegion(FILTER_ALL_DEFAULT)
    setPage(1)
    setFilterRegion(country)
  }

  const sortedOptions =
    regionOptions.length > 0
      ? regionOptions.filter((r) => r).sort((a, b) => a.localeCompare(b))
      : []

  const handleEducationLevelFilter = (value: EducationLevel | FilterAll) => {
    setPage(1)
    setFilterEducationLevel(value)
  }

  const handleResetFilter = () => {
    setFilterRegion(FILTER_ALL_DEFAULT)
    setFilterEducationLevel(FILTER_ALL_DEFAULT)
    setFilterSearch('')
    setPage(1)
    closePopover()
  }

  const itemToString = (item: string) => {
    if (!item) return ''
    return item === FILTER_ALL_DEFAULT || item === 'none'
      ? capitalizeFirstLetter(translate(item))
      : capitalizeFirstLetter(item)
  }

  return (
    <Stack style={{ padding: spacing.md, width: '300px' }} orientation="vertical">
      <PopoverTitle title="region" />
      <Dropdown
        id="school-region-select"
        label={capitalizeFirstLetter(translate(FILTER_ALL_DEFAULT))}
        items={sortedOptions}
        itemToString={itemToString}
        selectedItem={sortedOptions.includes(filterRegion) ? filterRegion : 'none'}
        onChange={(e) => {
          handleFilterRegion(e.selectedItem ?? '')
          closePopover()
        }}
        disabled={sortedOptions.length <= 1}
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

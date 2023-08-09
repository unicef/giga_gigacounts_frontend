import { Button, Dropdown, TextInput } from '@carbon/react'
import { Dispatch, SetStateAction } from 'react'
import { EducationLevel, MinMax, Translation } from 'src/@types'
import { Stack } from 'src/components/stack'
import { PopoverTitle } from 'src/components/typography'
import { FILTER_ALL_DEFAULT, TRANSLATION_SEPARATOR } from 'src/constants'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter, uncapitalizeFirstLetter } from 'src/utils/strings'

type Props = {
  filterBudget?: MinMax
  filterEducationLevel: EducationLevel | typeof FILTER_ALL_DEFAULT
  setFilterBudget?: Dispatch<SetStateAction<MinMax>>
  setFilterEducationLevel: Dispatch<SetStateAction<EducationLevel | typeof FILTER_ALL_DEFAULT>>
  setPage: Dispatch<SetStateAction<number>>
  closePopover: () => void
  educationLevelOptions: (EducationLevel | typeof FILTER_ALL_DEFAULT)[]
}

export default function ConnectivityTableFilters({
  filterBudget,
  filterEducationLevel,
  setFilterBudget,
  setFilterEducationLevel,
  setPage,
  closePopover,
  educationLevelOptions
}: Props) {
  const { spacing } = useTheme()
  const { translate } = useLocales()

  const handleFilter = (filterChange: () => void) => {
    setPage(1)
    filterChange()
  }

  const handleMaxBudget = setFilterBudget
    ? (max: string) => handleFilter(() => setFilterBudget((prev) => ({ ...prev, max })))
    : null

  const handleMinBudget = setFilterBudget
    ? (min: string) => handleFilter(() => setFilterBudget((prev) => ({ ...prev, min })))
    : null

  const handleEducationLevelFilter = (value: EducationLevel | typeof FILTER_ALL_DEFAULT) =>
    handleFilter(() => setFilterEducationLevel(value))

  const handleResetFilter = () => {
    closePopover()
    setPage(1)
    setFilterEducationLevel(FILTER_ALL_DEFAULT)
    if (setFilterBudget) setFilterBudget({ min: '', max: '' })
  }
  return (
    <Stack style={{ padding: spacing.md, width: '400px' }} orientation="vertical">
      {filterBudget && setFilterBudget && (
        <>
          <PopoverTitle title="budget" />
          <Stack orientation="horizontal">
            <TextInput
              style={{ marginRight: spacing.xs }}
              id="school-budget-min"
              value={filterBudget.min}
              labelText={capitalizeFirstLetter('min')}
              onChange={(e) => {
                if (Number.isNaN(Number(e.target.value)) && e.target.value !== '') return
                if (handleMinBudget) handleMinBudget(e.target.value)
              }}
            />
            <TextInput
              id="school-budget-max"
              value={filterBudget.max}
              labelText={capitalizeFirstLetter('max')}
              onChange={(e) => {
                if (Number.isNaN(Number(e.target.value)) && e.target.value !== '') return
                if (handleMaxBudget) handleMaxBudget(e.target.value)
              }}
            />
          </Stack>
        </>
      )}

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
        onChange={(data: { selectedItem: EducationLevel | typeof FILTER_ALL_DEFAULT }) =>
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

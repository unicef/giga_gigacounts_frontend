import { Button, Dropdown } from '@carbon/react'
import { Dispatch, SetStateAction } from 'react'
import { EducationLevel, Translation } from 'src/@types'
import { Stack } from 'src/components/stack'
import { PopoverTitle } from 'src/components/typography'
import { FILTER_ALL_DEFAULT, TRANSLATION_SEPARATOR } from 'src/constants'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter, uncapitalizeFirstLetter } from 'src/utils/strings'

type Props = {
  filterEducationLevel: EducationLevel | typeof FILTER_ALL_DEFAULT
  setFilterEducationLevel: Dispatch<SetStateAction<EducationLevel | typeof FILTER_ALL_DEFAULT>>
  setPage: Dispatch<SetStateAction<number>>
  closePopover: () => void
  educationLevelOptions: (EducationLevel | typeof FILTER_ALL_DEFAULT)[]
}

export default function MeasuresTableFilter({
  filterEducationLevel,
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

  const handleEducationLevelFilter = (value: EducationLevel | typeof FILTER_ALL_DEFAULT) =>
    handleFilter(() => setFilterEducationLevel(value))

  const handleResetFilter = () => {
    closePopover()
    setPage(1)
    setFilterEducationLevel(FILTER_ALL_DEFAULT)
  }
  return (
    <Stack style={{ padding: spacing.md, width: '400px' }} orientation="vertical">
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

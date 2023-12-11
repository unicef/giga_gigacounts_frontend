import { Button, ComboBox } from '@carbon/react'
import { Dispatch, SetStateAction } from 'react'
import { Setter } from 'src/@types'
import { Stack } from 'src/components/stack'
import { PopoverTitle } from 'src/components/typography'
import { FILTER_ALL_DEFAULT } from 'src/constants'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'

type Props = {
  closePopover: () => void
  setPage: Dispatch<SetStateAction<number>>
  setFilterSearch: Setter<string>
  setFilterRole: Setter<string>
  roleOptions: string[]
  filterRole: string
}

export default function UsersApprovalTableFilters({
  closePopover,
  setFilterSearch,
  setPage,
  filterRole,
  roleOptions,
  setFilterRole
}: Props) {
  const { spacing } = useTheme()
  const { translate } = useLocales()

  const handleFilterRole = (role: string) => {
    setPage(1)
    setFilterRole(role)
  }

  const sortedRoles =
    roleOptions.length > 0 ? roleOptions.filter((r) => r).sort((a, b) => a.localeCompare(b)) : []

  const handleResetFilter = () => {
    setFilterRole(FILTER_ALL_DEFAULT)
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
      <PopoverTitle title="role" />
      <ComboBox
        id="user-role-select"
        itemToString={itemToString}
        items={sortedRoles}
        selectedItem={sortedRoles.includes(filterRole) ? filterRole : 'none'}
        value={itemToString(sortedRoles.includes(filterRole) ? filterRole : 'none')}
        onChange={(e) => {
          handleFilterRole(e.selectedItem ?? FILTER_ALL_DEFAULT)
          closePopover()
        }}
        disabled={sortedRoles.length <= 1}
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

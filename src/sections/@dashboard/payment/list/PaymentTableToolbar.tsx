import { Filter } from '@carbon/icons-react'
import {
  Button,
  Popover,
  PopoverContent,
  TableToolbarSearch,
  // @ts-ignore
  Tag
} from '@carbon/react'
import { Dispatch, SetStateAction } from 'react'
import { PaymentStatus } from 'src/@types'
import { Stack } from 'src/components/stack'
import { Typography } from 'src/components/typography'
import { PAYMENT_STATUS_COLORS } from 'src/constants/status'
import { useModal } from 'src/hooks/useModal'
import { Translation, useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'

type Props = {
  setFilterStatus: Dispatch<SetStateAction<PaymentStatus | 'all'>>
  setFilterSearch: Dispatch<SetStateAction<string>>
  setPage: Dispatch<SetStateAction<number>>
}

const STATUS_OPTIONS = ['all', ...Object.values(PaymentStatus)] as const

export default function PaymentTableToolbar({ setFilterStatus, setPage, setFilterSearch }: Props) {
  const { translate } = useLocales()
  const { spacing } = useTheme()
  const popover = useModal()

  const handleFilterSearch = (value: string) => {
    setPage(1)
    setFilterSearch(value)
  }

  const handleResetFilter = () => {
    popover.close()
    setPage(1)
    setFilterSearch('')
    setFilterStatus('all')
  }

  return (
    <>
      <TableToolbarSearch onChange={(e: any) => handleFilterSearch(e.target.value)} persistent />
      <Popover open={popover.value} isTabTip onRequestClose={popover.close} align="bottom-right">
        <Button
          kind="ghost"
          onClick={popover.toggle}
          renderIcon={Filter}
          tooltipAlignment="end"
          tooltipPosition="bottom"
          iconDescription={capitalizeFirstLetter(translate('filter'))}
          hasIconOnly
        />
        <PopoverContent>
          <div style={{ padding: spacing.md }}>
            <Stack orientation="vertical">
              <Typography as="h6">{capitalizeFirstLetter(translate('status'))}</Typography>
              <Stack orientation="horizontal">
                {STATUS_OPTIONS.map((opt) => (
                  <Tag
                    key={opt}
                    style={{ border: 'none' }}
                    onClick={() => setFilterStatus(opt)}
                    type={opt === 'all' ? 'gray' : PAYMENT_STATUS_COLORS[opt]}
                  >
                    {capitalizeFirstLetter(translate(opt as Translation))}
                  </Tag>
                ))}
              </Stack>

              <Stack orientation="horizontal">
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
            </Stack>
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}

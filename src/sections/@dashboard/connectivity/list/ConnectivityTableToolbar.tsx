import { TableToolbarSearch } from '@carbon/react'
import { Dispatch, SetStateAction } from 'react'
import { ConnectivityStatus } from 'src/@types'

type Props = {
  setFilterStatus: Dispatch<SetStateAction<ConnectivityStatus | 'all'>>
  setFilterSearch: Dispatch<SetStateAction<string>>
  setPage: Dispatch<SetStateAction<number>>
}

export default function ConnectivityTableToolbar({
  setFilterStatus,
  setPage,
  setFilterSearch
}: Props) {
  // const { translate } = useLocales()
  // const popover = useModal()
  // const statusOptions = ['all', ...Object.values(ConnectivityStatus)]

  const handleFilterSearch = (value: string) => {
    setPage(1)
    setFilterSearch(value)
  }

  // const handleResetFilter = () => {
  //   popover.close()
  //   setPage(1)
  //   setFilterSearch('')
  //   setFilterStatus('all')
  // }

  return (
    <>
      <TableToolbarSearch onChange={(e: any) => handleFilterSearch(e.target.value)} persistent />
      {/* <Popover
        open={popover.value}
        isTabTip
        onRequestClose={popover.close}
        align="bottom-right"
      >
        <Button
          kind="ghost"
          onClick={popover.toggle()}
          renderIcon={Filter}
              tooltipPosition="bottom"
          tooltipAlignment="end"

        />
        <PopoverContent>
          <div style={{ padding: 16 }}>
            <Stack orientation="vertical">
              <Typography as="h6">{capitalizeFirstLetter(translate('status'))}</Typography>
              <Stack orientation="horizontal">
                {statusOptions.map((opt) => (
                  <Tag
                    key={opt}
                    style={{ border: 'none' }}
                    onClick={() => setFilterStatus(opt)}
                    type={CONNECTIVITY_STATUS_COLORS[opt]}
                  >
                    {capitalizeFirstLetter(translate(opt as Translation))}
                  </Tag>
                ))}
              </Stack>

              <Stack orientation="horizontal">
                <Button
                  style={{ justifySelf: 'flex-end', alignSelf: 'center' }}
                  kind="danger"
                  onClick={handleResetFilter}
                >
                  {capitalizeFirstLetter(translate('clear'))}
                </Button>
              </Stack>
            </Stack>
          </div>
        </PopoverContent>
      </Popover> */}
    </>
  )
}

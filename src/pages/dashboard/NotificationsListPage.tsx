import { Checkmark, TrashCan } from '@carbon/icons-react'
// @ts-ignore
import { Modal } from '@carbon/react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { INotification } from 'src/@types'
import { Banner } from 'src/components/banner'
import CustomDataTable from 'src/components/data-table/CustomDataTable'
import { getComparator, useTable } from 'src/components/table'
import { useBusinessContext } from 'src/context/BusinessContext'
import { useModal } from 'src/hooks/useModal'
import { useLocales } from 'src/locales'
import {
  NotificationTableRow,
  NotificationTableToolbar
} from 'src/sections/@dashboard/user/notifications'

export default function NotificationsListPage() {
  const {
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    setRowsPerPage
  } = useTable()

  const {
    notifications,
    refetchNotifications,
    readNotification,
    readManyNotifications,
    discardNotification,
    discardManyNotifications
  } = useBusinessContext()

  const { translate } = useLocales()

  const [filterSearch, setFilterSearch] = useState('')
  const confirm = useModal()

  const TABLE_HEAD = [
    { key: 'title', header: translate('title') },
    { key: 'status', header: translate('status') },
    { key: 'message', header: translate('message') },
    { key: '', header: '' },
    { key: '-', header: '' }
  ]

  const dataFiltered = applyFilter({
    inputData: notifications,
    comparator: getComparator(order, orderBy),
    filterSearch
  })

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  const isNotFound = !notifications.length || (!dataFiltered.length && !!filterSearch)

  const handleDeleteRow = (id: string) => {
    discardNotification(id).finally(refetchNotifications)
    setSelected([])

    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1)
      }
    }
  }

  const handleDeleteRows = (selectedRows: string[]) => {
    discardManyNotifications(selectedRows).finally(refetchNotifications)
    // discardManyNotifications(selectedRows)
    // const deleteRows = notifications.filter((row) => !selectedRows.includes(row.id))
    // setTableData(deleteRows)
    // setTableData(refetchNotifications)

    if (page > 0) {
      if (selectedRows.length === dataInPage.length) {
        setPage(page - 1)
      } else if (selectedRows.length === dataFiltered.length) {
        setPage(0)
      } else if (selectedRows.length > dataInPage.length) {
        const newPage = Math.ceil((notifications.length - selectedRows.length) / rowsPerPage) - 1
        setPage(newPage)
      }
    }
  }

  const handleReadRow = (id: string) => readNotification(id).finally(refetchNotifications)

  const handleReadRows = (selectedRows: { id: string }[]) =>
    readManyNotifications(selectedRows.map((n) => n.id)).finally(refetchNotifications)

  // const handleResetFilter = () => setFilterSearch('')

  return (
    <>
      <Helmet>
        <title> Notifications | Gigacounts</title>
      </Helmet>
      <Banner title={translate('notifications')} />
      <CustomDataTable
        isSortable
        isSelectable
        setSelected={setSelected}
        batchActions={[
          {
            icon: Checkmark,
            title: translate('mark_as_read'),
            onClick: handleReadRows
          },
          {
            icon: TrashCan,
            title: translate('delete'),
            onClick: confirm.open
          }
        ]}
        onSelectAll={(e) =>
          onSelectAllRows(
            // @ts-ignore
            e.target.checked,
            dataFiltered.map((row) => row.id)
          )
        }
        RowComponent={NotificationTableRow}
        getRowComponentProps={(row) => ({
          selected: selected.includes(row.id),
          handleSelectRow: onSelectRow,
          onReadRow: () => handleReadRow(row.id),
          onDeleteRow: () => handleDeleteRow(row.id)
        })}
        ToolbarContent={
          <NotificationTableToolbar setFilterSearch={setFilterSearch} setPage={setPage} />
        }
        data={dataFiltered}
        page={page}
        setPage={setPage}
        isNotFound={isNotFound}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        tableHead={TABLE_HEAD}
        tableName="notifications"
        title="Notifications table"
        allChecked={selected.length > 0}
      />

      {/* <Stack direction="row">
              <Tooltip title="Mark all selected as Read">
                <IconButton color="primary" onClick={() => handleReadRows(selected)}>
                  <Iconify icon="eva:done-all-outline" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete all selected">
                <IconButton color="primary" onClick={handleOpenConfirm}>
                  <Iconify icon="eva:trash-2-outline" />
                </IconButton>
              </Tooltip>
            </Stack> */}

      <Modal
        open={confirm.value}
        danger
        onRequestClose={confirm.close}
        modalLabel={translate('delete')}
        modalHeading={
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: translate('delete_confirm_items').replace(
                /* eslint-disble-line */
                '{{number}}',
                String(selected.length)
              )
            }}
          />
        }
        primaryButtonText={translate('delete')}
        secondaryButtonText={translate('cancel')}
        onRequestSubmit={() => {
          handleDeleteRows(selected)
          confirm.close()
        }}
      />
    </>
  )
}

function applyFilter({
  inputData,
  comparator,
  filterSearch
}: {
  inputData: INotification[]
  comparator: (a: any, b: any) => number
  filterSearch: string
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const)

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })

  inputData = stabilizedThis.map((el) => el[0])

  if (filterSearch) {
    inputData = inputData.filter(({ title, message }) => {
      const flatContract = { title, message }
      return Object.values(flatContract).some((value) =>
        value.toLowerCase().includes(filterSearch.toLowerCase())
      )
    })
  }

  return inputData
}

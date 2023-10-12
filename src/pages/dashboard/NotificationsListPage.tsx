import { Modal } from '@carbon/react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { INotification } from 'src/@types'
import { Banner } from 'src/components/banner'
import CustomDataTable from 'src/components/data-table/CustomDataTable'
import { useTable } from 'src/components/table'
import { KEY_DEFAULTS } from 'src/constants'
import { useBusinessContext } from 'src/context/business/BusinessContext'
import { useModal } from 'src/hooks/useModal'
import { useLocales } from 'src/locales'
import {
  NotificationTableRow,
  NotificationTableToolbar
} from 'src/sections/@dashboard/user/notifications'
import { capitalizeFirstLetter } from 'src/utils/strings'

export default function NotificationsListPage() {
  const {
    page,
    rowsPerPage,
    setPage,
    setRowsPerPage,
    selected,
    onSelectAllRows,
    onSelectRow,
    setSelected
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
    { key: 'sent_at', header: translate('date') },
    { key: KEY_DEFAULTS[0], header: '' },
    { key: KEY_DEFAULTS[1], header: '' }
  ]

  const dataFiltered = notifications
    ? applyFilter({
        inputData: notifications,
        filterSearch
      })
    : null

  const dataInPage = dataFiltered
    ? dataFiltered.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
    : []
  const isEmpty = Boolean(notifications && !notifications.length)
  const isNotFound = !isEmpty && Boolean(dataFiltered && !dataFiltered.length)

  const handleDeleteRow = (id: string) => {
    discardNotification(id).finally(refetchNotifications)
    if (dataInPage.length === 1) setPage(page - 1)
  }

  const handleDeleteRows = (selectedRows: string[]) => {
    if (!notifications || !dataFiltered) return
    discardManyNotifications(selectedRows).finally(() => {
      refetchNotifications()
      setSelected([])
    })

    if (page > 1) {
      if (selectedRows.length === dataInPage.length) setPage(page - 1)
      else if (selectedRows.length === dataFiltered.length) setPage(1)
      else if (selectedRows.length > dataInPage.length) {
        const newPage = Math.ceil((dataFiltered.length - selectedRows.length) / rowsPerPage)
        setPage(newPage)
      }
    }
  }

  const handleReadRow = (id: string) => readNotification(id).finally(refetchNotifications)

  const handleReadRows = (selectedRows: { id: string }[]) =>
    readManyNotifications(selectedRows.map((n) => n.id)).finally(() => {
      refetchNotifications()
      setSelected([])
    })

  return (
    <>
      <Helmet>
        <title> Notifications | Gigacounts</title>
      </Helmet>
      <Banner title={translate('notifications')} />
      <CustomDataTable
        isSortable
        isSelectable
        onSelectAll={(rows, checked) =>
          onSelectAllRows(
            checked,
            rows.map((r) => r.id)
          )
        }
        onSelectRow={(notification) => onSelectRow(notification.id)}
        batchActions={[
          {
            icon: 'Success',
            title: capitalizeFirstLetter(translate('mark_as_read')),
            onClick: handleReadRows
          },
          {
            icon: 'Delete',
            title: capitalizeFirstLetter(translate('delete')),
            onClick: confirm.open
          }
        ]}
        RowComponent={NotificationTableRow}
        getRowComponentProps={() => ({
          handleReadRow,
          handleDeleteRow
        })}
        ToolbarContent={
          <NotificationTableToolbar setFilterSearch={setFilterSearch} setPage={setPage} />
        }
        data={dataFiltered}
        page={page}
        setPage={setPage}
        isNotFound={isNotFound}
        isEmpty={isEmpty}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        tableHead={TABLE_HEAD}
        tableName="notifications"
        emptyText="table_no_data.notifications"
        rowToDataKey={(row) => row.id}
        getDataKey={(n) => n.id}
        selection={selected}
      />

      <Modal
        open={confirm.value}
        danger
        onRequestClose={confirm.close}
        modalLabel={capitalizeFirstLetter(translate('delete'))}
        modalHeading={
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: translate('delete_confirm_items').replace(
                '{{number}}',
                String(selected.length)
              )
            }}
          />
        }
        primaryButtonText={capitalizeFirstLetter(translate('delete'))}
        secondaryButtonText={capitalizeFirstLetter(translate('cancel'))}
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
  filterSearch
}: {
  inputData: INotification[]
  filterSearch: string
}) {
  if (filterSearch)
    inputData = inputData.filter(({ title, message }) => {
      const flatContract = { title, message }
      return Object.values(flatContract).some((value) =>
        value.toLowerCase().includes(filterSearch.toLowerCase())
      )
    })

  return inputData
}

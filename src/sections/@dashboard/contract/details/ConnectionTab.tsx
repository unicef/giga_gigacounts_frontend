import { useEffect, useState } from 'react'
import { ConnectivityStatus, IContractSchools } from 'src/@types'
import { getContractSchools } from 'src/api/contracts'
import CustomDataTable from 'src/components/data-table/CustomDataTable'
import { getComparator, useTable } from 'src/components/table'
import { useLocales } from 'src/locales'
import {
  ConnectivityTableRow,
  ConnectivityTableToolbar
} from 'src/sections/@dashboard/connectivity/list'
import { getConnectivityStatus } from 'src/utils/connectivity'

export default function ConnectionTab({ id }: { id: string }) {
  const { translate } = useLocales()

  const TABLE_HEAD = [
    { key: 'name', header: translate('name') },
    { key: 'externalId', header: 'ID' },
    { key: 'uptime', header: translate('uptime') },
    { key: 'latency', header: translate('latency') },
    { key: 'downloadSpeed', header: translate('download_speed') },
    { key: 'uploadSpeed', header: translate('upload_speed') },
    { key: '', header: '' },
    { key: '-', header: '' }
  ]

  const { page, order, orderBy, rowsPerPage, setPage, setRowsPerPage } = useTable({
    defaultOrderBy: 'name'
  })

  const [tableData, setTableData] = useState<IContractSchools[]>([])
  const [filterName, setFilterName] = useState('')
  const [filterStatus, setFilterStatus] = useState<ConnectivityStatus | 'all'>('all')

  useEffect(() => {
    getContractSchools(id).then(setTableData)
  }, [id])

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterStatus
  })

  // const isFiltered = filterStatus !== 'all' || filterName !== ''

  const isNotFound = !dataFiltered.length

  return (
    <CustomDataTable
      isSortable
      RowComponent={ConnectivityTableRow}
      getRowComponentProps={(row) => ({
        contractId: id
      })}
      ToolbarContent={
        <ConnectivityTableToolbar
          setFilterSearch={setFilterName}
          setFilterStatus={setFilterStatus}
          setPage={setPage}
        />
      }
      data={dataFiltered.map((row) => {
        const locations = row.locations.split(',')
        return {
          ...row,
          location_1: locations[0],
          location_2: locations[1],
          location_3: locations[3]
        }
      })}
      page={page}
      setPage={setPage}
      isNotFound={isNotFound}
      rowsPerPage={rowsPerPage}
      setRowsPerPage={setRowsPerPage}
      tableHead={TABLE_HEAD}
      tableName="connectivity"
      title="Connectivity table"
    />
  )
}

function applyFilter({
  inputData,
  comparator,
  filterName,
  filterStatus
}: {
  inputData: IContractSchools[]
  comparator: (a: any, b: any) => number
  filterName: string
  filterStatus: ConnectivityStatus | 'all'
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const)

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })

  inputData = stabilizedThis.map((el) => el[0])

  if (filterName) {
    inputData = inputData.filter(
      (school) => school.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    )
  }

  if (filterStatus !== 'all') {
    inputData = inputData.filter(
      (school) => getConnectivityStatus(school.connection.value) === filterStatus
    )
  }

  return inputData
}

import { useEffect, useState } from 'react'
import { ContractDetails, EducationLevel, IContractSchools, MinMax } from 'src/@types'
import { getContractSchools } from 'src/api/contracts'
import CustomDataTable from 'src/components/data-table/CustomDataTable'
import { useTable } from 'src/components/table'
import { FILTER_ALL_DEFAULT, KEY_DEFAULTS } from 'src/constants'
import { useLocales } from 'src/locales'
import {
  ConnectivityTableRow,
  ConnectivityTableToolbar
} from 'src/sections/@dashboard/connectivity/list'

export default function ConnectionTab({
  contract,
  expectedValues
}: {
  contract: ContractDetails
  expectedValues: { uptime: number; latency: number; downloadSpeed: number; uploadSpeed: number }
}) {
  const { translate } = useLocales()

  const TABLE_HEAD = [
    { key: 'name', header: translate('name') },
    { key: 'external_id', header: 'ID' },
    { key: 'budget', header: translate('budget') },
    { key: 'uptime', header: translate('uptime') },
    { key: 'latency', header: translate('latency') },
    { key: 'downloadSpeed', header: translate('download_speed') },
    { key: 'uploadSpeed', header: translate('upload_speed') },
    { key: KEY_DEFAULTS[0], header: '' },
    { key: KEY_DEFAULTS[1], header: '' }
  ]

  const { page, rowsPerPage, setPage, setRowsPerPage } = useTable({
    defaultOrderBy: 'name'
  })

  const [tableData, setTableData] = useState<IContractSchools[]>([])
  const [filterName, setFilterName] = useState('')
  const [filterBudget, setFilterBudget] = useState<MinMax>({ min: '', max: '' })
  const [filterEducationLevel, setFilterEducationLevel] = useState<
    EducationLevel | typeof FILTER_ALL_DEFAULT
  >(FILTER_ALL_DEFAULT)

  useEffect(() => {
    getContractSchools(contract.id).then(setTableData)
  }, [contract.id])

  const dataFiltered = applyFilter({
    inputData: tableData,
    filterName,
    filterBudget,
    filterEducationLevel
  })

  const educationLevelOptions = [
    FILTER_ALL_DEFAULT,
    ...Array.from(new Set(tableData.map((s) => s.education_level)))
  ] as (EducationLevel | typeof FILTER_ALL_DEFAULT)[]

  const isNotFound = !dataFiltered.length

  return (
    <CustomDataTable
      isSortable
      RowComponent={ConnectivityTableRow}
      getRowComponentProps={(row) => ({
        contractId: contract.id,
        budget: row.budget,
        currencyCode: contract.currency?.code,
        contactInformation: row.contactInformation,
        expectedValues
      })}
      ToolbarContent={
        <ConnectivityTableToolbar
          educationLevelOptions={educationLevelOptions}
          filterEducationLevel={filterEducationLevel}
          setFilterEducationLevel={setFilterEducationLevel}
          setFilterSearch={setFilterName}
          setFilterBudget={setFilterBudget}
          filterBudget={filterBudget}
          setPage={setPage}
        />
      }
      data={dataFiltered.map((row) => {
        const locations = row.locations.split(',')
        return {
          ...row,
          external_id: row.externalId,
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
      noDataText="table_no_data.schools"
      title="Connectivity table"
    />
  )
}

function applyFilter({
  inputData,
  filterName,
  filterBudget,
  filterEducationLevel
}: {
  inputData: IContractSchools[]
  filterName: string
  filterBudget: MinMax
  filterEducationLevel: EducationLevel | typeof FILTER_ALL_DEFAULT
}) {
  if (filterName)
    inputData = inputData.filter(
      (school) => school.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    )

  if (filterBudget.min && filterBudget.max && Number(filterBudget.max) >= Number(filterBudget.min))
    inputData = inputData.filter(
      (school) =>
        Number(school.budget) >= Number(filterBudget.min) &&
        Number(school.budget) <= Number(filterBudget.max)
    )
  else if (filterBudget.min)
    inputData = inputData.filter((school) => Number(school.budget) >= Number(filterBudget.min))
  else if (filterBudget.max)
    inputData = inputData.filter((school) => Number(school.budget) <= Number(filterBudget.max))

  if (filterEducationLevel !== FILTER_ALL_DEFAULT)
    inputData = inputData.filter((school) => school.education_level === filterEducationLevel)

  return inputData
}

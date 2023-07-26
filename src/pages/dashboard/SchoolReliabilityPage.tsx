import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { ICountry, ISchool } from 'src/@types'
import { getSchools } from 'src/api/school'
import { useAuthContext } from 'src/auth/useAuthContext'
import { Banner } from 'src/components/banner'
import CustomDataTable from 'src/components/data-table/CustomDataTable'
import { getComparator, useTable } from 'src/components/table'
import { useBusinessContext } from 'src/context/BusinessContext'
import { useLocales } from 'src/locales'
import {
  SchoolReliabilityTableRow,
  SchoolReliabilityTableToolbar
} from 'src/sections/@dashboard/school/list'

export default function SchoolReliabilityPage() {
  const { page, order, orderBy, rowsPerPage, setPage, setRowsPerPage, selected, onSelectRow } =
    useTable()
  const { user } = useAuthContext()
  const { countries } = useBusinessContext()

  const [countryId, setCountryId] = useState(user?.country.id)
  const [tableData, setTableData] = useState<ISchool[]>([])
  const [filterName, setFilterName] = useState('')

  const { translate } = useLocales()

  const TABLE_HEAD = [
    { key: 'external_id', header: 'Id' },
    { key: 'name', header: translate('name') },
    { key: 'location1', header: translate('region') },
    { key: 'reliable_measures', header: translate('has_reliable_measure_data') },
    { key: '', header: '' }
  ]

  useEffect(() => {
    getSchools(countryId).then(setTableData)
  }, [countryId])

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName
  })

  const isNotFound = !dataFiltered.length

  const handleFilterCountry = (countryName: string) => {
    const selectedCountry = countries.find((c) => c.name === countryName) as ICountry
    setCountryId(selectedCountry.id)
  }

  return (
    <>
      <Helmet>
        <title> Schools: List | Gigacounts</title>
      </Helmet>

      <Banner title={translate('schools_reliability')} />

      <CustomDataTable
        isSortable
        getRowComponentProps={(row) => ({
          selected: selected.includes(row.id),
          onSelectRow
        })}
        RowComponent={SchoolReliabilityTableRow}
        ToolbarContent={
          <SchoolReliabilityTableToolbar
            countryName={countries.find((c) => c.id === countryId)?.name ?? ''}
            setFilterCountry={handleFilterCountry}
            setFilterSearch={setFilterName}
            setPage={setPage}
            regionOptions={countries.map((c) => c.name)}
          />
        }
        data={dataFiltered}
        page={page}
        setPage={setPage}
        isNotFound={isNotFound}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        tableHead={TABLE_HEAD}
        tableName="schools-reliability"
        title="Schools reliability table"
      />
    </>
  )
}

function applyFilter({
  inputData,
  comparator,
  filterName
}: {
  inputData: ISchool[]
  comparator: (a: any, b: any) => number
  filterName: string
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

  return inputData
}

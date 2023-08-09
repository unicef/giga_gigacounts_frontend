import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { EducationLevel, ICountry, ISchool } from 'src/@types'
import { getSchools } from 'src/api/school'
import { useAuthContext } from 'src/auth/useAuthContext'
import { Banner } from 'src/components/banner'
import CustomDataTable from 'src/components/data-table/CustomDataTable'
import { useTable } from 'src/components/table'
import { FILTER_ALL_DEFAULT, KEY_DEFAULTS } from 'src/constants'
import { useBusinessContext } from 'src/context/BusinessContext'
import { useLocales } from 'src/locales'
import {
  SchoolReliabilityTableRow,
  SchoolReliabilityTableToolbar
} from 'src/sections/@dashboard/school/list'

export default function SchoolReliabilityPage() {
  const { page, rowsPerPage, setPage, setRowsPerPage, selected, onSelectRow } = useTable()
  const { user } = useAuthContext()
  const { countries } = useBusinessContext()

  const [countryId, setCountryId] = useState(user?.country.id)
  const [tableData, setTableData] = useState<ISchool[]>([])
  const [filterName, setFilterName] = useState('')
  const [filterEducationLevel, setFilterEducationLevel] = useState<
    EducationLevel | typeof FILTER_ALL_DEFAULT
  >(FILTER_ALL_DEFAULT)

  const { translate } = useLocales()

  const TABLE_HEAD = [
    { key: 'external_id', header: 'Id' },
    { key: 'name', header: translate('name') },
    { key: 'location1', header: translate('region') },
    { key: 'reliable_measures', header: translate('has_reliable_measure_data') },
    { key: KEY_DEFAULTS[0], header: '' }
  ]

  useEffect(() => {
    getSchools(countryId).then(setTableData)
  }, [countryId])

  const dataFiltered = applyFilter({
    inputData: tableData,
    filterName,
    filterEducationLevel
  })

  const isNotFound = !dataFiltered.length

  const handleFilterCountry = (countryName: string) => {
    const selectedCountry = countries.find((c) => c.name === countryName) as ICountry
    setCountryId(selectedCountry.id)
  }

  const educationLevelOptions = Array.from(
    new Set([FILTER_ALL_DEFAULT, ...tableData.map((s) => s.education_level)])
  ) as (EducationLevel | typeof FILTER_ALL_DEFAULT)[]

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
            educationLevelOptions={educationLevelOptions}
            filterEducationLevel={filterEducationLevel}
            setFilterEducationLevel={setFilterEducationLevel}
            countryName={countries.find((c) => c.id === countryId)?.name ?? ''}
            setFilterCountry={handleFilterCountry}
            setFilterSearch={setFilterName}
            setPage={setPage}
            countryOptions={countries.map((c) => c.name)}
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
        noDataText="table_no_data.schools"
        title="Schools reliability table"
      />
    </>
  )
}

function applyFilter({
  inputData,
  filterName,
  filterEducationLevel
}: {
  inputData: ISchool[]
  filterName: string
  filterEducationLevel: EducationLevel | typeof FILTER_ALL_DEFAULT
}) {
  if (filterName)
    inputData = inputData.filter(
      (school) => school.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    )

  if (filterEducationLevel !== FILTER_ALL_DEFAULT)
    inputData = inputData.filter((s) => s.education_level === filterEducationLevel)

  return inputData
}

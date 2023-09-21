import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router'
import { EducationLevel, ICountry, ISchool } from 'src/@types'
import { getSchools } from 'src/api/school'
import { useAuthContext } from 'src/auth/useAuthContext'
import { Banner } from 'src/components/banner'
import CustomDataTable from 'src/components/data-table/CustomDataTable'
import { useTable } from 'src/components/table'
import { FILTER_ALL_DEFAULT, FilterAll, KEY_DEFAULTS } from 'src/constants'
import { useBusinessContext } from 'src/context/business/BusinessContext'
import { useCustomSearchParams } from 'src/hooks/useCustomSearchParams'
import { useLocales } from 'src/locales'
import {
  SchoolReliabilityTableRow,
  SchoolReliabilityTableToolbar
} from 'src/sections/@dashboard/school/list'
import { removeDuplicates } from 'src/utils/arrays'
import { redirectOnError } from '../errors/handlers'

export default function SchoolReliabilityPage() {
  const navigate = useNavigate()
  const { page, rowsPerPage, setPage, setRowsPerPage } = useTable()
  const { user } = useAuthContext()
  const { countries } = useBusinessContext()

  const [countryId, setCountryId] = useState(user?.country.id)
  const [tableData, setTableData] = useState<ISchool[] | null>(null)

  const [searchParams, generateSetter] = useCustomSearchParams({
    filterName: '',
    filterEducationLevel: FILTER_ALL_DEFAULT,
    filterRegion: FILTER_ALL_DEFAULT
  })

  const { filterName, filterRegion, filterEducationLevel } = searchParams
  const setFilterName = generateSetter('filterName')
  const setFilterEducationLevel = generateSetter('filterEducationLevel')
  const setFilterRegion = generateSetter('filterRegion')

  const { translate } = useLocales()

  const TABLE_HEAD = [
    { key: 'name', header: translate('name') },
    { key: 'reliable_measures', header: translate('has_reliable_measure_data') },
    { key: 'external_id', header: 'Id' },
    { key: 'location1', header: translate('region') },
    { key: KEY_DEFAULTS[0], header: '' }
  ]

  useEffect(() => {
    getSchools(countryId)
      .then(setTableData)
      .catch((err) => redirectOnError(navigate, err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryId])

  const regionOptions = tableData
    ? removeDuplicates([FILTER_ALL_DEFAULT, ...tableData.map((s) => s.location1)])
    : []

  const dataFiltered = tableData
    ? applyFilter({
        inputData: tableData,
        filterName,
        filterRegion,
        filterEducationLevel
      })
    : null

  const isEmpty = Boolean(tableData && !tableData.length)
  const isNotFound = !isEmpty && Boolean(dataFiltered && !dataFiltered.length)

  const handleFilterCountry = (countryName: string) => {
    const selectedCountry = countries.find((c) => c.name === countryName) as ICountry
    setCountryId(selectedCountry.id)
  }

  const educationLevelOptions = tableData
    ? (removeDuplicates([FILTER_ALL_DEFAULT, ...tableData.map((s) => s.education_level)]) as (
        | EducationLevel
        | FilterAll
      )[])
    : []

  const selectedCountryName = countries?.find((c) => c.id === countryId)?.name ?? ''

  return (
    <>
      <Helmet>
        <title> Schools: List | Gigacounts</title>
      </Helmet>

      <Banner
        subtitle={selectedCountryName ? `${selectedCountryName}` : ''}
        title={translate('schools_reliability')}
      />

      <CustomDataTable
        isSortable
        RowComponent={SchoolReliabilityTableRow}
        ToolbarContent={
          <SchoolReliabilityTableToolbar
            setFilterRegion={setFilterRegion}
            filterRegion={filterRegion}
            regionOptions={regionOptions}
            educationLevelOptions={educationLevelOptions}
            filterEducationLevel={filterEducationLevel}
            setFilterEducationLevel={setFilterEducationLevel}
            countryName={countries.find((c) => c.id === countryId)?.name ?? ''}
            setFilterCountry={handleFilterCountry}
            setFilterSearch={setFilterName}
            setPage={setPage}
            countryOptions={countries.map((c) => c.name)}
            filterSearch={filterName}
          />
        }
        data={dataFiltered}
        page={page}
        setPage={setPage}
        isNotFound={isNotFound}
        isEmpty={isEmpty}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        tableHead={TABLE_HEAD}
        tableName="schools-reliability"
        emptyText="table_no_data.schools"
        title="Schools reliability table"
      />
    </>
  )
}

function applyFilter({
  inputData,
  filterName,
  filterRegion,
  filterEducationLevel
}: {
  inputData: ISchool[]
  filterName: string
  filterRegion: string
  filterEducationLevel: string
}) {
  if (filterName)
    inputData = inputData.filter(
      (school) =>
        school.name.toLowerCase().includes(filterName.toLowerCase()) ||
        school.external_id.toLowerCase().includes(filterName.toLowerCase())
    )

  if (filterEducationLevel !== FILTER_ALL_DEFAULT)
    inputData = inputData.filter((s) => s.education_level === filterEducationLevel)

  if (filterRegion !== FILTER_ALL_DEFAULT)
    inputData = inputData.filter((s) => s.location1 === filterRegion)

  return inputData
}

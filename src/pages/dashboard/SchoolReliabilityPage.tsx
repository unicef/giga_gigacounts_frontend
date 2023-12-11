import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router'
import { EducationLevel, ICountry, ISchool } from 'src/@types'
import { getSchoolsByNameOrExternalId, getSchoolsPagination } from 'src/api/school'
import { useAuthContext } from 'src/auth/useAuthContext'
import { Banner } from 'src/components/banner'
import CustomDataTable from 'src/components/data-table/CustomDataTable'
import { useTable } from 'src/components/table'
import { FILTER_ALL_DEFAULT, FilterAll, KEY_DEFAULTS } from 'src/constants'
import { useBusinessContext } from 'src/context/business/BusinessContext'
import { useCustomSearchParams } from 'src/hooks/useCustomSearchParams'
import { useDebounce } from 'src/hooks/useDebounce'
import { useLocales } from 'src/locales'
import {
  SchoolReliabilityTableRow,
  SchoolReliabilityTableToolbar
} from 'src/sections/@dashboard/school/list'
import { removeDuplicates } from 'src/utils/arrays'
import { redirectOnError } from 'src/utils/errorHandlers'

export default function SchoolReliabilityPage() {
  const navigate = useNavigate()
  const { page, rowsPerPage, setPage, setRowsPerPage } = useTable()
  const { user, isAdmin } = useAuthContext()
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

  const debouncedFilterName = useDebounce(filterName, 500)
  const [schoolPage, setSchoolPage] = useState(1)
  const [total, setTotal] = useState(1)
  const [disablePagination, setDisablePagination] = useState(false)

  const handleReset = () => {
    setSchoolPage(1)
    setPage(1)
    setDisablePagination(false)
    if (schoolPage !== 1) {
      setTableData(null)
    }
  }

  useEffect(() => {
    if (!debouncedFilterName) {
      handleReset()
      return
    }
    setDisablePagination(true)
    getSchoolsByNameOrExternalId(countryId, debouncedFilterName)
      .then((res) => {
        setTotal(res.length)
        if (!res || res.length === 0) {
          setTableData([])
          return
        }
        setTableData(res)
      })
      .catch(() => setTableData([]))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedFilterName])

  useEffect(() => {
    if (!tableData || disablePagination) return
    if (page * rowsPerPage > tableData.length - 5) setSchoolPage(schoolPage + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage])

  const fetchPage = (country_id: string, pageToFetch: number) => {
    getSchoolsPagination(country_id, pageToFetch, 30)
      .then(({ data, meta }) => {
        setTotal(meta.total)
        if ((!data || data.length === 0) && pageToFetch === 1) {
          setTableData([])
          return
        }
        setTableData((prev) => (prev ? [...prev, ...data] : data))
      })
      .catch((err) => redirectOnError(navigate, err))
  }

  useEffect(() => {
    handleReset()
    setTableData(null)
    setFilterName('')
    if (schoolPage === 1 && countryId !== user?.country.id) fetchPage(countryId, 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryId])

  useEffect(() => {
    if (!countryId || disablePagination) return
    fetchPage(countryId, schoolPage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schoolPage, disablePagination])

  const regionOptions = tableData
    ? removeDuplicates([FILTER_ALL_DEFAULT, ...tableData.map((s) => s.location1)])
    : []

  const dataFiltered = tableData
    ? applyFilter({
        inputData: tableData,
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
        subtitle={selectedCountryName && isAdmin ? selectedCountryName : ''}
        title={translate('schools_reliability')}
      />

      <CustomDataTable
        isSortable
        RowComponent={SchoolReliabilityTableRow}
        customCount={total}
        getRowComponentProps={(row) => ({
          setReliabilityInTable: (newChecked: boolean) => {
            setTableData((prev) => {
              if (!tableData) return prev
              const indexToChange = tableData.findIndex((r) => row.external_id === r.external_id)
              if (indexToChange === -1) return prev
              const newTableData = [...tableData]
              newTableData[indexToChange] = {
                ...newTableData[indexToChange],
                reliable_measures: newChecked
              }
              return newTableData
            })
          }
        })}
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
      />
    </>
  )
}

function applyFilter({
  inputData,
  filterRegion,
  filterEducationLevel
}: {
  inputData: ISchool[]
  filterRegion: string
  filterEducationLevel: string
}) {
  if (filterEducationLevel !== FILTER_ALL_DEFAULT)
    inputData = inputData.filter((s) => s.education_level === filterEducationLevel)

  if (filterRegion !== FILTER_ALL_DEFAULT)
    inputData = inputData.filter((s) => s.location1 === filterRegion)

  return inputData
}

import moment from 'moment'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router'
import {
  EducationLevel,
  ICountry,
  ISchool,
  ISchoolContact,
  ISchoolMeasuresExtended,
  Metric,
  MetricCamel,
  MetricSnake
} from 'src/@types'
import {
  getSchoolMeasures,
  getSchoolsByNameOrExternalId,
  getSchoolsPagination
} from 'src/api/school'
import { useAuthContext } from 'src/auth/useAuthContext'
import { Banner } from 'src/components/banner'
import CustomDataTable from 'src/components/data-table/CustomDataTable'
import { useTable } from 'src/components/table'
import { Footer } from 'src/components/typography'
import { FILTER_ALL_DEFAULT, FilterAll, KEY_DEFAULTS } from 'src/constants'
import { useBusinessContext } from 'src/context/business/BusinessContext'
import { useCustomSearchParams } from 'src/hooks/useCustomSearchParams'
import { useDebounce } from 'src/hooks/useDebounce'
import { useLocales } from 'src/locales'
import { MeasureTableRow, MeasureTableToolbar } from 'src/sections/@dashboard/measures/list'
import { removeDuplicates } from 'src/utils/arrays'
import { getConnectivityStatus } from 'src/utils/connectivity'
import { formatDate } from 'src/utils/date'
import { redirectOnError } from 'src/utils/errorHandlers'
import { capitalizeFirstLetter } from 'src/utils/strings'

export default function MeasuresListPage() {
  const { page, rowsPerPage, setPage, setRowsPerPage } = useTable({
    defaultOrderBy: 'name'
  })
  const { user, isAdmin } = useAuthContext()
  const { countries } = useBusinessContext()
  const [schools, setSchools] = useState<ISchool[] | null>(null)
  const { translate } = useLocales()
  const navigate = useNavigate()
  const [countryId, setCountryId] = useState(user?.country?.id)
  const [tableData, setTableData] = useState<ISchoolMeasuresExtended[] | null>(null)
  const [total, setTotal] = useState(0)
  const [searchParams, generateSetter] = useCustomSearchParams({
    filterName: '',
    filterEducationLevel: FILTER_ALL_DEFAULT,
    filterRegion: FILTER_ALL_DEFAULT,
    filterStatus: FILTER_ALL_DEFAULT
  })
  const [disablePagination, setDisablePagination] = useState(false)
  const today = moment().toISOString()
  const yesterday = moment().subtract(1, 'day').toISOString()
  const { filterName, filterRegion, filterStatus, filterEducationLevel } = searchParams
  const setFilterName = generateSetter('filterName')
  const debouncedFilterName = useDebounce(filterName, 500)

  const handleReset = () => {
    setSchoolPage(1)
    setPage(1)
    setDisablePagination(false)
    if (schoolPage !== 1) {
      setTableData(null)
      setSchools([])
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
          setSchools([])
          return
        }
        setSchools(res)
        res.forEach((s) =>
          getSchoolMeasures(s.id, 'day', yesterday, today).then((ms) => {
            const addToTable = ms.map((m) => ({
              ...m,
              school_id: s.id,
              school_name: s.name,
              school_education_level: s.education_level,
              school_external_id: s.external_id,
              school_location1: s.location1
            }))
            setTableData(addToTable)
          })
        )
      })
      .catch(() => setSchools([]))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedFilterName])

  const setFilterEducationLevel = generateSetter('filterEducationLevel')
  const setFilterRegion = generateSetter('filterRegion')
  const setFilterStatus = generateSetter('filterStatus')

  const TABLE_HEAD = [
    { key: 'school_name', header: translate('name') },
    { key: 'connectivityValue', header: translate('status') },
    { key: 'school_external_id', header: 'ID' },
    { key: 'date', header: translate('day') },
    { key: MetricCamel.Uptime, header: `${translate(MetricSnake.Uptime)} *` },
    { key: MetricCamel.Latency, header: `${translate(MetricSnake.Latency)} *` },
    { key: MetricCamel.DownloadSpeed, header: `${translate(MetricSnake.DownloadSpeed)} *` },
    { key: MetricCamel.UploadSpeed, header: `${translate(MetricSnake.UploadSpeed)} *` },
    { key: KEY_DEFAULTS[0], header: '' },
    { key: KEY_DEFAULTS[1], header: '' }
  ]

  const [schoolPage, setSchoolPage] = useState(1)

  useEffect(() => {
    if (!schools || disablePagination) return
    if (page * rowsPerPage > schools.length - 5) setSchoolPage(schoolPage + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage])

  const fetchPage = (country_id: string, pageToFetch: number) => {
    getSchoolsPagination(country_id, pageToFetch, 30)
      .then(({ data, meta }) => {
        setTotal(meta.total)
        if (!data || (data.length === 0 && pageToFetch === 1)) {
          setTableData([])
          return
        }
        setSchools((prev) => (prev ? [...prev, ...data] : data))
        data.forEach((s) =>
          getSchoolMeasures(s.id, 'day', yesterday, today).then((ms) => {
            const addToTable = ms.map((m) => ({
              ...m,
              school_id: s.id,
              school_name: s.name,
              school_education_level: s.education_level,
              school_external_id: s.external_id,
              school_location1: s.location1
            }))
            setTableData((prev) => (prev ? [...prev, ...addToTable] : addToTable))
          })
        )
      })
      .catch((err) => redirectOnError(navigate, err))
  }

  useEffect(() => {
    handleReset()
    setTableData(null)
    setSchools([])
    setFilterName('')
    if (schoolPage === 1 && countryId !== user?.country?.id) fetchPage(countryId, 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryId])

  useEffect(() => {
    if (!countryId || disablePagination) return
    fetchPage(countryId, schoolPage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schoolPage, disablePagination])

  const schoolsWithLatestMetrics =
    tableData && schools
      ? schools?.map((s) => {
          const latestMetrics = tableData?.filter((m) => m.school_external_id === s.external_id)
          const connectivityValue = latestMetrics.at(0)?.connection.value ?? null
          const metrics =
            latestMetrics && latestMetrics.length > 0
              ? {
                  date: formatDate(latestMetrics.at(0)?.date, '/') || formatDate(yesterday, '/'),
                  [MetricCamel.Uptime]:
                    latestMetrics.find((m) => m.metric_name === Metric.Uptime)?.median_value ??
                    null,
                  [MetricCamel.Latency]:
                    latestMetrics.find((m) => m.metric_name === Metric.Latency)?.median_value ??
                    null,
                  [MetricCamel.DownloadSpeed]:
                    latestMetrics.find((m) => m.metric_name === Metric.DownloadSpeed)
                      ?.median_value ?? null,
                  [MetricCamel.UploadSpeed]:
                    latestMetrics.find((m) => m.metric_name === Metric.UploadSpeed)?.median_value ??
                    null
                }
              : {
                  date: formatDate(yesterday, '/'),
                  [MetricCamel.Uptime]: null,
                  [MetricCamel.Latency]: null,
                  [MetricCamel.DownloadSpeed]: null,
                  [MetricCamel.UploadSpeed]: null
                }
          return {
            id: s.id,
            school_external_id: s.external_id,
            school_location1: s.location1,
            school_name: s.name,
            school_contact: {
              contactPerson: s.contact_person,
              email: s.email,
              phoneNumber: s.phone_number
            },
            school_education_level: s.education_level,
            connectivityValue,
            ...metrics
          }
        })
      : null

  const regionOptions = schoolsWithLatestMetrics
    ? removeDuplicates([
        FILTER_ALL_DEFAULT,
        ...schoolsWithLatestMetrics.map((m) =>
          m.school_location1
            ? capitalizeFirstLetter(m.school_location1.toLowerCase())
            : FILTER_ALL_DEFAULT
        )
      ])
    : []

  const dataFiltered = schoolsWithLatestMetrics
    ? applyFilter({
        inputData: schoolsWithLatestMetrics,
        filterRegion,
        filterEducationLevel,
        filterStatus
      })
    : null

  const EDUCATION_LEVEL_OPTIONS = tableData
    ? (removeDuplicates([
        FILTER_ALL_DEFAULT,
        ...tableData.map((s) => s.school_education_level)
      ]) as (EducationLevel | FilterAll)[])
    : []
  const isEmpty = Boolean(schoolsWithLatestMetrics && !schoolsWithLatestMetrics.length)
  const isNotFound = !isEmpty && Boolean(dataFiltered && !dataFiltered.length)

  const handleFilterCountry = (countryName: string) => {
    const selectedCountry = countries.find((c) => c.name === countryName) as ICountry
    setCountryId(selectedCountry?.id)
  }

  const selectedCountryName = countries?.find((c) => c.id === countryId)?.name ?? ''

  return (
    <>
      <Helmet>
        <title> Connectivity: List | Gigacounts</title>
      </Helmet>

      <Banner
        subtitle={selectedCountryName && isAdmin ? selectedCountryName : ''}
        title={translate('schools_connectivity')}
      />

      <CustomDataTable
        customCount={total}
        isSortable
        RowComponent={MeasureTableRow}
        getRowComponentProps={(row) => ({
          schoolId: row.id,
          contactInformation: row.school_contact
        })}
        ToolbarContent={
          <MeasureTableToolbar
            filterStatus={filterStatus}
            filterName={filterName}
            countryName={selectedCountryName}
            educationLevelOptions={EDUCATION_LEVEL_OPTIONS}
            regionOptions={regionOptions}
            filterRegion={filterRegion}
            setFilterRegion={setFilterRegion}
            filterEducationLevel={filterEducationLevel}
            setFilterEducationLevel={setFilterEducationLevel}
            setFilterSearch={setFilterName}
            setFilterCountry={handleFilterCountry}
            setFilterStatus={setFilterStatus}
            setPage={setPage}
            countryOptions={countries.map((c) => c.name)}
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
        tableName="measures-all"
        emptyText="table_no_data.measures"
      />
      <Footer text={translate('tooltips.measures_24')} required />
    </>
  )
}

function applyFilter({
  inputData,
  filterRegion,
  filterEducationLevel,
  filterStatus
}: {
  inputData: ({
    id: string
    date: string
    school_name: string
    school_education_level: string
    school_external_id: string
    school_location1: string
    school_contact: ISchoolContact
    connectivityValue: number | null
  } & { [K in MetricCamel]: number | null })[]
  filterRegion: string
  filterEducationLevel: string
  filterStatus: string
}) {
  if (filterEducationLevel !== FILTER_ALL_DEFAULT)
    inputData = inputData.filter(
      (measure) => measure.school_education_level === filterEducationLevel
    )

  if (filterRegion !== FILTER_ALL_DEFAULT)
    inputData = inputData.filter(
      (measure) =>
        measure.school_location1 &&
        measure.school_location1.toLowerCase() === filterRegion.toLowerCase()
    )

  if (filterStatus !== FILTER_ALL_DEFAULT)
    inputData = inputData.filter(
      (measure) => getConnectivityStatus(measure.connectivityValue) === filterStatus
    )

  return inputData
}

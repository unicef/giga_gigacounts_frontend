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
import { getAllSchoolMeasures, getSchools } from 'src/api/school'
import { useAuthContext } from 'src/auth/useAuthContext'
import { Banner } from 'src/components/banner'
import CustomDataTable from 'src/components/data-table/CustomDataTable'
import { useTable } from 'src/components/table'
import { Typography } from 'src/components/typography'
import { FILTER_ALL_DEFAULT, FilterAll, KEY_DEFAULTS } from 'src/constants'
import { useBusinessContext } from 'src/context/business/BusinessContext'
import { useCustomSearchParams } from 'src/hooks/useCustomSearchParams'
import { useLocales } from 'src/locales'
import { MeasureTableRow, MeasureTableToolbar } from 'src/sections/@dashboard/measures/list'
import { useTheme } from 'src/theme'
import { removeDuplicates } from 'src/utils/arrays'
import { getConnectivityStatus } from 'src/utils/connectivity'
import { formatDate } from 'src/utils/date'
import { capitalizeFirstLetter } from 'src/utils/strings'
import { redirectOnError } from '../errors/handlers'

export default function MeasuresListPage() {
  const { page, rowsPerPage, setPage, setRowsPerPage } = useTable({
    defaultOrderBy: 'name'
  })
  const { user } = useAuthContext()
  const { countries } = useBusinessContext()
  const { spacing } = useTheme()
  const [schools, setSchools] = useState<ISchool[] | null>(null)
  const { translate } = useLocales()
  const navigate = useNavigate()

  const [tableData, setTableData] = useState<ISchoolMeasuresExtended[] | null>(null)

  const [searchParams, generateSetter] = useCustomSearchParams({
    filterName: '',
    filterEducationLevel: FILTER_ALL_DEFAULT,
    filterRegion: FILTER_ALL_DEFAULT,
    filterStatus: FILTER_ALL_DEFAULT
  })

  const { filterName, filterRegion, filterStatus, filterEducationLevel } = searchParams
  const setFilterName = generateSetter('filterName')
  const setFilterEducationLevel = generateSetter('filterEducationLevel')
  const setFilterRegion = generateSetter('filterRegion')
  const setFilterStatus = generateSetter('filterStatus')

  const [countryId, setCountryId] = useState(user?.country.id)

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

  useEffect(() => {
    if (!countryId) return
    getSchools(countryId)
      .then(setSchools)
      .catch((err) => redirectOnError(navigate, err))
    getAllSchoolMeasures('day')
      .then(setTableData)
      .catch(() => setTableData([]))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryId])

  const yesterday = moment().subtract(2, 'day')

  const schoolsWithLatestMetrics =
    tableData && schools
      ? schools?.map((s) => {
          const latestMetrics = tableData?.filter(
            (m) => m.school_external_id === s.external_id && moment(m.date).isSame(yesterday, 'day')
          )
          const connectivityValue = latestMetrics.at(0)?.connection.value ?? null
          const metrics =
            latestMetrics && latestMetrics.length > 0
              ? {
                  date:
                    formatDate(latestMetrics.at(0)?.date, '/') ||
                    formatDate(moment().subtract(1, 'day').toISOString(), '/'),
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
                  date: formatDate(moment().subtract(1, 'day').toISOString(), '/'),
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
        filterName,
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
    setCountryId(selectedCountry.id)
  }

  const selectedCountryName = countries?.find((c) => c.id === countryId)?.name ?? ''

  return (
    <>
      <Helmet>
        <title> Connectivity: List | Gigacounts</title>
      </Helmet>

      <Banner
        subtitle={selectedCountryName ? `${selectedCountryName}` : ''}
        title={translate('schools_connectivity')}
      />

      <CustomDataTable
        isSortable
        RowComponent={MeasureTableRow}
        getRowComponentProps={(row) => ({
          contactInformation: row.school_contact,
          measures: tableData?.filter((m) => m.school_external_id === row.school_external_id) ?? []
        })}
        ToolbarContent={
          <MeasureTableToolbar
            filterStatus={filterStatus}
            filterName={filterName}
            countryName={countries.find((c) => c.id === countryId)?.name ?? ''}
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
        title="Measures all table"
      />
      <Typography
        style={{ paddingBlock: spacing.md, paddingInline: spacing.xs }}
        variant="textTertiary"
        size={12}
      >
        * {translate('tooltips.measures_24')}
      </Typography>
    </>
  )
}

function applyFilter({
  inputData,
  filterName,
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
  filterName: string
  filterRegion: string
  filterEducationLevel: string
  filterStatus: string
}) {
  if (filterName)
    inputData = inputData.filter(
      (measure) =>
        measure.school_name.toLowerCase().includes(filterName.toLowerCase()) ||
        measure.school_external_id.toLowerCase().includes(filterName.toLowerCase())
    )

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

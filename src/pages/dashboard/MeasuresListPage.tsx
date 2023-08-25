import { groupBy } from 'lodash'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { EducationLevel, ISchoolMeasuresExtended } from 'src/@types'
import { getAllSchoolMeasures } from 'src/api/school'
import { Banner } from 'src/components/banner'
import CustomDataTable from 'src/components/data-table/CustomDataTable'
import { useTable } from 'src/components/table'
import { FILTER_ALL_DEFAULT } from 'src/constants'
import { useBusinessContext } from 'src/context/business/BusinessContext'
import { useLocales } from 'src/locales'
import { MeasureTableRow, MeasureTableToolbar } from 'src/sections/@dashboard/measures/list'
import { removeDuplicates } from 'src/utils/arrays'
import { formatDate } from 'src/utils/date'

export default function MeasuresListPage() {
  const { page, rowsPerPage, setPage, setRowsPerPage } = useTable({
    defaultOrderBy: 'name'
  })
  const { schools } = useBusinessContext()
  const { translate } = useLocales()

  const [tableData, setTableData] = useState<ISchoolMeasuresExtended[] | null>(null)
  const [filterName, setFilterName] = useState('')
  const [filterEducationLevel, setFilterEducationLevel] = useState<
    EducationLevel | typeof FILTER_ALL_DEFAULT
  >(FILTER_ALL_DEFAULT)
  const [filterRegion, setFilterRegion] = useState<string>(FILTER_ALL_DEFAULT)

  const TABLE_HEAD = [
    { key: 'school_name', header: translate('name') },
    { key: 'school_external_id', header: 'ID' },
    { key: 'date', header: translate('day') },
    { key: 'uptime', header: translate('uptime') },
    { key: 'latency', header: translate('latency') },
    { key: 'downloadSpeed', header: translate('download_speed') },
    { key: 'uploadSpeed', header: translate('upload_speed') }
  ]
  useEffect(() => {
    getAllSchoolMeasures('day')
      .then(setTableData)
      .catch(() => setTableData([]))
  }, [schools])

  const measuresByDay = tableData
    ? Object.entries(groupBy(tableData, (m) => m.school_external_id)).map(([key, value]) => ({
        school_external_id: key,
        school_location1: value.at(0)?.school_location1 || '' as string,
        school_name: value.at(0)?.school_name as string,
        school_education_level: value.at(0)?.school_education_level as string,
        metrics: Object.entries(groupBy(value, (m) => formatDate(m.date))).map(
          ([date, metricArr]) => ({
            date,
            uptime: metricArr.find((m) => m.metric_name === 'Uptime')?.median_value ?? null,
            latency: metricArr.find((m) => m.metric_name === 'Latency')?.median_value ?? null,
            downloadSpeed:
              metricArr.find((m) => m.metric_name === 'Upload speed')?.median_value ?? null,
            uploadSpeed:
              metricArr.find((m) => m.metric_name === 'Download speed')?.median_value ?? null
          })
        )
      }))
    : null

  const regionOptions = measuresByDay
    ? removeDuplicates([
        FILTER_ALL_DEFAULT,
        ...measuresByDay.map((m) => (m.school_location1 || '').toLowerCase())
      ])
    : []

  const dataFiltered = measuresByDay
    ? applyFilter({
        inputData: measuresByDay,
        filterName,
        filterRegion,
        filterEducationLevel
      }).reduce(
        (prev, curr) =>
          prev.concat(
            curr.metrics.map((m) => ({
              ...m,
              id: `${curr.school_external_id}:${m.date}`,
              school_name: curr.school_name,
              school_external_id: curr.school_external_id,
              school_education_level: curr.school_education_level
            }))
          ),
        [] as {
          id: string
          school_name: string
          school_external_id: string
          school_education_level: string
          uptime: number | null
          latency: number | null
          downloadSpeed: number | null
          uploadSpeed: number | null
          date: string
        }[]
      )
    : null

  const EDUCATION_LEVEL_OPTIONS = tableData
    ? (removeDuplicates([
        FILTER_ALL_DEFAULT,
        ...tableData.map((s) => s.school_education_level)
      ]) as (EducationLevel | typeof FILTER_ALL_DEFAULT)[])
    : []

  const isNotFound = Boolean(dataFiltered && !dataFiltered.length)

  return (
    <>
      <Helmet>
        <title> Connectivity: List | Gigacounts</title>
      </Helmet>

      <Banner title={translate('connectivity_list')} />

      <CustomDataTable
        isSortable
        RowComponent={MeasureTableRow}
        ToolbarContent={
          <MeasureTableToolbar
            educationLevelOptions={EDUCATION_LEVEL_OPTIONS}
            regionOptions={regionOptions}
            filterRegion={filterRegion}
            setFilterRegion={setFilterRegion}
            filterEducationLevel={filterEducationLevel}
            setFilterEducationLevel={setFilterEducationLevel}
            setFilterSearch={setFilterName}
            setPage={setPage}
          />
        }
        data={dataFiltered}
        page={page}
        setPage={setPage}
        isNotFound={isNotFound}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        tableHead={TABLE_HEAD}
        tableName="measures-all"
        noDataText="table_no_data.measures"
        title="Measures all table"
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
  inputData: {
    metrics: {
      date: string
      uptime: number | null
      downloadSpeed: number | null
      uploadSpeed: number | null
      latency: number | null
    }[]
    school_name: string
    school_education_level: string
    school_external_id: string
    school_location1: string
  }[]
  filterName: string
  filterRegion: string
  filterEducationLevel: EducationLevel | typeof FILTER_ALL_DEFAULT
}) {
  if (filterName)
    inputData = inputData.filter(
      (measure) => measure.school_name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    )

  if (filterEducationLevel !== FILTER_ALL_DEFAULT)
    inputData = inputData.filter(
      (measure) => measure.school_education_level === filterEducationLevel
    )

  if (filterRegion !== FILTER_ALL_DEFAULT)
    inputData = inputData.filter(
      (measure) => measure.school_location1.toLowerCase() === filterRegion.toLowerCase()
    )

  return inputData
}

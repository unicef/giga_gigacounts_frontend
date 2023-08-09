import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { EducationLevel, ISchoolMeasuresExtended } from 'src/@types'
import { getAllSchoolMeasures } from 'src/api/school'
import { Banner } from 'src/components/banner'
import CustomDataTable from 'src/components/data-table/CustomDataTable'
import { useTable } from 'src/components/table'
import { FILTER_ALL_DEFAULT } from 'src/constants'
import { useBusinessContext } from 'src/context/BusinessContext'
import { useLocales } from 'src/locales'
import { MeasureTableRow, MeasureTableToolbar } from 'src/sections/@dashboard/measures/list'

export default function MeasuresListPage() {
  const { page, rowsPerPage, setPage, setRowsPerPage } = useTable({
    defaultOrderBy: 'name'
  })
  const { schools } = useBusinessContext()
  const { translate } = useLocales()

  const [tableData, setTableData] = useState<ISchoolMeasuresExtended[]>([])
  const [filterName, setFilterName] = useState('')
  const [filterEducationLevel, setFilterEducationLevel] = useState<
    EducationLevel | typeof FILTER_ALL_DEFAULT
  >(FILTER_ALL_DEFAULT)

  const TABLE_HEAD = [
    { key: 'school_name', header: translate('name') },
    { key: 'school_external_id', header: 'ID' },
    { key: 'date', header: translate('day') },
    { key: 'metric_name', header: translate('metric_name') },
    { key: 'median_value', header: translate('median_value') }
  ]

  useEffect(() => {
    getAllSchoolMeasures('day').then(setTableData)
  }, [schools])

  const dataFiltered = applyFilter({
    inputData: tableData,
    filterName,
    filterEducationLevel
  })

  const EDUCATION_LEVEL_OPTIONS = Array.from(
    new Set([FILTER_ALL_DEFAULT, ...tableData.map((s) => s.school_education_level)])
  ) as (EducationLevel | typeof FILTER_ALL_DEFAULT)[]

  const isNotFound = !dataFiltered.length

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
            filterEducationLevel={filterEducationLevel}
            setFilterEducationLevel={setFilterEducationLevel}
            setFilterSearch={setFilterName}
            setPage={setPage}
          />
        }
        data={dataFiltered.map((m) => ({ ...m, id: m.measure_id }))}
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
  filterEducationLevel
}: {
  inputData: ISchoolMeasuresExtended[]
  filterName: string
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

  return inputData
}

import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ContractDetails,
  EducationLevel,
  IContractSchools,
  ISchoolMeasures,
  Metric,
  MetricCamel,
  MetricSnake,
  MinMax
} from 'src/@types';
import { getContractSchools } from 'src/api/contracts';
import { getSchoolMeasures } from 'src/api/school';
import CustomDataTable from 'src/components/data-table/CustomDataTable';
import { useTable } from 'src/components/table';
import { Footer } from 'src/components/typography';
import { FILTER_ALL_DEFAULT, FilterAll, KEY_DEFAULTS, STRING_DEFAULT } from 'src/constants';
import { useCustomSearchParams } from 'src/hooks/useCustomSearchParams';
import { useLocales } from 'src/locales';
import {
  ConnectivityTableRow,
  ConnectivityTableToolbar
} from 'src/sections/@dashboard/connectivity/list';
import { removeDuplicates, resolvePromises } from 'src/utils/arrays';
import { getConnectivityStatus } from 'src/utils/connectivity';
import { redirectOnError } from 'src/utils/errorHandlers';

export default function ConnectionTab({
  contract,
  expectedValues
}: {
  contract: ContractDetails
  expectedValues: { [K in MetricCamel]: number }
}) {
  const { translate } = useLocales()
  const navigate = useNavigate()

  const TABLE_HEAD = [
    { key: 'name', header: translate('name') },
    { key: 'connectivityValue', header: translate('status') },
    { key: 'external_id', header: 'ID' },
    { key: 'budget', header: translate('budget') },
    { key: MetricCamel.Uptime, header: `${translate(MetricSnake.Uptime)} *` },
    { key: MetricCamel.Latency, header: `${translate(MetricSnake.Latency)} *` },
    { key: MetricCamel.DownloadSpeed, header: `${translate(MetricSnake.DownloadSpeed)} *` },
    { key: MetricCamel.UploadSpeed, header: `${translate(MetricSnake.UploadSpeed)} *` },
    { key: KEY_DEFAULTS[0], header: '' },
    { key: KEY_DEFAULTS[1], header: '' }
  ]

  const { page, rowsPerPage, setPage, setRowsPerPage } = useTable({
    defaultOrderBy: 'name'
  })

  const [measures, setMeasures] = useState<{ measures: ISchoolMeasures[]; school_id: string }[]>([])

  const [tableData, setTableData] = useState<IContractSchools[] | null>(null)

  const [searchParams, generateSetter] = useCustomSearchParams({
    filterSchoolName: '',
    filterEducationLevel: FILTER_ALL_DEFAULT,
    filterRegion: FILTER_ALL_DEFAULT,
    filterSchoolStatus: FILTER_ALL_DEFAULT,
    filterBudgetMin: '',
    filterBudgetMax: ''
  })
  const {
    filterSchoolName: filterName,
    filterBudgetMax,
    filterBudgetMin,
    filterEducationLevel,
    filterRegion,
    filterSchoolStatus: filterStatus
  } = searchParams
  const filterBudget = { max: filterBudgetMax, min: filterBudgetMin }
  const setFilterName = generateSetter('filterSchoolName')
  const setFilterEducationLevel = generateSetter('filterEducationLevel')
  const setFilterRegion = generateSetter('filterRegion')
  const setFilterStatus = generateSetter('filterSchoolStatus')
  const setFilterBudget = {
    max: generateSetter('filterBudgetMax'),
    min: generateSetter('filterBudgetMin')
  }

  useEffect(() => {
    getContractSchools(contract.id)
      .then(setTableData)
      .catch(() => setTableData([]))
  }, [contract.id])

  const today = moment().toISOString()
  const yesterday = moment().subtract(1, 'day').toISOString()

  useEffect(() => {
    if (contract.id && tableData)
      resolvePromises(
        tableData,
        (row) => getSchoolMeasures(row.id, 'day', yesterday, today, contract.id),
        (res, row) => setMeasures((prev) => [...prev, { measures: res, school_id: row?.id ?? '' }]),
        (err) => redirectOnError(navigate, err)
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract.id, tableData])

  const dataFiltered = tableData
    ? applyFilter({
        inputData: tableData,
        filterName,
        filterBudget,
        filterRegion,
        filterEducationLevel,
        filterStatus
      })
    : null

  const regionOptions = tableData
    ? removeDuplicates([
        FILTER_ALL_DEFAULT,
        ...tableData.map((m) => m.locations.split(',').at(0)?.toLowerCase() ?? FILTER_ALL_DEFAULT)
      ])
    : []
  const educationLevelOptions = tableData
    ? (removeDuplicates([FILTER_ALL_DEFAULT, ...tableData.map((s) => s.educationLevel)]) as (
        | EducationLevel
        | FilterAll
      )[])
    : []

  const isEmpty = Boolean(tableData && !tableData.length)
  const isNotFound = !isEmpty && Boolean(dataFiltered && !dataFiltered.length)

  const getSpecificMeasure = (measureName: Metric, school_id: string) => {
    if (!measures) return STRING_DEFAULT
    const school = measures.find((m) => m.school_id === school_id)
    if (!school) return STRING_DEFAULT
    const measure = school.measures.find((m) => m.metric_name === measureName)
    if (!measure || !measure.unit) return STRING_DEFAULT
    return `${measure.median_value ?? ''} ${measure.unit ?? ''}`
  }

  const getMeasures = (school_id: string) => {
    if (!measures) return []
    const school = measures.find((m) => m.school_id === school_id)
    if (!school) return []
    return school.measures
  }

  return (
    <>
      <CustomDataTable
        isSortable
        RowComponent={ConnectivityTableRow}
        getRowComponentProps={(row) => ({
          measures: getMeasures(row.id),
          budget: row.budget,
          currencyCode: contract.currency?.code,
          contactInformation: row.contactInformation,
          expectedValues,
          schoolId: row.id
        })}
        ToolbarContent={
          <ConnectivityTableToolbar
            filterStatus={filterStatus}
            filterSearch={filterName}
            setFilterStatus={setFilterStatus}
            filterRegion={filterRegion}
            regionOptions={regionOptions}
            setFilterRegion={setFilterRegion}
            educationLevelOptions={educationLevelOptions}
            filterEducationLevel={filterEducationLevel}
            setFilterEducationLevel={setFilterEducationLevel}
            setFilterSearch={setFilterName}
            setFilterBudget={setFilterBudget}
            filterBudget={filterBudget}
            setPage={setPage}
          />
        }
        data={
          dataFiltered
            ? [...dataFiltered]
                .map((row) => {
                  const locations = row.locations.split(',')
                  return {
                    ...row,
                    [MetricCamel.Uptime]: getSpecificMeasure(Metric.Uptime, row.id),
                    [MetricCamel.Latency]: getSpecificMeasure(Metric.Latency, row.id),
                    [MetricCamel.DownloadSpeed]: getSpecificMeasure(Metric.DownloadSpeed, row.id),
                    [MetricCamel.UploadSpeed]: getSpecificMeasure(Metric.UploadSpeed, row.id),
                    external_id: row.externalId,
                    location_1: locations[0],
                    location_2: locations[1],
                    location_3: locations[3],
                    connectivityValue: row.connection.value
                  }
                })
                .sort((a, b) => a.name.localeCompare(b.name))
            : null
        }
        page={page}
        setPage={setPage}
        isNotFound={isNotFound}
        isEmpty={isEmpty}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        tableHead={TABLE_HEAD}
        tableName="connectivity"
        emptyText="table_no_data.schools"
      />
      <Footer text={translate('tooltips.measures_24')} required />
    </>
  )
}

function applyFilter({
  inputData,
  filterName,
  filterBudget,
  filterEducationLevel,
  filterRegion,
  filterStatus
}: {
  inputData: IContractSchools[]
  filterName: string
  filterBudget: MinMax<string>
  filterRegion: string
  filterEducationLevel: string
  filterStatus: string
}) {
  if (filterName)
    inputData = inputData.filter(
      (school) =>
        school.name.toLowerCase().includes(filterName.toLowerCase()) ||
        school.externalId.toLowerCase().includes(filterName.toLowerCase())
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
    inputData = inputData.filter((school) => school.educationLevel === filterEducationLevel)
  if (filterRegion !== FILTER_ALL_DEFAULT)
    inputData = inputData.filter(
      (school) =>
        (school.locations.split(',').at(0)?.toLowerCase() ?? '') === filterRegion.toLowerCase()
    )
  if (filterStatus !== FILTER_ALL_DEFAULT)
    inputData = inputData.filter(
      (school) => getConnectivityStatus(school.connection.value) === filterStatus
    )

  return inputData
}

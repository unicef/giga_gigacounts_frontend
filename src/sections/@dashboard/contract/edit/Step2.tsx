import { InlineNotification, TextInput } from '@carbon/react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { ContractForm, EducationLevel, ICurrency, SchoolCell, Translation } from 'src/@types'
import { useAuthContext } from 'src/auth/useAuthContext'
import CustomDataTable from 'src/components/data-table/CustomDataTable'
import { DownloadCsv } from 'src/components/download'
import { ErrorList, UploadError } from 'src/components/errors'
import { RHFSelect, RHFTextField } from 'src/components/hook-form'
import { Stack } from 'src/components/stack'
import { SectionSubtitle, SectionTitle, Typography } from 'src/components/typography'
import { FILTER_ALL_DEFAULT, FilterAll } from 'src/constants'
import { useBusinessContext } from 'src/context/business/BusinessContext'
import useTable from 'src/hooks/useTable'
import { useLocales } from 'src/locales'
import { redirectOnError } from 'src/pages/errors/handlers'
import { SchoolTableRow, SchoolTableToolbar } from 'src/sections/@dashboard/school/list'
import { useTheme } from 'src/theme'
import { removeDuplicates } from 'src/utils/arrays'
import { capitalizeFirstLetter } from 'src/utils/strings'
import UploadSchoolFile from './UploadSchoolFile'
import { ContractSchoolsAndAttachments } from './types'

type Step2Props = {
  onChange: Dispatch<SetStateAction<ContractSchoolsAndAttachments>>
  fields: { schools: { id: string; budget: string }[] }
  handlePost: (contractForm: ContractForm) => Promise<boolean>
  currencies: ICurrency[]
}

const regionKey = 'location1'

export default function Step2({ onChange, fields, handlePost, currencies }: Step2Props) {
  const navigate = useNavigate()
  const { schools, refetchSchools, setSchools } = useBusinessContext()
  const { spacing, palette } = useTheme()
  const { isAdmin } = useAuthContext()
  const { translate } = useLocales()
  const { getValues, watch, trigger, setValue } = useFormContext<ContractForm>()
  const { country: countryId, budget: contractBudget } = watch()

  const [tableData, setTableData] = useState<SchoolCell[]>(
    schools?.map((cs) => ({
      ...cs,
      budget: fields.schools.find((row) => row.id === cs.external_id)?.budget ?? ''
    })) ?? []
  )

  useEffect(() => {
    if (!isAdmin || !countryId) return
    refetchSchools(countryId)
      ?.then((rs) => {
        setSchools(rs)
        setTableData(
          rs.map((sch) => ({
            ...sch,
            budget: fields.schools.find((row) => row.id === sch.external_id)?.budget ?? ''
          }))
        )
      })
      .catch((err) => redirectOnError(navigate, err))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, countryId])

  const { page, rowsPerPage, setPage, selected, onSelectRow, onSelectAllRows, setRowsPerPage } =
    useTable({
      defaultSelected: fields.schools.map(
        (school) => tableData.find((row) => row.external_id === school.id)?.external_id ?? ''
      )
    })

  const handleChangeBudget = (external_id: string, budget: string) => {
    trigger()
    const school = fields.schools.find((r) => r.id === external_id)
    const indexToReplace = tableData.findIndex((r) => r.external_id === external_id)
    const row = tableData[indexToReplace]
    if (school) school.budget = budget
    if (indexToReplace === -1) return
    const newRow = { ...row, budget }

    setTableData((prev) => {
      const newTableData = [...prev]
      newTableData[indexToReplace] = newRow
      return newTableData
    })
  }
  useEffect(() => {
    const newSchools: { id: string; budget: string }[] = []

    selected.forEach((externalId) => {
      const { budget } = tableData.find((s) => s.external_id === externalId) as SchoolCell
      newSchools.push({ id: externalId, budget: budget ?? 0 })
    })

    if (
      !selected ||
      (fields.schools.length === newSchools.length &&
        newSchools.every((s) => {
          const school = fields.schools.find((sc) => sc.id === s.id)
          return school && school.budget === s.budget
        }))
    )
      return

    onChange((prev) => ({
      ...prev,
      schools: newSchools
    }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, onChange])

  const [uploadErrorMessage, setUploadErrorMessage] = useState<Translation | ''>('')
  const [parsingErrorMessages, setParsingErrorMessages] = useState<string[]>([])
  useEffect(() => {
    if (uploadErrorMessage.length > 0) setTimeout(() => setUploadErrorMessage(''), 5000)
  }, [uploadErrorMessage])

  const TABLE_HEAD = [
    { key: 'external_id', header: 'Id' },
    { key: 'name', header: translate('name') },
    { key: 'region', header: translate('region') },
    { key: 'budget', header: translate('budget') }
  ]

  const regionOptions = removeDuplicates([
    FILTER_ALL_DEFAULT,
    ...tableData.map((s) => s[regionKey])
  ])
  const EDUCATION_LEVEL_OPTIONS = removeDuplicates([
    FILTER_ALL_DEFAULT,
    ...tableData.map((s) => s.education_level)
  ]) as (EducationLevel | FilterAll)[]

  const [filterEducationLevel, setFilterEducationLevel] = useState<EducationLevel | FilterAll>(
    FILTER_ALL_DEFAULT
  )
  const [filterSearch, setFilterSearch] = useState('')
  const [filterRegion, setFilterRegion] = useState(FILTER_ALL_DEFAULT)

  const dataFiltered = applyFilter({
    inputData: tableData,
    filterSearch,
    filterRegion,
    filterEducationLevel
  })

  const isEmpty = Boolean(tableData && !tableData.length)
  const isNotFound = !isEmpty && Boolean(dataFiltered && !dataFiltered.length)

  const totalBudget = selected
    .map((externalId) => Number(tableData.find((r) => r.external_id === externalId)?.budget))
    .reduce((prev, curr) => prev + curr, 0)
    .toFixed(2)

  const exceedsMaxBudget = Number(totalBudget) !== Number(contractBudget)

  const handleFileUpload = (fileSchools: { external_id: string; budget: string }[]) => {
    setValue(
      'budget',
      Number(
        fileSchools
          .map((s) => Number(s.budget))
          .reduce((prev, curr) => prev + curr, 0)
          .toFixed(2)
      )
    )
    onChange((prev) => ({
      ...prev,
      schools: fileSchools.map((s) => ({ id: s.external_id, budget: s.budget }))
    }))
    fileSchools.forEach((s) => handleChangeBudget(s.external_id, s.budget))

    onSelectAllRows(
      true,
      fileSchools.map((s) => s.external_id)
    )
  }

  return (
    <>
      <SectionTitle label="total_budget" style={{ paddingBottom: 0 }} />
      <SectionSubtitle subtitle="add_the_total_budget" />
      <Stack orientation="horizontal" gap={spacing.md}>
        <RHFSelect
          id="currency select"
          options={currencies.map((c) => ({ value: c.id, label: c.code }))}
          onChange={() => handlePost(getValues())}
          name="currency"
          label={capitalizeFirstLetter(translate('currency'))}
          disabled={currencies && currencies.length === 1}
        />
        <RHFTextField
          id="total budget"
          onBlur={() => handlePost(getValues())}
          name="budget"
          labelText={capitalizeFirstLetter(translate('total_budget_of_the_contract'))}
        />
      </Stack>
      <SectionTitle label="schools_list" style={{ paddingBottom: 0 }} />
      <SectionSubtitle subtitle="add_the_list_of_schools" />
      <UploadError message={uploadErrorMessage} />
      <ErrorList title={translate('uploaded_with_errors')} errorMessages={parsingErrorMessages} />
      <UploadSchoolFile
        schools={tableData}
        onUpload={handleFileUpload}
        setUploadErrorMessage={setUploadErrorMessage}
        setParsingErrorMessages={setParsingErrorMessages}
      />
      <InlineNotification
        kind="info"
        title={capitalizeFirstLetter(translate('important'))}
        lowContrast
        style={{ marginBottom: spacing.md }}
      >
        <Typography as="span" style={{ paddingBlock: spacing.xxs }}>
          {translate('to_link_schools')}
          <DownloadCsv
            data={[{ 'School Id': '', 'Budget': 0 }]}
            fileName="template"
            label="template.csv"
            type="link"
          />
        </Typography>
      </InlineNotification>
      <CustomDataTable
        selection={selected}
        rowToDataKey={(row) => row.cells[0].value}
        getDataKey={(row) => row.external_id}
        isSortable
        isSelectable
        onSelectAll={(rows, checked) => {
          if (checked && selected.length > 0) onSelectAllRows(false, [])
          else
            onSelectAllRows(
              checked,
              rows.map((row) => row.external_id)
            )
        }}
        onSelectRow={(row) => onSelectRow(row.external_id)}
        RowComponent={SchoolTableRow}
        buttonsProps={[
          {
            label: translate('distribute_budget_equally'),
            disabled: selected.length === 0 || !contractBudget,
            kind: 'primary',
            onClick: () => {
              selected.forEach((externalId) => {
                handleChangeBudget(externalId, (contractBudget / selected.length).toFixed(2))
                setValue(
                  'budget',
                  Number((contractBudget / selected.length).toFixed(2)) * selected.length
                )
              })
            }
          }
        ]}
        getRowComponentProps={() => ({
          onChangeBudget: handleChangeBudget
        })}
        ToolbarContent={
          <SchoolTableToolbar
            educationLevelOptions={EDUCATION_LEVEL_OPTIONS}
            filterEducationLevel={filterEducationLevel}
            setFilterEducationLevel={setFilterEducationLevel}
            filterRegion={filterRegion}
            regionOptions={regionOptions}
            setFilterRegion={setFilterRegion}
            setFilterSearch={setFilterSearch}
            setPage={setPage}
          />
        }
        data={dataFiltered.map((s) => ({ ...s, region: s[regionKey] }))}
        page={page}
        setPage={setPage}
        isNotFound={isNotFound}
        isEmpty={isEmpty}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        tableHead={TABLE_HEAD}
        tableName="schools"
        emptyText="table_no_data.schools"
        title="School table"
      />
      {selected.length > 0 ? (
        <Stack
          orientation="horizontal"
          style={{
            padding: spacing.md,
            backgroundColor: exceedsMaxBudget ? palette.error.light : palette.success.light
          }}
          alignItems="center"
          justifyContent="flex-end"
        >
          <Typography style={{ width: '66%' }}>{translate('total')}</Typography>
          <TextInput
            style={{ width: '229px' }}
            id="total-budget"
            labelText=""
            value={totalBudget}
            readOnly
          />
        </Stack>
      ) : (
        ''
      )}
    </>
  )
}

function applyFilter({
  inputData,
  filterSearch,
  filterRegion,
  filterEducationLevel
}: {
  inputData: SchoolCell[]
  filterSearch: string
  filterRegion: string
  filterEducationLevel: string
}) {
  if (filterSearch)
    inputData = inputData.filter(({ name, external_id }) => {
      const flatContract = { name, external_id }
      return Object.values(flatContract).some((value) =>
        value?.toLowerCase().includes(filterSearch.toLowerCase())
      )
    })

  if (filterRegion !== FILTER_ALL_DEFAULT)
    inputData = inputData.filter((school) => school[regionKey] === filterRegion)

  if (filterEducationLevel !== FILTER_ALL_DEFAULT)
    inputData = inputData.filter((s) => s.education_level === filterEducationLevel)

  return inputData
}

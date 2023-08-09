import { InlineNotification, TextInput } from '@carbon/react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { ContractForm, EducationLevel, ICurrency, SchoolCell, Translation } from 'src/@types'
import { useAuthContext } from 'src/auth/useAuthContext'
import CustomDataTable from 'src/components/data-table/CustomDataTable'
import { DownloadCsv } from 'src/components/download'
import { ErrorList, UploadError } from 'src/components/errors'
import { RHFSelect, RHFTextField } from 'src/components/hook-form'
import { Stack } from 'src/components/stack'
import { SectionSubtitle, SectionTitle, Typography } from 'src/components/typography'
import { useBusinessContext } from 'src/context/BusinessContext'
import useTable from 'src/hooks/useTable'
import { useLocales } from 'src/locales'
import { SchoolTableRow, SchoolTableToolbar } from 'src/sections/@dashboard/school/list'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'
import { FILTER_ALL_DEFAULT } from 'src/constants'
import UploadSchoolFile from './UploadSchoolFile'
import { ContractSchoolsAndAttachments } from './types'

type Step2Props = {
  onChange: Dispatch<SetStateAction<ContractSchoolsAndAttachments>>
  fields: { schools: { id: string; budget: string }[] }
  handlePost: (contractForm: ContractForm) => Promise<boolean>
  currencies: ICurrency[]
}

export default function Step2({ onChange, fields, handlePost, currencies }: Step2Props) {
  const { schools, refetchSchools } = useBusinessContext()
  const { spacing, palette } = useTheme()
  const { isAdmin } = useAuthContext()
  const { translate } = useLocales()
  const { getValues, watch } = useFormContext<ContractForm>()
  const { country: countryId, budget: contractBudget } = watch()

  const [tableData, setTableData] = useState<SchoolCell[]>(
    schools?.map((cs) => ({
      ...cs,
      budget: fields.schools.find((row) => row.id === cs.external_id)?.budget ?? ''
    })) ?? []
  )

  useEffect(() => {
    if (!isAdmin || !countryId) return
    refetchSchools(countryId)?.then((rs) => {
      if (rs instanceof Error) throw rs
      setTableData(
        rs.map((sch) => ({
          ...sch,
          budget: fields.schools.find((row) => row.id === sch.external_id)?.budget ?? ''
        }))
      )
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, countryId, refetchSchools])

  const { page, rowsPerPage, setPage, selected, onSelectRow, onSelectAllRows, setRowsPerPage } =
    useTable({
      defaultSelected: fields.schools.map(
        (school) => tableData.find((row) => row.external_id === school.id)?.id ?? ''
      )
    })

  const handleChangeBudget = (external_id: string, budget: string) => {
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

    selected.forEach((id) => {
      const { external_id, budget } = tableData.find((s) => s.id === id) as SchoolCell
      newSchools.push({ id: external_id as string, budget: budget ?? 0 })
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
    { key: 'budget', header: translate('budget') }
  ]

  const REGION_OPTIONS = [
    FILTER_ALL_DEFAULT,
    ...Array.from(new Set(tableData.map((s) => s.location1)))
  ]
  const EDUCATION_LEVEL_OPTIONS = [
    FILTER_ALL_DEFAULT,
    ...Array.from(new Set(tableData.map((s) => s.education_level)))
  ] as (EducationLevel | typeof FILTER_ALL_DEFAULT)[]

  const [filterEducationLevel, setFilterEducationLevel] = useState<
    EducationLevel | typeof FILTER_ALL_DEFAULT
  >(FILTER_ALL_DEFAULT)
  const [filterSearch, setFilterSearch] = useState('')
  const [filterRegion, setFilterRegion] = useState(FILTER_ALL_DEFAULT)

  const dataFiltered = applyFilter({
    inputData: tableData,
    filterSearch,
    filterRegion,
    filterEducationLevel
  })

  const isNotFound = !dataFiltered.length

  const totalBudget = selected
    .map((id) => Number(tableData.find((r) => r.id === id)?.budget))
    .reduce((prev, curr) => prev + curr, 0)

  const exceedsMaxBudget = totalBudget !== Number(contractBudget)

  const handleFileUpload = (fileSchools: { external_id: string; budget: string }[]) => {
    onChange((prev) => ({
      ...prev,
      schools: fileSchools.map((s) => ({ id: s.external_id, budget: s.budget }))
    }))
    fileSchools.forEach((s) => handleChangeBudget(s.external_id, s.budget))

    onSelectAllRows(
      true,
      fileSchools
        .map((s) => tableData.find((r) => r.external_id === s.external_id)?.id ?? null)
        .filter((r) => r) as string[]
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
          type="number"
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
        isSortable
        isSelectable
        onSelectAll={(rows, checked) => {
          if (checked && selected.length > 0) onSelectAllRows(false, [])
          else
            onSelectAllRows(
              checked,
              rows.map((row) => row.id)
            )
        }}
        onSelectRow={(row) => onSelectRow(row.id)}
        RowComponent={SchoolTableRow}
        getRowComponentProps={(row) => ({
          selected: selected.includes(row.id),
          onChangeBudget: handleChangeBudget
        })}
        ToolbarContent={
          <SchoolTableToolbar
            educationLevelOptions={EDUCATION_LEVEL_OPTIONS}
            filterEducationLevel={filterEducationLevel}
            setFilterEducationLevel={setFilterEducationLevel}
            filterRegion={filterRegion}
            regionOptions={REGION_OPTIONS}
            setFilterRegion={setFilterRegion}
            setFilterSearch={setFilterSearch}
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
        tableName="schools"
        noDataText="table_no_data.schools"
        title="School table"
      />
      {Number(contractBudget) && selected.length > 0 ? (
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
            disabled
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
    inputData = inputData.filter((school) => school.location1 === filterRegion)

  if (filterEducationLevel !== FILTER_ALL_DEFAULT)
    inputData = inputData.filter((s) => s.education_level === filterEducationLevel)

  return inputData
}

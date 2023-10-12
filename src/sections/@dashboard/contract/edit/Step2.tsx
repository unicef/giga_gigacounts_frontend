import { InlineNotification, TextInput } from '@carbon/react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router'
import {
  ContractForm,
  CsvParseError,
  EducationLevel,
  ICurrency,
  ISchool,
  SchoolCell,
  Translation
} from 'src/@types'
import {
  getSchoolsByExternalIdArray,
  getSchoolsByNameOrExternalId,
  getSchoolsPagination
} from 'src/api/school'
import CustomDataTable from 'src/components/data-table/CustomDataTable'
import { DownloadCsv } from 'src/components/download'
import { ErrorList, UploadError } from 'src/components/errors'
import { RHFSelect, RHFTextField } from 'src/components/hook-form'
import { Stack } from 'src/components/stack'
import { SectionSubtitle, SectionTitle, Typography } from 'src/components/typography'
import { FILTER_ALL_DEFAULT, FilterAll } from 'src/constants'
import { useDebounce } from 'src/hooks/useDebounce'
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
  fields: { schools: SchoolCell[] }
  handlePost: (contractForm: ContractForm) => Promise<boolean>
  currencies: ICurrency[]
}

const regionKey = 'location1'

export default function Step2({ onChange, fields, handlePost, currencies }: Step2Props) {
  const navigate = useNavigate()
  const { spacing, palette } = useTheme()
  const { translate } = useLocales()
  const { getValues, watch, trigger, setValue } = useFormContext<ContractForm>()
  const { country: countryId, budget: contractBudget } = watch()
  const [schoolPage, setSchoolPage] = useState(1)
  const [disablePagination, setDisablePagination] = useState(false)
  const [total, setTotal] = useState(0)
  const [tableData, setTableData] = useState<SchoolCell[]>(fields.schools)

  const {
    page,
    rowsPerPage,
    setPage,
    selected,
    onSelectRow,
    onSelectAllRows,
    setRowsPerPage,
    setSelected
  } = useTable({
    defaultSelected: fields.schools.map((fs) => fs?.external_id)
  })
  useEffect(() => {
    if (!countryId || disablePagination) return
    getSchoolsPagination(countryId, schoolPage, 30)
      .then(({ data, meta }) => {
        setTotal(meta.total)
        setTableData((prev) => [
          ...prev,
          ...data
            .filter(
              (r) =>
                fields.schools.every((fs) => fs.external_id !== r.external_id) ||
                prev.every((prevR) => prevR.external_id !== r.external_id)
            )
            .map((r) => ({
              ...r,
              budget: ''
            }))
        ])
      })
      .catch((err) => redirectOnError(navigate, err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryId, schoolPage, disablePagination])

  useEffect(() => {
    if (!tableData || tableData.length === 0 || disablePagination) return
    if (page * rowsPerPage > tableData.length - 5) setSchoolPage(schoolPage + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage])

  const handleChangeBudget = (external_id: string, budget: string) => {
    trigger()
    const school = fields.schools.find((r) => r.external_id === external_id)
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
    if (!tableData || tableData.length === 0) return
    const newSchools: (ISchool & { budget: string })[] = []

    selected.forEach((externalId) => {
      const school = tableData.find((s) => s.external_id === externalId) as SchoolCell
      newSchools.push(school)
    })

    if (
      !selected ||
      !newSchools ||
      (fields.schools.length === newSchools.length &&
        newSchools.every((s) => {
          const school = fields.schools.find((sc) => sc?.id === s?.id)
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
  const [filterRegion, setFilterRegion] = useState(FILTER_ALL_DEFAULT)
  const [filterSearch, setFilterSearch] = useState('')
  const debouncedFilterName = useDebounce(filterSearch, 500)
  useEffect(() => {
    if (!debouncedFilterName) {
      handleReset()
      setTableData((prev) => {
        if (fields.schools.every((s) => tableData.some((r) => r.external_id === s.external_id)))
          return prev
        return [...fields.schools, ...prev]
      })
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
        setTableData(
          res.map((r) => ({
            ...r,
            budget: fields.schools.find((fs) => fs.external_id === r.external_id)?.budget ?? ''
          }))
        )
      })
      .catch(() => setTableData([]))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedFilterName, countryId])
  const dataFiltered = applyFilter({
    inputData: tableData,
    filterRegion,
    filterEducationLevel
  })

  const isEmpty = Boolean(tableData && !tableData.length)
  const isNotFound = !isEmpty && Boolean(dataFiltered && !dataFiltered.length)

  const totalBudget = selected
    .map((externalId) => Number(fields.schools.find((r) => r?.external_id === externalId)?.budget))
    .reduce((prev, curr) => prev + curr, 0)
    .toFixed(2)

  const exceedsMaxBudget = Number(totalBudget) !== Number(contractBudget)

  const translateErrorRow = (message: Translation, row: number) => `${translate(message)} ${row}`

  const handleFileUpload = (
    fileSchools: { external_id: string; budget: number | string; row: number }[]
  ) => {
    getSchoolsByExternalIdArray(
      countryId,
      fileSchools.map((s) => s?.external_id)
    ).then((res) => {
      const validSchools = fileSchools.filter((fileSchool) => {
        const apiSchool = res.find((r) => fileSchool.external_id === r.external_id)
        if (apiSchool && apiSchool.valid && !Number.isNaN(Number(fileSchool.budget))) return true
        return false
      })
      setTotal(validSchools.length)
      setValue(
        'budget',
        Number(
          validSchools
            .map((s) => Number(s.budget))
            .reduce((prev, curr) => prev + curr, 0)
            .toFixed(2)
        )
      )
      onChange((prev) => ({
        ...prev,
        schools: validSchools.map((fs) => ({
          ...(res.find((r) => fs.external_id === r.external_id) as ISchool),
          budget: String(fs.budget)
        }))
      }))
      validSchools.forEach((s) => handleChangeBudget(s.external_id, String(s.budget)))
      setTableData(
        validSchools.map((s) => {
          const apiSchool = res.find((r) => s.external_id === r.external_id) as ISchool
          return {
            budget: String(s.budget),
            ...apiSchool
          }
        })
      )
      setDisablePagination(true)
      onSelectAllRows(
        true,
        validSchools.map((s) => s.external_id)
      )
      res.forEach((school) => {
        const fileSchool = fileSchools.find((fs) => fs.external_id === school.external_id)
        try {
          if (!school || !school.valid || !fileSchool)
            throw new CsvParseError('parse_errors.school_not_found', fileSchool?.row as number)
          if (!fileSchool.external_id || typeof fileSchool.external_id !== 'string')
            throw new CsvParseError('parse_errors.school_id', fileSchool?.row as number)
          if (!fileSchool.budget || typeof fileSchool.budget !== 'number') {
            throw new CsvParseError('parse_errors.school_budget_missing', fileSchool?.row as number)
          }
          if (fileSchool.budget <= 0)
            throw new CsvParseError(
              'parse_errors.school_budget_positive',
              fileSchool?.row as number
            )
        } catch (err) {
          if (err instanceof CsvParseError && err.message)
            setParsingErrorMessages((prev) => [...prev, translateErrorRow(err.message, err.row)])
          else throw err
        }
      })
    })
  }
  const handleReset = () => {
    setSchoolPage(1)
    setDisablePagination(false)
    setPage(1)
    setParsingErrorMessages([])
  }
  const handleDistributeEqually = () => {
    selected.forEach((externalId) => {
      handleChangeBudget(externalId, (contractBudget / selected.length).toFixed(2))
      setValue(
        'budget',
        Number((Number((contractBudget / selected.length).toFixed(2)) * selected.length).toFixed(2))
      )
    })
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
          inputMode="numeric"
          pattern="[0-9]+(.[0-9]{1,2})?"
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
        customCount={total}
        hideSelectAllButton
        selection={selected}
        rowToDataKey={(row) => row.cells[0].value}
        getDataKey={(row) => row.external_id}
        isSortable
        isSelectable
        onSelectRow={(row) => onSelectRow(row.external_id)}
        RowComponent={SchoolTableRow}
        buttonsProps={[
          {
            label: translate('reset_table'),
            kind: 'ghost',
            onClick: () => {
              handleReset()
              onChange((prev) => ({ ...prev, schools: [] }))
              setSelected([])
              if (schoolPage !== 1) setTableData([])
              else setTableData((prev) => prev.map((p) => ({ ...p, budget: '' })))
            },
            hasIconOnly: true,
            renderIcon: 'Reset'
          },
          {
            label: translate('distribute_budget_equally'),
            disabled: selected.length === 0 || !contractBudget,
            kind: 'primary',
            onClick: handleDistributeEqually
          }
        ]}
        getRowComponentProps={(row) => ({
          budget: Number(tableData.find((r) => r.external_id === row.external_id)?.budget ?? 0),
          setBudget: handleChangeBudget
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
  filterRegion,
  filterEducationLevel
}: {
  inputData: SchoolCell[]
  filterRegion: string
  filterEducationLevel: string
}) {
  if (filterRegion !== FILTER_ALL_DEFAULT)
    inputData = inputData.filter((school) => school[regionKey] === filterRegion)

  if (filterEducationLevel !== FILTER_ALL_DEFAULT)
    inputData = inputData.filter((s) => s.education_level === filterEducationLevel)

  return inputData
}

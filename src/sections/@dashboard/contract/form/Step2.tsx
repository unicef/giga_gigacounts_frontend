import { InlineNotification, Link } from '@carbon/react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { ContractForm, ICurrency, SchoolCell } from 'src/@types'
import { useAuthContext } from 'src/auth/useAuthContext'
import CustomDataTable from 'src/components/data-table/CustomDataTable'
import { ErrorList, UploadError } from 'src/components/errors'
import { RHFSelect, RHFTextField } from 'src/components/hook-form'
import { Stack } from 'src/components/stack'
import { Typography } from 'src/components/typography'
import SectionTitle from 'src/components/typography/SectionTitle'
import { useBusinessContext } from 'src/context/BusinessContext'
import useTable from 'src/hooks/useTable'
import { Translation, useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'
import { getComparator } from 'src/utils/table'
import { SchoolTableRow, SchoolTableToolbar } from '../../school/list'
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
  const { spacing } = useTheme()
  const { isAdmin } = useAuthContext()
  const { translate } = useLocales()
  const { getValues, watch } = useFormContext<ContractForm>()
  const countryId = getValues('country')

  useEffect(() => {
    if (!isAdmin || !countryId) return
    refetchSchools(countryId)?.then((rs) => {
      if (rs instanceof Error) throw rs
      setTableData(rs.map((sch) => ({ ...sch, budget: '' })))
    })
  }, [isAdmin, countryId, refetchSchools])

  const [tableData, setTableData] = useState<SchoolCell[]>(
    schools.map((cs) => ({ ...cs, budget: '' }))
  )

  const {
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    setRowsPerPage
  } = useTable({
    defaultSelected: fields.schools.map(
      (school) => tableData.find((row) => row.external_id === school.id)?.id ?? ''
    )
  })

  const handleChangeBudget = (external_id: string, budget: string) => {
    const row = tableData.find((r) => r.external_id === external_id)
    if (!row) return
    setTableData((prev) => [
      ...prev.filter((s) => s.external_id !== external_id),
      { ...row, budget }
    ])
  }

  useEffect(() => {
    const newSchools: { id: string; budget: string }[] = []
    const selectedRows = tableData.map((r) => (selected.includes(r.id) ? r : null)).filter((r) => r)
    selectedRows.forEach((row) => {
      if (!row) return
      const school = fields.schools.find((s) => s.id === row.external_id)
      const newBudget = row?.budget || !school ? (row?.budget as string) : school.budget
      newSchools.push({ id: row.external_id as string, budget: newBudget })
      if (school)
        setTableData((prev) => [
          ...prev.filter((s) => s.external_id !== row.external_id),
          { ...row, budget: newBudget }
        ])
    })
    if (
      !selectedRows ||
      (fields.schools.length === selected.length &&
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
  }, [selected, onChange, fields.schools])

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

  const REGION_OPTIONS = ['all', ...Array.from(new Set(tableData.map((s) => s.location1)))]

  const [filterSearch, setFilterSearch] = useState('')
  const [filterRegion, setFilterRegion] = useState('all')

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterSearch,
    filterRegion
  })

  // const isFiltered = filterSearch !== '' || filterRegion !== 'all'

  const isNotFound = !dataFiltered.length

  const totalBudget = selected
    .map((id) => Number(tableData.find((r) => r.id === id)?.budget))
    .reduce((prev, curr) => prev + curr, 0)

  const exceedsMaxBudget = totalBudget !== Number(watch().budget)

  const handleFileUpload = (fileSchools: { external_id: string; budget: string }[]) => {
    fileSchools.forEach((school) => {
      const row = tableData.find((r) => r.external_id === school.external_id) as SchoolCell
      const isSelected = selected.includes(row.id)
      if (!isSelected) {
        setSelected((prev) => [...prev, row.id])
      }
      handleChangeBudget(row.external_id, school.budget)
    })
  }
  const downloadTemplate = () => {
    const template = new File(['School Id;Budget'], 'template.csv')
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = URL.createObjectURL(template)
    link.download = template.name
    document.body.appendChild(link)
    link.click()
    setTimeout(() => {
      URL.revokeObjectURL(link.href)
      link.parentNode?.removeChild(link)
    }, 0)
  }

  return (
    <>
      <SectionTitle label={translate('total_budget')} style={{ paddingBottom: 0 }} />

      <Typography variant="disabled" style={{ paddingBottom: spacing.xl }}>
        {translate('add_the_total_budget')}
      </Typography>
      <Stack orientation="horizontal" gap={spacing.md}>
        <RHFSelect
          id="currency select"
          options={currencies.map((c) => ({ value: c.id, label: c.code }))}
          onBlur={() => handlePost(getValues())}
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

      <SectionTitle label={translate('schools_list')} style={{ paddingBottom: 0 }} />

      <Typography variant="disabled" style={{ paddingBottom: spacing.md }}>
        {translate('add_the_list_of_schools')}
      </Typography>
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
          <Link onClick={downloadTemplate}>template.csv</Link>
        </Typography>
      </InlineNotification>
      {Number(watch().budget) && selected.length > 0 ? (
        <>
          <Typography variant={exceedsMaxBudget ? 'error' : 'default'}>
            {capitalizeFirstLetter(translate('total_budget'))}: ${totalBudget}
          </Typography>
          <Typography variant={exceedsMaxBudget ? 'error' : 'default'}>
            {exceedsMaxBudget && capitalizeFirstLetter(translate('exceeds_budget_error'))}
          </Typography>
        </>
      ) : (
        ''
      )}
      <CustomDataTable
        isSortable
        isSelectable
        onSelectAll={(e) =>
          onSelectAllRows(
            // @ts-ignore
            e.target.checked,
            dataFiltered.map((row) => row.id)
          )
        }
        RowComponent={SchoolTableRow}
        getRowComponentProps={(row) => ({
          selected: selected.includes(row.id),
          onSelectRow,
          onChangeBudget: handleChangeBudget
        })}
        ToolbarContent={
          <SchoolTableToolbar
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
        title="School table"
        allChecked={selected.length > 0}
      />
    </>
  )
}

function applyFilter({
  inputData,
  comparator,
  filterSearch,
  filterRegion
}: {
  inputData: SchoolCell[]
  comparator: (a: any, b: any) => number
  filterSearch: string
  filterRegion: string
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const)

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })

  inputData = stabilizedThis.map((el) => el[0])

  if (filterSearch) {
    inputData = inputData.filter(({ name, external_id }) => {
      const flatContract = { name, external_id }
      return Object.entries(flatContract).some(([key, value]) =>
        value?.toLowerCase().includes(filterSearch.toLowerCase())
      )
    })
  }

  if (filterRegion !== 'all') {
    inputData = inputData.filter((school) => school.location1 === filterRegion)
  }

  return inputData
}

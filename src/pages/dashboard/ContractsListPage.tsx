import moment from 'moment'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router'
import { IContract, MinMax, Translation } from 'src/@types'
import { useAuthContext } from 'src/auth/useAuthContext'
import { Banner } from 'src/components/banner'
import CustomJoyride from 'src/components/custom-joyride'
import CustomDataTable from 'src/components/data-table/CustomDataTable'
import { useTable } from 'src/components/table'
import { FILTER_ALL_DEFAULT, KEY_DEFAULTS, Views } from 'src/constants'
import { useBusinessContext } from 'src/context/business/BusinessContext'
import { useAuthorization } from 'src/hooks/useAuthorization'
import { useCustomSearchParams } from 'src/hooks/useCustomSearchParams'
import { useModal } from 'src/hooks/useModal'
import { useSnackbar } from 'src/hooks/useSnackbar'
import { useLocales } from 'src/locales'
import { ContractDetailsDrawer } from 'src/sections/@dashboard/contract/edit/ContractDetailsDrawer'
import { ContractTableRow, ContractTableToolbar } from 'src/sections/@dashboard/contract/list'
import { removeDuplicates } from 'src/utils/arrays'
import { capitalizeFirstLetter } from 'src/utils/strings'

export default function ContractsListPage({ automatic }: { automatic: boolean }) {
  const { state } = useLocation()
  const { canAdd } = useAuthorization()
  const { isAdmin } = useAuthContext()
  const userCanAdd = canAdd(Views.contract)
  const { pushSuccess, pushError } = useSnackbar()

  const { page, rowsPerPage, setPage, setRowsPerPage } = useTable()

  const { contracts, refetchContracts, deleteContract } = useBusinessContext()
  const { translate } = useLocales()

  const [searchParams, generateSetter] = useCustomSearchParams({
    filterSearch: '',
    filterIsp: FILTER_ALL_DEFAULT,
    filterRegion: FILTER_ALL_DEFAULT,
    filterStatus: FILTER_ALL_DEFAULT,
    filterBudgetMin: '',
    filterBudgetMax: '',
    filterSchoolsMin: '',
    filterSchoolsMax: '',
    filterDatesMin: '',
    filterDatesMax: ''
  })

  const {
    filterSearch,
    filterBudgetMax,
    filterBudgetMin,
    filterDatesMax,
    filterDatesMin,
    filterIsp,
    filterRegion,
    filterSchoolsMax,
    filterSchoolsMin,
    filterStatus
  } = searchParams
  const filterDates = { max: filterDatesMax, min: filterDatesMin }
  const filterSchools = { max: filterSchoolsMax, min: filterSchoolsMin }
  const filterBudget = { max: filterBudgetMax, min: filterBudgetMin }

  const setFilterSearch = generateSetter('filterSearch')
  const setFilterIsp = generateSetter('filterIsp')
  const setFilterRegion = generateSetter('filterRegion')
  const setFilterStatus = generateSetter('filterStatus')
  const setFilterBudget = {
    max: generateSetter('filterBudgetMax'),
    min: generateSetter('filterBudgetMin')
  }
  const setFilterSchools = {
    max: generateSetter('filterSchoolsMax'),
    min: generateSetter('filterSchoolsMin')
  }
  const setFilterDates = {
    max: generateSetter('filterDatesMax'),
    min: generateSetter('filterDatesMin')
  }

  const details = useModal(state?.new ?? false)

  const inputContracts = contracts ? contracts.filter((c) => c.automatic === automatic) : null

  const contractsFiltered = inputContracts
    ? applyFilter({
        inputData: inputContracts.map((c) => ({
          ...c,
          countryName: c.country?.name ?? ''
        })),
        filterSearch,
        filterStatus,
        filterRegion,
        filterIsp,
        filterBudget,
        filterSchools,
        filterDates,
        translate
      })
    : null

  useEffect(() => {
    if (state?.new !== undefined) details.set(state.new)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, details.set])

  const TABLE_HEAD = [
    { key: 'name', header: `${translate('name')} + ID` },
    { key: 'status', header: translate('status') },
    { key: 'isp', header: translate('isp') }
  ]
  if (isAdmin) TABLE_HEAD.push({ key: 'countryName', header: translate('country') })
  TABLE_HEAD.push(
    { key: 'numberOfSchools', header: translate('schools') },
    { key: 'budget', header: translate('budget') },
    { key: KEY_DEFAULTS[0], header: '' },
    { key: KEY_DEFAULTS[1], header: '' },
    { key: KEY_DEFAULTS[2], header: '' }
  )
  const regionOptions = inputContracts
    ? removeDuplicates([
        FILTER_ALL_DEFAULT,
        ...inputContracts.map((r) => r.country?.name ?? FILTER_ALL_DEFAULT)
      ])
    : []
  const ispOptions = inputContracts
    ? removeDuplicates([
        FILTER_ALL_DEFAULT,
        ...inputContracts.map((r) => r.isp ?? FILTER_ALL_DEFAULT)
      ])
    : []

  const dataInPage = contractsFiltered
    ? contractsFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : []

  const isEmpty = Boolean(inputContracts && !inputContracts.length)
  const isNotFound = !isEmpty && Boolean(contractsFiltered && !contractsFiltered.length)

  const handleDeleteRow = (id: string) => {
    deleteContract(id)
      .then(() => {
        pushSuccess('push.deleted_contract')
      })
      .catch(() => {
        pushError('push.deleted_contract_error')
      })
      .finally(refetchContracts)

    if (page > 1 && dataInPage.length === 1) setPage(page - 1)
  }
  return (
    <>
      <Helmet>
        <title>Contracts | Gigacounts</title>
      </Helmet>
      <CustomJoyride name="contracts" run={!state || !state.new} />
      <Banner title={automatic ? translate('automatic_contracts') : translate('contracts')} />
      <CustomDataTable
        isSortable
        RowComponent={ContractTableRow}
        getRowComponentProps={(row) => ({
          onDeleteRow: handleDeleteRow,
          currencyCode: row.currencyCode,
          isAutomatic: row.automatic
        })}
        ToolbarContent={
          <ContractTableToolbar
            filterStatus={filterStatus}
            filterSearch={filterSearch}
            filterIsp={filterIsp}
            filterRegion={filterRegion}
            filterBudget={filterBudget}
            filterSchools={filterSchools}
            filterDates={filterDates}
            regionOptions={regionOptions}
            ispOptions={ispOptions}
            setFilterDates={setFilterDates}
            setFilterBudget={setFilterBudget}
            setFilterRegion={setFilterRegion}
            setFilterIsp={setFilterIsp}
            setFilterSchools={setFilterSchools}
            setFilterSearch={setFilterSearch}
            setFilterStatus={setFilterStatus}
            setPage={setPage}
          />
        }
        data={
          contractsFiltered
            ? [...contractsFiltered].sort((a, b) => a.name.localeCompare(b.name))
            : null
        }
        page={page}
        setPage={setPage}
        isNotFound={isNotFound}
        isEmpty={isEmpty}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        tableHead={TABLE_HEAD}
        tableName="contracts"
        emptyText="table_no_data.contracts"
        buttonsProps={
          userCanAdd
            ? [
                {
                  kind: 'primary',
                  id: 'new-contract',
                  onClick: details.open,
                  renderIcon: 'Add',
                  label: capitalizeFirstLetter(translate('contract'))
                }
              ]
            : []
        }
      />
      <ContractDetailsDrawer
        isAutomatic={automatic}
        item={null}
        open={details.value}
        onClose={details.close}
      />
    </>
  )
}

function applyFilter({
  inputData,
  filterSearch,
  filterStatus,
  filterRegion,
  filterBudget,
  filterIsp,
  filterSchools,
  filterDates,
  translate
}: {
  inputData: Array<IContract & { countryName: string }>
  filterSearch: string
  filterStatus: string
  filterRegion: string
  filterIsp: string
  filterBudget: MinMax<string>
  filterSchools: MinMax<string>
  filterDates: MinMax<string>
  translate: ReturnType<typeof useLocales>['translate']
}) {
  if (filterSearch)
    inputData = inputData.filter(({ country, name, isp, status, id }) => {
      const flatContract = { country: country?.name, name, isp, status, id }
      const translatedKeys = ['status']
      return Object.entries(flatContract).some(([key, value]) => {
        if (translatedKeys.includes(key))
          return translate(value as Translation)
            .toLowerCase()
            .includes(filterSearch.toLowerCase())
        return value?.toLowerCase().includes(filterSearch.toLowerCase())
      })
    })

  if (filterStatus !== FILTER_ALL_DEFAULT)
    inputData = inputData.filter((contract) => contract.status === filterStatus)

  if (filterRegion !== FILTER_ALL_DEFAULT)
    inputData = inputData.filter(
      (contract) => contract.country && contract.country.name === filterRegion
    )

  if (filterIsp !== FILTER_ALL_DEFAULT)
    inputData = inputData.filter((contract) => contract.isp && contract.isp === filterIsp)

  if (filterBudget.min && filterBudget.max && Number(filterBudget.max) >= Number(filterBudget.min))
    inputData = inputData.filter(
      (contract) =>
        Number(contract.budget) >= Number(filterBudget.min) &&
        Number(contract.budget) <= Number(filterBudget.max)
    )
  else if (filterBudget.min)
    inputData = inputData.filter((contract) => Number(contract.budget) >= Number(filterBudget.min))
  else if (filterBudget.max)
    inputData = inputData.filter((contract) => Number(contract.budget) <= Number(filterBudget.max))

  if (
    filterSchools.min &&
    filterSchools.max &&
    Number(filterSchools.max) >= Number(filterSchools.min)
  )
    inputData = inputData.filter(
      (contract) =>
        Number(contract.numberOfSchools) >= Number(filterSchools.min) &&
        Number(contract.numberOfSchools) <= Number(filterSchools.max)
    )
  else if (filterSchools.min)
    inputData = inputData.filter(
      (contract) => Number(contract.numberOfSchools) >= Number(filterSchools.min)
    )
  else if (filterSchools.max)
    inputData = inputData.filter(
      (contract) => Number(contract.numberOfSchools) <= Number(filterSchools.max)
    )

  if (
    filterDates.min &&
    filterDates.max &&
    moment(filterDates.min).isBefore(moment(filterDates.max))
  )
    inputData = inputData.filter(
      (contract) =>
        moment(filterDates.min).isBefore(moment(contract.start_date)) &&
        moment(filterDates.max).isAfter(moment(contract.end_date))
    )
  else if (filterDates.min)
    inputData = inputData.filter((contract) =>
      moment(filterDates.min).isBefore(moment(contract.start_date))
    )
  else if (filterDates.max)
    inputData = inputData.filter((contract) =>
      moment(filterDates.max).isAfter(moment(contract.end_date))
    )

  return inputData
}

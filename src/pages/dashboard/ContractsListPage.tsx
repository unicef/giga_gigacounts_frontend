import moment from 'moment'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router'
import { ContractStatus, IContract, MinMax, Translation } from 'src/@types'
import { Banner } from 'src/components/banner'
import CustomJoyride from 'src/components/custom-joyride'
import CustomDataTable from 'src/components/data-table/CustomDataTable'
import { useTable } from 'src/components/table'
import { FILTER_ALL_DEFAULT, ICONS, KEY_DEFAULTS, Views } from 'src/constants'
import { useBusinessContext } from 'src/context/business/BusinessContext'
import { useAuthorization } from 'src/hooks/useAuthorization'
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
  const userCanAdd = canAdd(Views.contract)
  const { pushSuccess, pushError } = useSnackbar()

  const { page, rowsPerPage, setPage, setRowsPerPage } = useTable()

  const { contracts, refetchContracts, deleteContract } = useBusinessContext()
  const { translate } = useLocales()

  const [filterSearch, setFilterSearch] = useState('')
  const [filterIsp, setFilterIsp] = useState(FILTER_ALL_DEFAULT)
  const [filterRegion, setFilterRegion] = useState(FILTER_ALL_DEFAULT)
  const [filterStatus, setFilterStatus] = useState<ContractStatus | typeof FILTER_ALL_DEFAULT>(
    FILTER_ALL_DEFAULT
  )
  const [filterBudget, setFilterBudget] = useState<MinMax<string>>({ min: '', max: '' })
  const [filterSchools, setFilterSchools] = useState<MinMax<string>>({ min: '', max: '' })
  const [filterDates, setFilterDates] = useState<MinMax<string>>({ min: '', max: '' })
  const details = useModal(state?.new ?? false)

  const contractsFiltered = contracts
    ? applyFilter({
        inputData: contracts
          .filter((c) => c.automatic === automatic)
          .map((c) => ({
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
    { key: 'countryName', header: translate('country') },
    { key: 'numberOfSchools', header: translate('number_of_schools') },
    { key: 'budget', header: translate('budget') },
    { key: KEY_DEFAULTS[0], header: '' },
    { key: KEY_DEFAULTS[1], header: '' }
  ]

  const regionOptions = contracts
    ? removeDuplicates([
        FILTER_ALL_DEFAULT,
        ...contracts.map((r) => r.country?.name ?? FILTER_ALL_DEFAULT)
      ])
    : []
  const ispOptions = contracts
    ? removeDuplicates([FILTER_ALL_DEFAULT, ...contracts.map((r) => r.isp ?? FILTER_ALL_DEFAULT)])
    : []

  const dataInPage = contractsFiltered
    ? contractsFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : []
  const isNotFound = Boolean(contractsFiltered && !contractsFiltered.length)

  const handleDeleteRow = (id: string) => {
    deleteContract(id)
      .then(() => {
        pushSuccess('push.deleted_contract')
      })
      .catch(() => {
        pushError('push.deleted_contract_error')
      })
      .finally(refetchContracts)

    if (page > 1) {
      if (dataInPage.length === 1) {
        setPage(page - 1)
      }
    }
  }
  return (
    <>
      <Helmet>
        <title>Contracts | Gigacounts</title>
      </Helmet>
      <CustomJoyride name="contracts" run={!state || !state.new} />
      <Banner
        title={automatic ? translate('automatic_contracts_list') : translate('contracts_list')}
      />
      <CustomDataTable
        isSortable
        RowComponent={ContractTableRow}
        getRowComponentProps={(row) => ({
          onDeleteRow: (id: string) => handleDeleteRow(id),
          currencyCode: row.currencyCode,
          isAutomatic: row.automatic
        })}
        ToolbarContent={
          <ContractTableToolbar
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
        data={contractsFiltered}
        page={page}
        setPage={setPage}
        isNotFound={isNotFound}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        tableHead={TABLE_HEAD}
        tableName="contracts"
        noDataText="table_no_data.contracts"
        title="Contract table"
        buttonsProps={
          userCanAdd
            ? [
                {
                  kind: 'primary',
                  id: 'new-contract',
                  onClick: details.open,
                  renderIcon: ICONS.Add,
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
  filterStatus: ContractStatus | typeof FILTER_ALL_DEFAULT
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

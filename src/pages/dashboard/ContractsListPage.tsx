import { Add } from '@carbon/icons-react'
import { Link } from '@carbon/react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router'
import { ContractStatus, IContract } from 'src/@types'
import { Banner } from 'src/components/banner'
import CustomJoyride from 'src/components/custom-joyride'
import CustomDataTable from 'src/components/data-table/CustomDataTable'
import { getComparator, useTable } from 'src/components/table'
import { Views } from 'src/constants/authorization'
import { useBusinessContext } from 'src/context/BusinessContext'
import { useAuthorization } from 'src/hooks/useAuthorization'
import { useModal } from 'src/hooks/useModal'
import { useSnackbar } from 'src/hooks/useSnackbar'
import { Translation, useLocales } from 'src/locales'
import ContractDetailsDrawer from 'src/sections/@dashboard/contract/form/ContractDetailsDrawer'
import { ContractTableRow, ContractTableToolbar } from 'src/sections/@dashboard/contract/list'
import { capitalizeFirstLetter } from 'src/utils/strings'

export default function ContractsListPage({ automatic }: { automatic: boolean }) {
  const { state } = useLocation()
  const { canAdd } = useAuthorization()
  const userCanAdd = canAdd(Views.contract)
  const { pushSuccess, pushError } = useSnackbar()

  const { page, order, orderBy, rowsPerPage, setPage, setRowsPerPage } = useTable()

  const { contracts, refetchContracts, deleteContract } = useBusinessContext()
  const { translate } = useLocales()

  const [filterSearch, setFilterSearch] = useState('')
  const [filterRegion, setFilterRegion] = useState('all')
  const [filterStatus, setFilterStatus] = useState<ContractStatus | 'all'>('all')
  const [filterBudget, setFilterBudget] = useState({ min: '', max: '' })
  const [filterSchools, setFilterSchools] = useState({ min: '', max: '' })

  const details = useModal(state?.new ?? false)

  const contractsFiltered = applyFilter({
    inputData: contracts
      .filter((c) => c.automatic === automatic)
      .map((c) => ({
        ...c,
        ltaName: c.lta?.name ?? '',
        countryName: c.country?.name ?? ''
      })),
    comparator: getComparator(order, orderBy),
    filterSearch,
    filterStatus,
    filterRegion,
    filterBudget,
    filterSchools,
    translate
  })

  useEffect(() => {
    if (state?.new !== undefined) details.set(state.new)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, details.set])

  const TABLE_HEAD = [
    { key: 'name', header: `${translate('name')} + ID` },
    { key: 'status', header: translate('status') },
    { key: 'ltaName', header: translate('lta_name') },
    { key: 'countryName', header: translate('country') },
    { key: 'numberOfSchools', header: translate('number_of_schools') },
    { key: 'budget', header: translate('budget') },
    { key: '', header: '' },
    { key: '-', header: '' }
  ]

  const regionOptions = Array.from(
    new Set(['all', ...contracts.map((r) => r.country?.name ?? 'all')])
  )

  const dataInPage = contractsFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  const isNotFound = !contractsFiltered.length

  const handleDeleteRow = (id: string) => {
    deleteContract(id)
      .then(() => {
        pushSuccess('push.deleted_contract', {
          link: <Link onClick={() => {}}>{capitalizeFirstLetter(translate('undo'))}</Link>
        })
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
      <CustomJoyride name="contract" />
      <Banner
        title={automatic ? translate('automatic_contracts_list') : translate('contracts_list')}
      />
      <CustomDataTable
        isSortable
        getKey={(row) => row.name}
        RowComponent={ContractTableRow}
        getRowComponentProps={(row) => ({
          onDeleteRow: (id: string) => handleDeleteRow(id),
          currencyCode: row.currencyCode,
          isAutomatic: row.automatic
        })}
        ToolbarContent={
          <ContractTableToolbar
            filterBudget={filterBudget}
            filterSchools={filterSchools}
            regionOptions={regionOptions}
            setFilterBudget={setFilterBudget}
            setFilterRegion={setFilterRegion}
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
        title="Contract table"
        buttonsProps={
          userCanAdd
            ? [
                {
                  kind: 'primary',
                  onClick: details.open,
                  renderIcon: Add,
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
  comparator,
  filterSearch,
  filterStatus,
  filterRegion,
  filterBudget,
  filterSchools,
  translate
}: {
  inputData: Array<IContract & { ltaName: string }>
  comparator: (a: any, b: any) => number
  filterSearch: string
  filterStatus: ContractStatus | 'all'
  filterRegion: string
  filterBudget: { min: string; max: string }
  filterSchools: { min: string; max: string }
  translate: ReturnType<typeof useLocales>['translate']
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const)

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })

  inputData = stabilizedThis.map((el) => el[0])

  if (filterSearch) {
    inputData = inputData.filter(({ country, name, isp, status, lta, id }) => {
      const flatContract = { country: country?.name, name, isp, status, id, lta: lta?.name ?? '' }
      const translatedKeys = ['status']
      return Object.entries(flatContract).some(([key, value]) => {
        if (translatedKeys.includes(key))
          return translate(value as Translation)
            .toLowerCase()
            .includes(filterSearch.toLowerCase())
        return value?.toLowerCase().includes(filterSearch.toLowerCase())
      })
    })
  }

  if (filterStatus !== 'all') {
    inputData = inputData.filter((contract) => contract.status === filterStatus)
  }

  if (filterRegion !== 'all') {
    inputData = inputData.filter((contract) => contract.country?.name === filterRegion)
  }

  if (
    filterBudget.min &&
    filterBudget.max &&
    Number(filterBudget.max) >= Number(filterBudget.min)
  ) {
    inputData = inputData.filter(
      (contract) =>
        Number(contract.budget) >= Number(filterBudget.min) &&
        Number(contract.budget) <= Number(filterBudget.max)
    )
  } else if (filterBudget.min) {
    inputData = inputData.filter((contract) => Number(contract.budget) >= Number(filterBudget.min))
  } else if (filterBudget.max) {
    inputData = inputData.filter((contract) => Number(contract.budget) <= Number(filterBudget.max))
  }

  if (
    filterSchools.min &&
    filterSchools.max &&
    Number(filterSchools.max) >= Number(filterSchools.min)
  ) {
    inputData = inputData.filter(
      (contract) =>
        Number(contract.numberOfSchools) >= Number(filterSchools.min) &&
        Number(contract.numberOfSchools) <= Number(filterSchools.max)
    )
  } else if (filterSchools.min) {
    inputData = inputData.filter(
      (contract) => Number(contract.numberOfSchools) >= Number(filterSchools.min)
    )
  } else if (filterSchools.max) {
    inputData = inputData.filter(
      (contract) => Number(contract.numberOfSchools) <= Number(filterSchools.max)
    )
  }
  return inputData
}

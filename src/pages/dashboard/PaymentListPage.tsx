import moment from 'moment'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router'
import { IContractPayment, ICountry, UserRoles } from 'src/@types'
import { getPayments } from 'src/api/payments'
import { useAuthContext } from 'src/auth/useAuthContext'
import { Banner } from 'src/components/banner'
import CustomDataTable from 'src/components/data-table/CustomDataTable'
import { useTable } from 'src/components/table'
import { Footer } from 'src/components/typography'
import { FILTER_ALL_DEFAULT, KEY_DEFAULTS } from 'src/constants'
import { useBusinessContext } from 'src/context/business/BusinessContext'
import { useAuthorization } from 'src/hooks/useAuthorization'
import { useCustomSearchParams } from 'src/hooks/useCustomSearchParams'
import { useLocales } from 'src/locales'
import { PaymentTableRow, PaymentTableToolbar } from 'src/sections/@dashboard/payment/list'
import { formatDate } from 'src/utils/date'
import { redirectOnError } from '../errors/handlers'

export default function PaymentListPage() {
  const { user, isAdmin } = useAuthContext()
  const navigate = useNavigate()
  const { countries } = useBusinessContext()

  const { page, rowsPerPage, setPage, setRowsPerPage } = useTable({
    defaultOrderBy: 'dateTo'
  })

  const [tableData, setTableData] = useState<
    | (IContractPayment & {
        contractName: string
        contractId: string
        contractNumberOfSchools: number
        contractCountryName: string
      })[]
    | null
  >(null)

  const [searchParams, generateSetter] = useCustomSearchParams({
    filterName: '',
    filterStatus: FILTER_ALL_DEFAULT,
    filterDatesMin: moment().subtract(30, 'day').toISOString(),
    filterDatesMax: moment().toISOString()
  })
  const { filterName, filterStatus, filterDatesMax, filterDatesMin } = searchParams
  const setFilterName = generateSetter('filterName')
  const setFilterStatus = generateSetter('filterStatus')
  const filterDates = { max: filterDatesMax, min: filterDatesMin }
  const setFilterDates = {
    max: generateSetter('filterDatesMax'),
    min: generateSetter('filterDatesMin')
  }
  const [countryId, setCountryId] = useState(user?.country.id)

  const { translate, replaceTwoTranslated } = useLocales()
  const { hasSomeRole } = useAuthorization()
  const canSeeContractName =
    isAdmin || hasSomeRole([UserRoles.COUNTRY_ACCOUNTANT, UserRoles.COUNTRY_SUPER_ADMIN])

  const TABLE_HEAD: { key: string; header: string; align?: string }[] = [
    { key: 'id', header: translate('payment') },
    { key: 'status', header: translate('status') },
    { key: 'dateTo', header: translate('payment_period') },
    { key: 'amount', header: translate('amount') }
  ]

  if (canSeeContractName)
    TABLE_HEAD.push({
      key: 'contractName',
      header: translate('contract_name')
    })

  TABLE_HEAD.push(
    { key: 'connections', header: translate('connectivity_distribution_by_status') },
    { key: KEY_DEFAULTS[0], header: '' },
    { key: KEY_DEFAULTS[1], header: '' },
    { key: KEY_DEFAULTS[2], header: '' }
  )

  const refetchPayments = () => {
    if (!countryId) return
    getPayments(filterDates.min, filterDates.max, countryId).then(setTableData)
  }

  useEffect(() => {
    if (!countryId) return
    getPayments(filterDates.min, filterDates.max, countryId)
      .then(setTableData)
      .catch((err) => redirectOnError(navigate, err))
  }, [countryId, filterDates.min, filterDates.max, navigate])

  const dataFiltered = tableData
    ? applyFilter({
        inputData: tableData,
        filterName,
        filterStatus
      })
    : null
  const isEmpty = Boolean(tableData && !tableData.length)
  const isNotFound = !isEmpty && Boolean(dataFiltered && !dataFiltered.length)

  const downloadableData = tableData
    ? tableData.map((payment) => ({
        'Payment number': payment.id,
        'Contract name': payment.contractName,
        'Amount': payment.amount,
        'Date from': payment.dateFrom,
        'Date to': payment.dateTo,
        'Status': payment.status
      }))
    : [
        {
          'Payment number': '',
          'Contract name': '',
          'Amount': '',
          'Date from': '',
          'Date to': '',
          'Status': ''
        }
      ]

  const handleFilterCountry = (countryName: string) => {
    const selectedCountry = countries.find((c) => c.name === countryName) as ICountry
    setCountryId(selectedCountry.id)
  }

  const selectedCountryName = countries?.find((c) => c.id === countryId)?.name ?? ''

  return (
    <>
      <Helmet>
        <title> Payment: List | Gigacounts</title>
      </Helmet>

      <Banner
        subtitle={selectedCountryName && isAdmin ? selectedCountryName : ''}
        title={translate('payments_log')}
      />

      <CustomDataTable
        isSortable
        RowComponent={PaymentTableRow}
        getRowComponentProps={(row) => ({
          currency: row.currency,
          contractAutomatic: row.contractAutomatic as boolean,
          contractStatus: row.contractStatus,
          contractId: row.contractId,
          payment: row,
          contractFrequency: row.contractFrequency,
          contractNumberOfSchools: row.contractNumberOfSchools,
          refetchPayments
        })}
        ToolbarContent={
          <PaymentTableToolbar
            filterStatus={filterStatus}
            filterName={filterName}
            countryName={selectedCountryName}
            csvDownloadData={downloadableData}
            csvDownloadFileName="payments"
            setFilterSearch={setFilterName}
            setFilterStatus={setFilterStatus}
            setPage={setPage}
            setFilterCountry={handleFilterCountry}
            countryOptions={countries.map((c) => c.name)}
            filterDates={filterDates}
            setFilterDates={setFilterDates}
          />
        }
        data={dataFiltered}
        page={page}
        setPage={setPage}
        isNotFound={isNotFound}
        isEmpty={isEmpty}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        tableHead={TABLE_HEAD}
        tableName="payments"
        emptyText="table_no_data.payments"
      />
      <Footer
        text={replaceTwoTranslated(
          'from_date_to_date',
          '{{dateFrom}}',
          '{{dateTo}}',
          formatDate(filterDates.min, '/'),
          formatDate(filterDates.max, '/')
        )}
        required
      />
    </>
  )
}

function applyFilter({
  inputData,
  filterName,
  filterStatus
}: {
  inputData: (IContractPayment & {
    contractName: string
    contractId: string
    contractNumberOfSchools: number
  })[]
  filterName: string
  filterStatus: string
}) {
  if (filterName)
    inputData = inputData.filter(
      (invoice) => invoice.contractName.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    )

  if (filterStatus !== FILTER_ALL_DEFAULT)
    inputData = inputData.filter((invoice) => invoice.status === filterStatus)
  return inputData
}

import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router'
import { IContractPayment, UserRoles } from 'src/@types'
import { getPayments } from 'src/api/payments'
import { useAuthContext } from 'src/auth/useAuthContext'
import { Banner } from 'src/components/banner'
import CustomDataTable from 'src/components/data-table/CustomDataTable'
import { useTable } from 'src/components/table'
import { FILTER_ALL_DEFAULT, KEY_DEFAULTS } from 'src/constants'
import { useAuthorization } from 'src/hooks/useAuthorization'
import { useCustomSearchParams } from 'src/hooks/useCustomSearchParams'
import { useLocales } from 'src/locales'
import { PaymentTableRow, PaymentTableToolbar } from 'src/sections/@dashboard/payment/list'
import { redirectOnError } from '../errors/handlers'

export default function PaymentListPage() {
  const navigate = useNavigate()
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
    filterStatus: FILTER_ALL_DEFAULT
  })
  const { filterName, filterStatus } = searchParams
  const setFilterName = generateSetter('filterName')
  const setFilterStatus = generateSetter('filterStatus')

  const { translate } = useLocales()
  const { hasSomeRole } = useAuthorization()
  const { isAdmin } = useAuthContext()
  const canSeeContractName =
    isAdmin || hasSomeRole([UserRoles.COUNTRY_ACCOUNTANT, UserRoles.COUNTRY_SUPER_ADMIN])

  const TABLE_HEAD: { key: string; header: string; align?: string }[] = [
    { key: 'id', header: `${translate('payment')} #` },
    { key: 'status', header: translate('status') },
    { key: 'dateTo', header: translate('payment_period') },
    { key: 'amount', header: translate('amount') },
    { key: 'connections', header: translate('connection') }
  ]
  if (canSeeContractName)
    TABLE_HEAD.push({
      key: 'contractName',
      header: translate('contract_name')
    })

  TABLE_HEAD.push({ key: KEY_DEFAULTS[0], header: '' }, { key: KEY_DEFAULTS[1], header: '' })

  const refetchPayments = () => {
    getPayments().then(setTableData)
  }

  useEffect(() => {
    getPayments()
      .then(setTableData)
      .catch((err) => redirectOnError(navigate, err))
  }, [navigate])

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

  return (
    <>
      <Helmet>
        <title> Payment: List | Gigacounts</title>
      </Helmet>

      <Banner title={translate('payments_log')} />

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
            search
            csvDownloadData={downloadableData}
            csvDownloadFileName="payments"
            setFilterSearch={setFilterName}
            setFilterStatus={setFilterStatus}
            setPage={setPage}
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
        title="Payments table"
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

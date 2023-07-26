import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { IContractPayment, PaymentStatus } from 'src/@types'
import { getPayments } from 'src/api/payments'
import { useAuthContext } from 'src/auth/useAuthContext'
import { Banner } from 'src/components/banner'
import CustomDataTable from 'src/components/data-table/CustomDataTable'
import { getComparator, useTable } from 'src/components/table'
import { UserRoles } from 'src/constants/authorization'
import { useAuthorization } from 'src/hooks/useAuthorization'
import { useLocales } from 'src/locales'
import { PaymentTableRow, PaymentTableToolbar } from 'src/sections/@dashboard/payment/list'

export default function PaymentListPage() {
  const { page, order, orderBy, rowsPerPage, setPage, setRowsPerPage } = useTable({
    defaultOrderBy: 'dateFrom'
  })

  const [tableData, setTableData] = useState<IContractPayment[]>([])
  const [filterName, setFilterName] = useState('')
  const [filterStatus, setFilterStatus] = useState<PaymentStatus | 'all'>('all')

  const { translate } = useLocales()
  const { hasSomeRole } = useAuthorization()
  const { isAdmin } = useAuthContext()
  const canSeeContractName =
    isAdmin || hasSomeRole([UserRoles.COUNTRY_ACCOUNTANT, UserRoles.COUNTRY_SUPER_ADMIN])

  const TABLE_HEAD: { key: string; header: string; align?: string }[] = [
    { key: 'id', header: `${translate('payment')} #` },
    { key: 'dateFrom', header: translate('date_from') },
    { key: 'amount', header: translate('amount') },
    { key: 'status', header: translate('status') },
    { key: 'connections', header: translate('connection') }
  ]
  if (canSeeContractName)
    TABLE_HEAD.push({
      key: 'contractName',
      header: translate('contract_name')
    })

  if (isAdmin) TABLE_HEAD.push({ key: 'contractCountryName', header: translate('country') })
  TABLE_HEAD.push({ key: '', header: '' })
  TABLE_HEAD.push({ key: '-', header: '' })

  const refetchPayments = () => {
    getPayments().then(setTableData)
  }

  useEffect(() => {
    getPayments().then(setTableData)
  }, [])

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterStatus
  })

  const isNotFound = !dataFiltered.length

  return (
    <>
      <Helmet>
        <title> Payment: List | Gigacounts</title>
      </Helmet>

      <Banner title={translate('payments_list')} />

      <CustomDataTable
        isSortable
        RowComponent={PaymentTableRow}
        getRowComponentProps={(row) => ({
          paidDate: row.paidDate,
          currencyCode: row.currency.code,
          contractAutomatic: row.contractAutomatic,
          contractStatus: row.contractStatus,
          contractId: row.contractId,
          metrics: row.metrics,
          payment: row,
          contractFrequency: row.contractFrequency,
          refetchPayments
        })}
        ToolbarContent={
          <PaymentTableToolbar
            setFilterSearch={setFilterName}
            setFilterStatus={setFilterStatus}
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
        tableName="payments"
        title="Payments table"
      />
    </>
  )
}

function applyFilter({
  inputData,
  comparator,
  filterName,
  filterStatus
}: {
  inputData: IContractPayment[]
  comparator: (a: any, b: any) => number
  filterName: string
  filterStatus: PaymentStatus | 'all'
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const)

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })

  inputData = stabilizedThis.map((el) => el[0])

  if (filterName) {
    inputData = inputData.filter(
      (invoice) => invoice.createdBy.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    )
  }

  if (filterStatus !== 'all') {
    inputData = inputData.filter((invoice) => invoice.status === filterStatus)
  }

  return inputData
}

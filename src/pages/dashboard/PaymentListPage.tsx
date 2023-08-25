import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import { IContractPayment, PaymentStatus, UserRoles } from 'src/@types';
import { getPayments } from 'src/api/payments';
import { useAuthContext } from 'src/auth/useAuthContext';
import { Banner } from 'src/components/banner';
import CustomDataTable from 'src/components/data-table/CustomDataTable';
import { useTable } from 'src/components/table';
import { FILTER_ALL_DEFAULT, KEY_DEFAULTS } from 'src/constants';
import { useAuthorization } from 'src/hooks/useAuthorization';
import { useLocales } from 'src/locales';
import { PaymentTableRow, PaymentTableToolbar } from 'src/sections/@dashboard/payment/list';
import { redirectOnError } from '../errors/handlers';

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
      })[]
    | null
  >(null)
  const [filterName, setFilterName] = useState('')
  const [filterStatus, setFilterStatus] = useState<PaymentStatus | typeof FILTER_ALL_DEFAULT>(
    FILTER_ALL_DEFAULT
  )

  const { translate } = useLocales()
  const { hasSomeRole } = useAuthorization()
  const { isAdmin } = useAuthContext()
  const canSeeContractName =
    isAdmin || hasSomeRole([UserRoles.COUNTRY_ACCOUNTANT, UserRoles.COUNTRY_SUPER_ADMIN])

  const TABLE_HEAD: { key: string; header: string; align?: string }[] = [
    { key: 'id', header: `${translate('payment')} #` },
    { key: 'dateTo', header: translate('payment_period') },
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
  TABLE_HEAD.push({ key: KEY_DEFAULTS[0], header: '' })
  TABLE_HEAD.push({ key: KEY_DEFAULTS[1], header: '' })

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

  const isNotFound = Boolean(dataFiltered && !dataFiltered.length)

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

      <Banner title={translate('payments_list')} />

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
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        tableHead={TABLE_HEAD}
        tableName="payments"
        noDataText="table_no_data.payments"
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
  filterStatus: PaymentStatus | typeof FILTER_ALL_DEFAULT
}) {

  if (filterName)
    inputData = inputData.filter(
      (invoice) => invoice.createdBy.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    )

  if (filterStatus !== FILTER_ALL_DEFAULT)
    inputData = inputData.filter((invoice) => invoice.status === filterStatus)
  return inputData
}

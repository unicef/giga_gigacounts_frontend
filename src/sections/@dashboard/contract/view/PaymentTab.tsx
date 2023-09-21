import { ProgressBar } from '@carbon/react'
import { useEffect, useState } from 'react'
import {
  ContractDetails,
  ContractStatus,
  IContractPayment,
  IPeriod,
  PaymentStatus
} from 'src/@types'
import { getContractAvailablePayments } from 'src/api/contracts'
import { getContractPayments } from 'src/api/payments'
import CustomDataTable from 'src/components/data-table/CustomDataTable'
import { Stack } from 'src/components/stack'
import { useTable } from 'src/components/table'
import { Typography } from 'src/components/typography'
import { FILTER_ALL_DEFAULT, KEY_DEFAULTS, Views } from 'src/constants'
import { useAuthorization } from 'src/hooks/useAuthorization'
import { useCustomSearchParams } from 'src/hooks/useCustomSearchParams'
import { useModal } from 'src/hooks/useModal'
import { useLocales } from 'src/locales'
import PaymentDetailsDrawer from 'src/sections/@dashboard/payment/form/PaymentDetailsDrawer'
import { PaymentTableRow, PaymentTableToolbar } from 'src/sections/@dashboard/payment/list'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'

export default function PaymentTab({ contract }: { contract: ContractDetails }) {
  const { palette, spacing } = useTheme()
  const { page, rowsPerPage, setPage, setRowsPerPage } = useTable({
    defaultOrderBy: 'dateFrom'
  })

  const paymentFrequency = contract.isContract ? contract.frequency.name : 'Monthly'
  const [tableData, setTableData] = useState<IContractPayment[] | null>(null)

  const [searchParams, generateSetter] = useCustomSearchParams({
    filterPaymentStatus: FILTER_ALL_DEFAULT
  })
  const { filterPaymentStatus: filterStatus } = searchParams
  const setFilterStatus = generateSetter('filterPaymentStatus')

  const newPayment = useModal()

  const [availablePayments, setAvailablePayments] = useState<{
    amount: number
    periods: IPeriod[]
  } | null>(null)

  const { translate } = useLocales()

  const TABLE_HEAD: { key: string; header: string; align?: string }[] = [
    { key: 'id', header: `${translate('payment')} #` },
    { key: 'status', header: translate('status') },
    { key: 'dateTo', header: translate('payment_period') },
    { key: 'amount', header: translate('amount') },
    { key: 'connections', header: translate('connection') },
    { key: KEY_DEFAULTS[0], header: '' },
    { key: KEY_DEFAULTS[1], header: '' }
  ]
  const status = contract.isContract ? contract.status : ContractStatus.Draft

  const { canAdd } = useAuthorization()
  const canAddPayment =
    canAdd(Views.payment) &&
    contract.isContract &&
    (status === ContractStatus.Ongoing || status === ContractStatus.Confirmed) &&
    !contract.automatic

  useEffect(() => {
    getContractPayments(contract.id).then(setTableData)
    if (canAddPayment) {
      getContractAvailablePayments(contract.id)
        .then(setAvailablePayments)
        .catch(() => setAvailablePayments(null))
    }
  }, [contract.id, canAddPayment])

  const refetchPayments = () => {
    getContractPayments(contract.id).then(setTableData)
    if (canAddPayment) {
      getContractAvailablePayments(contract.id)
        .then(setAvailablePayments)
        .catch(() => setAvailablePayments(null))
    }
  }

  const dataFiltered = tableData
    ? applyFilter({
        inputData: tableData,
        filterStatus
      })
    : null

  const isEmpty = Boolean(tableData && !tableData.length)
  const isNotFound = !isEmpty && Boolean(dataFiltered && !dataFiltered.length)

  const downloadableData = tableData
    ? tableData.map((payment) => ({
        'Payment number': payment.id,
        'Contract name': contract.name,
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

  const budgetPaid = tableData
    ? tableData
        .filter((p) => p.status === PaymentStatus.Paid)
        .reduce((prev, curr) => prev + Number(curr.amount), 0)
        .toFixed(2)
    : 0

  return (
    <>
      {contract.isContract && (
        <Stack
          style={{
            background: palette.background.paper,
            padding: spacing.md,
            marginBottom: spacing.xl
          }}
        >
          <Typography as="h6">{capitalizeFirstLetter(translate('spent_budget'))}</Typography>
          <ProgressBar
            label={`${contract.currency.code} ${Number(budgetPaid)} /
            ${contract.currency.code} ${Number(contract.budget).toFixed(2)}`}
            size="big"
            max={Number(contract.budget)}
            value={Number(budgetPaid)}
          />
        </Stack>
      )}
      <CustomDataTable
        isSortable
        RowComponent={PaymentTableRow}
        getRowComponentProps={(row) => ({
          contractId: contract.id,
          payment: row,
          currency: contract.currency,
          contractAutomatic: contract.automatic,
          contractStatus: status,
          refetchPayments,
          contractNumberOfSchools: contract.schools.length,
          contractFrequency: contract.frequency?.name ?? 'Monthly'
        })}
        ToolbarContent={
          <PaymentTableToolbar
            filterStatus={filterStatus}
            csvDownloadData={downloadableData}
            csvDownloadFileName={`payments_contract:${contract.name}`}
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
        buttonsProps={
          canAddPayment && availablePayments?.periods && availablePayments.periods.length > 0
            ? [
                {
                  kind: 'primary',
                  onClick: newPayment.open,
                  renderIcon: 'Add',
                  label: capitalizeFirstLetter(translate('new_payment'))
                }
              ]
            : []
        }
      />
      {availablePayments?.amount && (
        <PaymentDetailsDrawer
          renderView
          handleOpen={newPayment.open}
          paymentFrequency={paymentFrequency}
          availablePayments={availablePayments?.periods ?? []}
          refetchPayments={refetchPayments}
          contract={contract}
          open={newPayment.value}
          onClose={newPayment.close}
          amount={availablePayments.amount}
        />
      )}
    </>
  )
}

function applyFilter({
  inputData,
  filterStatus
}: {
  inputData: IContractPayment[]
  filterStatus: string
}) {
  if (filterStatus !== FILTER_ALL_DEFAULT)
    inputData = inputData.filter((invoice) => invoice.status === filterStatus)

  return inputData
}

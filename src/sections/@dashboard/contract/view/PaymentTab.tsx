import { ProgressBar } from '@carbon/react'
import moment from 'moment'
import { useEffect, useState } from 'react'
import {
  ContractStatus,
  IContractDetails,
  IContractPayment,
  IPeriod,
  PaymentStatus
} from 'src/@types'
import { getContractAvailablePayments } from 'src/api/contracts'
import { getContractPayments } from 'src/api/payments'
import CustomDataTable from 'src/components/data-table/CustomDataTable'
import { Stack } from 'src/components/stack'
import { useTable } from 'src/components/table'
import { Footer, Typography } from 'src/components/typography'
import { FILTER_ALL_DEFAULT, KEY_DEFAULTS, Views } from 'src/constants'
import { useAuthorization } from 'src/hooks/useAuthorization'
import { useCustomSearchParams } from 'src/hooks/useCustomSearchParams'
import { useModal } from 'src/hooks/useModal'
import { useLocales } from 'src/locales'
import PaymentDetailsDrawer from 'src/sections/@dashboard/payment/form/PaymentDetailsDrawer'
import { PaymentTableRow, PaymentTableToolbar } from 'src/sections/@dashboard/payment/list'
import { useTheme } from 'src/theme'
import { formatDate } from 'src/utils/date'
import { capitalizeFirstLetter } from 'src/utils/strings'

export default function PaymentTab({ contract }: { contract: IContractDetails }) {
  const { palette, spacing } = useTheme()
  const { page, rowsPerPage, setPage, setRowsPerPage } = useTable({
    defaultOrderBy: 'dateFrom'
  })

  const paymentFrequency = contract.frequency.name
  const { status } = contract

  const [tableData, setTableData] = useState<IContractPayment[] | null>(null)

  const [searchParams, generateSetter] = useCustomSearchParams({
    filterPaymentStatus: FILTER_ALL_DEFAULT,
    filterPaymentDateMin: moment().subtract(30, 'day').toISOString(),
    filterPaymentDateMax: moment().add(30, 'day').toISOString()
  })

  const {
    filterPaymentStatus: filterStatus,
    filterPaymentDateMax,
    filterPaymentDateMin
  } = searchParams
  const filterDates = { max: filterPaymentDateMax, min: filterPaymentDateMin }
  const setFilterDates = {
    max: generateSetter('filterPaymentDateMax'),
    min: generateSetter('filterPaymentDateMin')
  }
  const setFilterStatus = generateSetter('filterPaymentStatus')

  const newPayment = useModal()

  const [availablePayments, setAvailablePayments] = useState<{
    amount: number
    periods: IPeriod[]
  } | null>(null)

  const { translate, replaceTwoTranslated } = useLocales()

  const TABLE_HEAD: { key: string; header: string; align?: string }[] = [
    { key: 'id', header: translate('payment') },
    { key: 'status', header: translate('status') },
    { key: 'dateTo', header: translate('payment_period') },
    { key: 'amount', header: translate('amount') },
    { key: 'connections', header: translate('connectivity_distribution_by_status') },
    { key: KEY_DEFAULTS[0], header: '' },
    { key: KEY_DEFAULTS[1], header: '' },
    { key: KEY_DEFAULTS[2], header: '' }
  ]

  const { canAdd } = useAuthorization()
  const canAddPayment =
    canAdd(Views.payment) &&
    (status === ContractStatus.Ongoing || status === ContractStatus.Confirmed) &&
    !contract.automatic

  useEffect(() => {
    getContractPayments(contract.id, filterDates.min, filterDates.max).then(setTableData)
    if (canAddPayment) {
      getContractAvailablePayments(contract.id)
        .then(setAvailablePayments)
        .catch(() => setAvailablePayments(null))
    }
  }, [contract.id, filterDates.min, filterDates.max, canAddPayment])

  const refetchPayments = () => {
    getContractPayments(contract.id, filterDates.min, filterDates.max).then(setTableData)
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
        .reduce(
          (prev, curr) =>
            prev +
            Number(curr.amount) -
            (Number.isNaN(Number(curr.discount)) ? 0 : Number(curr.discount)),
          0
        )
        .toFixed(2)
    : 0

  return (
    <>
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
            filterDates={filterDates}
            setFilterDates={setFilterDates}
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

      <PaymentDetailsDrawer
        renderView
        handleOpen={newPayment.open}
        paymentFrequency={paymentFrequency}
        availablePayments={availablePayments?.periods ?? []}
        refetchPayments={refetchPayments}
        contract={contract}
        open={newPayment.value}
        onClose={newPayment.close}
        amount={availablePayments?.amount}
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
  filterStatus
}: {
  inputData: IContractPayment[]
  filterStatus: string
}) {
  if (filterStatus !== FILTER_ALL_DEFAULT)
    inputData = inputData.filter((invoice) => invoice.status === filterStatus)

  return inputData
}

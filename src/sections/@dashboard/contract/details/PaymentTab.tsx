import { Add } from '@carbon/icons-react'
// @ts-ignore
import { ProgressBar } from '@carbon/react'
import { useEffect, useState } from 'react'
import { ContractDetails, ContractStatus, IContractPayment, PaymentStatus } from 'src/@types'
import { getContractAvailablePayments } from 'src/api/contracts'
import { getContractPayments } from 'src/api/payments'
import CustomDataTable from 'src/components/data-table/CustomDataTable'
import { Stack } from 'src/components/stack'
import { getComparator, useTable } from 'src/components/table'
import { Typography } from 'src/components/typography'
import { Views } from 'src/constants/authorization'
import { useAuthorization } from 'src/hooks/useAuthorization'
import { useModal } from 'src/hooks/useModal'
import { useLocales } from 'src/locales'
import PaymentDetailsDrawer from 'src/sections/@dashboard/payment/form/PaymentDetailsDrawer'
import { PaymentTableRow, PaymentTableToolbar } from 'src/sections/@dashboard/payment/list'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'

export default function PaymentTab({ contract }: { contract: ContractDetails }) {
  const { palette, spacing } = useTheme()
  const { page, order, orderBy, rowsPerPage, setPage, setRowsPerPage } = useTable({
    defaultOrderBy: 'dateFrom'
  })

  const paymentFrequency = contract.isContract ? contract.frequency.name : 'Monthly'
  const [tableData, setTableData] = useState<IContractPayment[]>([])
  const [filterName, setFilterName] = useState('')
  const [filterStatus, setFilterStatus] = useState<PaymentStatus | 'all'>('all')

  const newPayment = useModal()

  const [availablePayments, setAvailablePayments] = useState<
    { month: number; year: number }[] | null
  >(null)

  const { translate } = useLocales()

  const TABLE_HEAD: { key: string; header: string; align?: string }[] = [
    { key: 'id', header: `${translate('payment')} #` },
    { key: 'dateFrom', header: translate('date_from') },
    { key: 'amount', header: translate('amount') },
    { key: 'status', header: translate('status') },
    { key: 'connections', header: translate('connection') },
    { key: '', header: '' },
    { key: '-', header: '' }
  ]
  const status = contract.isContract ? contract.status : ContractStatus.Draft

  const { canAdd } = useAuthorization()
  const canAddPayment =
    canAdd(Views.payment) &&
    contract.isContract &&
    (status === ContractStatus.Ongoing || status === ContractStatus.Confirmed) &&
    !contract.automatic

  useEffect(() => {
    if (canAddPayment) {
      getContractAvailablePayments(contract.id).then((res) => {
        if (!(res instanceof Array)) return
        setAvailablePayments(res)
      })
    }
  }, [contract.id, canAddPayment])

  const refetchPayments = () => {
    getContractPayments(contract.id).then(setTableData)
    if (canAddPayment) {
      getContractAvailablePayments(contract.id).then((res) => {
        if (!(res instanceof Array)) return
        setAvailablePayments(res as { month: number; year: number }[])
      })
    }
  }

  useEffect(() => {
    getContractPayments(contract.id).then(setTableData)
  }, [contract.id])

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterStatus
  })

  const isNotFound = !dataFiltered.length

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
            label={`${contract.currency.code} ${Number(contract.totalSpent.amount)} /
            ${contract.currency.code} ${Number(contract.budget)}`}
            size="big"
            max={Number(contract.budget)}
            value={Number(contract.totalSpent.amount)}
          />
        </Stack>
      )}
      <CustomDataTable
        isSortable
        RowComponent={PaymentTableRow}
        getRowComponentProps={(row) => ({
          contractId: contract.id,
          payment: contract,
          paidDate: row.paidDate,
          currencyCode: contract.currency?.code ?? '',
          contractAutomatic: contract.automatic,
          metrics: row.metrics,
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
        buttonsProps={
          canAddPayment && availablePayments && availablePayments.length > 0
            ? [
                {
                  kind: 'primary',
                  onClick: newPayment.open,
                  renderIcon: Add,
                  label: capitalizeFirstLetter(translate('new_payment'))
                }
              ]
            : []
        }
      />
      <PaymentDetailsDrawer
        paymentFrequency={paymentFrequency}
        availablePayments={availablePayments ?? []}
        refetchPayments={refetchPayments}
        contract={contract}
        open={newPayment.value}
        onClose={newPayment.close}
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

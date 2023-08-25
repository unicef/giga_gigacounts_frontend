import { useEffect, useState } from 'react'
import { ContractDetails, IBlockchainTransaction, Web3TransactionStatus } from 'src/@types'
import { getBlockchainTransactions } from 'src/api/blockchainTransactions'
import CustomDataTable from 'src/components/data-table/CustomDataTable'
import { useTable } from 'src/components/table'
import { FILTER_ALL_DEFAULT, KEY_DEFAULTS } from 'src/constants'
import { useLocales } from 'src/locales'
import {
  TransactionTableRow,
  TransactionTableToolbar
} from 'src/sections/@dashboard/transactions/list'

export default function Web3TransactionsTab({ contract }: { contract: ContractDetails }) {
  const { page, rowsPerPage, setPage, setRowsPerPage } = useTable({})
  const [tableData, setTableData] = useState<IBlockchainTransaction[] | null>(null)
  const [filterName, setFilterName] = useState('')
  const [filterStatus, setFilterStatus] = useState<
    Web3TransactionStatus | typeof FILTER_ALL_DEFAULT
  >(FILTER_ALL_DEFAULT)
  const { translate } = useLocales()
  const TABLE_HEAD: { key: string; header: string; align?: string }[] = [
    { key: 'id', header: `#` },
    { key: 'createdAt', header: translate('date') },
    { key: 'hash', header: translate('transactions_tab.transaction_hash') },
    { key: 'type', header: translate('transactions_tab.transaction_type') },
    { key: 'wallet', header: translate('wallet.label') },
    { key: 'user', header: translate('user') },
    { key: 'status', header: translate('status') },
    { key: KEY_DEFAULTS[0], header: '' },
    { key: KEY_DEFAULTS[1], header: '' }
  ]

  useEffect(() => {
    getBlockchainTransactions(contract.id)
      .then(setTableData)
      .catch(() => setTableData([]))
  }, [contract.id])

  const dataFiltered = tableData
    ? applyFilter({
        inputData: tableData,
        filterName,
        filterStatus
      })
    : null

  const isNotFound = Boolean(dataFiltered && !dataFiltered.length)

  return (
    <CustomDataTable
      isSortable
      RowComponent={TransactionTableRow}
      getRowComponentProps={(row) => ({
        transaction: row
      })}
      ToolbarContent={
        <TransactionTableToolbar
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
      tableName="transactionLog"
      noDataText="table_no_data.transactions"
      title="Blockchain Transaction table"
    />
  )
}

function applyFilter({
  inputData,
  filterName,
  filterStatus
}: {
  inputData: IBlockchainTransaction[]
  filterName: string
  filterStatus: Web3TransactionStatus | typeof FILTER_ALL_DEFAULT
}) {
  if (filterName)
    inputData = inputData.filter(
      (data) => data.walletAddress.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    )

  if (filterStatus !== FILTER_ALL_DEFAULT)
    inputData = inputData.filter(
      (data) =>
        (data.status === '1' ? Web3TransactionStatus.OK : Web3TransactionStatus.ERROR) ===
        filterStatus
    )
  return inputData
}

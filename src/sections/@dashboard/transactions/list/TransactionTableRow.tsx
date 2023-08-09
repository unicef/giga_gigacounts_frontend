import { Button, DataTableRow, Link, TableCell, TableRow, Tag } from '@carbon/react'
import { TableRowProps } from '@carbon/react/lib/components/DataTable/TableRow'
import {
  IBlockchainTransaction,
  Icon,
  TransactionTypeCode,
  Translation,
  Web3TransactionStatus
} from 'src/@types'
import {
  ENV_SUPPORTED_NETWORK_ID,
  ICONS,
  SUPPORTED_NETWORKS,
  WEB3_TRANSACTION_STATUS_COLORS
} from 'src/constants'
import { useModal } from 'src/hooks/useModal'
import { useLocales } from 'src/locales'
import { formatDateTime } from 'src/utils/date'
import { capitalizeFirstLetter } from 'src/utils/strings'
import { getOrderedFromCells } from 'src/utils/table'
import TransactionViewDrawer from '../form/TransactionViewDrawer'

type Props = {
  row: DataTableRow
  rowProps: TableRowProps
  transaction: IBlockchainTransaction
}

export default function TransactionTableRow({ row, rowProps, transaction }: Props) {
  const addressExplorer = `${SUPPORTED_NETWORKS[ENV_SUPPORTED_NETWORK_ID].blockExplorerUrl}/address/ADR`
  const trxExplorer = `${SUPPORTED_NETWORKS[ENV_SUPPORTED_NETWORK_ID].blockExplorerUrl}/tx/TRX`
  const { translate } = useLocales()
  const details = useModal()
  const handleView = () => {
    details.open()
  }
  const options: { icon: Icon; label: Translation; onClick: () => void }[] = [
    {
      icon: ICONS.View,
      label: 'view',
      onClick: handleView
    }
  ]
  const [status] = getOrderedFromCells(['status'], row.cells)
  const parsedStatus = status === 1 ? Web3TransactionStatus.OK : Web3TransactionStatus.ERROR

  const getTypeNameByTypeCode = (typeCode: TransactionTypeCode) => {
    switch (typeCode) {
      case TransactionTypeCode.FUND_CONTRACT:
        return translate('transactions_tab.fund_contract')
      case TransactionTypeCode.INCREASE_ALLOWANCE:
        return translate('transactions_tab.increase_allowance')
      case TransactionTypeCode.FUND_WALLET:
        return translate('transactions_tab.fund_wallet')
      default:
        return typeCode
    }
  }

  return (
    <TableRow {...rowProps}>
      <TableCell>{transaction.id}</TableCell>
      <TableCell>{formatDateTime(transaction.createdAt, '/')}</TableCell>
      <TableCell>
        <Link
          href={trxExplorer.replace('TRX', transaction.transactionHash)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {transaction.transactionHash}
        </Link>
      </TableCell>
      <TableCell>
        {getTypeNameByTypeCode(transaction.transactionType as TransactionTypeCode)}
      </TableCell>
      <TableCell>
        <Link
          href={addressExplorer.replace('ADR', transaction.walletAddress)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {transaction.walletAddress}
        </Link>
      </TableCell>
      <TableCell>{transaction.userDisplayName}</TableCell>
      <TableCell>
        <Tag style={{ margin: 0 }} type={WEB3_TRANSACTION_STATUS_COLORS[parsedStatus]}>
          {capitalizeFirstLetter(translate(`constant_status.web_transaction.${parsedStatus}`))}
        </Tag>
      </TableCell>
      <TableCell>
        {options.map((opt) => (
          <Button
            style={{ margin: 0, padding: 0 }}
            key={row.id + opt.label}
            kind="ghost"
            onClick={opt.onClick}
            iconDescription={capitalizeFirstLetter(translate(opt.label))}
            renderIcon={opt.icon}
            hasIconOnly
          />
        ))}
      </TableCell>
      <TableCell>
        <TransactionViewDrawer
          transaction={{
            ...transaction,
            createdAt: formatDateTime(transaction.createdAt, '/'),
            status: capitalizeFirstLetter(
              translate(`constant_status.web_transaction.${parsedStatus}`)
            ),
            transactionType: getTypeNameByTypeCode(
              transaction.transactionType as TransactionTypeCode
            )
          }}
          hasError={parsedStatus === Web3TransactionStatus.ERROR}
          open={details.value}
          onClose={details.close}
        />
      </TableCell>
    </TableRow>
  )
}

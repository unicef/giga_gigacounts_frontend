import { DataTableRow, Modal, TableCell, TableRow } from '@carbon/react'
import { TableRowProps } from '@carbon/react/lib/components/DataTable/TableRow'
import { IUser, Icon, Translation, UserRoles } from 'src/@types'
import { useAuthContext } from 'src/auth/useAuthContext'
import { ActionLink } from 'src/components/action'
import { ENV_SUPPORTED_NETWORK_ID, STRING_DEFAULT, SUPPORTED_NETWORKS } from 'src/constants'
import { useAuthorization } from 'src/hooks/useAuthorization'
import { useModal } from 'src/hooks/useModal'
import { useWeb3Context } from 'src/hooks/useWeb3Context'
import { useLocales } from 'src/locales'
import { UserFundWalletDrawer } from 'src/sections/@dashboard/users/fundWallet'
import { capitalizeFirstLetter } from 'src/utils/strings'
import { getOrderedFromCells } from 'src/utils/table'

type Props = {
  row: DataTableRow<(IUser & { roleName: string; ispName?: string })[]>
  rowProps: TableRowProps
  lastName?: string
}

export default function UsersTableRow({ row, rowProps, lastName }: Props) {
  const [countryName, name, email, roleName, walletAddress, phoneNumber, ispName] =
    getOrderedFromCells(
      ['countryName', 'name', 'email', 'roleName', 'walletAddress', 'phoneNumber', 'ispName'],
      row.cells
    )

  const { hasSomeRole } = useAuthorization()
  const { translate } = useLocales()
  const { user, isAdmin } = useAuthContext()
  const { account } = useWeb3Context()
  const fundWallet = useModal()
  const withoutVerifiedWallet = useModal()

  const canFundWallet = hasSomeRole([UserRoles.GIGA_ADMIN]) && walletAddress
  const actions: {
    icon: Icon
    label: Translation
    onClick: () => void
    variant?: 'error' | 'primary' | 'success'
  }[] = []
  const addressExplorer = `${SUPPORTED_NETWORKS[ENV_SUPPORTED_NETWORK_ID].blockExplorerUrl}/address/ADR`

  if (canFundWallet) {
    actions.push({
      icon: 'Fund',
      label: 'fund',
      onClick: user && user.walletAddress && account ? fundWallet.open : withoutVerifiedWallet.open,
      variant: 'primary'
    })
  }

  return (
    <TableRow {...rowProps}>
      <TableCell style={{ verticalAlign: 'middle', width: '15%' }}>
        {name} {lastName ?? ''}
      </TableCell>
      <TableCell style={{ verticalAlign: 'middle', width: '20%' }}>{roleName}</TableCell>
      <TableCell style={{ verticalAlign: 'middle', width: isAdmin ? '10%' : '12.5%' }}>
        {countryName}
      </TableCell>
      <TableCell style={{ verticalAlign: 'middle', width: isAdmin ? '10%' : '12.5%' }}>
        {ispName ?? STRING_DEFAULT}
      </TableCell>
      <TableCell style={{ verticalAlign: 'middle', width: isAdmin ? '10%' : '12.5%' }}>
        {email}
      </TableCell>
      <TableCell style={{ verticalAlign: 'middle', width: isAdmin ? '10%' : '12.5%' }}>
        {phoneNumber ?? STRING_DEFAULT}
      </TableCell>
      {isAdmin && (
        <TableCell style={{ verticalAlign: 'middle', width: '10%' }}>
          {walletAddress ? (
            <a
              href={addressExplorer.replace('ADR', walletAddress)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {walletAddress}
            </a>
          ) : (
            STRING_DEFAULT
          )}
        </TableCell>
      )}
      <TableCell style={{ verticalAlign: 'middle', width: '15%' }}>
        {actions.map((opt) => (
          <ActionLink
            variant={opt.variant}
            key={name + opt.label}
            onClick={opt.onClick}
            description={opt.label}
            icon={opt.icon}
          />
        ))}
      </TableCell>
      <TableCell style={{ width: '0%' }}>
        {row && (
          <UserFundWalletDrawer
            name={name ?? ''}
            walletAddress={walletAddress ?? ''}
            open={fundWallet.value}
            onClose={fundWallet.close}
          />
        )}
        <Modal
          passiveModal
          open={withoutVerifiedWallet.value}
          modalLabel={capitalizeFirstLetter(translate('without_walllet.title'))}
          modalHeading={capitalizeFirstLetter(translate('without_walllet.to_fund_Wallet'))}
          onRequestClose={withoutVerifiedWallet.close}
          onRequestSubmit={withoutVerifiedWallet.close}
        />
      </TableCell>
    </TableRow>
  )
}

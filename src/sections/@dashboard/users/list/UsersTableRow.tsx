import { DataTableRow, Modal, TableCell, TableRow } from '@carbon/react'
import { TableRowProps } from '@carbon/react/lib/components/DataTable/TableRow'
import { IUser, Icon, Translation, UserRoles } from 'src/@types'
import { useAuthContext } from 'src/auth/useAuthContext'
import { ActionButton } from 'src/components/action-button'
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
  const options: { icon: Icon; label: Translation; onClick: () => void }[] = []
  const addressExplorer = `${SUPPORTED_NETWORKS[ENV_SUPPORTED_NETWORK_ID].blockExplorerUrl}/address/ADR`

  if (canFundWallet) {
    options.push({
      icon: 'Fund',
      label: 'fund',
      onClick: user && user.walletAddress && account ? fundWallet.open : withoutVerifiedWallet.open
    })
  }

  return (
    <TableRow {...rowProps}>
      <TableCell style={{ width: '15%' }}>
        {name} {lastName ?? ''}
      </TableCell>
      <TableCell style={{ width: '20%' }}>{roleName}</TableCell>
      <TableCell style={{ width: isAdmin ? '12.5%' : '15%' }}>{countryName}</TableCell>
      <TableCell style={{ width: isAdmin ? '12.5%' : '15%' }}>
        {ispName ?? STRING_DEFAULT}
      </TableCell>
      <TableCell style={{ width: isAdmin ? '12.5%' : '15%' }}>{email}</TableCell>
      <TableCell style={{ width: isAdmin ? '12.5%' : '15%' }}>
        {phoneNumber ?? STRING_DEFAULT}
      </TableCell>
      {isAdmin && (
        <TableCell style={{ width: '10%' }}>
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
      <TableCell style={{ width: '5%' }}>
        {options.map((opt) => (
          <ActionButton
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

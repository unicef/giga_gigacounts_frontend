import { Button, DataTableRow, Modal, TableCell, TableRow } from '@carbon/react'
import { TableRowProps } from '@carbon/react/lib/components/DataTable/TableRow'
import { IRole, Icon, Translation, UserRoles } from 'src/@types'
import { useAuthContext } from 'src/auth/useAuthContext'
import { ENV_SUPPORTED_NETWORK_ID, ICONS, SUPPORTED_NETWORKS } from 'src/constants'
import { useAuthorization } from 'src/hooks/useAuthorization'
import { useModal } from 'src/hooks/useModal'
import { useWeb3Context } from 'src/hooks/useWeb3Context'
import { useLocales } from 'src/locales'
import { UserFundWalletDrawer } from 'src/sections/@dashboard/users/fundWallet'
import { capitalizeFirstLetter } from 'src/utils/strings'
import { getOrderedFromCells } from 'src/utils/table'

type Props = {
  row: DataTableRow
  selected: boolean
  rowProps: TableRowProps
  role: IRole
}

export default function UsersTableRow({ row, rowProps, role }: Props) {
  const [countryName, completeName, email, , walletAddress] = getOrderedFromCells(
    ['countryName', 'completeName', 'email', 'role', 'walletAddress'],
    row.cells
  )

  const { hasSomeRole } = useAuthorization()
  const { translate } = useLocales()
  const { user } = useAuthContext()
  const { account } = useWeb3Context()
  const fundWallet = useModal()
  const withoutVerifiedWallet = useModal()
  const canFundWallet = hasSomeRole([UserRoles.GIGA_ADMIN]) && walletAddress
  const options: { icon: Icon; label: Translation; onClick: () => void }[] = []
  const addressExplorer = `${SUPPORTED_NETWORKS[ENV_SUPPORTED_NETWORK_ID].blockExplorerUrl}/address/ADR`

  if (canFundWallet) {
    options.push({
      icon: ICONS.Fund,
      label: 'fund',
      onClick: user && user.walletAddress && account ? fundWallet.open : withoutVerifiedWallet.open
    })
  }

  return (
    <TableRow {...rowProps}>
      <TableCell>{countryName}</TableCell>
      <TableCell>{completeName}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{role.name}</TableCell>
      <TableCell>
        {walletAddress ? (
          <a
            href={addressExplorer.replace('ADR', walletAddress)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {walletAddress}
          </a>
        ) : (
          capitalizeFirstLetter(translate('no_wallet_address'))
        )}
      </TableCell>
      <TableCell>
        {options.map((opt) => (
          <Button
            key={completeName + opt.label}
            style={{ margin: 0, padding: 0 }}
            kind="ghost"
            onClick={opt.onClick}
            iconDescription={capitalizeFirstLetter(translate(opt.label))}
            renderIcon={opt.icon}
            hasIconOnly
          />
        ))}
      </TableCell>
      <TableCell>
        {row && (
          <UserFundWalletDrawer
            name={completeName}
            walletAddress={walletAddress}
            open={fundWallet.value}
            onClose={fundWallet.close}
          />
        )}
        <Modal
          open={withoutVerifiedWallet.value}
          modalLabel={translate('without_walllet.title')}
          modalHeading={translate('without_walllet.to_fund_Wallet')}
          primaryButtonText={translate('close')}
          onRequestClose={withoutVerifiedWallet.close}
          onRequestSubmit={withoutVerifiedWallet.close}
        />
      </TableCell>
    </TableRow>
  )
}

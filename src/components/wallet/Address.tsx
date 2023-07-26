// locales
import { useLocales } from 'src/locales'
// hooks
import useCopyToClipboard from 'src/hooks/useCopyToClipboard'
// components
import { Copy, Wallet } from '@carbon/icons-react'
import { Button, Link, Tooltip } from '@carbon/react'
import { Stack } from 'src/components/stack'
import { Typography } from 'src/components/typography'
// style
import { useSnackbar } from 'src/hooks/useSnackbar'
import { useTheme } from 'src/theme'

const getColor = (wrongAddress: boolean, isVerified: boolean) => {
  if (wrongAddress) {
    return 'error'
  }
  if (isVerified) {
    return 'success'
  }
  return 'error'
}

type AddressProps = {
  address?: string
  addressExplorer?: string
  wrongAddress?: boolean
  isVerified?: boolean
}

export default function Address({
  address,
  addressExplorer,
  wrongAddress = false,
  isVerified = false
}: AddressProps) {
  const { translate } = useLocales()
  const { copy } = useCopyToClipboard()
  const { pushSuccess } = useSnackbar()
  const { spacing } = useTheme()

  const handleCopy = () => {
    if (!address) return
    copy(address)
    pushSuccess('wallet.copied')
  }

  if (address) {
    return (
      <Stack orientation="horizontal" alignItems="center" justifyContent="flex-start">
        <Wallet />
        <Tooltip label={translate('wallet.view_explorer')} align="right">
          <Link href={addressExplorer} target="_blank">
            <Typography
              variant={getColor(wrongAddress, isVerified)}
              style={{ marginLeft: spacing.xs, marginRight: spacing.xs }}
            >
              {address}
            </Typography>
          </Link>
        </Tooltip>
        <Button
          kind="ghost"
          onClick={handleCopy}
          hasIconOnly
          iconDescription={translate('wallet.copy_wallet')}
          renderIcon={Copy}
          tooltipPosition="right"
        />
      </Stack>
    )
  }
  return (
    <Typography variant={getColor(wrongAddress, isVerified)}>
      {translate('wallet.address_not_set')}
    </Typography>
  )
}

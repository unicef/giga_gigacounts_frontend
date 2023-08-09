import { Tag, Theme, Tooltip } from '@carbon/react'
import { WalletProps } from 'src/@types'
import { Stack } from 'src/components/stack'
import { Typography } from 'src/components/typography'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import Address from './Address'

export default function Wallet({
  address,
  label,
  icon,
  isVerified,
  wrongAddress,
  chainLabel,
  chainExplorer,
  chainSupported,
  balances
}: WalletProps) {
  const { palette, spacing } = useTheme()
  const { translate } = useLocales()

  const addressExplorer = chainExplorer
    ? `${chainExplorer}/address/${address}`
    : 'https://blockchair.com/explorers'

  return (
    <Stack
      style={{ backgroundColor: palette.background.neutral, padding: spacing.md }}
      orientation="vertical"
      gap={spacing.md}
    >
      <Stack orientation="horizontal" alignItems="center" justifyContent="flex-start">
        <img width="32px" height="32px" alt="wallet" src={icon} />
        <Typography as="span" style={{ marginLeft: spacing.xs, marginRight: spacing.xs }}>
          {label}
        </Typography>
        <Tooltip
          label={
            chainSupported
              ? translate('wallet.network_supported')
              : translate('wallet.network_unsupported')
          }
          align="right"
        >
          <Tag style={{ width: 150, border: 'none' }} type={chainSupported ? 'blue' : 'red'}>
            {chainLabel}
          </Tag>
        </Tooltip>
      </Stack>
      <Address
        isVerified={isVerified}
        wrongAddress={wrongAddress}
        address={address}
        addressExplorer={addressExplorer}
      />
      {balances && balances.length > 0 && (
        <Theme theme="g90">
          <Stack
            style={{ padding: spacing.xs }}
            orientation="vertical"
            justifyContent="space-between"
          >
            {balances.map((balance, index) => (
              <Stack
                key={index}
                style={{ padding: spacing.xs }}
                orientation="horizontal"
                justifyContent="space-between"
              >
                <Typography>{`${balance.name}`}</Typography>
                <Typography>{`${balance.value}`}</Typography>
              </Stack>
            ))}
          </Stack>
        </Theme>
      )}
    </Stack>
  )
}

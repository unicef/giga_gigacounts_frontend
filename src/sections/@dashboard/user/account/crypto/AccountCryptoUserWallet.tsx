// react
import { Button, Link, Toggle } from '@carbon/react'
import { useEffect, useState } from 'react'
// locales, theme, utils
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'
// hooks
import { useAuthContext } from 'src/auth/useAuthContext'
import { useWeb3Context } from 'src/hooks/useWeb3Context'
// components
import { Stack } from 'src/components/stack'
import { SectionTitle, Typography } from 'src/components/typography'
import Wallet from 'src/components/wallet/Wallet'
import { useSnackbar } from 'src/hooks/useSnackbar'
// permissions
import { ICONS, UserSettings, Views } from 'src/constants'
import { useAuthorization } from 'src/hooks/useAuthorization'
// api
import { settingAutomaticContracts } from 'src/api/user'

export default function AccountCryptoUserWallet() {
  const {
    account,
    wallet,
    connect,
    chain,
    supportedChain,
    balances,
    verified,
    disconnect,
    verifyWallet,
    updateBalance,
    resetError
  } = useWeb3Context()

  const { palette, spacing } = useTheme()
  const { user, setUser } = useAuthContext()
  const { canEdit } = useAuthorization()
  const { translate } = useLocales()
  const { pushError, pushSuccess } = useSnackbar()

  const [automaticContracts, setAutomaticContracts] = useState(
    user?.[UserSettings.SETTING_AUTOMATIC_CONTRACTS] || false
  )
  const [hasAttachedWallet, setHasAttachedWallet] = useState(Boolean(user?.walletAddress))
  const [wrongAddress, setWrongAddress] = useState(
    !user?.walletAddress ||
      (hasAttachedWallet &&
        account?.toLocaleLowerCase() !== user?.walletAddress?.toLocaleLowerCase())
  )
  const [isVerified, setIsVerified] = useState(hasAttachedWallet && !wrongAddress)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    if (user?.walletAddress) {
      setWrongAddress(
        hasAttachedWallet && account?.toLocaleLowerCase() !== user.walletAddress.toLocaleLowerCase()
      )
      setIsVerified(hasAttachedWallet && !wrongAddress)
    }
  }, [wrongAddress, user?.walletAddress, hasAttachedWallet, account])

  const getWalletConnected = () => {
    const walletConnectedLabel = wallet?.label || 'metamask'
    const defaultWallet = {
      name: translate('wallet.wallet_metamask'),
      icon: '/assets/icons/wallet/ic_metamask_logo.svg'
    }
    const walletConnect = {
      name: translate('wallet.wallet_connect'),
      icon: '/assets/icons/wallet/ic_wallet_connect_logo.svg'
    }
    const trustWallet = {
      name: translate('wallet.wallet_trust'),
      icon: '/assets/icons/wallet/ic_trust_logo.svg'
    }
    const coinbaseWallet = {
      name: translate('wallet.wallet_coinbase'),
      icon: '/assets/icons/wallet/ic_coinbase_logo.svg'
    }

    switch (walletConnectedLabel.toLowerCase()) {
      case 'metamask':
        return defaultWallet
      case 'walletconnect':
        return walletConnect
      case 'trust wallet':
        return trustWallet
      case 'coinbase wallet':
        return coinbaseWallet
      default:
        return defaultWallet
    }
  }

  const connectWallet = async () => {
    try {
      setUpdating(true)
      resetError()
      const result = await connect()
      await updateBalance()

      if (result && result.length > 0) {
        // A delay to wait for web3 context
        setTimeout(() => {
          pushSuccess('wallet.wallet_connected')

          if (user && user.walletAddress) {
            setWrongAddress(
              hasAttachedWallet &&
                account?.toLocaleLowerCase() !== user.walletAddress.toLocaleLowerCase()
            )
            setIsVerified(hasAttachedWallet && !wrongAddress)
          }
        }, 1000) // milliseconds
      }
    } catch (ex) {
      pushError('wallet.connect_msg_error')
    }
    setUpdating(false)
  }

  const disconnectWallet = async () => {
    disconnect()
  }

  const verify = async () => {
    try {
      setUpdating(true)
      resetError()
      const result = await verifyWallet()
      if (user && result) {
        user.walletAddress = account ?? null
        setWrongAddress(false)
        setHasAttachedWallet(true)
        setIsVerified(true)
        pushSuccess('wallet.wallet_verified')
      } else {
        pushError('wallet.verify_msg_error')
      }
    } catch (ex) {
      pushError('wallet.verify_msg_error')
    }
    setUpdating(false)
  }

  const handleUpdateSettingAutomaticContracts = async () => {
    try {
      setUpdating(true)
      const newAutoamticContracts = !automaticContracts
      await settingAutomaticContracts(newAutoamticContracts)
      setAutomaticContracts(newAutoamticContracts)
      setUser((prev) => ({
        ...prev,
        [UserSettings.SETTING_AUTOMATIC_CONTRACTS]: newAutoamticContracts
      }))
      pushSuccess('wallet.switch_update_msg_ok')
    } catch {
      pushError('wallet.switch_update_msg_error')
    }
    // A delay to keep disable the switch just a bit.
    setTimeout(() => {
      setUpdating(false)
    }, 3000) // milliseconds
  }

  return (
    <Stack
      gap={spacing.md}
      orientation="vertical"
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: palette.background.default,
        paddingInline: spacing.xl,
        paddingBlock: spacing.lg
      }}
    >
      <Typography as="h3">
        {capitalizeFirstLetter(translate('wallet.automatic_contracts'))}
      </Typography>
      <Toggle
        size="md"
        disabled={updating}
        labelA={capitalizeFirstLetter(translate('wallet.automatic_disabled'))}
        labelB={capitalizeFirstLetter(translate('wallet.automatic_enabled'))}
        labelText={translate('wallet.switch_subtitle')}
        toggled={automaticContracts}
        id="toggle automatic contracts"
        onClick={() => handleUpdateSettingAutomaticContracts()}
      />
      {canEdit(Views.wallet) && (
        <>
          <SectionTitle label="wallet.attached_wallet" />
          <Typography>
            {translate('wallet.wallet_explain_1')}{' '}
            <Link target="blank" href="https://metamask.io/download/">
              {translate('wallet.metamask')}
            </Link>{' '}
            {translate('wallet.wallet_explain_2')}{' '}
            <Link target="blank" href="https://walletconnect.com/">
              {translate('wallet.wallet_connect')}.
            </Link>{' '}
          </Typography>
        </>
      )}

      {automaticContracts && wallet && (
        <>
          <Wallet
            address={account}
            label={getWalletConnected().name}
            icon={getWalletConnected().icon}
            isVerified={isVerified || verified}
            wrongAddress={wrongAddress}
            chainLabel={chain?.label}
            chainExplorer={chain?.blockExplorerUrl}
            chainSupported={chain?.id === supportedChain?.id}
            balances={balances}
          />
          {(wrongAddress || !hasAttachedWallet) && (
            <>
              <Typography variant="error">
                {hasAttachedWallet
                  ? translate('wallet.verify_msg')
                  : translate('wallet.verify_msg_choose_wtihout_wallet')}
              </Typography>
              <Stack orientation="horizontal" gap={spacing.xs}>
                {hasAttachedWallet && (
                  <Typography variant="info">
                    {translate('wallet.verify_msg_choose').replace(
                      'WALLET_ADDRESS',
                      `${user?.walletAddress}`
                    )}
                  </Typography>
                )}
              </Stack>
            </>
          )}
        </>
      )}
      {automaticContracts && (
        <Stack orientation="horizontal" gap={spacing.md}>
          {!wallet && canEdit(Views.wallet) && (
            <Button
              id="connect-wallet"
              disabled={updating}
              renderIcon={ICONS.Add}
              onClick={() => connectWallet()}
            >
              {translate('wallet.connect')}
            </Button>
          )}
          {wallet && canEdit(Views.wallet) && (
            <Button
              disabled={updating}
              renderIcon={ICONS.Subtract}
              onClick={() => disconnectWallet()}
            >
              {translate('wallet.disconnect')}
            </Button>
          )}
          {wallet && canEdit(Views.wallet) && (wrongAddress || !hasAttachedWallet) && (
            <Button
              disabled={updating}
              renderIcon={ICONS.Success}
              className="bx--btn--field"
              onClick={() => verify()}
            >
              {translate('wallet.verify')}
            </Button>
          )}
        </Stack>
      )}
    </Stack>
  )
}

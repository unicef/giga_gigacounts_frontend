import { Button, InlineNotification } from '@carbon/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { ICurrency, WalletBalance } from 'src/@types'
import { useAuthContext } from 'src/auth/useAuthContext'
import Drawer from 'src/components/drawer/Drawer'
import { RHFSelect, RHFTextField } from 'src/components/hook-form'
import FormProvider from 'src/components/hook-form/FormProvider'
import { Stack } from 'src/components/stack'
import { SectionTitle } from 'src/components/typography'
import { ENV_SUPPORTED_NETWORK_ID, ICONS, SUPPORTED_NETWORKS } from 'src/constants'
import { useBusinessContext } from 'src/context/business/BusinessContext'
import { useSnackbar } from 'src/hooks/useSnackbar'
import { useWeb3Context } from 'src/hooks/useWeb3Context'
import { useLocales } from 'src/locales'
import { redirectOnError } from 'src/pages/errors/handlers'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'
import { UserFundWalletSchema } from './UserFundWalletSchema'

interface Props {
  name: string
  walletAddress: string
  onClose: VoidFunction
  open: boolean
}

export function UserFundWalletDrawer({ name, walletAddress, open, onClose }: Props) {
  const methods = UserFundWalletSchema()
  const navigate = useNavigate()
  const { spacing } = useTheme()
  const [updating, setUpdating] = useState(false)
  const { pushSuccess, pushWarning, pushError } = useSnackbar()
  const { getValues, setValue, handleSubmit, formState, trigger } = methods
  const { translate } = useLocales()
  const { refetchCurrencies } = useBusinessContext()
  const { user } = useAuthContext()
  const { account, balances, resetError, fundWallet, connect, getWalletBalance, updateBalance } =
    useWeb3Context()
  const [currencies, setCurrencies] = useState<ICurrency[]>([])
  const title = `${translate('fund_wallet.title')}`
  const [textAmount, setTextAmount] = useState(0)
  const textoMultilinea = translate('fund_wallet.info')
  const addressExplorer = `${SUPPORTED_NETWORKS[ENV_SUPPORTED_NETWORK_ID].blockExplorerUrl}/address/WALLET_ADDRESS`
  const [walletFromHelpText, setWalletFromHelpText] = useState(addressExplorer)
  const [walletToHelpText, setWalletToHelpText] = useState(addressExplorer)

  const setWalletsBalances = () => {
    const data = getValues()
    const currencyData = currencies.filter((c) => c.id === data.currency)[0]
    if (!currencyData) return
    getWalletBalance(data.walletFrom, currencyData.contractAddress)
      .then((walletBalance: WalletBalance[] | undefined) => {
        setValue(
          'balanceFrom',
          walletBalance && walletBalance.length > 0 ? walletBalance[0].balance : 0
        )
      })
      .catch((err) => redirectOnError(navigate, err))
    getWalletBalance(data.walletTo, currencyData.contractAddress)
      .then((walletBalance: WalletBalance[] | undefined) => {
        setValue(
          'balanceTo',
          walletBalance && walletBalance.length > 0 ? walletBalance[0].balance : 0
        )
      })
      .catch((err) => redirectOnError(navigate, err))
  }

  useEffect(() => {
    const setInitialData = () => {
      setUpdating(true)
      setValue('walletFrom', user?.walletAddress ?? '')
      setValue('walletTo', walletAddress)
      setWalletFromHelpText(walletFromHelpText.replace('WALLET_ADDRESS', user?.walletAddress ?? ''))
      setWalletToHelpText(walletToHelpText.replace('WALLET_ADDRESS', walletAddress))
      setValue('balanceFrom', 0)
      setValue('balanceTo', 0)
      setValue('amount', 0)
      setWalletsBalances()
      setUpdating(false)
    }
    setInitialData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateBalance, balances, currencies])

  useEffect(() => {
    refetchCurrencies(true)?.then((rs) => {
      if (rs instanceof Error) throw rs
      setCurrencies(rs)
      setValue('currency', rs[0]?.id)
    })
    setValue('amount', 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (event: any) => {
    const newValue = event.target.value
    setTextAmount(newValue)
    setValue('amount', newValue)
  }

  const handleBlur = () => {
    if (textAmount.toString() === '') {
      setTextAmount(0)
      setValue('amount', 0)
    }
  }

  const handleFund = async (): Promise<boolean> => {
    if (updating || !(await trigger()) || Object.keys(formState.errors).length > 0) return false
    if (user && user.walletAddress) {
      const data = getValues()

      try {
        setUpdating(true)
        resetError()
        if (!account) {
          await connect()
        }
        if (account?.toLocaleLowerCase() !== user.walletAddress.toLocaleLowerCase()) {
          pushWarning('push.fund_wallet_invalid_wallet')
          setUpdating(false)
          return false
        }
        if (data.amount > data.balanceFrom) {
          pushWarning('fund_wallet.transfer_amount_error1')
          setUpdating(false)
          return false
        }
        const result = await fundWallet(walletAddress, data.amount.toString())
        if (!result) {
          pushError('push.fund_wallet_error')
          setUpdating(false)
          return false
        }
        pushSuccess('push.fund_wallet')
        setWalletsBalances()
        setUpdating(false)
        return true
      } catch (ex) {
        pushError('push.fund_wallet_error')
        setUpdating(false)
        return false
      }
    }
    setUpdating(false)
    return false
  }

  const handleCancel = () => {
    if (!updating) {
      onClose()
    }
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(handleFund)}>
      <Drawer
        open={open}
        closeDisabled={updating}
        header={
          <Stack
            orientation="vertical"
            justifyContent="center"
            alignItems="center"
            style={{
              padding: spacing.md,
              cursor: updating ? 'wait' : 'auto'
            }}
          >
            <h4 style={{ wordBreak: 'break-all' }}>{title}</h4>
          </Stack>
        }
        handleClose={handleCancel}
        content={
          <>
            <SectionTitle label="fund_automatic_contract.data" />
            <Stack
              orientation="vertical"
              gap={spacing.lg}
              style={{ paddingBlock: spacing.md, marginTop: spacing.lg }}
            >
              <Stack orientation="horizontal" gap={spacing.xs}>
                <RHFTextField
                  id="userName"
                  type="string"
                  name="userName"
                  readOnly
                  value={name}
                  labelText={translate('fund_wallet.field_user_name')}
                />
              </Stack>
              <Stack orientation="horizontal" gap={spacing.xs}>
                <RHFTextField
                  helperText={walletFromHelpText}
                  helperTextLinkText={translate('fund_wallet.view_in_explorer')}
                  style={{ fontSize: '11.5px' }}
                  id="walletFrom"
                  type="string"
                  name="walletFrom"
                  readOnly
                  labelText={translate('fund_wallet.field_wallet_from')}
                />
                <RHFTextField
                  id="balanceFrom"
                  type="number"
                  name="balanceFrom"
                  readOnly
                  labelText={translate('fund_wallet.field_wallet_from_balance')}
                />
              </Stack>
              <Stack orientation="horizontal" gap={spacing.xs}>
                <RHFTextField
                  helperText={walletToHelpText}
                  helperTextLinkText={translate('fund_wallet.view_in_explorer')}
                  style={{ fontSize: '11.5px' }}
                  id="walletTo"
                  type="string"
                  name="walletTo"
                  readOnly
                  labelText={translate('fund_wallet.field_wallet_to')}
                />
                <RHFTextField
                  id="balanceTo"
                  type="number"
                  name="balanceTo"
                  readOnly
                  labelText={translate('fund_wallet.field_wallet_to_balance')}
                />
              </Stack>
              <Stack orientation="horizontal" gap={spacing.xs}>
                <RHFSelect
                  id="currency select"
                  options={currencies.map((c) => ({ value: c.id, label: c.code }))}
                  name="currency"
                  label={capitalizeFirstLetter(translate('currency'))}
                  disabled={(currencies && currencies.length === 1) || updating}
                />
                <RHFTextField
                  id="amount"
                  type="number"
                  name="amount"
                  disabled={updating}
                  labelText={translate('amount')}
                  value={textAmount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Stack>
            </Stack>
            {updating && (
              <Stack
                orientation="vertical"
                gap={spacing.lg}
                style={{ paddingBlock: spacing.md, marginTop: spacing.lg }}
              >
                <InlineNotification
                  style={{ marginTop: spacing.lg }}
                  title={capitalizeFirstLetter(translate('important'))}
                  kind="info"
                  subtitle={textoMultilinea}
                  lowContrast
                  hideCloseButton
                />
              </Stack>
            )}
          </>
        }
        footer={
          <Stack orientation="horizontal">
            <>
              <Button
                className="btn-max-width-limit"
                style={{ width: '50%' }}
                renderIcon={ICONS.Close}
                iconDescription={capitalizeFirstLetter(translate('close'))}
                kind="secondary"
                disabled={updating}
                onClick={() => {
                  handleCancel()
                }}
              >
                {capitalizeFirstLetter(translate('close'))}
              </Button>
              <Button
                className="btn-max-width-limit"
                style={{ width: '50%' }}
                renderIcon={ICONS.SuccessOutline}
                iconDescription={capitalizeFirstLetter(translate('fund'))}
                kind="primary"
                disabled={updating}
                onClick={() => handleFund()}
              >
                {capitalizeFirstLetter(translate('fund'))}
              </Button>
            </>
          </Stack>
        }
      />
    </FormProvider>
  )
}

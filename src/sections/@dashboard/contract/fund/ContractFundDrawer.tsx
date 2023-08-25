import { Button, InlineNotification } from '@carbon/react'
import { useEffect, useState } from 'react'
import { ICurrency, Translation } from 'src/@types'
import { useAuthContext } from 'src/auth/useAuthContext'
import Drawer from 'src/components/drawer/Drawer'
import { RHFSelect, RHFTextField } from 'src/components/hook-form'
import FormProvider from 'src/components/hook-form/FormProvider'
import { Stack } from 'src/components/stack'
import { SectionTitle } from 'src/components/typography'
import { ICONS } from 'src/constants'
import { useBusinessContext } from 'src/context/business/BusinessContext'
import { useSnackbar } from 'src/hooks/useSnackbar'
import { useWeb3Context } from 'src/hooks/useWeb3Context'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { applyToEveryWord, capitalizeFirstLetter } from 'src/utils/strings'
import { useContractFundSchema } from 'src/validations/contract-fund'

interface Props {
  id: string
  name: string
  budget: number
  onClose: VoidFunction
  open: boolean
}

export function ContractFundDrawer({ id, name, budget, open, onClose }: Props) {
  const methods = useContractFundSchema()
  const { spacing } = useTheme()
  const [updating, setUpdating] = useState(false)
  const { pushSuccess, pushWarning, pushError } = useSnackbar()
  const { getValues, setValue, handleSubmit, formState, trigger } = methods
  const { translate } = useLocales()
  const { refetchCurrencies } = useBusinessContext()
  const { user } = useAuthContext()
  const { account, balances, resetError, fundContract, connect, getContractBalance } =
    useWeb3Context()
  const [currencies, setCurrencies] = useState<ICurrency[]>([])
  const title = `${applyToEveryWord('fund contract', (w) =>
    capitalizeFirstLetter(translate(w as Translation))
  )} ${name}`
  const textMultiline = translate('fund_automatic_contract.info')
  const [textAmount, setTextAmount] = useState(0)

  useEffect(() => {
    const setInitialData = () => {
      setValue('budget', budget)
      getContractBalance(id).then((funds: string) => {
        setValue('balance', parseInt(funds, 10))
        setValue('amount', budget - parseInt(funds, 10))
        setTextAmount(budget - parseInt(funds, 10))
      })
    }
    setInitialData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, getContractBalance])

  useEffect(() => {
    refetchCurrencies(true)?.then((rs) => {
      if (rs instanceof Error) throw rs
      setCurrencies(rs)
      setValue('currency', rs[0]?.id)
    })
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
      const currencyData = currencies.filter((c) => c.id === data.currency)[0]
      try {
        setUpdating(true)
        resetError()
        if (!account) {
          await connect()
        }
        if (account?.toLocaleLowerCase() !== user.walletAddress.toLocaleLowerCase()) {
          pushWarning('push.fund_automatic_contract_invalid_wallet')
          setUpdating(false)
          return false
        }
        if (balances) {
          const tokenBalance = balances.find(
            (item) => item.name.toLocaleLowerCase() === currencyData.code.toLocaleLowerCase()
          )
          if (tokenBalance && parseFloat(tokenBalance.value) < data.amount) {
            pushWarning('push.fund_automatic_contract_low_balance')
            setUpdating(false)
            return false
          }
        }
        const result = await fundContract(id, data.amount.toString())
        if (!result) {
          pushError('push.fund_contract_error')
          setUpdating(false)
          return false
        }
        pushSuccess('push.fund_contract')
        getContractBalance(id).then((funds: string) => {
          setValue('balance', parseInt(funds, 10))
        })
        setUpdating(false)
        return true
      } catch (ex) {
        pushError('push.fund_contract_error')
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
            <SectionTitle label={translate('fund_automatic_contract.data')} />
            <Stack orientation="vertical" gap={spacing.lg}>
              <Stack orientation="horizontal" gap={spacing.xs}>
                <RHFSelect
                  id="currency select"
                  options={currencies.map((c) => ({ value: c.id, label: c.code }))}
                  name="currency"
                  label={capitalizeFirstLetter(translate('currency'))}
                  disabled={(currencies && currencies.length === 1) || updating}
                />
                <RHFTextField
                  id="budget"
                  type="number"
                  name="budget"
                  readOnly
                  labelText={translate('fund_automatic_contract.contract_budget')}
                />
                <RHFTextField
                  id="balance"
                  type="number"
                  name="balance"
                  readOnly
                  labelText={translate('fund_automatic_contract.contract_current_balance')}
                />
              </Stack>
              <Stack orientation="horizontal" gap={spacing.xs}>
                <RHFTextField
                  id="amount"
                  type="number"
                  name="amount"
                  disabled={updating}
                  labelText={translate('fund_automatic_contract.transfer_amount')}
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
                  subtitle={textMultiline}
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

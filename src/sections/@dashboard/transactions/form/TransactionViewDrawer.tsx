import { Button, Tag } from '@carbon/react'
import { IBlockchainTransaction } from 'src/@types'
import Drawer from 'src/components/drawer/Drawer'
import FormProvider, { RHFTextField } from 'src/components/hook-form'
import { Stack } from 'src/components/stack'
import { SectionTitle, Typography } from 'src/components/typography'
import { ICONS } from 'src/constants'
import { WEB3_TRANSACTION_STATUS_COLORS } from 'src/constants/status'
import { ENV_SUPPORTED_NETWORK_ID, SUPPORTED_NETWORKS } from 'src/constants/web3'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'
import { useTransacitionSchema } from 'src/validations/transaction'

interface Props {
  transaction: IBlockchainTransaction
  hasError: boolean
  open: boolean
  onClose: VoidFunction
}

export default function TransactionViewDrawer({ transaction, hasError, open, onClose }: Props) {
  const methods = useTransacitionSchema()
  const { translate } = useLocales()
  const { spacing } = useTheme()
  const handleCLose = () => {
    onClose()
  }

  return (
    <FormProvider methods={methods}>
      <Drawer
        open={open}
        header={
          <Stack
            orientation="vertical"
            justifyContent="center"
            alignItems="center"
            style={{
              padding: 0,
              height: '10dvh'
            }}
          >
            <SectionTitle label={translate('transactions_tab.detail')} />
          </Stack>
        }
        handleClose={handleCLose}
        content={
          <Stack
            orientation="vertical"
            gap={spacing.lg}
            style={{ paddingBlock: spacing.md, marginTop: spacing.lg }}
          >
            <Stack orientation="horizontal" gap={spacing.lg} style={{ paddingBlock: spacing.xs }}>
              <RHFTextField
                id="createdAt"
                type="string"
                name="createdAt"
                readOnly
                value={transaction.createdAt}
                labelText={translate('date')}
              />
              <Stack justifyContent="center" orientation="vertical" style={{ paddingBlock: 0 }}>
                <Typography as="span" variant="textSecondary" style={{ fontSize: '12px' }}>
                  {translate('status')}
                </Typography>
                <Tag
                  style={{ marginTop: 10, width: 100, height: 40, border: 'none' }}
                  type={
                    hasError
                      ? WEB3_TRANSACTION_STATUS_COLORS.ERROR
                      : WEB3_TRANSACTION_STATUS_COLORS.OK
                  }
                >
                  {transaction.status}
                </Tag>
              </Stack>
            </Stack>
            <Stack orientation="horizontal" gap={spacing.lg} style={{ paddingBlock: spacing.xs }}>
              <RHFTextField
                id="userDisplayName"
                type="string"
                name="userDisplayName"
                readOnly
                value={transaction.userDisplayName}
                labelText={translate('user')}
              />
              <RHFTextField
                id="userEmail"
                type="string"
                name="userEmail"
                readOnly
                value={transaction.userEmail}
                labelText={translate('email')}
              />
            </Stack>
            <RHFTextField
              id="contractName"
              type="string"
              name="contractName"
              readOnly
              value={transaction.contractName}
              labelText={translate('contract')}
            />
            <Stack orientation="horizontal" gap={spacing.lg} style={{ paddingBlock: spacing.xs }}>
              <RHFTextField
                id="networkName"
                type="string"
                name="networkName"
                readOnly
                value={transaction.networkName}
                labelText={translate('transactions_tab.transaction_network')}
              />
              <RHFTextField
                id="transactionType"
                type="string"
                name="transactionType"
                readOnly
                value={transaction.transactionType}
                labelText={translate('transactions_tab.transaction_type')}
              />
            </Stack>
            <RHFTextField
              helperText={`${SUPPORTED_NETWORKS[ENV_SUPPORTED_NETWORK_ID].blockExplorerUrl}/address/${transaction.walletAddress}`}
              helperTextLinkText={translate('fund_wallet.view_in_explorer')}
              id="walletAddress"
              type="string"
              name="walletAddress"
              readOnly
              value={transaction.walletAddress}
              labelText={translate('wallet.label')}
            />
            <RHFTextField
              id="transactionHash"
              helperText={`${SUPPORTED_NETWORKS[ENV_SUPPORTED_NETWORK_ID].blockExplorerUrl}/tx/${transaction.transactionHash}`}
              helperTextLinkText={translate('fund_wallet.view_in_explorer')}
              type="string"
              name="transactionHash"
              readOnly
              value={transaction.transactionHash}
              labelText={translate('transactions_tab.transaction_hash')}
            />
          </Stack>
        }
        footer={
          <Stack orientation="horizontal">
            <Button
              style={{ width: '100%' }}
              className="btn-max-width-limit"
              kind="secondary"
              onClick={handleCLose}
              renderIcon={ICONS.Close}
            >
              {capitalizeFirstLetter(translate('close'))}
            </Button>
          </Stack>
        }
      />
    </FormProvider>
  )
}

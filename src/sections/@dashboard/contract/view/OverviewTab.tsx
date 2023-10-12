import {
  Button,
  Column,
  Grid,
  InlineNotification,
  Popover,
  PopoverContent,
  TextArea,
  TextInput
} from '@carbon/react'
import { ContractDetails, Metric, MetricCamel, MetricSnake } from 'src/@types'
import { ContractInfo } from 'src/components/contract-info'
import { ComparingCard } from 'src/components/qos-card'
import { Stack } from 'src/components/stack'
import { SectionTitle, Typography } from 'src/components/typography'
import { UserList } from 'src/components/user'
import { ICONS, STRING_DEFAULT } from 'src/constants'
import useCopyToClipboard from 'src/hooks/useCopyToClipboard'
import { useModal } from 'src/hooks/useModal'
import { useSnackbar } from 'src/hooks/useSnackbar'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'

type Props = {
  contract: ContractDetails
  expectedValues: { [K in MetricCamel]: number }
}
export default function OverviewTab({ contract, expectedValues }: Props) {
  const { translate } = useLocales()
  const { spacing } = useTheme()
  const { copy } = useCopyToClipboard()
  const { pushInfo } = useSnackbar()
  const copyLink = useModal()

  const { budget, schools, currency, notes, breakingRules } = contract

  const actual = contract.isDetails
    ? {
        [MetricCamel.Uptime]:
          contract.connectionsMedian.find((f) => f.metric_name === Metric.Uptime)?.median_value ??
          0,
        [MetricCamel.Latency]:
          contract.connectionsMedian.find((f) => f.metric_name === Metric.Latency)?.median_value ??
          0,
        [MetricCamel.DownloadSpeed]:
          contract.connectionsMedian.find((f) => f.metric_name === Metric.DownloadSpeed)
            ?.median_value ?? 0,
        [MetricCamel.UploadSpeed]:
          contract.connectionsMedian.find((f) => f.metric_name === Metric.UploadSpeed)
            ?.median_value ?? 0
      }
    : {
        [MetricCamel.Uptime]: 0,
        [MetricCamel.Latency]: 0,
        [MetricCamel.DownloadSpeed]: 0,
        [MetricCamel.UploadSpeed]: 0
      }

  return (
    <>
      <Stack
        orientation="horizontal"
        style={{ width: '100%' }}
        alignItems="center"
        justifyContent="flex-end"
        gap={spacing.xs}
      >
        <Typography variant="primary">
          {capitalizeFirstLetter(translate('share_contract_details'))}
        </Typography>
        <Popover
          align="bottom-right"
          onRequestClose={copyLink.close}
          open={copyLink.value}
          isTabTip
        >
          <Button
            hasIconOnly
            iconDescription={capitalizeFirstLetter(translate('share'))}
            onClick={copyLink.toggle}
            renderIcon={ICONS.Share}
            kind="ghost"
            size="sm"
            tooltipPosition="bottom"
            tooltipAlignment="end"
          />
          <PopoverContent>
            <Stack gap={spacing.lg} style={{ padding: spacing.md }}>
              <TextInput
                labelText=""
                id="copy-link-input"
                value={window.location.toString()}
                readOnly
              />
              <Button
                onClick={() => {
                  copy(window.location.toString())
                  pushInfo('copied_link')
                  copyLink.close()
                }}
                renderIcon={ICONS.Copy}
              >
                {capitalizeFirstLetter(translate('copy_url'))}
              </Button>
            </Stack>
          </PopoverContent>
        </Popover>
      </Stack>

      {contract.automatic && (
        <InlineNotification
          hideCloseButton
          kind="info"
          subtitle={translate('automatic_contracts_check_info')}
          lowContrast
        />
      )}

      <SectionTitle label="quality_of_service" />
      <Grid className="gap-16px" fullWidth>
        <Column
          className="grid-column-span-8-1500"
          sm={spacing.xxs}
          md={spacing.xxs}
          lg={spacing.xs}
          xlg={spacing.xxs}
        >
          <ComparingCard
            width="100%"
            average
            name={MetricSnake.Uptime}
            expectedValue={expectedValues[MetricCamel.Uptime]}
            value={actual[MetricCamel.Uptime]}
          />
        </Column>
        <Column
          className="grid-column-span-8-1500"
          sm={spacing.xxs}
          md={spacing.xxs}
          lg={spacing.xs}
          xlg={spacing.xxs}
        >
          <ComparingCard
            width="100%"
            average
            name={MetricSnake.Latency}
            expectedValue={expectedValues[MetricCamel.Latency]}
            value={actual[MetricCamel.Latency]}
          />
        </Column>
        <Column
          className="grid-column-span-8-1500"
          sm={spacing.xxs}
          md={spacing.xxs}
          lg={spacing.xs}
          xlg={spacing.xxs}
        >
          <ComparingCard
            width="100%"
            average
            name={MetricSnake.DownloadSpeed}
            expectedValue={expectedValues[MetricCamel.DownloadSpeed]}
            value={actual[MetricCamel.DownloadSpeed]}
          />
        </Column>
        <Column
          className="grid-column-span-8-1500"
          sm={spacing.xxs}
          md={spacing.xxs}
          lg={spacing.xs}
          xlg={spacing.xxs}
        >
          <ComparingCard
            width="100%"
            average
            name={MetricSnake.UploadSpeed}
            expectedValue={expectedValues[MetricCamel.UploadSpeed]}
            value={actual[MetricCamel.UploadSpeed]}
          />
        </Column>
      </Grid>
      <SectionTitle
        style={{ paddingBlockStart: spacing.xl, paddingBlockEnd: spacing.xs }}
        label="isp_contacts"
      />
      <UserList
        users={contract.ispContacts}
        paymentRecieverId={
          contract.automatic && contract.paymentReceiver && 'id' in contract.paymentReceiver
            ? contract.paymentReceiver.id
            : null
        }
      />
      <SectionTitle
        style={{ paddingBlockStart: spacing.xl, paddingBlockEnd: spacing.xs }}
        label="contract_team"
      />
      <UserList users={contract.stakeholders} />

      <SectionTitle
        style={{ paddingBlockStart: spacing.xl, paddingBlockEnd: spacing.xs }}
        label="schools_and_budget"
      />
      <Stack gap={spacing.md}>
        <Stack
          orientation="horizontal"
          gap={spacing.md}
          style={{ width: '50%' }}
          justifyContent="flex-start"
          alignItems="center"
        >
          <ContractInfo
            style={{ width: '33%' }}
            title={translate('budget')}
            value={Number(budget) ? `${currency?.code ?? ''} ${budget}` : STRING_DEFAULT}
          />
          <ContractInfo
            style={{ width: '33%' }}
            title={translate('schools')}
            value={
              schools.length > 0
                ? `${String(schools.length)} ${translate('schools')}`
                : STRING_DEFAULT
            }
          />
          <ContractInfo
            style={{ width: '33%' }}
            title={translate('payment_frequency')}
            value={contract.frequency?.name ?? STRING_DEFAULT}
          />
        </Stack>
      </Stack>
      <SectionTitle
        style={{ paddingBlockStart: spacing.xl, paddingBlockEnd: spacing.xs }}
        label="comment_section.title"
      />
      {notes ? (
        <TextArea value={notes} readOnly labelText="" rows={4} maxCount={1000} enableCounter />
      ) : (
        <Typography as="span" variant="disabled">
          {translate('no_comments_added')}
        </Typography>
      )}

      <SectionTitle
        style={{ paddingBlockStart: spacing.xl, paddingBlockEnd: spacing.xs }}
        label="breaking_rules"
      />
      {breakingRules ? (
        <TextArea
          value={breakingRules}
          readOnly
          labelText=""
          rows={4}
          maxCount={1000}
          enableCounter
        />
      ) : (
        <Typography as="span" variant="disabled">
          {translate('no_breaking_rules')}
        </Typography>
      )}
    </>
  )
}
